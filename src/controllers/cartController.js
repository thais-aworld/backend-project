
const { Cart, Product } = require('../models');

exports.addItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  const cartItem = await Cart.create({ userId, productId, quantity });
  res.status(201).json(cartItem);
};

exports.getCart = async (req, res) => {
  const userId = req.params.userId;

  const cart = await Cart.findAll({
    where: { userId },
    include: [Product]
  });

  res.json(cart);
};
