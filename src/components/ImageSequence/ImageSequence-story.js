import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './ImageSequence';

const props = {
  className: 'test',
  imageUrls: Array(140)
    .fill()
    .map((item, index) => {
      return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/05-flip-for-nc/${index
        .toString()
        .padStart(4, '0')}.jpg`;
    })
};

storiesOf('ImageSequence', module).addWithJSX('Default', () => <Component {...props} />);
