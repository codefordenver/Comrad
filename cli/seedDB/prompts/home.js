const inquirer = require('inquirer');

async function home(session) {
  const prompts = [
    {
      type: 'list',
      name: 'nextStep',
      message: 'What database would you like to seed?',
      choices: [
        {
          name: 'Users',
          value: 'seedUser',
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
