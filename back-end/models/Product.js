

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  discount: { type: Number, default: 0 },
  offers: { type: String, default: "" },
});

module.exports = mongoose.model("Product", productSchema);
