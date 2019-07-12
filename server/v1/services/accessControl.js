const AccessControl = require('accesscontrol');
const db = require('../models');

async function accessControlSetup() {
  const dbAccessConrol = await db.AccessControl.find(
    {},
    '-_id role resource action attributes',
  ).lean();

  const accessControl = new AccessControl(dbAccessConrol);

  return accessControl;
}

const ac = new Promise((resolve, reject) => {
  db.AccessControl.find({})
    .lean()
    .then(res => {
      resolve(res);
    });
});
console.log(ac);

module.exports = {
  ac,
};
