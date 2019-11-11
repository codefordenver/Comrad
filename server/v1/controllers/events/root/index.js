const create = require('./create');
const createInstance = require('./createInstance');
const find = require('./find');
const findById = require('./findById');
const remove = require('./remove');
const search = require('./search');
const update = require('./update');

module.exports = {
  find,
  findById,
  create,
  createInstance,
  search,
  update,
  remove,
};
