const keys = require('../../config/keys');

function getResourcesCategories(req, res) {
  res.status(200).json(keys.resourcesCategories);
}

module.exports = getResourcesCategories;
