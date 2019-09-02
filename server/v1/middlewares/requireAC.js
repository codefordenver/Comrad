const AccessControl = require('accesscontrol');
const db = require('../models');

function requireAC(resource, action) {
  return async function(req, res, next) {
    // TODO: Need to clean up logic a little bit
    const { authorization } = req.headers;

    // eventType determines if this is show or traffic type
    const { eventType } = req.params;
    if (!eventType && !resource) {
      return res
        .status(500)
        .json({ message: 'Access Control Resource is not defined' });
    }

    if (eventType) {
      resource =
        eventType.charAt(0).toUpperCase() + eventType.substr(1).toLowerCase(); // capitalize the first letter of the resource
    }

    if (authorization) {
      const dbUser = await db.User.findOne({
        'api_key.short': authorization.substr(0, 8),
      });

      if (dbUser) {
        const isMatch = await dbUser.compareApiKey(authorization);

        if (isMatch) {
          req.user = dbUser;
        }
      }
    }

    if (!req.user || req.user.status !== 'Active') {
      return res
        .status(401)
        .json({ message: 'Incorrect Credentials or Not Active' });
    }

    const dbAccessControl = await db.AccessControl.find({}, '-_id').lean();
    const ac = new AccessControl(dbAccessControl);

    const permission = ac.can(req.user.role)[action](resource);

    if (!permission.granted) {
      return res.status(403).json({ message: 'User Is Not Granted!' });
    }

    req.ac = permission;
    req.ac.fields =
      permission.attributes.indexOf('*') !== -1 ? [] : permission.attributes;

    return next();
  };
}

module.exports = requireAC;
