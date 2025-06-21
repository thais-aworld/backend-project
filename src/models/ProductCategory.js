const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('/Product');
const Category = require('/Category');

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Product, key: 'id' }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Category, key: 'id' }
  }
}, {
  timestamps: true,
  tableName: 'product_categories'
});

Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: 'product_id',
  otherKey: 'category_id'
});

Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: 'category_id',
  otherKey: 'product_id'
});

module.exports = ProductCategory;
