import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import fs from "fs";
import multer from "multer";
import OpenAI from "openai";
import nodemailer from "nodemailer";
import session from "express-session";

configDotenv();
const app = express();

// Configure CORS for allowed origins
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://ai-image-blue.vercel.app", // Deployed frontend
        "http://localhost:5173",            // Local development
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

// Logging middleware
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.path, req.headers.origin);
  next();
});

// Configure session middleware with appropriate cookie settings for cross-origin requests
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret", // Replace with a strong secret in production
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Only true in production
      sameSite: "none", // Changed from "lax" for better cross-origin support
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Use express.json() for JSON requests (this will ignore multipart/form-data requests)
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// Track uploaded files with a simple in-memory store as fallback for sessions
const uploadedFiles = new Map();

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./public";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create Multer middleware expecting a file with the field name "file"
const upload = multer({ storage }).single("file");

// Upload endpoint with improved error handling
app.post("/upload", (req, res) => {
  console.log("Upload request received");
  
  // Add CORS headers (if needed)
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  upload(req, res, function(err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: `File upload failed: ${err.message}` });
    }
    
    if (!req.file) {
      console.error("No file provided in the request");
      return res.status(400).json({ error: "No file uploaded!" });
    }
    
    console.log("File received:", {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size
    });
    
    // Generate a unique file ID
    const fileId = Date.now().toString();
    
    try {
      // Save in both session and backup store
      req.session.filePath = req.file.path;
      uploadedFiles.set(fileId, req.file.path);
      
      console.log("Session ID:", req.sessionID);
      console.log("File uploaded and stored in session:", req.file.path);
      console.log("File ID generated:", fileId);
      
      // Force session save
      req.session.save(err => {
        if (err) {
          console.error("Session save error:", err);
          // Continue anyway since we're using the backup store
        }
        
        res.status(200).json({ 
          filePath: req.file.path, 
          fileId: fileId,
          message: "File uploaded successfully!" 
        });
      });
    } catch (sessionError) {
      console.error("Session error:", sessionError);
      
      // Even if session fails, we can still use the backup store
      res.status(200).json({ 
        filePath: req.file.path, 
        fileId: fileId,
        message: "File uploaded successfully (session backup)!" 
      });
    }
  });
});

// OpenAI endpoint: retrieves the file path from session or request and processes the image
// app.post("/openai", async (req, res) => {
//   try {
//     const prompt = req.body.message;
//     const fileId = req.body.fileId;
    
//     // Try multiple sources for the file path
//     let filePath = null;
    
//     // First check session
//     if (req.session.filePath) {
//       filePath = req.session.filePath;
//       console.log("Found file path in session:", filePath);
//     } 
//     // Then check fileId if provided
//     else if (fileId && uploadedFiles.has(fileId)) {
//       filePath = uploadedFiles.get(fileId);
//       console.log("Found file path using fileId:", filePath);
//     }
//     // Finally check direct path in request
//     else if (req.body.filePath) {
//       filePath = req.body.filePath;
//       console.log("Using file path from request body:", filePath);
//     }

//     if (!filePath) {
//       console.error("File path not found in session or request");
//       return res.status(400).json({ error: "No file uploaded!" });
//     }

//     // Verify file exists before processing
//     if (!fs.existsSync(filePath)) {
//       console.error("File does not exist at path:", filePath);
//       return res.status(404).json({ error: "File not found!" });
//     }

//     const imageAsBase64 = fs.readFileSync(filePath, "base64");
//     console.log("Image loaded successfully, base64 length:", imageAsBase64.length);

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: [
//             { type: "text", text: prompt },
//             {
//               type: "image_url",
//               image_url: {
//                 url: `data:image/*;base64,${imageAsBase64}`,
//               },
//             },
//           ],
//         },
//       ],
//     });

//     // Send the raw content directly without JSON.stringify
//     const responseContent = response.choices[0].message.content;
//     console.log("Response content sent to client");
//     res.send(responseContent);
//   } catch (error) {
//     console.error("Error in OpenAI endpoint:", error);
//     res.status(500).json({ error: "Something went wrong!" });
//   }
// });

app.post("/openai", async (req, res) => {
  try {
    const prompt = req.body.message;
    const fileId = req.body.fileId;
    
    // Try multiple sources for the file path
    let filePath = null;
    
    // First check session
    if (req.session.filePath) {
      filePath = req.session.filePath;
      console.log("Found file path in session:", filePath);
    } 
    // Then check fileId if provided
    else if (fileId && uploadedFiles.has(fileId)) {
      filePath = uploadedFiles.get(fileId);
      console.log("Found file path using fileId:", filePath);
    }
    // Finally check direct path in request
    else if (req.body.filePath) {
      filePath = req.body.filePath;
      console.log("Using file path from request body:", filePath);
    }

    if (!filePath) {
      console.error("File path not found in session or request");
      return res.status(400).json({ error: "No file uploaded!" });
    }

    // Verify file exists before processing
    if (!fs.existsSync(filePath)) {
      console.error("File does not exist at path:", filePath);
      return res.status(404).json({ error: "File not found!" });
    }

    const imageAsBase64 = fs.readFileSync(filePath, "base64");
    console.log("Image loaded successfully, base64 length:", imageAsBase64.length);

    // Set up SSE headers
    // res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('Connection', 'keep-alive');
    res.setHeader('Content-Type', 'application/json');

    // Create a streaming request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/*;base64,${imageAsBase64}`,
              },
            },
          ],
        },
      ],
      // stream: true, // Enable streaming
    });

// Send the raw content directly without JSON.stringify
    const responseContent = response.choices[0].message.content;
    console.log("Response content sent to client", responseContent);
    // res.write(`data: ${JSON.stringify({ content: responseContent })}\n\n`);
    res.send(responseContent);
    // res.end();

    // // Process the stream
    // for await (const chunk of stream) {
    //   const content = chunk.choices[0]?.delta?.content || '';
    //   if (content) {
    //     // Send the chunk to the client
    //     res.write(`data: ${JSON.stringify({ content })}\n\n`);
    //   }
    // }

    // // End the stream
    // res.write('data: [DONE]\n\n');
    // res.end();
    
  } catch (error) {
    console.error("Error in OpenAI endpoint:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Something went wrong!" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Something went wrong!" })}\n\n`);
      res.end();
    }
  }
});

// Email sending endpoint
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "spectraai57@gmail.com",
      pass: "ccyp uskk oalg luoi",
    },
  });

  const mailOptions = {
    from: email,
    to: "spectraai57@gmail.com",
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

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on port ${process.env.PORT || 8000}`);
});

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