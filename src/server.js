console.log("🧠 Início do servidor...");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database"); // 👈 IMPORTANTE

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Esta linha TEM de existir
connectDB();

app.get("/", (req, res) => {
  res.send("API Clínica a funcionar com MongoDB ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor a correr na porta ${PORT}`));
