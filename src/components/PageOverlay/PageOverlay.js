import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import './PageOverlay.scss';

const PageOverlay = ({ className, closeOnRouteChange, isShowing, location, onClick, isMobileMenuOpen }) => {
  const previousPathname = useRef('');

  useEffect(() => {
    if (closeOnRouteChange && previousPathname.current !== location.pathname) {
      isMobileMenuOpen && setIsMobileMenuOpen(false);
    }
    previousPathname.current = location.pathname;

    return () => {
      isMobileMenuOpen && setIsMobileMenuOpen(false);
    };
  }, [isMobileMenuOpen, closeOnRouteChange, location]);

  return <div className={classnames('PageOverlay', className, { 'is-showing': isShowing })} onClick={onClick} />;
};

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

export default withRouter(memo(PageOverlay));
