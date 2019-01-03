import { configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

const req = require.context('../src/stories', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(file => req(file))
}

configure(loadStories, module);
