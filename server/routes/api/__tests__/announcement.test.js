const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');

beforeEach(connect);
afterEach(disconnect);

describe('/api/announcement/', () => {
  test('returns status 200', async () => {
    const response = await request(app).get('/api/announcement/');
    expect(response.status).toBe(200);
  });

  test('returns an array of announcements in the body', async () => {
    const response = await request(app).get('/api/announcement/');
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('/api/annnouncement/:id', () => {
  test('returns status 200', async () => {
    const firstID = (await request(app).get('/api/announcement/')).body[0]._id;
    const response = await request(app).get(`/api/announcement/${firstID}`);
    expect(response.status).toBe(200);
  });

  test('returns the matching announcement id when queried', async () => {
    const firstID = (await request(app).get('/api/announcement/')).body[0]._id;
    const response = await request(app).get(`/api/announcement/${firstID}`);
    expect(response.body._id).toBe(firstID);
  });
});
