const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');
const {
  canGetArray,
  canGetValidObjectByID,
} = require('../../../tests/common/routeTests');
2;
beforeEach(connect);
afterEach(disconnect);

const route = '/api/user/';

describe(route, () => {
  canGetArray(request(app), route);
});

describe(`${route}/:id`, () => {
  canGetValidObjectByID(request(app), route);
});
