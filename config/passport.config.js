const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook');

const User = require('../models/user.model');

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then((user => next(null, user)))
    .catch(next)
});

passport.use('local-auth', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        next(null, false, { error: 'Incorrect credentials'})
      } else {
        return user.checkPassword(password)
          .then((match) => {
            if (match) {
              next(null, user)
            } else {
              next(null, false, { error: 'Incorrect credentials'})
            }
          })
      }
    })
    .catch(next)
}));

passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.G_CLIENTID,
  clientSecret: process.env.G_CLIENT_SECRET,
  callbackURL: process.env.G_REDIRECT_URI,
}, (accessToken, refreshToken, profile, next) => {
    const googleID = profile.id
    const email = profile.emails[0] ? profile.emails[0].value : undefined;
    
    if (googleID && email) {
      User.findOne({$or: 
        [
          { email: email },
          { googleID: googleID }
        ]
      })
        .then((user) => {
          if (!user) {
            const newUserGoogle = new User ({
              email: email,
              googleID: googleID,
              password: mongoose.Types.ObjectId(),
            })

            return newUserGoogle.save()
              .then((newUser) => {
                next(null, newUser)
              })
          } else {
            next(null, user);
          }
        })
        .catch(next)
    } else {
      next(null, false, { error: 'Error connecting with Google'})
    }
}));

passport.use('facebook-auth', new FacebookStrategy({
  clientID: process.env.F_CLIENTID,
  clientSecret: process.env.F_CLIENT_SECRET,
  callbackURL: process.env.F_REDIRECT_URI
}, (accessToken, refreshToken, profile, next) => {
  const facebookID = profile.id;
  const email = profile.emails[0] ? profile.emails[0].value : undefined;

  if (facebookID && email) {
    User.findOne({$or:
    [
      { email: email },
      { facebookID: facebookID }
    ]
  })
    .then((user) => {
      if (!user) {
        const newUserFacebook = new User ({
          email: email,
          facebookID: facebookID,
          password: mongoose.Types.ObjectId(),
        })

        return newUserFacebook.save()
          .then((newUser) => {
            next(null, newUser)
          })

      } else {
        next(null, user)
      }
    })
      .catch(next)
  } else {
    next(null, false, { error: 'Error connecting with Facebook'})
  }
}));