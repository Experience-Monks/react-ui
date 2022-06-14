import { memo, useLayoutEffect, useRef, useCallback } from 'react';
import { useOrientation } from 'react-use';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { device } from '@jam3/detect';

import styles from './RotateScreen.module.scss';

const RotateScreen = ({ className, iconSrc, iconAlt, copy }) => {
  const containerRef = useRef();
  const orientation = useOrientation();

  const preventScrolling = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    container.addEventListener('touchmove', preventScrolling, { passive: false });

    return () => {
      container.removeEventListener('touchmove', preventScrolling);
    };
  }, [preventScrolling]);

  return (
    <div
      className={classnames(styles.RotateScreen, className, {
        [styles.show]: device.phone && orientation.angle !== 0
      })}
      ref={containerRef}
    >
      <div className={styles.container}>
        {iconSrc && <img src={iconSrc} className={styles.rotateIcon} alt={iconAlt} />}
        {copy && <p className={styles.rotateText}>{copy}</p>}
      </div>
    </div>
  );
};

RotateScreen.propTypes = {
  className: PropTypes.string,
  copy: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string
};

RotateScreen.defaultProps = {
  copy: 'Please rotate your device into portrait mode.',
  iconAlt: 'Please rotate your device'
};

export default memo(RotateScreen);
