
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', productController.getAll);
router.post('/', authMiddleware, productController.create);

module.exports = router;
