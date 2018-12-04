// Common route test functions

async function shouldReturnStatus200(app, route) {
  test('returns status 200', async () => {
    const response = await app.get(route);
    expect(response.status).toBe(200);
  });
}

async function shouldReturnArray(app, route) {
  test('returns an Array', async () => {
    const response = await app.get(route);
    expect(response.body).toBeInstanceOf(Array);
  });
}

module.exports = {
  shouldReturnStatus200,
  shouldReturnArray,
};

{
  blah() {
    
  }
}