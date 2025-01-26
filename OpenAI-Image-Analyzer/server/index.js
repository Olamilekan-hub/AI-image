import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import fs from "fs";
import multer from "multer";
import OpenAI from "openai";

const app = express();
configDotenv();
app.use(
  cors({
    origin: "https://ai-image-blue.vercel.app/",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
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
      console.log(err);
      return res.status(500).json(err);
    }
    filePath = req.file.path;
  });
});

app.post("/openai", async (req, res) => {
  try {
    const prompt = req.body.message;

    const imageAsBase64 = fs.readFileSync(filePath, "base64");

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

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
