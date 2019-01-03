const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
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

  password: {
    type: String,
    required: true,
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
    default: '',
  },

  role: {
    type: String,
    enum: ['DJ', 'Underwriting', 'Show Producer', 'Full Access', 'Admin'],
    required: true,
    default: 'DJ',
  },

  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
    default: 'Active',
  },

  can_delete: {
    type: Boolean,
    required: true,
    default: true,
  },

  reset_token: {
    type: String,
    default: null,
  },

  reset_token_expiry: {
    type: Number,
    default: null,
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

const User = mongoose.model('User', userSchema);

module.exports = User;
