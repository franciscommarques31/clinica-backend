const mongoose = require("mongoose");

const AppointmentRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,

  appointmentDate: Date,

  appointmentTime: String,

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
});

module.exports = mongoose.model(
  "AppointmentRequest",
  AppointmentRequestSchema
);