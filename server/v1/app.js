const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const routes = require('./routes');
require('./services/passport');
require('console.table');

const app = express();
const store = new MongoDBStore({
  uri: keys.mongoURI,
  collection: 'sessions',
});

store.on('error', function(error) {
  console.log('Store ERROR');
  console.log(error);
});

const logger = function(req, res, next) {
  console.log(req.method + ': ' + req.path + ' from ' + req.ip);
  next();
};

app.enable('trust proxy');

app.use(logger);
app.use(bodyParser.json());
app.use(
  session({
    secret: keys.secretKey,
    secure: process.env.USE_SECURE_COOKIES,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // allow passing credentials so API can live at a different URL than the application
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'POST,GET,OPTIONS,PATCH,PUT,DELETE',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
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
