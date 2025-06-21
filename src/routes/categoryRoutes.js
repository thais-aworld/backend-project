const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.get('/v1/category/search', categoryController.searchCategories);

router.get('/v1/category/:id', categoryController.getCategoryById);

router.post('/v1/category', auth, categoryController.createCategory);

router.put('/v1/category/:id', auth, categoryController.updateCategory);

router.delete('/v1/category/:id', auth, categoryController.deleteCategory);

module.exports = router;

