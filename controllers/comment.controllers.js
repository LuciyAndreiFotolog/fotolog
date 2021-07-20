const Comment = require('../models/comment.model');
const User = require("../models/user.model");
const Log = require("../models/log.model");

module.exports.newComment = (req, res, next) => {
  const { logid: logId } = req.params;
  const userId = req.user._id;
  const log = { ...req.body, logId, userId }
  console.log(req.session)
  Comment.create(log)
    .then(() => {
      res.redirect(`/logs/${logId}`)
    })
    .catch(next)
};

module.exports.deleteComment = (req, res, next) => {

};