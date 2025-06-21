const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImage = require('../models/ProductImage');
const ProductOption = require('../models/ProductOption');
const ProductCategory = require('../models/ProductCategory');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

async function searchProducts(query) {
  const limit = parseInt(query.limit) || 12;
  const page = parseInt(query.page) || 1;
  const offset = (page - 1) * limit;

  const where = {};
  const include = [];

  if (query.match) {
    where[Op.or] = [
      { name: { [Op.like]: `%${query.match}%` } },
      { description: { [Op.like]: `%${query.match}%` } }
    ];
  }

  if (query.category_ids) {
    const ids = query.category_ids.split(',').map(Number);
    include.push({
      model: Category,
      as: 'categories',
      where: { id: ids }
    });
  }

  const { count, rows } = await Product.findAndCountAll({
    where,
    limit: limit === -1 ? undefined : limit,
    offset: limit === -1 ? undefined : offset,
    include: [
      { model: ProductImage, as: 'images' },
      { model: ProductOption, as: 'options' },
      ...include
    ]
  });

  return {
    data: rows,
    total: count,
    limit,
    page
  };
}

async function getProductById(id) {
  return await Product.findByPk(id, {
    include: [
      { model: ProductImage, as: 'images' },
      { model: ProductOption, as: 'options' },
      { model: Category, as: 'categories' }
    ]
  });
}

async function createProduct(data) {
  const { categories, images, options, ...productData } = data;
  const product = await Product.create(productData);

  if (data.category_ids) {
    await product.setCategories(data.category_ids);
  }

  if (images) {
    for (const img of images) {
      await ProductImage.create({ product_id: product.id, path: img.content });
    }
  }

  if (options) {
    for (const opt of options) {
      await ProductOption.create({
        product_id: product.id,
        title: opt.title,
        shape: opt.shape || 'square',
        radius: opt.radius || 0,
        type: opt.type || 'text',
        values: Array.isArray(opt.values) ? opt.values.join(',') : opt.values
      });
    }
  }

  return product;
}

async function updateProduct(id, data) {
  const product = await Product.findByPk(id, {
    include: ['images', 'options']
  });
  if (!product) throw new Error('ProductNotFound');

  const { category_ids, images, options, ...productData } = data;
  await product.update(productData);

  if (category_ids) {
    await product.setCategories(category_ids);
  }

  if (images) {
    for (const img of images) {
      if (img.deleted && img.id) {
        await ProductImage.destroy({ where: { id: img.id, product_id: id } });
      } else if (img.content && !img.id) {
        await ProductImage.create({ product_id: id, path: img.content });
      }
    }
  }

  if (options) {
    for (const opt of options) {
      if (opt.deleted && opt.id) {
        await ProductOption.destroy({ where: { id: opt.id, product_id: id } });
      } else if (opt.id) {
        await ProductOption.update(
          { ...opt, values: Array.isArray(opt.values) ? opt.values.join(',') : opt.values },
          { where: { id: opt.id, product_id: id } }
        );
      } else {
        await ProductOption.create({
          product_id: id,
          title: opt.title,
          shape: opt.shape || 'square',
          radius: opt.radius || 0,
          type: opt.type || 'text',
          values: Array.isArray(opt.values) ? opt.values.join(',') : opt.values
        });
      }
    }
  }
}

async function deleteProduct(id) {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('ProductNotFound');
  await product.destroy();
}

module.exports = {
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
