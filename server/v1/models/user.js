const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const dbShows = require('./show');

const userSchema = new Schema({
  api_key: {
    last_used: {
      type: Date,
      default: null,
    },

    short: {
      type: String,
      default: null,
    },

    token: {
      type: String,
      default: null,
    },
  },

  can_delete: {
    type: Boolean,
    default: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: v => {
        return /^([a-zA-Z\d.-]+)@([a-zA-Z\d-]+\.)([a-zA-Z]{2,8})(.[a-zA-Z]{2,8})?$/.test(
          v,
        );
      },
      message: props => `${props.value} is not a valid email`,
    },
  },

  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  on_air_name: {
    type: String,
    default: null,
  },

  password: {
    type: String,
  },

  primary_phone: {
    type: String,
    default: null,
  },

  reset_token: {
    type: String,
    default: null,
  },

  reset_token_expiry: {
    type: Number,
    default: null,
  },

  role: {
    type: String,
  },

  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;

      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

userSchema.methods.compareApiKey = function(candidateKey, callback) {
  const user = this;
  const { token } = user.api_key;

  return new Promise(function(resolve, reject) {
    bcrypt.compare(candidateKey, token, function(err, isMatch) {
      if (err) {
        return reject(err);
      }

      user.api_key.last_used = new Date();
      user.save();

      return resolve(isMatch);
    });
  });
};

userSchema.methods.canDelete = async function() {
  const user = this;

  const shows = await dbShows.find({ 'show_details.host': user._id });

  if (shows.length > 0) {
    return false;
  }

  return true;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
