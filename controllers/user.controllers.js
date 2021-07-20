const User = require('../models/user.model');
const Log = require('../models/log.model')

module.exports.profile = (req, res, next) => {
  Log.find({owner: req.user._id})
    .then((logs) => {
      res.render('profile', {logs: logs})
    })
};

module.exports.editProfile = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render('edit-profile', user)
    })
    .catch(next)
};

module.exports.doEditProfile = (req, res, next) => {
  const { id } = req.params;
  if(req.file) {
    req.body.avatar = req.file.path;
  }
  
  User.findByIdAndUpdate(id, req.body, {new: true})
    .then((user) => {
      res.redirect(`/users/auth/${id}`)
    })
    .catch(next)
}

