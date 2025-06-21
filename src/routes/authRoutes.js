const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/v1/user/token', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
});

module.exports = router;
