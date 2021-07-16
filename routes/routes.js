const router = require('express').Router();
const usersRoutes = require('./user.routes');
const logsRoutes = require('./logs.routes')

// Home page
router.get('/', (req, res, next) => {
  console.log(res.locals.currentUser)
  res.render('home')
});

// User's routes
router.use('/users', usersRoutes)

// Logs' routes
router.use('/logs', logsRoutes)

module.exports = router