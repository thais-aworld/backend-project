const productService = require('../services/productService');

exports.searchProducts = async (req, res) => {
  try {
    const result = await productService.searchProducts(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    await productService.createProduct(req.body);
    res.status(201).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'ProductNotFound') return res.status(404).json({ message: 'Product not found' });
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'ProductNotFound') return res.status(404).json({ message: 'Product not found' });
    res.status(400).json({ message: error.message });
  }
};
