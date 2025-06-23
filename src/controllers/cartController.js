const { Cart, Product } = require('../models');

exports.addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId e quantity são obrigatórios' });
    }

    const existingItem = await Cart.findOne({ where: { userId, productId } });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const cartItem = await Cart.create({ userId, productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Erro em addItem:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'userId é obrigatório' });
    }

    const cart = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }]
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error('Erro em getCart:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
