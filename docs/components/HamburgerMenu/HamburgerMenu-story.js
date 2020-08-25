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

storiesOf('HamburgerMenu', module).add('Open', () => <Component {...props} isMobileMenuOpen={true} />);
