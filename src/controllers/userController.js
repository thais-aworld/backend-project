const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');
require('dotenv').config();

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ id: user.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await userService.updateUser(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'UserNotFound') return res.status(404).json({ message: 'User not found' });
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'UserNotFound') return res.status(404).json({ message: 'User not found' });
    res.status(400).json({ message: error.message });
  }
};

exports.generateToken = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
