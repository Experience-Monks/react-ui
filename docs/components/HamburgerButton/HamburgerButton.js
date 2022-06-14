import { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './HamburgerButton.module.scss';

import BaseButton from '../BaseButton/BaseButton';

export const STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};

const bars = [0, 1, 2].map((item) => <span key={item} className={styles.bar} />);

const HamburgerButton = ({ className, currentState, onMouseEnter, onMouseLeave, onClick, tabIndex, ariaLabel }) => {
  return (
    <BaseButton
      className={classnames(styles.HamburgerButton, className, styles[currentState])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      <div className={styles.barsContainer}>{bars}</div>
    </BaseButton>
  );
};

HamburgerButton.propTypes = {
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  currentState: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  ariaLabel: PropTypes.string
};

HamburgerButton.defaultProps = {
  tabIndex: 0,
  currentState: STATES.idle,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  ariaLabel: 'Menu button'
};

export default memo(HamburgerButton);
