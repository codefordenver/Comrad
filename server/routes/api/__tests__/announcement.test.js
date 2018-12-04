const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');
const {
  shouldReturnStatus200,
  shouldReturnArray,
} = require('../../../tests/common/routeTests');

beforeEach(connect);
afterEach(disconnect);

describe('/api/announcement/', () => {
  const route = '/api/announcement/';

  shouldReturnStatus200(request(app), route);
  shouldReturnArray(request(app), route);
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
