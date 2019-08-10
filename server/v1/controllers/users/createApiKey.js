const bcrypt = require('bcrypt-nodejs');
const db = require('../../models');
const uuidv4 = require('uuid/v4');

async function createApiKey(req, res) {
  const { id } = req.params;

  const apiKey = uuidv4();

  await bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(422).json(err);
    }

    bcrypt.hash(apiKey, salt, null, async (err, hash) => {
      if (err) {
        return res.status(422).json(err);
      }

      const updatedUser = await db.User.findOneAndUpdate(
        { _id: id },
        {
          api_key: {
            last_used: new Date(),
            short: apiKey.substr(0, 8),
            token: hash,
          },
        },
        { new: true },
      ).lean();

      delete updatedUser.api_key;
      delete updatedUser.password;

      return res.json({ user: updatedUser, api_key: apiKey });
    });
  });
}

module.exports = createApiKey;
