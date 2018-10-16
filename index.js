require('dotenv').config();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

app.listen(PORT, () =>
  console.log(`\n🌎  ==> API Server now listening on PORT ${PORT}!\n`)
);
