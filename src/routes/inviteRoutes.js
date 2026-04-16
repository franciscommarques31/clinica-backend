const express = require("express");
const router = express.Router();

const Invite = require("../models/Invite");

// CRIAR CONVITE
router.post("/", async (req, res) => {
  try {
    const token = Math.random().toString(36).substring(2);

    const invite = new Invite({
      email: req.body.email,
      token
    });

    await invite.save();

    res.json(invite);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar convite" });
  }
});

// LISTAR CONVITES
router.get("/", async (req, res) => {
  const invites = await Invite.find();
  res.json(invites);
});

// APAGAR CONVITE
router.delete("/:id", async (req, res) => {
  await Invite.findByIdAndDelete(req.params.id);
  res.json({ message: "Convite apagado" });
});

module.exports = router;