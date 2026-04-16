const router = require("express").Router();
const Consultation = require("../models/Consultation");

router.post("/", async (req, res) => {
  res.json(await new Consultation(req.body).save());
});

router.get("/patient/:id", async (req, res) => {
  res.json(await Consultation.find({ patientId: req.params.id }));
});

module.exports = router;