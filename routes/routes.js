const router = require('express').Router();
const usersRoutes = require('./user.routes');
const logsRoutes = require('./logs.routes');
const miscController = require('../controllers/misc.controllers');
const authMiddleware = require('../middlewares/auth.middleware')

// Home page 
router.get('/', authMiddleware.isNotAuthenticated, (req, res, next) => {
  res.render('preHome')
});

router.get('/feed', authMiddleware.isAuthenticated, miscController.paginatedFeed)

// Search 
router.get('/search', miscController.search)

// User's routes
router.use('/users', usersRoutes);

// Logs' routes
router.use('/logs', logsRoutes);


module.exports = router;