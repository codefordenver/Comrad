const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const routes = require('./routes');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(session({ secret: keys.secretKey, resave: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

module.exports = app;
