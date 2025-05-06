const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

// Autentikasi
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

// Endpoint terproteksi
router.get('/me', AuthMiddleware.authenticate, AuthController.getCurrentUser);

module.exports = router;