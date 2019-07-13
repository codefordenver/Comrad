const prompts = require('./prompts');

const initialSession = {
  nextStep: 'home',
};

async function index(session) {
  const updatedSession = await prompts[session.nextStep](session);

  switch (updatedSession.nextStep) {
    case 'exit':
      console.log('Goodbye!');
      break;
    default:
      index(updatedSession);
  }
}

index(initialSession);
