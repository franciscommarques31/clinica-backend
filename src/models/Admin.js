const mongoose = require("mongoose");

module.exports = mongoose.model("Admin", {
  email: String,
  password: String
});