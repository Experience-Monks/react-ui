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
    }),
  tooltips: [
    {
      percentPostionX: 25,
      percentPositionY: 25,
      percentVisibleStart: 20,
      percentVisibleEnd: 45,
      content: 'I am tooltip one!'
    },
    {
      percentPostionX: 50,
      percentPositionY: 50,
      percentVisibleStart: 40,
      percentVisibleEnd: 65,
      content: 'I am tooltip two!'
    },
    {
      percentPostionX: 75,
      percentPositionY: 75,
      percentVisibleStart: 60,
      percentVisibleEnd: 85,
      content: 'I am tooltip three!'
    }
  ],
  percentDrawOffsetX: 100,
  percentDrawOffsetY: 50
};

storiesOf('ImageSequence', module).addWithJSX('Default', () => <Component {...props} />);
