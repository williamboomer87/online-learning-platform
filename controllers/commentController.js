const { Comment } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const comment = await Comment.create(req.body);
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async update(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      await comment.update(req.body);
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async delete(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      await comment.destroy();
      res.json({ message: "Comment deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
