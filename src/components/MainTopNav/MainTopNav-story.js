import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './MainTopNav';

const props = {
  logoSrc: 'https://placeholder.pics/svg/80x80/FF541B-8D8583/EFFFFB/LOGO',
  ariaSiteTitle: 'Site title',
  ariaNavTitle: 'Navigation',
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

storiesOf('MainTopNav', module)
  .addWithJSX('Default', () => <Component {...props} />)
  .addWithJSX('Hamburger', () => <Component {...props} showHamburger />);
