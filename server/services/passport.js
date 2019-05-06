const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../models/v1');

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
    db.User.findOne({ 'contact.email': email }, (err, dbUser) => {
      if (err) {
        return done(err);
      }

      if (!dbUser) {
        return done(null, false);
      }

      dbUser.comparePassword(password, async (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          return done(null, false);
        }

        await db.User.findOneAndUpdate(
          { 'contact.email': email },
          { 'auth.last_logged': new Date() },
        );

        return done(null, dbUser);
      });
    });
  }),
);
