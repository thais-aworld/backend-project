
const sequelize = require('../config/database');
const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Cart = require('./cart');

sequelize.sync({ alter: true });

module.exports = { User, Product, Category, Cart };
