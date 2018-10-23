const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },
  
  on_air_name: {
    type: String
  },

  role: {
    type: String,
    enum: ['DJ', 'Underwriting', 'Show Producer', 'Full Access', 'Admin'],
    required: true
  },

  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
    default: true
  },

  can_delete: {
    type: Boolean,
    required: true
  }
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
}

const User = mongoose.model('User', userSchema);

module.exports = User;