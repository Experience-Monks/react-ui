import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Component from './HamburgerButton';

const STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};

let idleToCloseState = STATES.idle;
let idleToBackState = STATES.back;
let closeToBackState = STATES.close;

const HamburgerButtonTest = props => {
  const [currentState, setCurrentState] = useState(props.currentState);

  return <Component currentState={currentState} onClick={() => setCurrentState(props.onClick())} />;
};

function onIdleClick() {
  idleToCloseState = idleToCloseState === STATES.idle ? STATES.close : STATES.idle;
  return idleToCloseState;
}

function onCloseClick() {
  closeToBackState = closeToBackState === STATES.close ? STATES.back : STATES.close;
  return closeToBackState;
}

function onBackClick() {
  idleToBackState = idleToBackState === STATES.back ? STATES.idle : STATES.back;
  return idleToBackState;
}

storiesOf('HamburgerButton', module)
  .add('Idle <-> Close', () => <HamburgerButtonTest currentState={STATES.idle} onClick={onIdleClick} />)
  .add('Close <-> Back', () => <HamburgerButtonTest currentState={STATES.close} onClick={onCloseClick} />)
  .add('Back <-> Idle', () => <HamburgerButtonTest currentState={STATES.back} onClick={onBackClick} />);
