import { storiesOf } from '@storybook/react';

import Component from './BaseButton';

function handleClick() {
  console.log('Click');
}

const props = {
  title: 'Hello!',
  onClick: handleClick
};

storiesOf('BaseButton', module)
  .add('Default', () => <Component {...props}>{props.title}</Component>)
  .add('div', () => (
    <div
      style={{
        border: '1px solid #000',
        display: 'inline-block',
        padding: '3px 5px'
      }}
    >
      <Component {...props} component="div">
        {props.title}
      </Component>
    </div>
  ));
