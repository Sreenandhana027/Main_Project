const mongoose = require("mongoose");

const aptitudeSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options:  { type: [String], required: true },
  answer:   { type: String, required: true },
  category: { type: String, enum: ["quant", "logical", "verbal"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("AptitudeQuestion", aptitudeSchema);