const { Payment } = require("../models");

module.exports = {
  async create(req, res) {
    try {
      const payment = await Payment.create(req.body);
      res.json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async get(req, res) {
    try {
      const payment = await Payment.findByPk(req.params.id);
      res.json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async update(req, res) {
    try {
      const payment = await Payment.findByPk(req.params.id);
      await payment.update(req.body);
      res.json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
