import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import './HamburgerButton.css';

import BaseButton from '../BaseButton/BaseButton';

export const STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};

const bars = [0, 1, 2].map(item => <span key={item} className={`bar ${item}`} />);

export default class HamburgerButton extends PureComponent {
  render() {
    return (
      <BaseButton
        className={classnames('HamburgerButton', this.props.className, this.props.currentState)}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onClick={this.props.onClick}
        tabIndex={this.props.tabIndex}
        aria-label={this.props.ariaLabel}
      >
        <div className="bars-container">{bars}</div>
      </BaseButton>
    );
  }
}

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
