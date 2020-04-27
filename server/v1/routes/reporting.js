const router = require('express').Router();
const { reportingController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/charting')
  .get(
    requireAC('Library', 'readAny'),
    requireAC('Playlists', 'readAny'),
    reportingController.charting,
  );

router
  .route('/giveaways')
  .get(requireAC('Traffic', 'readAny'), reportingController.giveawayExport);

router
  .route('/sound-exchange')
  .get(
    requireAC('Library', 'readAny'),
    requireAC('Playlists', 'readAny'),
    reportingController.soundExchangeReport,
  );

router
  .route('/underwriting')
  .get(requireAC('Traffic', 'readAny'), reportingController.underwritingExport);

module.exports = router;
