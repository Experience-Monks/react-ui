import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import './HamburgerButton.scss';

import BaseButton from '../BaseButton/BaseButton';

export const STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};

const bars = [0, 1, 2].map(item => <span key={item} className={`bar ${item}`} />);

const HamburgerButton = ({ className, currentState, onMouseEnter, onMouseLeave, onClick, tabIndex, ariaLabel }) => {
  return (
    <BaseButton
      className={classnames('HamburgerButton', className, currentState)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      <div className="bars-container">{bars}</div>
    </BaseButton>
  );
};

HamburgerButton.propTypes = checkProps({
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  currentState: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  ariaLabel: PropTypes.string
});

HamburgerButton.defaultProps = {
  tabIndex: 0,
  currentState: STATES.idle,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  ariaLabel: 'Mobile menu button'
};

export default memo(HamburgerButton);
