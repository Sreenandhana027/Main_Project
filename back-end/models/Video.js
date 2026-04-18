const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  channel: String,
  views: String,
  time: String,
  youtubeId: { type: String, required: true, unique: true }


}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);
