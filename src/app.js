const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/v1', userRoutes);
app.use('/v1', categoryRoutes);
app.use('/v1', productRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Ecommerce Project rodando 🚀' });
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno no servidor' });
});

module.exports = app;
