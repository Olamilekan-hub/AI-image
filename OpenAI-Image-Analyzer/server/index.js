import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import fs from "fs";
import path from "path";
import multer from "multer";
import OpenAI from "openai";
import nodemailer from "nodemailer";
import session from "express-session";
import cluster from "cluster";
import os from "os";

configDotenv();

const MIN_WORKERS = 1;
const MAX_WORKERS = Math.min(os.cpus().length, 2);
const SCALE_INTERVAL = 30000; // 30 seconds
const SCALE_UP_THRESHOLD = 500;  // Example: 500+ reqs per 30 sec to scale up
const SCALE_DOWN_THRESHOLD = 50; // Example: <100 reqs per 30 sec to scale down

let requestCount = 0;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  const workers = new Set();

  // Start with minimum workers
  for (let i = 0; i < MIN_WORKERS; i++) {
    const worker = cluster.fork();
    workers.add(worker.id);
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    workers.delete(worker.id);
    if (workers.size < MIN_WORKERS) {
      const newWorker = cluster.fork();
      workers.add(newWorker.id);
    }
  });

  // Message handler to track requests
  for (const id in cluster.workers) {
    cluster.workers[id]?.on("message", (msg) => {
      if (msg.type === "request") requestCount++;
    });
  }

  // Dynamic scaling loop
  setInterval(() => {
    console.log(`Requests in last ${SCALE_INTERVAL / 1000}s:`, requestCount);

    const currentWorkers = workers.size;

    if (requestCount > SCALE_UP_THRESHOLD && currentWorkers < MAX_WORKERS) {
      const newWorker = cluster.fork();
      workers.add(newWorker.id);
      console.log("Scaled up. New worker count:", workers.size);
    } else if (requestCount < SCALE_DOWN_THRESHOLD && currentWorkers > MIN_WORKERS) {
      // Pick a worker to kill
      for (const id in cluster.workers) {
        if (workers.size <= MIN_WORKERS) break;
        const w = cluster.workers[id];
        if (w) {
          w.process.kill();
          workers.delete(w.id);
          console.log("Scaled down. Worker killed:", w.id);
          break;
        }
      }
    }

    requestCount = 0; // Reset counter
  }, SCALE_INTERVAL);
} else {
  const app = express();

  // CORS config
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        "https://spectra-ai.space",
        "https://www.spectra-ai.space",
        "https://ai-image-blue.vercel.app",
        "http://localhost:1373",
        "https://spectrai.ai"
      ];
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  }));
  app.options('*', cors());

  // Directory
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Middleware for request counting
  app.use((req, res, next) => {
    process.send?.({ type: "request" }); // Notify master of request
    next();
  });

  // Session
  app.use(session({
    secret: process.env.SESSION_SECRET || "fallback-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    }
  }));

  app.use(express.json());

  const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

  const uploadedFiles = new Map();
  const FILE_TTL = 5 * 60 * 1000;

  function scheduleFileCleanup(filePath, fileId) {
    setTimeout(() => {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`File deleted after TTL: ${filePath}`);
        }
        if (uploadedFiles.has(fileId)) {
          uploadedFiles.delete(fileId);
          console.log(`File ID ${fileId} removed from tracking`);
        }
      } catch (err) {
        console.error(`Error cleaning up file ${filePath}:`, err);
      }
    }, FILE_TTL);
  }

  setInterval(() => {
    try {
      const files = fs.readdirSync(uploadDir);
      const now = Date.now();
      files.forEach(file => {
        const filePath = path.join(uploadDir, file);
        const stats = fs.statSync(filePath);
        if (now - stats.mtimeMs > FILE_TTL) {
          fs.unlinkSync(filePath);
          console.log(`Cleanup: removed old file ${filePath}`);
        }
      });
    } catch (err) {
      console.error("Error in cleanup interval:", err);
    }
  }, 60000);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname.replace(/\s+/g, '-')}`;
      cb(null, uniqueName);
    }
  });

  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024, files: 1 }
  }).single("file");

  app.post("/upload", (req, res) => {
    console.log("Upload request received");
    if (req.method === 'OPTIONS') return res.status(200).end();

    upload(req, res, function(err) {
      if (err) return res.status(500).json({ error: `File upload failed: ${err.message}` });
      if (!req.file) return res.status(400).json({ error: "No file uploaded!" });

      const fileId = Date.now().toString();
      const filePath = req.file.path;

      try {
        req.session.filePath = filePath;
        uploadedFiles.set(fileId, filePath);
        scheduleFileCleanup(filePath, fileId);

        req.session.save(err => {
          if (err) console.error("Session save error:", err);
          res.status(200).json({ filePath, fileId, message: "File uploaded successfully!" });
        });
      } catch (sessionError) {
        console.error("Session error:", sessionError);
        res.status(200).json({ filePath, fileId, message: "File uploaded successfully (session backup)!" });
      }
    });
  });

  app.post("/openai", async (req, res) => {
    try {
      const prompt = req.body.message;
      const fileId = req.body.fileId;

      let filePath = req.session.filePath || uploadedFiles.get(fileId) || req.body.filePath;
      if (!filePath || !fs.existsSync(filePath)) {
        return res.status(400).json({ error: "File not found!" });
      }

      const imageAsBase64 = fs.readFileSync(filePath, "base64");
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: `data:image/*;base64,${imageAsBase64}` } }
          ]}
        ]
      });

      const responseContent = response.choices[0].message.content;
      res.send(responseContent);
    } catch (error) {
      console.error("OpenAI endpoint error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Something went wrong!" });
      }
    }
  });

  app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER || "spectraai57@gmail.com",
        pass: process.env.EMAIL_PASS || "ccyp uskk oalg luoi",
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO || "spectraai57@gmail.com",
      subject: `Message from ${name}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send email." });
    }
  });

  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', worker: process.pid });
  });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started, server running on port ${PORT}`);
  });
}

// import express from "express";
// import cors from "cors";
// import { configDotenv } from "dotenv";
// import fs from "fs";
// import multer from "multer";
// import OpenAI from "openai";
// import nodemailer from "nodemailer";
// import session from "express-session";
// import path from "path";

// configDotenv();
// const app = express();

// // Configure CORS for allowed origins
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowedOrigins = [
//         "https://ai-image-blue.vercel.app", // Deployed frontend
//         "http://localhost:5173",            // Local development
//       ];
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "OPTIONS"],
//     credentials: true,
//   })
// );

// // Logging middleware
// app.use((req, res, next) => {
//   console.log("Incoming request:", req.method, req.path, req.headers.origin);
//   next();
// });

// // Configure session middleware with appropriate cookie settings for cross-origin requests
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "fallback-secret", // Replace with a strong secret in production
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       secure: process.env.NODE_ENV === 'production', // Only true in production
//       sameSite: "none", // For better cross-origin support
//       maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     }
//   })
// );

// // Use express.json() for JSON requests (this will ignore multipart/form-data requests)
// app.use(express.json());

// const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// // Enhanced in-memory store for uploaded files and conversation history
// const fileStore = new Map(); // Store file metadata with expiration time
// const conversationStore = new Map(); // Store conversation history by session ID

// // Create uploads directory if it doesn't exist
// const uploadDir = "./public/uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure Multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     // Create a unique filename with original extension
//     const fileExt = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`;
//     cb(null, uniqueName);
//   },
// });

// // Create Multer middleware expecting a file with the field name "file"
// const upload = multer({ storage }).single("file");

// // Utility function to schedule file cleanup
// function scheduleFileCleanup(filePath, fileId, expirationMs = 3600000) { // 1 hour default
//   const expirationTime = Date.now() + expirationMs;
//   fileStore.set(fileId, {
//     filePath,
//     expirationTime
//   });
  
//   // Schedule deletion after expiration
//   setTimeout(() => {
//     if (fs.existsSync(filePath)) {
//       try {
//         fs.unlinkSync(filePath);
//         console.log(`File deleted: ${filePath}`);
//       } catch (err) {
//         console.error(`Error deleting file ${filePath}:`, err);
//       }
//     }
//     fileStore.delete(fileId);
//   }, expirationMs);
// }

// // Run periodic cleanup to handle any files that weren't properly deleted
// setInterval(() => {
//   const now = Date.now();
//   for (const [fileId, fileData] of fileStore.entries()) {
//     if (fileData.expirationTime < now) {
//       if (fs.existsSync(fileData.filePath)) {
//         try {
//           fs.unlinkSync(fileData.filePath);
//           console.log(`Cleanup: File deleted: ${fileData.filePath}`);
//         } catch (err) {
//           console.error(`Cleanup: Error deleting file ${fileData.filePath}:`, err);
//         }
//       }
//       fileStore.delete(fileId);
//     }
//   }
// }, 600000); // Check every 10 minutes

// // Upload endpoint: stores the file path in the user's session and returns fileId
// app.post("/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.error("Multer error:", err);
//       return res.status(500).json({ error: "File upload failed!" });
//     }
//     if (!req.file) {
//       console.error("No file provided in the request");
//       return res.status(400).json({ error: "No file uploaded!" });
//     }

//     // Generate a unique file ID
//     const fileId = Date.now().toString();
//     const filePath = req.file.path;
    
//     // Save in session for this request
//     req.session.filePath = filePath;
//     req.session.fileId = fileId;
    
//     // Initialize conversation history for this session if it doesn't exist
//     if (!conversationStore.has(req.sessionID)) {
//       conversationStore.set(req.sessionID, []);
//     }
    
//     // Schedule file cleanup after 1 hour
//     scheduleFileCleanup(filePath, fileId);
    
//     console.log("File uploaded:", filePath);
//     console.log("File ID:", fileId);
//     console.log("Session ID:", req.sessionID);
    
//     // Force session save
//     req.session.save(err => {
//       if (err) console.error("Session save error:", err);
//       res.status(200).json({ 
//         filePath: filePath, 
//         fileId: fileId,
//         message: "File uploaded successfully!" 
//       });
//     });
//   });
// });

// // OpenAI endpoint with conversation history support
// app.post("/openai", async (req, res) => {
//   try {
//     const prompt = req.body.message;
//     const fileId = req.body.fileId || req.session.fileId;
//     const filePath = req.body.filePath || req.session.filePath;
    
//     let imagePath = null;
    
//     // Find the file path from multiple potential sources
//     if (filePath && fs.existsSync(filePath)) {
//       imagePath = filePath;
//     } else if (fileId && fileStore.has(fileId)) {
//       const fileData = fileStore.get(fileId);
//       if (fs.existsSync(fileData.filePath)) {
//         imagePath = fileData.filePath;
//       }
//     }

//     if (!imagePath) {
//       console.error("File not found");
//       return res.status(400).json({ error: "Image not found! Please upload an image first." });
//     }

//     // Get or initialize conversation history for this session
//     let conversationHistory = conversationStore.get(req.sessionID) || [];
    
//     // Limit conversation to the last 10 messages (5 exchanges)
//     if (conversationHistory.length > 10) {
//       conversationHistory = conversationHistory.slice(conversationHistory.length - 10);
//     }
    
//     // Load the image as base64
//     const imageAsBase64 = fs.readFileSync(imagePath, "base64");
//     console.log(`Image loaded, size: ${imageAsBase64.length} bytes`);

//     // Set up SSE headers
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');

//     // Construct messages with conversation history
//     const messages = [
//       ...conversationHistory,
//       {
//         role: "user",
//         content: [
//           { type: "text", text: prompt },
//           {
//             type: "image_url",
//             image_url: {
//               url: `data:image/*;base64,${imageAsBase64}`,
//             },
//           },
//         ],
//       }
//     ];

//     // Create a streaming request to OpenAI
//     const stream = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: messages,
//       stream: true, // Enable streaming
//     });

//     // Store the new user message
//     conversationHistory.push({
//       role: "user",
//       content: [{ type: "text", text: prompt }] 
//       // Note: We don't store the image in the history to save memory
//     });

//     // Collect the full response to store in history
//     let fullAssistantResponse = '';

//     // Process the stream
//     for await (const chunk of stream) {
//       const content = chunk.choices[0]?.delta?.content || '';
//       if (content) {
//         // Append to the full response
//         fullAssistantResponse += content;
        
//         // Send the chunk to the client
//         res.write(`data: ${JSON.stringify({ content })}\n\n`);
//       }
//     }

//     // Store the assistant's response in history
//     conversationHistory.push({
//       role: "assistant",
//       content: fullAssistantResponse
//     });

//     // Update the conversation store
//     conversationStore.set(req.sessionID, conversationHistory);
    
//     // Send completion signal
//     res.write('data: [DONE]\n\n');
//     res.end();
    
//   } catch (error) {
//     console.error("Error in OpenAI endpoint:", error);
//     if (!res.headersSent) {
//       res.status(500).json({ error: "Something went wrong!" });
//     } else {
//       res.write(`data: ${JSON.stringify({ error: "Something went wrong!" })}\n\n`);
//       res.end();
//     }
//   }
// });

// // Endpoint to clear conversation history
// app.post("/clear-conversation", (req, res) => {
//   try {
//     if (req.sessionID && conversationStore.has(req.sessionID)) {
//       conversationStore.set(req.sessionID, []);
//       console.log(`Cleared conversation history for session: ${req.sessionID}`);
//     }
//     res.status(200).json({ message: "Conversation history cleared" });
//   } catch (error) {
//     console.error("Error clearing conversation:", error);
//     res.status(500).json({ error: "Failed to clear conversation history" });
//   }
// });

// // Email sending endpoint
// app.post("/send-email", async (req, res) => {
//   const { name, email, message } = req.body;
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "spectraai57@gmail.com",
//       pass: "ccyp uskk oalg luoi",
//     },
//   });

//   const mailOptions = {
//     from: email,
//     to: "spectraai57@gmail.com",
//     subject: `Message from ${name}`,
//     text: message,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to send email." });
//   }
// });

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ 
//     status: "ok", 
//     timestamp: new Date().toISOString(),
//     files: fileStore.size,
//     sessions: conversationStore.size
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Upload directory: ${uploadDir}`);
// });