const keys = require('../../config/keys');

function customFieldsForModel(req, res) {
  const { modelName } = req.params;
  if (modelName in keys.modelCustomFields) {
    res.status(200).json(keys.modelCustomFields[modelName]);
  } else {
    res.status(200).json([]);
  }
}

module.exports = customFieldsForModel;
