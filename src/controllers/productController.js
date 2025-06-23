const { Product, Category, ProductImage, ProductOption } = require('../models');
const { Op } = require('sequelize');

exports.getAllProducts = async (req, res) => {
  try {
    const { limit = 12, page = 1, fields, match, category_ids, price_range } = req.query;
    const where = {};

    if (match) {
      where[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } },
      ];
    }

    if (price_range) {
      const [min, max] = price_range.split('-').map(Number);
      where.price = { [Op.between]: [min, max] };
    }

    const include = [
      { model: ProductImage, as: 'images' },
      { model: ProductOption, as: 'options' },
      { model: Category, as: 'categories', attributes: ['id'], through: { attributes: [] } },
    ];

    const products = await Product.findAndCountAll({
      where,
      include,
      limit: limit == -1 ? null : parseInt(limit),
      offset: limit == -1 ? null : (parseInt(page) - 1) * parseInt(limit),
    });

    res.status(200).json({
      data: products.rows,
      total: products.count,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: ProductImage, as: 'images' },
        { model: ProductOption, as: 'options' },
        { model: Category, as: 'categories', attributes: ['id'], through: { attributes: [] } },
      ],
    });

    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar produto', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    } = req.body;

    const newProduct = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
    });

    if (category_ids) await newProduct.setCategories(category_ids);

    if (images) {
      for (const img of images) {
        await ProductImage.create({
          product_id: newProduct.id,
          enabled: true,
          path: 'uploads/fake/' + Date.now() + '.png', 
        });
      }
    }

    if (options) {
      for (const opt of options) {
        await ProductOption.create({
          product_id: newProduct.id,
          title: opt.title,
          shape: opt.shape || 'square',
          radius: opt.radius || 0,
          type: opt.type || 'text',
          values: opt.values.join(','),
        });
      }
    }

    res.status(201).json({ message: 'Produto criado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar produto', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: ['images', 'options', 'categories'],
    });

    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      category_ids,
      images,
      options,
    } = req.body;

    await product.update({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
    });

    if (category_ids) await product.setCategories(category_ids);

    if (images) {
      for (const img of images) {
        if (img.deleted && img.id) {
          await ProductImage.destroy({ where: { id: img.id } });
        } else if (img.id) {
          await ProductImage.update(
            { path: img.content || img.path },
            { where: { id: img.id } }
          );
        } else {
          await ProductImage.create({
            product_id: product.id,
            enabled: true,
            path: 'uploads/fake/' + Date.now() + '.png',
          });
        }
      }
    }

    if (options) {
      for (const opt of options) {
        if (opt.deleted && opt.id) {
          await ProductOption.destroy({ where: { id: opt.id } });
        } else if (opt.id) {
          await ProductOption.update(
            {
              title: opt.title,
              shape: opt.shape,
              radius: opt.radius,
              type: opt.type,
              values: opt.values.join(','),
            },
            { where: { id: opt.id } }
          );
        } else {
          await ProductOption.create({
            product_id: product.id,
            title: opt.title,
            shape: opt.shape || 'square',
            radius: opt.radius || 0,
            type: opt.type || 'text',
            values: opt.values.join(','),
          });
        }
      }
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar produto', error: error.message });
  }
};
