const router = require('express').Router();
const { reportingController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/giveaways')
  .get(requireAC('Traffic', 'readAny'), reportingController.giveawayExport);

module.exports = router;
