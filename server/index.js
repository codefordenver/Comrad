require('dotenv').config();
const mongoose = require('mongoose');
const keys = require('./v1/config/keys');
const appV1 = require('./v1/app');

const PORT = process.env.PORT || 5000;

mongoose.connect(
  'mongodb://localhost/comrad',
  { useNewUrlParser: true },
);

appV1.listen(PORT, () =>
  console.log(`\n🌎  ==> API Server now listening on PORT ${PORT}!\n`),
);
