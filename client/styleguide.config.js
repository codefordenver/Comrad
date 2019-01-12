const path = require('path');

module.exports = {
  ignore: [
    'src/components/**/index.js',
    'src/components/**/*.spec.js',
    'src/components/HOC/**',
    'src/components/AlbumsTable/AlbumsTable.js',
    'src/components/ArtistsTable/ArtistsTable.js',
    'src/components/LibraryTable/LibraryTable.js',
    'src/components/TracksTable/AlbumsTable.js',
    'src/components/UsersTable/UsersTable.js',
    'src/components/App/App.js',
    'src/components/NavTest/NavTest.js',
    'src/components/Root/Root.js',
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/components/Root'),
  },
  webpackConfig: require('./node_modules/react-scripts/config/webpack.config.js'),
};
