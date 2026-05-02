const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  photo: { type: String },
  role: { type: String, required: true } // medico ou assistente
});

module.exports = mongoose.model("Staff", StaffSchema);