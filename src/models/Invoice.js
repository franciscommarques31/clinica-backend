const mongoose = require("mongoose");

module.exports = mongoose.model("Invoice", {
  patientId: String,
  file: String,
  createdAt: { type: Date, default: Date.now }
});