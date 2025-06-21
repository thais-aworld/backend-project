const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/v1/product/search', productController.searchProducts);

router.get('/v1/product/:id', productController.getProductById);

router.post('/v1/product', auth, productController.createProduct);

router.put('/v1/product/:id', auth, productController.updateProduct);

router.delete('/v1/product/:id', auth, productController.deleteProduct);

module.exports = router;
