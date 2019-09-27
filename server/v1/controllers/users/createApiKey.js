const bcrypt = require('bcrypt-nodejs');
const db = require('../../models');
const uuidv4 = require('uuid/v4');

async function createApiKey(req, res) {
  const { id } = req.body;

  console.log(id);

  const api_key = uuidv4();

  await bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(422).json(err);
    }

    bcrypt.hash(api_key, salt, null, async (err, hash) => {
      if (err) {
        return res.status(422).json(err);
      }

      db.User.findOneAndUpdate(
        { _id: id },
        {
          api_key: {
            last_used: new Date(),
            short: api_key.substr(0, 8),
            token: hash,
          },
        },
        { new: true },
      )
        .lean()
        .then(dbUser => {
          delete dbUser.password;

          return res.json({ doc: dbUser, api_key });
        })
        .catch(err => {
          res.json(err);
        });
    });
  });
}

module.exports = createApiKey;
