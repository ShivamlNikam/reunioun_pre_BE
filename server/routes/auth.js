const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'key';
const router = express.Router();

// Signup endpoint
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate the email and password
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    // Create a new user
    const user = new User({
      email,
      password: await bcrypt.hash(password, 10),
    });
    // Save the user to the database
    await user.save();
    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, secret);
    // Send the token to the user in the response
    res.setHeader('Authorization', 'Bearer ' + token);
    res.send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Internal Server Error');
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate the email and password
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }
    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, secret);
    // Send the token to the user in the response
    res.setHeader('Authorization', 'Bearer ' + token);
    res.send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
