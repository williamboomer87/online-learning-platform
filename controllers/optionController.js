const { Option } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const option = await Option.create(req.body);
      res.json(option);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async update(req, res) {
    try {
      const option = await Option.findByPk(req.params.id);
      await option.update(req.body);
      res.json(option);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async delete(req, res) {
    try {
      const option = await Option.findByPk(req.params.id);
      await option.destroy();
      res.json({ message: 'Option deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
