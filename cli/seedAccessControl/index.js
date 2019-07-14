const mongoose = require('mongoose');

const keys = require('../../server/v1/config/keys');
const prompts = require('./prompts');

const initialSession = {
  resource: '',
  nextStep: 'home',
};

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

async function index(session) {
  const updatedSession = await prompts[session.nextStep](session);

  switch (updatedSession.nextStep) {
    case 'exit':
      console.log('Goodbye!');
      process.exit();
      break;
    default:
      index(updatedSession);
  }
}

index(initialSession);
