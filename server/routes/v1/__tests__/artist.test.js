const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');
const {
  canGetArray,
  canGetValidObjectByID,
} = require('../../../tests/common/routeTests');

beforeEach(connect);
afterEach(disconnect);

const route = '/api/artist';

describe(`${route}/`, () => {
  canGetArray(request(app), route);
});

describe(`${route}/:id`, () => {
  canGetValidObjectByID(request(app), route);
});
