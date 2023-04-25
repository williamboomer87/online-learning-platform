const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

class Payment extends Model {}

Payment.init(
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "payment",
  }
);

module.exports = Payment;
