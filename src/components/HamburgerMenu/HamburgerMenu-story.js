import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './HamburgerMenu';

const props = {
  links: [
    {
      text: 'Home',
      path: '/'
    },
    {
      text: 'About',
      path: '/about'
    }
  ]
};

storiesOf('HamburgerMenu', module).addWithJSX('Open', () => <Component {...props} isMobileMenuOpen={true} />);
