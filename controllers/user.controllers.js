const User = require('../models/user.model');
const Log = require('../models/log.model')

module.exports.profile = (req, res, next) => {
  let id;
  if (req.params.id === "me") {
     if (!req.user) { 
       res.redirect("/users/login");
       return;
     } else {
       id = req.user._id;
     }
  } else {
     id = req.params.id;
  }

  User.findById(id)
    .populate({path: 'logs', options: { sort: { 'createdAt': -1 } } })
    .then((user) => {
      res.render('profile', {user: user, isCurrentUser: user._id.toString() === req.user._id.toString()})
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
      res.redirect(`/users/${id}`)
    })
    .catch(next)
}

