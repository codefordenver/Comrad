const inquirer = require('inquirer');

async function home(session) {
  const prompts = [
    {
      type: 'list',
      name: 'nextStep',
      message: 'What you looking to do?',
      choices: [
        {
          name: 'Create new access control.',
          value: 'chooseAC',
        },
        {
          name: 'Exit',
          value: 'exit',
        },
      ],
    },
  ];

  const results = await inquirer.prompt(prompts);

  const updatedSession = {
    ...session,
    nextStep: results.nextStep,
  };

  return updatedSession;
}

module.exports = home;
