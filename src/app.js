
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('./models');

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/users', userRoutes);
app.use('/login', authRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('API Ecommerce rodando');
});

module.exports = app;
