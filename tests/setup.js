require('dotenv').config();
require('../models');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
