const Video = require("../models/Video");

// ADD VIDEO*
// *postman success


exports.addVideo = async (req, res) => {
    try {
        const { title, channel, views, time, youtubeId } = req.body;

        const existing = await Video.findOne({ youtubeId });
        if (existing) {
            return res.status(400).json("Video already exists");
        }

        const newVideo = new Video({
            title,
            channel,
            views,
            time,
            youtubeId
        });

        await newVideo.save();
        res.status(200).json(newVideo);

    } catch (err) {
        res.status(500).json(err.message);
    }
};
// *post man successfull
// GET ALL VIDEOS
exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json(err.message);
    }
};
// *post man success
// DELETE VIDEO
exports.deleteVideo = async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("Video deleted");
    } catch (err) {
        res.status(500).json(err.message);
    }
};
