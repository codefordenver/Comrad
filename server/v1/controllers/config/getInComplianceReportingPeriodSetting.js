const keys = require('../../config/keys');

function getInComplianceReportingPeriodSetting(req, res) {
  res.status(200).json(keys.inComplianceReportingPeriod);
}

module.exports = getInComplianceReportingPeriodSetting;
