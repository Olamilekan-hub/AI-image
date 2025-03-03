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

// Upload endpoint: stores the file path in the user's session and returns fileId
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ error: "File upload failed!" });
    }
    if (!req.file) {
      console.error("No file provided in the request");
      return res.status(400).json({ error: "No file uploaded!" });
    }

    // Generate a unique file ID
    const fileId = Date.now().toString();
    
    // Save in both session and backup store
    req.session.filePath = req.file.path;
    uploadedFiles.set(fileId, req.file.path);
    
    console.log("Session ID:", req.sessionID);
    console.log("File uploaded and stored in session:", req.file.path);
    console.log("File ID generated:", fileId);
    
    // Force session save
    req.session.save(err => {
      if (err) console.error("Session save error:", err);
      res.status(200).json({ 
        filePath: req.file.path, 
        fileId: fileId,
        message: "File uploaded successfully!" 
      });
    });
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
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Create a streaming request to OpenAI
    const stream = await openai.chat.completions.create({
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
      stream: true, // Enable streaming
    });

    // Process the stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        // Send the chunk to the client
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // End the stream
    res.write('data: [DONE]\n\n');
    res.end();
    
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