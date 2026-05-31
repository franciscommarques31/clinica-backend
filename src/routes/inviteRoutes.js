const express = require("express");
const router = express.Router();
const Invite = require("../models/Invite");

// CRIAR CONVITE E ENVIAR EMAIL
router.post("/", async (req, res) => {
  try {
    const token = Math.random().toString(36).substring(2)

    const invite = new Invite({
      email: req.body.email,
      token
    })

    await invite.save()

    const link = `https://clinica-frontend-swart.vercel.app/register/${token}`

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: "Clínica São Francisco", email: process.env.EMAIL_USER },
        to: [{ email: req.body.email }],
        subject: "Convite para a Clínica Dentária de São Francisco",
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #0192bc;">Clínica Dentária de São Francisco</h2>
            <p>Foi criada uma conta para si na nossa clínica.</p>
            <p>Clique no botão abaixo para definir a sua password e aceder à sua área de paciente:</p>
            <a href="${link}" style="
              display: inline-block;
              background: #0192bc;
              color: #fff;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              margin: 16px 0;
            ">Ativar conta</a>
            <p style="color: #888; font-size: 12px;">Se não esperava este email ignore-o.</p>
          </div>
        `
      })
    })

    res.json(invite)
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    res.status(500).json({ message: "Erro ao criar convite" })
  }
})

// LISTAR CONVITES
router.get("/", async (req, res) => {
  const invites = await Invite.find()
  res.json(invites)
})

// APAGAR CONVITE
router.delete("/:id", async (req, res) => {
  await Invite.findByIdAndDelete(req.params.id)
  res.json({ message: "Convite apagado" })
})

module.exports = router