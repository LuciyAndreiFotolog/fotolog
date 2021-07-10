const router = require('express').Router();

// Home page
router.get('/', (req, res, next) => {
  res.render('home')
});

// User's routes

// Logs' routes

module.exports = router