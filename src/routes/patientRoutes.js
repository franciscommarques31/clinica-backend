const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Patient = require("../models/Patient");
const Invite = require("../models/Invite");

// LISTAR PACIENTES (ADMIN)
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

    // atualiza o paciente que já existe em vez de criar um novo
    const patient = await Patient.findOneAndUpdate(
      { email: invite.email },
      {
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
        registado: true
      },
      { new: true }
    );

    if (!patient) {
      return res.status(400).json({ message: "Paciente não encontrado" });
    }

    await Invite.deleteOne({ token: req.params.token });

    res.json({ message: "Conta ativada com sucesso", patient });

  } catch (error) {
    console.error("Erro no registo:", error);
    res.status(500).json({ message: "Erro no registo" });
  }
});

module.exports = router;