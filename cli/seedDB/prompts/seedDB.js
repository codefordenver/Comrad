const db = require('../../../server/v1/models');
const data = require('../data');

async function seedDB(session) {
  const dbData = data[session.database];

  console.log(`Deleting ${session.database} Database`);
  await db[session.database].deleteMany();

  console.log(`Seeding ${session.database} Database`);
  const dbSeeded = db[session.database].insertMany(dbData);

  return {
    ...session,
    nextStep: 'home',
  };
}

module.exports = seedDB;
