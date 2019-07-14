const AccessControl = require('accesscontrol');
const db = require('../../models');

async function findAll(req, res) {
  db.AccessControl.find({})
    .lean()
    .then(dbAccessControl => {
      if (req.query.formatted === 'true') {
        const ac = new AccessControl(dbAccessControl);
        dbAccessControl = ac.getGrants();
      }

      res.json(dbAccessControl);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = findAll;
