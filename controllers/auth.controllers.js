const User = require('../models/user.model');
const mongoose = require('mongoose');
const passport = require('passport');
const mailer = require('../config/mailer.config');

module.exports.register = (req, res, next) => {
  res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((newUser) => {
            mailer.sendActivationMail(newUser.email, newUser.activationToken)
            res.redirect('/')
          })
          .catch(e => {
            if (e instanceof mongoose.Error.ValidationError) {
              res.render('auth/register', { user: req.body, errors: e.errors})
            } else {
              next(e)
            }
          })
      } else {
        res.render('auth/register', { user: req.body, errors: {email: 'This email is already registered'} })
      }
    })
    .catch(e => next(e))
};

module.exports.login = (req, res, next) => {
  res.render('auth/login')
};

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render("auth/login", { user: req.body, errorMessage: validations.error })
    } else {
      req.login(user, (loginErr) => {
        if (loginErr) {
          next(loginErr)
        } else {
          res.redirect('/users/me')
        }
      })
    }
  })(req, res, next)
}

module.exports.googleLogin = (req, res, next) => {
  passport.authenticate('google-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      res.status(400).render("auth/login", { user: req.body, errorMessage: validations.error })
    } else {
      req.login(user, (loginErr) => {
        if (loginErr) {
          next(loginErr)
        } else {
          res.redirect('/')
        }
      })
    }
  })(req, res, next)
};

module.exports.facebookLogin = (req, res, next) => {
  passport.authenticate('facebook-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
res.status(400).render('auth/login', { user: req.body, errorMessage: validations.error})
    } else {
      req.login(user, (loginErr) => {
        if (loginErr) {
          next(loginErr)
        } else {
          res.redirect('/')
        }
      })
    }
  })(req, res, next)
};

module.exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

module.exports.changePassword = (req, res, next) => {
  res.render('auth/configuration')
};

module.exports.doChangePassword = (req, res, next) => {

  const { newPassword } = req.body;
    User.findOne({email: req.user.email})
    .then((user) => {

      if (user) {
        user.password = newPassword;
        return user.save()
        .then((response) => {
          res.redirect('/users/me')
        })
      }

      
    })
    .catch(next)
};

module.exports.activateAccount = (req, res, next) => {
  const token = req.params.token;

  User.findOneAndUpdate(
    { activationToken: token, active: false },
    { active: true }
  )
    .then((user) => {
      if (user) {
        res.render("auth/login", {
          user: { email: user.email },
          message: "You have activated your account. Thanks for joining!"
        })
      } else {
        res.redirect("/")
      }
    })
    .catch(next)
}