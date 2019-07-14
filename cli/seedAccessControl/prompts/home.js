const inquirer = require('inquirer');

async function home(session) {
  const prompts = [
    {
      type: 'list',
      name: 'nextStep',
      message: 'What Would You Like To Do?',
      choices: [
        {
          name: 'Create New Access Control.',
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
