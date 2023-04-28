const mongoose = require('mongoose');
const db = require('../config/db');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  user_type: { type: Number, default: 1 },
});

const User = db.model('User', userSchema);

module.exports = User;
