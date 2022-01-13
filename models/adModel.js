const mongoose = require("mongoose");

const adSchema = {
  name: String,
  description: String,
  image: String,
  screens: String,
};

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
