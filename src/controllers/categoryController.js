const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields, use_in_menu } = req.query;

    const where = {};
    if (use_in_menu) where.use_in_menu = use_in_menu === 'true';

    const selectedFields = fields ? fields.split(',') : undefined;

    const categories = await Category.findAndCountAll({
      where,
      attributes: selectedFields,
      limit: limit == -1 ? null : parseInt(limit),
      offset: limit == -1 ? null : (parseInt(page) - 1) * parseInt(limit),
    });

    res.status(200).json({
      data: categories.rows,
      total: categories.count,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar categorias', error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar categoria', error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, slug, use_in_menu } = req.body;
    await Category.create({ name, slug, use_in_menu });
    res.status(201).json({ message: 'Categoria criada com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar categoria', error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });

    const { name, slug, use_in_menu } = req.body;
    await category.update({ name, slug, use_in_menu });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar categoria', error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });

    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar categoria', error: error.message });
  }
};
