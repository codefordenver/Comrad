// settings used by swagger-jsoc to generate swagger JSON file

module.exports = {
  openapi: '3.0.0',
  info: {
    // API informations (required)
    title: 'Comrad API', // Title (required)
    version: '1', // Version (required)
    description:
      'The API for Comrad, source software for radio stations that handles playlist logging, traffic management, reporting, and more', // Description (optional)
  },
  apis: ['server/v1/controllers/**/*.js', 'server/v1/models/*.js'], // paths to files containing API definitions
  components: {
    securitySchemas: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Place the API key in the authorization header',
      },
    },
  },
  basePath: '/v1', // Base path (optional)
};
