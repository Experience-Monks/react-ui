import React, { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import styles from './VideoTimeline.module.scss';

const VideoTimeline = function({
  className,
  currentTime: currTime,
  duration,
  onTimeUpdate,
  step,
  stepFast,
  inputAriaLabel
}) {
  const inputRef = useRef();

  const [currStep, setCurrStep] = useState(step);
  const [currentTime, seCurrentTime] = useState(currTime);

  function onChange() {
    seCurrentTime(parseFloat(inputRef.current.value));
    onTimeUpdate(inputRef.current.value, inputRef.current.value / duration);
  }

  useEffect(() => {
    seCurrentTime(currTime);
  }, [currTime]);

  return (
    <div className={classnames(styles.VideoTimeline, className)}>
      <div className={styles.progress} style={{ width: (currentTime / duration) * 100 + '%' }} />
      <input
        type="range"
        ref={inputRef}
        min="0"
        max={duration}
        step={currStep}
        onChange={onChange}
        value={currentTime}
        onKeyDown={() => setCurrStep(stepFast)}
        onKeyUp={() => setCurrStep(step)}
        onBlur={() => setCurrStep(step)}
        aria-label={inputAriaLabel}
        title={inputAriaLabel}
      />
    </div>
  );
};

VideoTimeline.propTypes = checkProps({
  className: PropTypes.string,
  style: PropTypes.object,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  step: PropTypes.number,
  stepFast: PropTypes.number,
  inputAriaLabel: PropTypes.string,
  onTimeUpdate: PropTypes.func
});

VideoTimeline.defaultProps = {
  style: {},
  currentTime: 0,
  step: 0.1,
  stepFast: 5,
  inputAriaLabel: 'Seek Video',
  onTimeUpdate: noop
};

export default memo(VideoTimeline);
