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
      percentPositionX: 83,
      percentPositionY: 33,
      percentVisibleStart: 0,
      percentVisibleEnd: 5,
      tooltipLabel: 'tooltip 1',
      content: 'I am tooltip one!'
    },
    {
      percentPositionX: 65,
      percentPositionY: 35,
      percentVisibleStart: 30,
      percentVisibleEnd: 60,
      tooltipLabel: 'tooltip 2',
      content: 'I am tooltip two!'
    },
    {
      percentPositionX: 45,
      percentPositionY: 45,
      percentVisibleStart: 60,
      percentVisibleEnd: 85,
      tooltipLabel: 'tooltip 3',
      content: 'I am tooltip three!'
    }
  ],
  percentDrawOffsetX: 50,
  percentDrawOffsetY: 50
};

storiesOf('ImageSequence', module).add('Default', () => (
  <div style={{ margin: '50vh 0' }}>
    <Component {...props} />
  </div>
));
