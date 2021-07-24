const router = require('express').Router();
const usersRoutes = require('./user.routes');
const logsRoutes = require('./logs.routes');
const miscController = require('../controllers/misc.controllers');

// Home page
router.get('/', (req, res, next) => {
  res.render('home')
});

// Search 
router.get('/search', miscController.search)

// User's routes
router.use('/users', usersRoutes);

// Logs' routes
router.use('/logs', logsRoutes);


module.exports = router;