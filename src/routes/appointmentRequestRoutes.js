const router = require("express").Router();
const Model = require("../models/AppointmentRequest");

router.post("/", async (req, res) => {
  res.json(await new Model(req.body).save());
});

router.get("/", async (req, res) => {
  res.json(await Model.find());
});

module.exports = router;