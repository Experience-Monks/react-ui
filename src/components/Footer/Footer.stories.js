import { storiesOf } from '@storybook/react';

import Component from './Footer';

const props = {
  links: [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'Contact',
      href: 'https://www.jam3.com/contact/'
    },
    {
      title: 'Accessibility',
      href: 'https://www.jam3.com/accessibility/'
    }
  ]
};

storiesOf('Footer', module).add('Default', () => <Component {...props} />);
