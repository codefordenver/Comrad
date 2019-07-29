const {
  utils: { allShowInstancesInDateRange },
} = require('../../shows/utils');

function populateTrafficInstance(
  trafficId,
  masterTimeId,
  startTimeUtc,
  endTimeUtc,
) {
  let instances = allShowInstancesInDateRange(
    trafficId,
    startTimeUtc,
    endTimeUtc,
  );
  return instances.find(a => a.master_time_id === masterTimeId);
}

module.exports = populateTrafficInstance;
