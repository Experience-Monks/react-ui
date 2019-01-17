import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

const BaseButton = React.memo(
  React.forwardRef((props, ref) => {
    const { component: Component, children, role: buttonRole, ...buttonProps } = props;
    const role = Component === 'button' ? buttonRole : 'button';

    return (
      <Component className={classnames('BaseButton', props.className)} ref={ref} role={role} {...buttonProps}>
        {children}
      </Component>
    );
  })
);

BaseButton.propTypes = checkProps({
  style: PropTypes.object,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
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
  onTouchStart: PropTypes.func,
  role: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  'aria-label': PropTypes.string,
  title: PropTypes.string
});

BaseButton.defaultProps = {
  component: 'button'
};

export default BaseButton;
