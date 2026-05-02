const router = require("express").Router();
const Staff = require("../models/Staff");
const auth = require("../middleware/authMiddleware");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;



// CONFIG CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// STORAGE
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "clinica-staff",
      format: "jpg"
    };
  }
});

const upload = multer({ storage });

// 🔓 PÚBLICO
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    console.error("ERRO GET STAFF:", err.message);
    console.error(err.stack);
    res.status(500).json({ message: "Erro ao buscar staff" });
  }
});

// 🔒 ADMIN (COM IMAGEM)
router.post("/", auth, upload.single("photo"), async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const novo = new Staff({
      name: req.body?.name || "",
      specialty: req.body?.specialty || "",
      role: req.body?.role || "medico",
      photo: req.file ? req.file.path : ""
    });

    const saved = await novo.save();
    res.json(saved);

  } catch (err) {
    console.error("ERRO CREATE STAFF:", err.message);
    console.error(err.stack);
    res.status(500).json({ message: "Erro ao criar staff" });
  }
});

// 🔒 ADMIN
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("ERRO UPDATE STAFF:", err.message);
    console.error(err.stack);
    res.status(500).json({ message: "Erro ao atualizar staff" });
  }
});

// 🔒 ADMIN
router.delete("/:id", auth, async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "apagado" });
  } catch (err) {
    console.error("ERRO DELETE STAFF:", err.message);
    console.error(err.stack);
    res.status(500).json({ message: "Erro ao apagar staff" });
  }
});

module.exports = router;