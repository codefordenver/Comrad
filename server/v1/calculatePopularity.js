const mongoose = require('mongoose');
const keys = require('./config/keys');
const { libraryController } = require('./controllers');

async function calculatePopularity() {
  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await libraryController.calculatePopularity();
}

//let scriptFinished = false;

calculatePopularity()
  .then(() => {
    console.log('Finished calculating popularity');
    process.exit();
  })
  .catch(err => {
    console.log('error');
    console.log(err);
    process.exit(1);
  });
