const User = require('../models/user.model');
const mongoose = require('mongoose');
const Log = require('../models/log.model');

module.exports.search = (req, res, next) => {
  const { search } = req.query;
  console.log(req.query)
  User.findOne({ username: { $regex : new RegExp(search, "i") } } )
    .populate({path: 'logs', options: { sort: { 'createdAt': -1 } } })
    .then((user) => {
      res.render('profile', { user:user })
    })
    .catch(next)
}

module.exports.feed = (req, res, next) => {
  Log.find({})
    .sort({'createdAt': -1})
    .then((logs) => {
      res.render('home', { logs:logs })
    })
    .catch(next)
}