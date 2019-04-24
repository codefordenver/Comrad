const create = require('./create');
const findAll = require('./findAll');
const findById = require('./findById');
const findByDate = require('./findByDate');
const remove = require('./remove');
const update = require('./update');

module.exports = {
  findAll,
  findById,
  findByDate,
  create,
  update,
  remove,
};
