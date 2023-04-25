const { Question } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const question = await Question.create(req.body);
      res.json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async get(req, res) {
    try {
      const question = await Question.findByPk(req.params.id);
      res.json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async update(req, res) {
    try {
      const question = await Question.findByPk(req.params.id);
      await question.update(req.body);
      res.json(question);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async delete(req, res) {
    try {
      const question = await Question.findByPk(req.params.id);
      await question.destroy();
      res.json({ message: "Question deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
