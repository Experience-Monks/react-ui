import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import './PageOverlay.css';

class PageOverlay extends React.PureComponent {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.closeOnRouteChange && prevProps.location.pathname !== this.props.location.pathname) {
      this.props.hideOnRouteChange && this.props.onClick();
    }
  }

  render() {
    const componentProps = {
      className: classnames('PageOverlay', this.props.className, { 'is-showing': this.props.isShowing }),
      onClick: this.props.onClick
    };

    return <div {...componentProps} />;
  }
}

PageOverlay.propTypes = checkProps({
  className: PropTypes.string,
  isShowing: PropTypes.bool,
  hideOnRouteChange: PropTypes.bool,
  onClick: PropTypes.func
});

PageOverlay.defaultProps = {
  onClick: noop,
  hideOnRouteChange: true
};

export default withRouter(PageOverlay);
