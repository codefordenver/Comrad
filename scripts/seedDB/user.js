require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../../models');
const keys = require('../../config/keys');
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

// Remove all users except the comrad.development user account
db.User.deleteMany({"email": {"$ne": "comrad.development@gmail.com"}}, function (err) {
  if (err) return handleError(err);
});

var jsonArr = [];


for (i = 0; i < 1000; i++) {
  jsonArr.push({
    "email": "example" + i + "@example.com",
    "password": "password"
  });
}


// insertMany is fast enough to insert 1000 entries, but it doesn't "create" them
// so it bypasses encrypting the passwords
// This is fine for populating the db and testing out the API, but if we want to
// populate with working users and passwords, we need to use the "create" method
// on db.User - however, that's so slow the connection times out.
// Might want to reset timeout value for mongoose 
db.User.insertMany(jsonArr, function(err) {
    if (err) return handleError(err);
});
