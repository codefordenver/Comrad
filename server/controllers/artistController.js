const db = require('../models');

const validateArtistData = async (data, id) => {
  if (typeof data.name !== 'undefined') {
    data.name = data.name.trim();
    if (data.name.length == 0) {
      throw 'Must provide a value for name';
    }
    //ensure this does not have the same name as another entity in the database
    const parameters = { name: data.name };
    if (typeof id !== 'undefined') {
      parameters._id = { $ne: id };
    }
    return db.Artist.findOne(parameters)
      .then(otherArtist => {
        if (otherArtist !== null) {
          throw 'There is already an artist named ' +
            data.name +
            ', please provide a unique name';
        }
        return data;
      })
      .catch(err => {
        console.log('thrown error:');
        console.log(err);
        throw err;
      });
  }
  return data;
};

module.exports = {
  findById: (req, res) => {
    db.Artist.findById(req.params.id)
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Artist.find({})
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    if (typeof req.body.name === 'undefined') {
      res.status(422).json({
        errorMessage: 'name is required',
      });
      return;
    }
    validateArtistData(req.body)
      .then(artistData => {
        db.Artist.create(artistData)
          .then(dbArtist => res.json(dbArtist))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => {
        console.error(err);
        res.status(422).json({
          errorMessage: err,
        });
      });
  },

  createMany: (req, res) => {
    let artistPromises = [];
    let artistError = false;
    req.body.forEach(function(artist) {
      artistPromises.push(validateArtistData(artist));
      if (typeof artist.name == 'undefined') {
        res.status(422).json({
          errorMessage: 'name is required',
        });
        artistError = true;
      }
    });
    if (artistError) {
      return;
    }
    Promise.all(artistPromises)
      .then(values => {
        db.Artist.insertMany(values)
          .then(dbArtist => res.json(dbArtist))
          .catch(err => res.json(422).json(err));
      })
      .catch(err => {
        console.error(err);
        res.status(422).json({
          errorMessage: err,
        });
        return;
      });
  },

  update: (req, res) => {
    validateArtistData(req.body, req.params.id)
      .then(updateTo => {
        updateTo.updated_at = Date.now();
        db.Artist.findOneAndUpdate({ _id: req.params.id }, updateTo, {
          new: true,
        })
          .then(dbArtist => res.json(dbArtist))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => {
        console.error(err);
        res.status(422).json({
          errorMessage: err,
        });
        return;
      });
  },

  remove: (req, res) => {
    db.Artist.findById({ _id: req.params.id })
      .then(dbArtist => dbArtist.remove())
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.status(422).json(err));
  },
};
