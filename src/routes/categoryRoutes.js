const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateToken = require('../middleware/auth');

router.get('/category/search', categoryController.search);
router.get('/category/:id', categoryController.getById);
router.post('/category', authenticateToken, categoryController.create);
router.put('/category/:id', authenticateToken, categoryController.update);
router.delete('/category/:id', authenticateToken, categoryController.delete);

module.exports = router;

