const router = require("express").Router();
const Staff = require("../models/Staff");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  res.json(await Staff.find());
});

router.post("/", auth, async (req, res) => {
  res.json(await new Staff(req.body).save());
});

router.put("/:id", auth, async (req, res) => {
  res.json(await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", auth, async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ msg: "apagado" });
});

module.exports = router;