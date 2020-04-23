import { configure, addDecorator } from '@storybook/react';

import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());

const req = require.context('../src/components', true, /\-story\.js$/);

configure(req, module);
