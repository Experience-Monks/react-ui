import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import checkProps from '../../util/check-props';
import * as styles from './CloseButton.css';

console.log(styles)

export class CloseButton extends React.PureComponent {
  render() {
    const { className, component, ...buttonProps } = this.props;
    const Component = component;

    return (
      <Component
        className={classnames('CloseButton', className)}
        {...buttonProps}
      >
        <span />
        <span />
      </Component>
    );
  }
}

CloseButton.propTypes = checkProps({
  style: PropTypes.object,
  className: PropTypes.string,
  nodeRef: PropTypes.func,
  children: PropTypes.node,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  'aria-label': PropTypes.string
});

CloseButton.defaultProps = {
  component: 'button'
};

export default CloseButton;
