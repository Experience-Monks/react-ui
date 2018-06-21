import { setAddon, configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import JSXAddon from 'storybook-addon-jsx';

const req = require.context('../src', true, /\-story\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setAddon(JSXAddon);
addDecorator(withKnobs);

configure(loadStories, module);
