// Common route test functions

module.exports = {
  async shouldReturnStatus200(app, route) {
    test('returns status 200', async () => {
      const response = await app.get(route);
      expect(response.status).toBe(200);
    });
  },

  async shouldReturnArray(app, route) {
    test('returns an Array', async () => {
      const response = await app.get(route);
      expect(response.body).toBeInstanceOf(Array);
    });
  },
};
