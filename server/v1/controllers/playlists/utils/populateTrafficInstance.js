const {
  utils: { allShowInstancesInDateRange },
} = require('../../shows/utils');

function populateTrafficInstance(
  trafficObj,
  masterTimeId,
  startTimeUtc,
  endTimeUtc,
) {
  let instances = allShowInstancesInDateRange(
    trafficObj,
    startTimeUtc,
    endTimeUtc,
  );
  let instance = instances.find(a => a.master_time_id === masterTimeId);

  // with legacy data from the old version of comrad, sometimes the time of the traffic event has changed from
  // the master_time_id that was recorded in the database. In these cases, use the first traffic event found
  // this is not foolproof, but will work in the vast majority of cases. (It won't in cases where a
  // traffic event has multiple instances within the same show)
  if (typeof instance === 'undefined') {
    instance = instances[0];
  }

  return instance;
}

module.exports = populateTrafficInstance;
