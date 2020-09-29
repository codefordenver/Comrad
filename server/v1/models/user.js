/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: [email,first_name,last_name,roles]
 *       description: Represents a user that can log into Comrad, have an API to Comrad, and host shows in Comrad.
 *       properties:
 *         api_key:
 *           last_used:
 *             type: string
 *             format: date-time
 *             description: The last time the API key was used
 *           short:
 *             type: string
 *             description: The first 8 characters of a user's API key, used for an initial comparison when authenticating an API key
 *           token:
 *             type: string
 *             description: The full bcrypted token for a user's API key
 *         email:
 *           type: string
 *           description: The user's email address
 *         first_name:
 *           type: string
 *           description: The user's first name
 *         last_name:
 *           type: string
 *           description: The user's last name
 *         password:
 *           type: string
 *           description: The user's password. Should be plain text when creating or updating a user. Encrypted at rest in the database.
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             enum: ['Admin','Full Access','Show Captain','Underwriting','DJ','Music Library Admin']
 *           description: The roles that the user has, which affects what APIs they can access
 *         status:
 *           type: string
 *           enum: ['Active','Inactive']
 *           description: Whether the user can currently log into the system. Defaults to Active.
 *       example:
 *         api_key:
 *           last_used: '2020-09-16T17:41:32.271Z'
 *         on_air_name: Sean W
 *         primary_phone:
 *         roles:
 *         - DJ
 *         - Music Library Admin
 *         status: Active
 *         email: s@getcomrad.org
 *         first_name: Sean
 *         last_name: Williams
 */

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

  roles: {
    type: [String],
    required: true,
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

// cleanse the user object of sensitive data
userSchema.methods.forApiResponse = function() {
  let user = this;
  delete user._doc.password;
  delete user._doc.reset_token;
  delete user._doc.reset_token_expiry;
  if (user._doc.api_key.token) {
    user._doc.api_key.token = 'exists';
  }
  delete user._doc.api_key.short;
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
