const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');

router.get('/product/search', productController.search);
router.get('/product/:id', productController.getById);
router.post('/product', authenticateToken, productController.create);
router.put('/product/:id', authenticateToken, productController.update);
router.delete('/product/:id', authenticateToken, productController.delete);

module.exports = router;
