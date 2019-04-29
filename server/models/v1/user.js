const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  profile: {
    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    date_of_birth: {
      type: Date,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },
  },

  location: {
    street: {
      type: String,
      default: null,
    },

    city: {
      type: String,
      default: null,
    },

    state: {
      type: String,
      default: null,
      max: 2,
    },

    zip_code: {
      type: String,
      default: null,
      max: 5,
    },
  },

  contact: {
    phone: {
      type: String,
      require: true,
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

    slack: {
      type: String,
      default: null,
    },
  },

  station: {
    on_air_name: {
      type: String,
      default: null,
    },

    permission: {
      type: String,
      enum: ['DJ', 'Underwriting', 'Show Producer', 'Full Access', 'Admin'],
      default: 'DJ',
    },

    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },

    can_delete: {
      type: Boolean,
      default: true,
    },

    registered: {
      type: Date,
      default: Date.now,
    },
  },

  auth: {
    password: {
      type: String,
      required: true,
    },

    reset_token: {
      type: String,
      default: null,
    },

    reset_token_expiry: {
      type: Number,
      default: null,
    },

    api_key: {
      type: String,
      default: null,
    },

    last_logged: {
      type: Date,
      default: Date.now,
    },
  },
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.auth.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.auth.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.auth.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
