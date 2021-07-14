import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import styles from './VideoControls.module.scss';

import PlayIcon from './assets/play.svg';
import PauseIcon from './assets/pause.svg';
import MutedIcon from './assets/muted.svg';
import UnmutedIcon from './assets/unmuted.svg';
import ExitFullscreenIcon from './assets/exit-fullscreen.svg';
import EnterFullscreenIcon from './assets/enter-fullscreen.svg';
import CaptionsOnIcon from './assets/captions-on.svg';
import CaptionsOffIcon from './assets/captions-off.svg';

import VideoTimeline from '../VideoTimeline/VideoTimeline';
import BaseButton from '../../BaseButton/BaseButton';

const VideoControls = ({
  className,
  duration,
  currentTime,
  onPlayToggle,
  isPlaying,
  onTimeUpdate,
  captions,
  isShowingCaptions,
  onCaptionsToggle,
  isMuted,
  onMuteToggle,
  isFullScreen,
  onFullscreenToggle,
  navAriaLabel,
  playIcon,
  playLabel,
  pauseIcon,
  pauseLabel,
  captionsOnIcon,
  captionsHideLabel,
  captionsOffIcon,
  captionsShowLabel,
  mutedIcon,
  unmuteLabel,
  unmutedIcon,
  muteLabel,
  exitFullscreenIcon,
  exitFullscreenLabel,
  enterFullscreenIcon,
  enterFullscreenLabel,
  onFocus,
  onBlur
}) => {
  function formatTime(totalSeconds) {
    const totalSecondsFloat = totalSeconds;
    let minutes = Math.floor(totalSecondsFloat / 60);
    let seconds = Math.round(totalSecondsFloat - minutes * 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  const isFullscreenAPISupported = useMemo(() => {
    return (
      document.body.requestFullScreen ||
      document.body.requestFullscreen ||
      document.body.mozRequestFullScreen ||
      document.body.webkitRequestFullscreen ||
      document.body.webkitEnterFullScreen ||
      document.body.msRequestFullscreen
    );
  }, []);

  return (
    <nav
      className={classnames(styles.VideoControls, className)}
      aria-label={navAriaLabel}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <BaseButton
        className={styles.button}
        aria-label={isPlaying ? pauseLabel : playLabel}
        title={isPlaying ? pauseLabel : playLabel}
        onClick={onPlayToggle}
      >
        <img src={isPlaying ? pauseIcon : playIcon} alt={isPlaying ? pauseLabel : playLabel} />
      </BaseButton>

      <VideoTimeline duration={duration} currentTime={Number(currentTime)} onTimeUpdate={onTimeUpdate} />

      <time className={styles.time}>{formatTime(Number(currentTime))}</time>

      {captions && (
        <BaseButton
          className={styles.button}
          aria-label={isShowingCaptions ? captionsHideLabel : captionsShowLabel}
          title={isShowingCaptions ? captionsHideLabel : captionsShowLabel}
          onClick={onCaptionsToggle}
        >
          <img
            src={isShowingCaptions ? captionsOnIcon : captionsOffIcon}
            alt={isShowingCaptions ? captionsHideLabel : captionsShowLabel}
          />
        </BaseButton>
      )}

      <BaseButton
        className={styles.button}
        aria-label={isMuted ? unmuteLabel : muteLabel}
        title={isMuted ? unmuteLabel : muteLabel}
        onClick={onMuteToggle}
      >
        <img src={isMuted ? mutedIcon : unmutedIcon} alt={isMuted ? unmuteLabel : muteLabel} />
      </BaseButton>

      {isFullscreenAPISupported && (
        <BaseButton
          className={styles.button}
          aria-label={isFullScreen ? exitFullscreenLabel : enterFullscreenLabel}
          title={isFullScreen ? exitFullscreenLabel : enterFullscreenLabel}
          onClick={onFullscreenToggle}
        >
          <img
            src={isFullScreen ? exitFullscreenIcon : enterFullscreenIcon}
            alt={isFullScreen ? exitFullscreenLabel : enterFullscreenLabel}
          />
        </BaseButton>
      )}
    </nav>
  );
};

VideoControls.propTypes = checkProps({
  className: PropTypes.string,
  captions: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isMuted: PropTypes.bool,
  isShowingCaptions: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  onPlayToggle: PropTypes.func,
  onMuteToggle: PropTypes.func,
  onFullscreenToggle: PropTypes.func,
  onCaptionsToggle: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  navAriaLabel: PropTypes.string,
  playIcon: PropTypes.string,
  playLabel: PropTypes.string,
  pauseIcon: PropTypes.string,
  pauseLabel: PropTypes.string,
  mutedIcon: PropTypes.string,
  unmuteLabel: PropTypes.string,
  unmutedIcon: PropTypes.string,
  muteLabel: PropTypes.string,
  exitFullscreenIcon: PropTypes.string,
  exitFullscreenLabel: PropTypes.string,
  enterFullscreenIcon: PropTypes.string,
  enterFullscreenLabel: PropTypes.string,
  captionsOnIcon: PropTypes.string,
  captionsHideLabel: PropTypes.string,
  captionsOffIcon: PropTypes.string,
  captionsShowLabel: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
});

VideoControls.defaultProps = {
  onPlayToggle: noop,
  onMuteToggle: noop,
  onFullscreenToggle: noop,
  onCaptionsToggle: noop,
  onTimeUpdate: noop,
  onFocus: noop,
  onBlur: noop,
  navAriaLabel: 'Video Controls',
  playIcon: PlayIcon,
  playLabel: 'Play Video',
  pauseIcon: PauseIcon,
  pauseLabel: 'Pause Video',
  mutedIcon: MutedIcon,
  unmuteLabel: 'Unmute Video',
  unmutedIcon: UnmutedIcon,
  muteLabel: 'Mute Video',
  exitFullscreenIcon: ExitFullscreenIcon,
  exitFullscreenLabel: 'Exit Fullscreen Mode',
  enterFullscreenIcon: EnterFullscreenIcon,
  enterFullscreenLabel: 'Enter Fullscreen Mode',
  captionsOnIcon: CaptionsOnIcon,
  captionsHideLabel: 'Hide Captions',
  captionsOffIcon: CaptionsOffIcon,
  captionsShowLabel: 'Show Captions'
};

export default memo(VideoControls);
