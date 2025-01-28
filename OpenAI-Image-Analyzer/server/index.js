import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import fs from "fs";
import multer from "multer";
import OpenAI from "openai";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
configDotenv();

app.use(bodyParser.json());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://ai-image-blue.vercel.app", // Your deployed frontend
        "http://localhost:5173", // Local development
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject request
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.path, req.headers);
  next();
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

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

const upload = multer({ storage: storage }).single("file");

let filePath;

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

    console.log("File uploaded successfully:", req.file);
    filePath = req.file.path; // Save the file path globally
    console.log("File path after upload:", req.file.path);
    res.status(200).json({ filePath: req.file.path });
  });
});

app.post("/openai", async (req, res) => {
  try {
    const prompt = req.body.message;

    if (!filePath) {
      console.error("File path not set");
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
    console.log(response.choices[0].message.content);
    res.send(response.choices[0].message.content);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or your email service
    auth: {
      user: "spectraai57@gmail.com",
      pass: "ccyp uskk oalg luoi",
    },
  });

  const mailOptions = {
    from: email,
    to: "spectraai57@gmail.com", // Your email
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
