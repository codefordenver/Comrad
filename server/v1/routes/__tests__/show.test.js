const { connect, disconnect } = require('../../../tests/mongoose');

beforeEach(connect);
afterEach(disconnect);

const route = '/v1/events/shows';

describe(route, () => {
  it('Is a placeholder', () => {
    expect(1).toEqual(1);
  });
});
