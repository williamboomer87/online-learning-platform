const { Discussion } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const discussion = await Discussion.create(req.body);
      res.json(discussion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async get(req, res) {
    try {
      const discussion = await Discussion.findByPk(req.params.id);
      res.json(discussion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async update(req, res) {
    try {
      const discussion = await Discussion.findByPk(req.params.id);
      await discussion.update(req.body);
      res.json(discussion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async delete(req, res) {
    try {
      const discussion = await Discussion.findByPk(req.params.id);
      await discussion.destroy();
      res.json({ message: "Discussion deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
