const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/product/search', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/product', auth, productController.createProduct);
router.put('/product/:id', auth, productController.updateProduct);
router.delete('/product/:id', auth, productController.deleteProduct);

module.exports = router;
