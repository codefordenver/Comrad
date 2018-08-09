require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

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