const router = require('express').Router();
const { configController } = require('../controllers');

router.route('/fields/:modelName').get(configController.customFieldsForModel);
router
  .route('/compliance-reporting-period')
  .get(configController.getInComplianceReportingPeriodSetting);
router
  .route('/resources-categories')
  .get(configController.getResourcesCategories);
router
  .route('/ticket-giveaway-html')
  .get(configController.getTicketGiveawayHtml);

module.exports = router;
