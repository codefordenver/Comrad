const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');
const {
  shouldReturnStatus200,
  shouldReturnArray,
} = require('../../../tests/common/routeTests');

beforeEach(connect);
afterEach(disconnect);

describe('/api/album/', () => {
  const route = '/api/album/';

  shouldReturnStatus200(request(app), route);
  shouldReturnArray(request(app), route);
});

describe('/api/album/:id', () => {
  test('returns status 200', async () => {
    const firstAlbumID = (await request(app).get('/api/album/')).body[0]._id;
    const response = await request(app).get(`/api/album/${firstAlbumID}`);
    expect(response.status).toBe(200);
  });

  test('returns the matching album id when queried', async () => {
    const firstAlbumID = (await request(app).get('/api/album/')).body[0]._id;
    const response = await request(app).get(`/api/album/${firstAlbumID}`);
    expect(response.body._id).toBe(firstAlbumID);
  });
});
