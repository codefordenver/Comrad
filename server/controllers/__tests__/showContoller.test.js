const request = require('supertest');
const { connect, disconnect } = require('../../tests/mongoose');
const app = require('../../app');

const { repeatRuleShows } = require('../showController');

beforeEach(connect);
afterEach(disconnect);

describe('Test Repeat Rules', () => {
  it('Should return 3 dates', () => {
    expect(2).toEqual(1);
  });
});
