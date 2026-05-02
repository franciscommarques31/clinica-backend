const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Patient = require("../models/Patient");
const Invite = require("../models/Invite");

// 🔒 LISTAR PACIENTES (ADMIN)  👈 ADICIONADO
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar pacientes" });
  }
});

// REGISTO COM TOKEN (CONVITE)
router.post("/register/:token", async (req, res) => {
  try {
    const invite = await Invite.findOne({ token: req.params.token });

    if (!invite) {
      return res.status(400).json({ message: "Convite inválido" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const patient = new Patient({
      name: req.body.name,
      email: invite.email,
      password: hashedPassword
    });

    await patient.save();

    // opcional: apagar convite depois de usar
    await Invite.deleteOne({ token: req.params.token });

    res.json({ message: "Paciente criado com sucesso", patient });

  } catch (error) {
    res.status(500).json({ message: "Erro no registo" });
  }
});

module.exports = router;