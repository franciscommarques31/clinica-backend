const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Ligação ao MongoDB estabelecida com sucesso");
  } catch (error) {
    console.error("❌ Erro ao ligar à base de dados:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
