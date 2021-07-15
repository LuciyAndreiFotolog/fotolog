const User = require('../models/user.model');

module.exports.profile = (req, res, next) => {
  res.render('profile')
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
  User.findByIdAndUpdate(id, req.body, {new: true})
    .then(() => {
      res.redirect(`/users/${id}`)
    })
    .catch(next)
}