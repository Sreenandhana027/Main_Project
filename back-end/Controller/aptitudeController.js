const AptitudeQuestion = require("../models/AptitudeQuestion");

// GET ALL (optional ?category=quant filter)
exports.getQuestions = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const questions = await AptitudeQuestion.find(filter);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD QUESTION
exports.addQuestion = async (req, res) => {
  try {
    const { question, options, answer, category } = req.body;
    const newQuestion = new AptitudeQuestion({ question, options, answer, category });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE QUESTION
exports.updateQuestion = async (req, res) => {
  try {
    const updated = await AptitudeQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE QUESTION
exports.deleteQuestion = async (req, res) => {
  try {
    await AptitudeQuestion.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};