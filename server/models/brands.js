const mongoose = require("mongoose");

const brands = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
  },
});

module.exports = mongoose.model("Brands", brands);
