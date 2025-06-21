
const { Product } = require('../models');

exports.getAll = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};
