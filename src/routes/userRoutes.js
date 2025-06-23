const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

router.get('/user/:id', userController.getById);
router.post('/user', userController.create);
router.put('/user/:id', authenticateToken, userController.update);
router.delete('/user/:id', authenticateToken, userController.delete);
router.post('/user/token', userController.generateToken);

module.exports = router;
