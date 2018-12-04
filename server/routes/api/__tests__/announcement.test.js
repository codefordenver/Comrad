const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');
const {
  shouldReturnArray,
  shouldReturnValidObjectByID,
} = require('../../../tests/common/routeTests');

beforeEach(connect);
afterEach(disconnect);

const route = '/api/announcement/';

describe('/api/announcement/', () => {
  shouldReturnArray(request(app), route);
});

describe('/api/annnouncement/:id', () => {
  shouldReturnValidObjectByID(request(app), route);
});
