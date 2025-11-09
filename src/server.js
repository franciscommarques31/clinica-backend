import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// 🔗 Conexão ao MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Ligação ao MongoDB estabelecida com sucesso"))
  .catch((err) => console.error("❌ Erro ao ligar à base de dados:", err));

app.use(
  cors({
    origin: [
      "https://clinica-frontend-seven.vercel.app", // frontend na Vercel
      "http://localhost:5173", // testes locais (Vite)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// 🧩 Rota inicial (teste)
app.get("/", (req, res) => {
  res.send("API Clínica a funcionar com MongoDB ✅");
});

// 🩺 Exemplo de rota (para testar comunicação)
app.get("/test", (req, res) => {
  res.json({ msg: "Ligação API + MongoDB OK" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor a correr na porta ${PORT}`));
