const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const apiVersion = require('./versions/1');
require('./services/passport');
require('console.table');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: keys.secretKey, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(apiVersion);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

module.exports = app;
