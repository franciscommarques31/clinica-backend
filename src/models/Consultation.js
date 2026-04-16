const mongoose = require("mongoose");

module.exports = mongoose.model("Consultation", {
  patientId: String,
  date: Date,
  description: String,
  status: String
});