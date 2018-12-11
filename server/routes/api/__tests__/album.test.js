const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');

beforeEach(connect);
afterEach(disconnect);

describe('/api/album/', () => {
  test('returns status 200', async () => {
    const response = await request(app).get('/api/album/');
    expect(response.status).toBe(200);
  });

  test('returns an array of albums in the body', async () => {
    const response = await request(app).get('/api/album/');
    expect(response.body).toBeInstanceOf(Array);
  });
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
