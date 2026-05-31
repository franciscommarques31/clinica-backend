const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  registado: { type: Boolean, default: false }
});

module.exports = mongoose.model("Patient", patientSchema);