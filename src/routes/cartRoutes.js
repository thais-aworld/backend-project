
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, cartController.addItem);
router.get('/:userId', authMiddleware, cartController.getCart);

module.exports = router;
