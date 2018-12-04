// Common route test functions

module.exports = {
  async shouldReturnArray(request, route) {
    test('returns an Array', async () => {
      const response = await request.get(route);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  },

  async shouldReturnValidObjectByID(request, route) {
    test('returns a valid object when queried by ID', async () => {
      const firstID = (await request(app).get(route)).body[0]._id;
      const response = await request(app).get(`${route}${firstID}`);
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(firstID);
    });
  },
};
