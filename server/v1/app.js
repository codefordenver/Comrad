const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const routes = require('./routes');
require('./services/passport');
require('console.table');

const app = express();

const logger = function(req, res, next) {
  console.log(req.method + ': ' + req.path + ' from ' + req.ip);
  next();
};

app.enable('trust proxy');

app.use(logger);
app.use(bodyParser.json());
app.use(session({ secret: keys.secretKey, resave: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Routes
app.use('/v1', routes);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

module.exports = app;
