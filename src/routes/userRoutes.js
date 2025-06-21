const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/v1/user/:id', userController.getUserById);

router.post('/v1/user', userController.createUser);

router.post('/v1/user/token', userController.generateToken);

router.put('/v1/user/:id', auth, userController.updateUser);

router.delete('/v1/user/:id', auth, userController.deleteUser);

module.exports = router;
