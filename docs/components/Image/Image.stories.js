import { storiesOf } from '@storybook/react';

import Component from './Image';

const props = {
  src: 'https://assets.imgix.net/unsplash/mountains.jpg'
};

storiesOf('Image', module)
  .add('Default', () => <Component {...props} />)
  .add('Scrollable', () => (
    <>
      <div style={{ marginBottom: 1000, fontSize: 22 }}>Scroll down to see image &darr;</div>
      <Component {...props} />
    </>
  ));
