const create = require('./create');
const createApiKey = require('./createApiKey');
const findAll = require('./findAll');
const findById = require('./findById');
const randomUser = require('./randomUser');
const remove = require('./remove');
const search = require('./search');
const searchHosts = require('./searchHosts');
const update = require('./update');
const updatePermission = require('./updatePermission');

module.exports = {
  create,
  createApiKey,
  findAll,
  findById,
  randomUser,
  remove,
  search,
  searchHosts,
  update,
  updatePermission,
};
