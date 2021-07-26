const Comment = require('../models/comment.model');
const User = require("../models/user.model");
const Log = require("../models/log.model");

module.exports.newComment = (req, res, next) => {
  const { logid: logId } = req.params;
  const userId = req.user._id;
  const username = req.user.username;
  const log = { ...req.body, logId, userId, username };
  
  Comment.create(log)
    .then(() => {
      res.redirect(`/logs/${logId}`)
    })
    .catch(next)
};

module.exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((c) => {
      res.redirect(`/logs/${c.logId}`)
    })
    .catch(next)
};