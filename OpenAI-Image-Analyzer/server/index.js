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

// Use express.json() to parse JSON bodies
app.use(express.json());

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

// Log each incoming request (for debugging)
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.path, req.headers);
  next();
});

// Configure session middleware with proper cookie settings for cross-origin requests
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret", // Replace with your secure secret in production
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS in production
      sameSite: "lax",
    },
  })
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

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

// Create the Multer middleware expecting a file with the field name "file"
const upload = multer({ storage }).single("file");

// Upload endpoint: stores the file path in the user's session
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
    // Save the file path in the session for this user
    req.session.filePath = req.file.path;
    console.log("File uploaded and stored in session:", req.file.path);
    // Return the filePath in the response (optional)
    res.status(200).json({
      filePath: req.file.path,
      message: "File uploaded successfully!",
    });
  });
});

// OpenAI endpoint: retrieves the file path from session and processes the image
app.post("/openai", async (req, res) => {
  try {
    const prompt = req.body.message;
    const filePath = req.session.filePath;

    if (!filePath) {
      console.error("File path not set in session");
      return res.status(400).json({ error: "No file uploaded!" });
    }

    const imageAsBase64 = fs.readFileSync(filePath, "base64");
    console.log("Image as base64:", imageAsBase64);

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
    });

    const responseContent = response.choices[0].message.content;
    const formattedResponse = JSON.stringify(responseContent, null, 2);
    console.log("Formatted Response:", formattedResponse);
    res.send(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
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

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
