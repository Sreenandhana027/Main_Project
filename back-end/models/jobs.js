const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({


  companyName: {
    type: String,
    required: true
  },
  companyEmail: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  salary: {
    type: String,
    required: true
  },

  experience: {
    type: String
  },

  type: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Active"
  }

}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
