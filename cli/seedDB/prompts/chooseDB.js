const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const readdir = util.promisify(fs.readdir);

async function getChoices() {
  const files = await readdir('./cli/seedDB/data');

  const filesSplit = files
    .filter(item => item !== 'index.js')
    .map(item => {
      return item.split('.')[0];
    });

  const choices = filesSplit.map(item => {
    return {
      name: item.replace(/([A-Z])/g, ' $1').trim(),
      value: item,
    };
  });

  return choices;
}

async function chooseDB(session) {
  const choices = await getChoices();

  const prompts = [
    {
      type: 'list',
      name: 'database',
      message: 'Which DB Do You Want To Seed?',
      choices: [
        ...choices,
        new inquirer.Separator(),
        {
          name: 'Exit',
          value: 'exit',
        },
      ],
    },
  ];

  const results = await inquirer.prompt(prompts);

  const nextStep = results.database !== 'exit' ? 'seedDB' : 'exit';

  const updatedSession = {
    ...session,
    database: results.database,
    nextStep,
  };

  return updatedSession;
}

module.exports = chooseDB;
