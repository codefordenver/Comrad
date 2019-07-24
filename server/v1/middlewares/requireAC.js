const AccessControl = require('accesscontrol');
const db = require('../models');

function requireAC(resource, action) {
  return async function(req, res, next) {
    // TODO: Need to clean up logic a little bit
    const { authorization } = req.headers;

    if (authorization) {
      const dbUser = await db.User.findOne({ api_key: authorization });

      req.user = dbUser;
    }

    if (!req.user || req.user.status !== 'Active') {
      return res.json('Incorrect Credentials or Not Active');
    }

    const dbAccessControl = await db.AccessControl.find({}).lean();
    const ac = new AccessControl(dbAccessControl);

    const permission = ac.can(req.user.role)[action](resource);

    if (!permission.granted) {
      return res.json('User Is Not Granted!');
    }

    req.ac = permission;
    req.ac.fields =
      permission.attributes.indexOf('*') !== -1 ? [] : permission.attributes;

    return next();
  };
}

module.exports = requireAC;
