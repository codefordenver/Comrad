const AccessControl = require('accesscontrol');
const db = require('../models');

function requireAC(resource, action) {
  return async function(req, res, next) {
    // TODO: Need to clean up logic a little bit

    if (req.query.api_key) {
      console.log('User Has A Key!');

      const { api_key } = req.query;
      const dbUser = await db.User.findOne({ api_key });

      req.user = dbUser;
    }

    if (!req.user || req.user.status !== 'Active') {
      console.log('Incorrect Credentials or Not Active');
      return res.json('Incorrect Credentials or Not Active');
    }

    const dbAccessControl = await db.AccessControl.find({}).lean();
    const ac = new AccessControl(dbAccessControl);

    const permission = ac.can(req.user.role)[action](resource);

    if (!permission.granted) {
      console.log('User Is Not Granted!');
      return res.json('User Is Not Granted!');
    }

    return next();
  };
}

module.exports = requireAC;
