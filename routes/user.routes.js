const router = require('express').Router();
const authController = require('../controllers/auth.controllers')

// Register
router.get('/register', authController.register);
router.post('/register', authController.doRegister);

// Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

module.exports = router;