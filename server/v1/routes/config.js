const router = require('express').Router();
const { configController } = require('../controllers');

router.route('/fields/:modelName').get(configController.customFieldsForModel);

module.exports = router;
