import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './BaseButton';

function handleClick() {
  console.log('Click');
}

function handleMouseMove() {
  console.log('Move');
}

storiesOf('Button', module).add(
  'Default',
  () => (
    <Component onClick={handleClick} onMouseMove={handleMouseMove}>
      Hello
    </Component>
  ),
  { notes: 'This is a button' }
);
