const calculatePopularity = require('./calculatePopularity');
const create = require('./create');
const createMany = require('./createMany');
const findAll = require('./findAll');
const findById = require('./findById');
const findItunesByCollectionId = require('./findItunesByCollectionId');
const remove = require('./remove');
const search = require('./search');
const searchItunes = require('./searchItunes');
const update = require('./update');

module.exports = {
  calculatePopularity,
  create,
  createMany,
  findAll,
  findById,
  findItunesByCollectionId,
  remove,
  search,
  searchItunes,
  update,
};
