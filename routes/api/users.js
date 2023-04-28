const express = require('express');
const router = express.Router();
const User = require('../../model/userModel');

// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users
router.post('/', async (req, res) => {
  const { name, email, password, user_type } = req.body;

  if (!name) {
    return res.status(400).send('Name field is required');
  }

  if (!email) {
    return res.status(400).send('Email field is required');
  }

  if (!isValidEmail(email)) {
    return res.status(400).send('Email field must be a valid email address');
  }

  try {
    const user = new User({ name, email, password, user_type });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function isValidEmail(email) {
  // Very basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = router;

