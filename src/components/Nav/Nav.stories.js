import { storiesOf } from '@storybook/react';

import Component from './Nav';

const props = {
  logoImg: {
    src: 'https://assets.imgix.net/unsplash/mountains.jpg'
  },
  links: [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'Contact',
      href: '/contact'
    }
  ],
  ariaSiteTitle: 'Site title'
};

storiesOf('Nav', module)
  .add('Default', () => <Component {...props} />)
  .add('Hamburger', () => <Component {...props} showHamburger />);
