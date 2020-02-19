const db = require('../../models');
const bcrypt = require('bcrypt-nodejs');

function update(req, res) {
  const { id } = req.params;

  if (req.ac.fields.indexOf('*') === -1) {
    //only allow the user to update the fields they have permissions to update
    let bodyCopy = JSON.parse(JSON.stringify(req.body));
    req.body = {};
    console.log(
      'user has limited permissions for update endpoint, only allowing the user to update the following fields:',
    );
    req.ac.fields.forEach(function(field) {
      if (field in bodyCopy) {
        console.log(field);
        req.body[field] = bodyCopy[field];
      }
    });
  }

  if (req.body.password != null) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return res.status(422).json(err);
      }

      bcrypt.hash(req.body.password, salt, null, function(err, hash) {
        if (err) {
          return res.status(422).json(err);
        }

        req.body.password = hash;

        db.User.findOneAndUpdate({ _id: id }, req.body, { new: true })
          .then(dbUser => {
            let returnValue = JSON.parse(JSON.stringify(dbUser));
            delete returnValue.password;
            return res.json(returnValue);
          })
          .catch(err => res.status(422).json(err));
      });
    });
  } else {
    db.User.findOneAndUpdate({ _id: id }, req.body, { new: true })
      .then(dbUser => {
        let returnValue = JSON.parse(JSON.stringify(dbUser));
        delete returnValue.password;
        return res.json(returnValue);
      })
      .catch(err => res.status(422).json(err));
  }
}

module.exports = update;
