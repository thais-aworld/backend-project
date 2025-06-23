const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.get('/category/search', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category', auth, categoryController.createCategory);
router.put('/category/:id', auth, categoryController.updateCategory);
router.delete('/category/:id', auth, categoryController.deleteCategory);

module.exports = router;

