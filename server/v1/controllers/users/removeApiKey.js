const db = require('../../models');

async function removeApiKey(req, res) {
  const { id } = req.params;

  const dbUser = await db.User.updateOne(
    { _id: id },
    {
      api_key: {
        last_used: null,
        short: null,
        token: null,
      },
    },
  );

  return res.json(dbUser);
}

module.exports = removeApiKey;
