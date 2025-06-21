const Category = require('../models/Category');
const { Op } = require('sequelize');

async function getAllCategories(query) {
  const limit = parseInt(query.limit) || 12;
  const page = parseInt(query.page) || 1;
  const offset = (page - 1) * limit;

  const where = {};

  if (query.use_in_menu) {
    where.use_in_menu = query.use_in_menu === 'true';
  }

  const attributes = query.fields ? query.fields.split(',') : undefined;

  const options = {
    where,
    attributes,
    limit: limit === -1 ? undefined : limit,
    offset: limit === -1 ? undefined : offset
  };

  const { count, rows } = await Category.findAndCountAll(options);

  return {
    data: rows,
    total: count,
    limit,
    page
  };
}

async function getCategoryById(id) {
  return await Category.findByPk(id);
}

async function createCategory(data) {
  return await Category.create(data);
}

async function updateCategory(id, data) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('CategoryNotFound');
  await category.update(data);
}

async function deleteCategory(id) {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('CategoryNotFound');
  await category.destroy();
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
