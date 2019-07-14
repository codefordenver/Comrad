const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const db = require('../../../server/v1/models');
const grants = require('../grants');

async function createAC(session) {
  const grant = grants[session.grant];

  console.log('Deleting Resource AC');
  await db.AccessControl.deleteMany({ resource: session.grant });

  console.log('Creating Resource AC');
  const dbAccessControl = await db.AccessControl.insertMany(grant);

  return {
    ...session,
    nextStep: 'home',
  };
}

module.exports = createAC;
