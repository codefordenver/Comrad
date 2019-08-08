const db = require('../../models');

function search(req, res) {
  let { status = 'all', q = '' } = req.query;

  const emailRE = new RegExp(q, 'i');
  const first_nameRE = new RegExp(q, 'i');
  const last_nameRE = new RegExp(q, 'i');

  const query = {};
  const $or = [
    { email: emailRE },
    { first_name: first_nameRE },
    { last_name: last_nameRE },
  ];

  if (status.toLowerCase() !== 'all') {
    const statusRE = new RegExp(`^${status}$`, 'i');
    query.$and = [{ status: statusRE }, { $or }];
  } else {
    query.$or = $or;
  }

  db.User.find(query)
    .then(dbUsers => {
      return res.status(200).json(dbUsers);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = search;
