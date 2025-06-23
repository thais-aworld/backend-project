const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const userService = require('../services/userService');
require('dotenv').config();

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    if (!firstname || !surname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso', id: user.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.generateToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await userService.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar token' });
  }
};
