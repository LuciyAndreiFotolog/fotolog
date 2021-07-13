const router = require('express').Router();
const usersRoutes = require('./user.routes')

// Home page
router.get('/', (req, res, next) => {
  res.render('home')
});

// User's routes
router.use('/users', usersRoutes)
// Logs' routes

module.exports = router