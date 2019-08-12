const bcrypt = require('bcrypt-nodejs');
const db = require('../../models');
const uuidv4 = require('uuid/v4');

async function createApiKey(req, res) {
  const { id } = req.params;
  const { existing_key } = req.query;

  const api_key = existing_key || uuidv4();

  await bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(422).json(err);
    }

    bcrypt.hash(api_key, salt, null, async (err, hash) => {
      if (err) {
        return res.status(422).json(err);
      }

      const dbUser = await db.User.findOneAndUpdate(
        { _id: id },
        {
          api_key: {
            last_used: new Date(),
            short: api_key.substr(0, 8),
            token: hash,
          },
        },
        { new: true },
      ).lean();

      delete dbUser.api_key;
      delete dbUser.password;

      return res.json({ user: dbUser, api_key });
    });
  });
}

module.exports = createApiKey;
