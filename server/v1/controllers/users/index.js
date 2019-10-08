const canDelete = require('./canDelete');
const create = require('./create');
const createApiKey = require('./createApiKey');
const findAll = require('./findAll');
const findById = require('./findById');
const randomUser = require('./randomUser');
const remove = require('./remove');
const removeApiKey = require('./removeApiKey');
const search = require('./search');
const searchHosts = require('./searchHosts');
const update = require('./update');
const updatePermission = require('./updatePermission');

module.exports = {
  canDelete,
  create,
  createApiKey,
  findAll,
  findById,
  randomUser,
  remove,
  removeApiKey,
  search,
  searchHosts,
  update,
  updatePermission,
};
