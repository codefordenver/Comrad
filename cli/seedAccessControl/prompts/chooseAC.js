const capitalize = require('capitalize');
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const readdir = util.promisify(fs.readdir);

async function getChoices() {
  const files = await readdir('./cli/seedAccessControl/grants');

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

async function chooseAC(session) {
  const choices = await getChoices();

  const prompts = [
    {
      type: 'list',
      name: 'resource',
      message: 'Which AC are you looking to create/seed?',
      choices,
    },
  ];

  const results = await inquirer.prompt(prompts);

  const nextStep = results.resource !== 'exit' ? 'createAC' : 'exit';

  const updatedSession = {
    ...session,
    resource: results.resource,
    nextStep,
  };

  return updatedSession;
}

module.exports = chooseAC;
