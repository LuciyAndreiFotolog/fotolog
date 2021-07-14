const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controllers')

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

// Register
router.get('/register', authController.register);
router.post('/register', authController.doRegister);

// Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/authenticate/google/callback', authController.googleLogin);

router.get('/auth/facebook', passport.authenticate('facebook-auth'));
router.get('/auth/facebook/callback', authController.facebookLogin)

// Logout
router.post('/logout', authController.logout)


module.exports = router;