import express from "express";
import cors from "cors";
import { json } from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors({ origin: "*" }));
app.use(json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/procesar", async (req, res) => {
  const { texto } = req.body;
  const prompt = `Genera una ficha médica breve, receta médica y orden de exámenes para el siguiente caso clínico: "${texto}"`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4", // Si quieres, cambia a "gpt-3.5-turbo"
      messages: [{ role: "user", content: prompt }],
    });

    const result = chat.choices[0].message.content;
    res.json({ ficha: result });
  } catch (error) {
    console.error("Error OpenAI:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
