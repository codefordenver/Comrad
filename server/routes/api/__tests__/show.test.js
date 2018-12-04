const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');

beforeEach(connect);
afterEach(disconnect);

describe('/api/show/', () => {
  test('returns status 200', async () => {
    const response = await request(app).get('/api/show/');
    expect(response.status).toBe(200);
  });
});
