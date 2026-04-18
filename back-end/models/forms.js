const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    companyEmail: {
      type: String,
      required: true
    },

    companyName: {
      type: String,
      required: true
    },
    usermail: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    location: {
      type: String
    },

    portfolio: {
      type: String
    },

    coverletter: {
      type: String
    },

    resume: [
      {
        type: String
      }
    ],

    status: {
      type: String,
      enum: ["Pending", "Selected", "Rejected"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);