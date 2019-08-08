const inquirer = require('inquirer');

async function home(session) {
  const prompts = [
    {
      type: 'list',
      name: 'nextStep',
      message: 'What Would You Like To Do?',
      choices: [
        {
          name: 'Seed Database',
          value: 'chooseDB',
        },
        {
          name: 'Exit',
          value: 'exit',
        },
      ],
    },
  ];

  const results = await inquirer.prompt(prompts);

  const updatedSession = Object.assign(session, {
    nextStep: results.nextStep,
  });

  return updatedSession;
}

module.exports = home;
