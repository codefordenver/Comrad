const request = require('supertest');
const { connect, disconnect } = require('../../../tests/mongoose');
const app = require('../../../app');
const {
  canGetArray,
  canGetValidObjectByID,
} = require('../../../tests/common/routeTests');

beforeEach(connect);
afterEach(disconnect);

const route = '/api/shows';

describe(route, () => {
  it('Is a placeholder', () => {
    expect(1).toEqual(1);
  });
});
