import { storiesOf } from '@storybook/react';
import { device } from '@jam3/detect';

import Rotate from './RotateScreen';

import rotateIcon from './assets/rotate.svg';

storiesOf('RotateScreen', module).add('Default', () =>
  device.phone ? <Rotate iconSrc={rotateIcon} /> : 'Enable phone device simulation and test it in landscape mode.'
);
