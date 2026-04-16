const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ROTAS
const authRoutes = require("./routes/authRoutes");
const staffRoutes = require("./routes/staffRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRequestRoutes = require("./routes/appointmentRequestRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const inviteRoutes = require("./routes/inviteRoutes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// LIGAR DB
connectDB();

// ROTAS
app.use("/api/auth", authRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointment-requests", appointmentRequestRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/invites", inviteRoutes);

// TESTE
app.get("/", (req, res) => {
  res.send("API da clínica a funcionar");
});

// PORTA
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});