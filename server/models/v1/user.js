const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
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
    },

    image: {
      type: String,
    },
  },

  location: {
    street: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    zip_code: {
      type: String,
    },
  },

  contact: {
    phone: {
      type: String,
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
    },
  },

  station: {
    on_air_name: {
      type: String,
    },

    permission: {
      type: String,
      enum: ['dj', 'underwriting', 'show_producer', 'full_access', 'admin'],
      required: true,
      default: 'dj',
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'active',
    },

    can_delete: {
      type: Boolean,
      required: true,
      default: true,
    },

    registered: {
      type: Date,
    },
  },

  auth: {
    password: {
      type: String,
      required: true,
    },

    fake_user_password: {
      type: String,
    },

    reset_token: {
      type: String,
      default: null,
    },

    reset_token_expiry: {
      type: Number,
      default: null,
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

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User;
