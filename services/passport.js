require('dotenv').config();
const passport = require('passport');
const db = require('../models');
const key = process.env.SECRET_KEY;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  db.User.findOne({ email }, (err, user) => {
    if(err) {
      return done(err);
    }

    if(!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if(err) {
        return done(err);
      }

      if(!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

const jwtOptions = { 
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
  secretOrKey: key
}
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  db.User.findById(payload.sub, (err, user) => {
    if(err) {
      return done(err, false);
    }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtLogin);