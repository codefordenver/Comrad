const create = require('./create');
const deleteByEmail = require('./deleteByEmail');
const findAll = require('./findAll');
const findByActive = require('./findByActive');
const findById = require('./findById');
const randomUser = require('./randomUser');
const remove = require('./remove');
const search = require('./search');
const update = require('./update');
const updatePermission = require('./updatePermission');

module.exports = {
  create,
  deleteByEmail,
  findAll,
  findByActive,
  findById,
  randomUser,
  remove,
  search,
  update,
  updatePermission,
};
