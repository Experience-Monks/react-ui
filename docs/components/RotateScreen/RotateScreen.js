import React, { memo, useLayoutEffect, useRef } from 'react';
import { useOrientation } from 'react-use';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'default-passive-events';
import checkProps from '@jam3/react-check-extra-props';
import { device } from '@jam3/detect';

import './RotateScreen.scss';

const RotateScreen = ({ className, iconSrc, iconAlt, copy, children }) => {
  const containerRef = useRef();
  const orientation = useOrientation();

  useLayoutEffect(() => {
    containerRef.current.addEventListener('touchmove', preventScrolling, { passive: false });
    console.log(containerRef.current);

    return () => {
      containerRef.current.removeEventListener('touchmove', preventScrolling);
    };
  }, []);

  function preventScrolling(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div
      className={classnames('RotateScreen', className, { show: device.isMobile && orientation.angle !== 0 })}
      ref={containerRef}
    >
      <div className="container">
        {iconSrc && <img src={iconSrc} className="rotate-icon" alt={iconAlt} />}
        {copy && <p className="rotate-text">{copy}</p>}
        {children}
      </div>
    </div>
  );
};

RotateScreen.propTypes = checkProps({
  className: PropTypes.string,
  copy: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string
});

RotateScreen.defaultProps = {
  className: '',
  copy: 'Please rotate your device into portrait mode.',
  iconAlt: 'Please rotate your device'
};

export default memo(RotateScreen);
