module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.user) {
    res.redirect('/feed');
  } else {
    next();
  }
}