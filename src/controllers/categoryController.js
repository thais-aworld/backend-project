const categoryService = require('../services/categoryService');

exports.searchCategories = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    await categoryService.createCategory(req.body);
    res.status(201).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    await categoryService.updateCategory(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'CategoryNotFound') return res.status(404).json({ message: 'Category not found' });
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'CategoryNotFound') return res.status(404).json({ message: 'Category not found' });
    res.status(400).json({ message: error.message });
  }
};
