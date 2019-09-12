const router = require('express').Router();
const { configController } = require('../controllers');

router.route('/fields/:modelName').get(configController.customFieldsForModel);
router
  .route('/inComplianceReportingPeriod')
  .get(configController.getInComplianceReportingPeriodSetting);

module.exports = router;
