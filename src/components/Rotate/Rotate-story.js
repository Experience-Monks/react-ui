import React from 'react';
import { storiesOf } from '@storybook/react';

import Rotate from './Rotate';

import rotateIcon from './assets/rotate.svg';

storiesOf('Rotate', module).addWithJSX('Default', () => <Rotate iconSrc={rotateIcon} />);
