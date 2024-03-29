import { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './VideoTimeline.module.scss';

const VideoTimeline = function ({
  className,
  style,
  currentTime: currTime,
  duration,
  onTimeUpdate,
  step,
  stepFast,
  inputAriaLabel
}) {
  const inputRef = useRef();

  const [currentTime, seCurrentTime] = useState(currTime);
  const [currStep, setCurrStep] = useState(step);

  useEffect(() => {
    seCurrentTime(currTime);
  }, [currTime]);

  function onChange() {
    seCurrentTime(parseFloat(inputRef.current.value));
    onTimeUpdate(inputRef.current.value, inputRef.current.value / duration);
  }

  return (
    <div className={classnames(styles.VideoTimeline, className)} style={style}>
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

VideoTimeline.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  step: PropTypes.number,
  stepFast: PropTypes.number,
  inputAriaLabel: PropTypes.string,
  onTimeUpdate: PropTypes.func
};

VideoTimeline.defaultProps = {
  style: {},
  currentTime: 0,
  step: 0.1,
  stepFast: 5,
  inputAriaLabel: 'Seek Video',
  onTimeUpdate: () => {}
};

export default memo(VideoTimeline);
