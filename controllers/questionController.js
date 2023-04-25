const { Question } = require("../models");

async function createQuestion(req, res) {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getQuestion(req, res) {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateQuestion(req, res) {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      await question.update(req.body);
      res.json(question);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteQuestion(req, res) {
  try {
    const question = await Question.findByPk(req.params.id);
    if (question) {
      await question.destroy();
      res.json({ message: "Question deleted successfully" });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
