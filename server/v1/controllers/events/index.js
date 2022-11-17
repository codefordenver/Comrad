const create = require('./create');
const createInstance = require('./createInstance');
const currentShow = require('./currentShow');
const find = require('./find');
const findByDateAndName = require('./findByDateAndName');
const findById = require('./findById');
const findByCustomField = require('./findByCustomField');
const findEarliest = require('./findEarliest');
const nextShow = require('./nextShow');
const nowPlaying = require('./nowPlaying');
const previousShow = require('./previousShow');
const recentShows = require('./recentShows');
const remove = require('./remove');
const removeInstanceFromSeries = require('./removeInstanceFromSeries');
const search = require('./search');
const searchUnderwriters = require('./searchUnderwriters');
const update = require('./update');

module.exports = {
  create,
  createInstance,
  currentShow,
  find,
  findByCustomField,
  findByDateAndName,
  findById,
  findEarliest,
  nextShow,
  nowPlaying,
  previousShow,
  recentShows,
  search,
  searchUnderwriters,
  update,
  remove,
  removeInstanceFromSeries,
};
