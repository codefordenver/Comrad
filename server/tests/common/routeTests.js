// Common route test functions

module.exports = {
  async shouldReturnStatus200(request, route) {
    test('returns status 200', async () => {
      const response = await request.get(route);
      expect(response.status).toBe(200);
    });
  },

  async shouldReturnArray(request, route) {
    test('returns an Array', async () => {
      const response = await request.get(route);
      expect(response.body).toBeInstanceOf(Array);
    });
  },
};
