module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.user) {
    res.redirect(`/users/${req.user._id}`);
  } else {
    next();
  }
}