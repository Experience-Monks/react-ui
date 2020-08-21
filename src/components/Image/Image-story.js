import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './Image';

const props = {
  src: 'https://assets.imgix.net/unsplash/mountains.jpg'
};

storiesOf('Image', module).addWithJSX('Default', () => <Component {...props} />);
