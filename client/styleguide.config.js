const path = require('path');

module.exports = {
  ignore: [
    'src/components/**/index.js',
    'src/components/**/*.spec.js',
    'src/components/App/**',
    'src/components/Card/CardBody.js',
    'src/components/Dropdown/DropdownCircle.js',
    'src/components/Dropdown/DropdownItem.js',
    'src/components/Dropdown/DropdownPlus.js',
    'src/components/HOC/**',
    'src/components/Input/**',
    'src/components/LoginForm/**',
    'src/components/NavDevelopmentHelperMenuBar/**',
    'src/components/Root/**',
    'src/components/Shows/**',
    'src/components/TableAlbums/**',
    'src/components/TableArtists/**',
    'src/components/TableTracks/**',
    'src/components/TableUsers/**',
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, './src/components/Root'),
  },
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://use.fontawesome.com/releases/v5.7.0/css/all.css',
        },
      ],
    },
  },
  webpackConfig: require('./node_modules/react-scripts/config/webpack.config.js'),
};
