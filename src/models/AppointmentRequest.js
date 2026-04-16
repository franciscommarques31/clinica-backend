const mongoose = require("mongoose");

module.exports = mongoose.model("AppointmentRequest", {
  name: String,
  email: String,
  phone: String,
  message: String
});