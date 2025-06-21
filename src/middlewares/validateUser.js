const validateUser = (req, res, next) => {
  const { firstname, surname, email, password, confirmPassword } = req.body;

  if (!firstname || !surname || !email) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  if (req.method === 'POST') {
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Senha e confirmação são obrigatórios' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Senha e confirmação não coincidem' });
    }
  }
  
  next();
};

module.exports = validateUser;
