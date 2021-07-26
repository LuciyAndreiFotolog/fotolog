const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controllers');
const usersController = require('../controllers/user.controllers');
const upload = require('../config/storage.config');
const authMiddleware = require('../middlewares/auth.middleware')

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

// Register
router.get('/register', authMiddleware.isNotAuthenticated, authController.register);
router.post('/register', authMiddleware.isNotAuthenticated, authController.doRegister);

// Login
router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/authenticate/google/callback', authController.googleLogin);

router.get('/auth/facebook', passport.authenticate('facebook-auth'));
router.get('/auth/facebook/callback', authController.facebookLogin);

// Logout
router.post('/logout', authController.logout);

// Profile

router.get('/:id/edit-profile', authMiddleware.isAuthenticated, usersController.editProfile);
router.post('/:id/edit-profile', authMiddleware.isAuthenticated,  upload.single('image'), usersController.doEditProfile);
router.get('/:id/configuration', authController.changePassword);
router.post('/:id/configuration', authController.doChangePassword)
router.get('/:id', usersController.profile);

module.exports = router;