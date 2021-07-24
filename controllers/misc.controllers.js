const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.search = (req, res, next) => {
  const { search } = req.query;
  console.log(req.query)
  User.findOne({ username: search })
    .populate({path: 'logs', options: { sort: { 'createdAt': -1 } } })
    .then((user) => {
      res.render('profile', { user:user })
    })
    .catch(next)
}