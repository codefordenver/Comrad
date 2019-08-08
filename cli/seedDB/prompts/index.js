const chooseDB = require('./chooseDB');
const home = require('./home');
const seedDB = require('./seedDB');

const prompts = {
  home,
  chooseDB,
  seedDB,
};

module.exports = prompts;
