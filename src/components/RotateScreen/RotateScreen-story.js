import React from 'react';
import { storiesOf } from '@storybook/react';

import Rotate from './RotateScreen';

import rotateIcon from './assets/rotate.svg';

storiesOf('RotateScreen', module).addWithJSX('Default', () => <Rotate iconSrc={rotateIcon} />);
