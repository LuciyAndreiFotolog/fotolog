// module.exports.isAuthenticated = (req, res, next)  => {
//   if (req.session.currentUser) {
//     next();
//   } else {
//     res.redirect('/users/login')
//   }
// }

// module.exports.isNotAuthenticated = (req, res, next) => {
//   if (req.session.currentUser) {
//     res.redirect('/auth/:id')
//   } else {
//     next();
//   }

// }

module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/auth/:id');
  } else {
    next();
  }
}