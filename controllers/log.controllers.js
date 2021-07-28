const User = require("../models/user.model");
const Log = require("../models/log.model");

module.exports.viewLog = (req, res, next) => {
  const { id } = req.params;
  Log.findById(id)
    .populate('comments')
    .then((log) => {
      console.log(req.user)
      const copiedLog = log.toJSON();
      
      copiedLog.comments.map((comment) => {
        comment.isCurrentUser = comment.userId.toString() === req.user._id.toString(); 
        return comment
      })
      res.render("detail", { log: copiedLog, isCurrentUser: log.owner.toString() === req.user._id.toString()});
    })
    .catch(next)
};

module.exports.create = (req, res, next) => {
  res.render("newLog");
};

module.exports.doCreate = (req, res, next) => {
  req.body.owner = req.user._id;

  if (req.file) {
    req.body.image = req.file.path;
  }

  if (req.body.tags) {
    req.body.tags = req.body.tags.split(",").map((tag) => tag.trim());
  }

  Log.create(req.body)
    .then(() => {
      res.redirect(`/users/${req.user._id}`);
    })
    .catch(() => {
      res.render("newLog");
    });
};

module.exports.edit = (req, res, next) => {
  Log.findById(req.params.id)
    .then((log) => {
      res.render('editLog', log)
    })
    .catch(next)
};

module.exports.doEdit = (req, res, next) => {
  const { id } = req.params;
  req.body.owner = req.user._id;

  if (req.file) {
    req.body.image = req.file.path;
  }

  Log.findByIdAndUpdate(id, req.body)
    .then((log) => {
      res.redirect(`/logs/${id}`)
    })
    .catch(next)
}

module.exports.doDelete = (req, res, next) => {
  Log.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect(`/users/${req.user._id}`)
    })
    .catch(next)
}


