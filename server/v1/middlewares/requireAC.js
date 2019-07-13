const AccessControl = require('accesscontrol');
const db = require('../models');

function requireAC(resource, action) {
  return async function(req, res, next) {
    const user = {
      role: 'admin',
    };

    const dbAccessControl = await db.AccessControl.find({}).lean();

    const ac = new AccessControl(dbAccessControl);

    if (!ac.can(user.role)[action](resource).granted) {
      return res
        .status(404)
        .json({ message: "User's Role Does Not Have Access" });
    }

    return next();
  };
}

module.exports = requireAC;
