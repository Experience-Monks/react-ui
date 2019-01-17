import React from 'react';
import { storiesOf } from '@storybook/react';

import CloseButton from './CloseButton';

function handleClick() {
  console.log('Click');
}

function handleMouseMove() {
  console.log('Move');
}

storiesOf('CloseButton', module).addWithJSX('Default', () => (
  <CloseButton onClick={handleClick} onMouseMove={handleMouseMove} aria-label="Test Aria Label">
    Hello
  </CloseButton>
));
