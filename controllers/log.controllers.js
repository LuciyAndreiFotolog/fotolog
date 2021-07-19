const User = require("../models/user.model");
const Log = require("../models/log.model");

module.exports.viewLog = (req, res, next) => {
  const { id } = req.params;
  Log.findById(id).then((log) => {
    res.render("detail", { log: log });
  });
};

module.exports.create = (req, res, next) => {
  res.render("new-log");
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
      res.render("new-log");
    });
};


