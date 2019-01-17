import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './Footer';

const props = {
  links: [
    {
      text: 'Home',
      path: '/'
    },
    {
      text: 'Contact',
      path: 'https://www.jam3.com/contact/'
    },
    {
      text: 'Accessibility',
      path: 'https://www.jam3.com/accessibility/'
    }
  ]
};

storiesOf('Footer', module).addWithJSX('Default', () => <Component {...props} />);
