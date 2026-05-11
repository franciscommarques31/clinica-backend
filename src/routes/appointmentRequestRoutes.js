const router = require("express").Router();
const Model = require("../models/AppointmentRequest");

router.post("/", async (req, res) => {
  res.json(await new Model(req.body).save());
});

router.get("/", async (req, res) => {
  res.json(await Model.find());
});

router.delete("/:id", async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Erro ao apagar pedido" })
  }
})

module.exports = router;