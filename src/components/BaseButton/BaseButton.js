import { memo, forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './BaseButton.module.scss';

const BaseButton = forwardRef(({ className, component: Component, children, ...buttonProps }, ref) => {
  const currRole = useMemo(() => (Component === 'button' ? null : 'button'), [Component]);
  return (
    <Component className={classnames(styles.BaseButton, className)} ref={ref} role={currRole} {...buttonProps}>
      {children}
    </Component>
  );
});

BaseButton.propTypes = {
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  'aria-label': PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func
};

BaseButton.defaultProps = {
  component: 'button'
};

export default memo(BaseButton);
