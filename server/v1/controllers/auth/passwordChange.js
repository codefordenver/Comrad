const bcrypt = require('bcrypt-nodejs');
const db = require('../../models');

async function passwordChange(req, res) {
  const { passConfirm, passNew, _id } = req.body;

  if (!passConfirm || !passNew) {
    return res.status(401).json('Password Confirm and/or Password New Missing');
  }

  if (passConfirm !== passNew) {
    return res.status(401).json('Your passwords do not match!');
  }

  const user = await db.User.findOne({
    id: _id,
  });

  if (!user) {
    return res.status(404).json('Your token has expired or is invalid');
  }

  await bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(422).json(err);
    }

    bcrypt.hash(passNew, salt, null, async (err, hash) => {
      if (err) {
        return res.status(422).json(err);
      }

      const updatedUser = await db.User.findOneAndUpdate(
        { email: user.email },
        {
          password: hash,
        },
        { new: true },
      );

      return res.json(updatedUser);
    });
  });
}

module.exports = passwordChange;
