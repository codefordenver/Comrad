const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id).then(user => {
    done(null, user);
  });
});

const localOptions = { usernameField: 'email' };

passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    db.User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        }
         
        return done(null, user);
      });
    });
  })
);
