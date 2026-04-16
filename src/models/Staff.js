const mongoose = require("mongoose");

module.exports = mongoose.model("Staff", {
  name: String,
  specialty: String,
  photo: String
});