const router = require("express").Router();
const Model = require("../models/AppointmentRequest");

router.get("/available-slots/:date", async (req, res) => {
  try {

    const selectedDate = req.params.date;

    // Horários possíveis da clínica
    const allSlots = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "14:00",
      "15:00",
      "16:00"
    ];

    // Buscar pedidos já existentes
    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    const requests = await Model.find({
      appointmentDate: {
        $gte: start,
        $lte: end
      },

      status: {
        $in: ["pending", "confirmed"]
      }
    });

    // Horas ocupadas
    const occupiedSlots = requests
      .map((r) => r.appointmentTime)
      .filter(Boolean);

    // Horas livres
    const availableSlots = allSlots.filter(
      (slot) => !occupiedSlots.includes(slot)
    );

    res.json(availableSlots);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Erro ao buscar horários"
    });
  }
});


// CRIAR PEDIDO
router.post("/", async (req, res) => {
  try {

    const created = await new Model(req.body).save();

    res.json(created);

  } catch (err) {

    res.status(500).json({
      message: "Erro ao criar pedido"
    });
  }
});


// LISTAR PEDIDOS
router.get("/", async (req, res) => {
  try {

    const data = await Model.find().sort({
      createdAt: -1
    });

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: "Erro ao buscar pedidos"
    });
  }
});


// APAGAR PEDIDO
router.delete("/:id", async (req, res) => {
  try {

    await Model.findByIdAndDelete(req.params.id);

    res.json({
      success: true
    });

  } catch (err) {

    res.status(500).json({
      error: "Erro ao apagar pedido"
    });
  }
});


// CONFIRMAR PEDIDO
router.put("/:id/confirm", async (req, res) => {
  try {

    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      {
        status: "confirmed"
      },
      {
        new: true
      }
    );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: "Erro ao confirmar pedido"
    });
  }
});


// CANCELAR PEDIDO
router.put("/:id/cancel", async (req, res) => {
  try {

    const updated = await Model.findByIdAndUpdate(
      req.params.id,
      {
        status: "cancelled"
      },
      {
        new: true
      }
    );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: "Erro ao cancelar pedido"
    });
  }
});

module.exports = router;