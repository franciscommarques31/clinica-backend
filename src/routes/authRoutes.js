const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Patient = require("../models/Patient");

// LOGIN ADMIN
router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });

  if (!admin) return res.status(400).json({ message: "Admin não existe" });

  const match = await bcrypt.compare(req.body.password, admin.password);

  if (!match) return res.status(400).json({ message: "Password errada" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

  res.json({ token });
});

// LOGIN PACIENTE
router.post("/patient-login", async (req, res) => {
  const patient = await Patient.findOne({ email: req.body.email });

  if (!patient) return res.status(400).json({ message: "Paciente não existe" });

  const match = await bcrypt.compare(req.body.password, patient.password);

  if (!match) return res.status(400).json({ message: "Password errada" });

  const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;