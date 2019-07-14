const bcrypt = require('bcrypt-nodejs');
const db = require('../../models');

async function passwordChange(req, res) {
  const { passNew, _id } = req.body;

  await bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(422).json(err);
    }

    bcrypt.hash(passNew, salt, null, async (err, hash) => {
      if (err) {
        return res.status(422).json(err);
      }

      const updatedUser = await db.User.findOneAndUpdate(
        { _id: _id },
        { password: hash },
        { new: true },
      );

      delete updatedUser._doc.password;

      return res.json(updatedUser);
    });
  });
}

module.exports = passwordChange;
