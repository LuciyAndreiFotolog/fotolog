const User = require('../models/user.model');
const mongoose = require('mongoose');
const Log = require('../models/log.model');
const paginate = require('express-paginate');

module.exports.search = (req, res, next) => {
  const { search } = req.query;
  User.findOne({ username: { $regex : new RegExp(search, "i") } } )
    .populate({path: 'logs', options: { sort: { 'createdAt': -1 } } })
    .then((user) => {
      res.render('profile', { user:user })
    })
    .catch(next)
};

module.exports.paginatedFeed = async (req, res, next) => {

  try {
 
    const [ results, itemCount ] = await Promise.all([
      Log.find({}).limit(req.query.limit).sort({'createdAt': -1}).skip(req.skip).lean().exec(),
      Log.count({})
    ]);
    
    const pageCount = Math.ceil(itemCount / req.query.limit);
    const pages = paginate.getArrayPages(req)(3, pageCount, req.query.page);
    const previous = req.query.page != 1 ? pages[0] : undefined;
    const next = pages[pages.length - 1].page === req.query.page ? undefined : pages[pages.length -1];

        res.render('home', {
        logs: results,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(5, pageCount, req.query.page),
        next: next,
        previous: previous 
      });
 
  } catch (err) {
    next(err);
  }
};