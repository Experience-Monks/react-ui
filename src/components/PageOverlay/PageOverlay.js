import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useLocation } from 'react-router-dom';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import styles from './PageOverlay.module.scss';

const PageOverlay = ({ className, triggerOnRouteChange, isShowing, onClick }) => {
  const previousPathname = useRef('');
  const location = useLocation();

  useEffect(() => {
    if (triggerOnRouteChange && previousPathname.current && previousPathname.current !== location.pathname) {
      triggerOnRouteChange && onClick();
    }
    previousPathname.current = location.pathname;
  }, [triggerOnRouteChange, location]);

  return <div className={classnames(styles.PageOverlay, className, { 'is-showing': isShowing })} onClick={onClick} />;
};

PageOverlay.propTypes = checkProps({
  className: PropTypes.string,
  isShowing: PropTypes.bool,
  triggerOnRouteChange: PropTypes.bool,
  onClick: PropTypes.func
});

PageOverlay.defaultProps = {
  triggerOnRouteChange: false,
  onClick: noop
};

export default memo(PageOverlay);
