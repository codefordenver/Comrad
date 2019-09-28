const db = require('../../models');

async function removeApiKey(req, res) {
  const { _id } = req.body;

  db.User.findByIdAndUpdate(
    { _id },
    {
      api_key: {
        last_used: null,
        short: null,
        token: null,
      },
    },
    {
      new: true,
    },
  )
    .then(dbUser => {
      res.status(200).json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
}

module.exports = removeApiKey;
