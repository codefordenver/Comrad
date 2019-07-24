const db = require('../../../server/v1/models');
const grants = require('../grants');

async function createAC(session) {
  const grant = grants[session.resource];

  console.log('Deleting Resource AC');
  await db.AccessControl.deleteMany({ resource: session.resource });

  console.log(`Creating Resource ${session.resource}`);
  const dbAccessControl = await db.AccessControl.insertMany(grant);

  return {
    ...session,
    nextStep: 'home',
  };
}

module.exports = createAC;
