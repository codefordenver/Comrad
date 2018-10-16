require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

require('./services/passport');

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

app.listen(PORT, () =>
  console.log(`\n🌎  ==> API Server now listening on PORT ${PORT}!\n`)
);