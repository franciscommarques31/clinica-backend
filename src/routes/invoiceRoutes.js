const router = require("express").Router();
const Invoice = require("../models/Invoice");

router.post("/", async (req, res) => {
  res.json(await new Invoice(req.body).save());
});

router.get("/patient/:id", async (req, res) => {
  res.json(await Invoice.find({ patientId: req.params.id }));
});

module.exports = router;