import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';

import './VideoControls.scss';

import PlayIcon from './assets/play.svg';
import PauseIcon from './assets/pause.svg';
import MutedIcon from './assets/muted.svg';
import UnmutedIcon from './assets/unmuted.svg';
import CaptionOnIcon from './assets/captions-on.svg';
import CaptionOffIcon from './assets/captions-off.svg';
import ExitFullscreenIcon from './assets/exit-fullscreen.svg';
import EnterFullscreenIcon from './assets/enter-fullscreen.svg';
import VideoTimeline from '../VideoTimeline/VideoTimeline';
import BaseButton from '../../BaseButton/BaseButton';

const VideoControls = ({
  className,
  duration,
  currentTime,
  isLive,
  liveLabel,
  isPlaying,
  isMuted,
  isFullScreen,
  isCaptionAvailable,
  isShowingCaptions,
  navAriaLabel,
  playIcon,
  playLabel,
  pauseIcon,
  pauseLabel,
  captionOnIcon,
  captionOnLabel,
  captionOffIcon,
  captionOffLabel,
  mutedIcon,
  unmuteLabel,
  unmutedIcon,
  muteLabel,
  exitFullscreenIcon,
  exitFullscreenLabel,
  enterFullscreenIcon,
  enterFullscreenLabel,
  onFocus,
  onBlur,
  onCaptionToggle,
  onTimeUpdate,
  onMuteToggle,
  onPlayToggle,
  onFullscreenToggle
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
    <nav className={classnames('VideoControls', className)} aria-label={navAriaLabel} onFocus={onFocus} onBlur={onBlur}>
      <BaseButton
        className="VideoControls-button"
        aria-label={isPlaying ? pauseLabel : playLabel}
        title={isPlaying ? pauseLabel : playLabel}
        onClick={onPlayToggle}
      >
        <img src={isPlaying ? pauseIcon : playIcon} alt={isPlaying ? pauseLabel : playLabel} />
      </BaseButton>

      {isLive ? (
        <div className="VideoControls-live">
          <span />
          <p>{liveLabel}</p>
        </div>
      ) : (
        <VideoTimeline duration={duration} currentTime={Number(currentTime)} onTimeUpdate={onTimeUpdate} />
      )}

      <time className="VideoControls-time">{formatTime(Number(currentTime))}</time>

      {isCaptionAvailable && (
        <BaseButton
          className="VideoControls-button"
          aria-label={isShowingCaptions ? unmuteLabel : muteLabel}
          title={isShowingCaptions ? unmuteLabel : muteLabel}
          onClick={onCaptionToggle}
        >
          <img
            src={isShowingCaptions ? captionOnIcon : captionOffIcon}
            alt={isShowingCaptions ? captionOnLabel : captionOffLabel}
          />
        </BaseButton>
      )}

      <BaseButton
        className="VideoControls-button"
        aria-label={isMuted ? unmuteLabel : muteLabel}
        title={isMuted ? unmuteLabel : muteLabel}
        onClick={onMuteToggle}
      >
        <img src={isMuted ? mutedIcon : unmutedIcon} alt={isMuted ? unmuteLabel : muteLabel} />
      </BaseButton>

      {isFullscreenAPISupported && (
        <BaseButton
          className="VideoControls-button"
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
  isLive: PropTypes.bool,
  liveLabel: PropTypes.string,
  isFullScreen: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isCaptionAvailable: PropTypes.bool,
  isShowingCaptions: PropTypes.bool,
  isMuted: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
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
  captionOnIcon: PropTypes.string,
  captionOnLabel: PropTypes.string,
  captionOffIcon: PropTypes.string,
  captionOffLabel: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPlayToggle: PropTypes.func,
  onMuteToggle: PropTypes.func,
  onCaptionToggle: PropTypes.func,
  onFullscreenToggle: PropTypes.func,
  onTimeUpdate: PropTypes.func
});

VideoControls.defaultProps = {
  isLive: false,
  isCaptionAvailable: false,
  isShowingCaptions: false,
  liveLabel: 'LIVE',
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
  captionOnIcon: CaptionOnIcon,
  captionOnLabel: 'Show Captions',
  captionOffIcon: CaptionOffIcon,
  captionOffLabel: 'Hide Captions',
  onFocus: noop,
  onBlur: noop,
  onPlayToggle: noop,
  onMuteToggle: noop,
  onCaptionToggle: noop,
  onFullscreenToggle: noop,
  onTimeUpdate: noop
};

export default memo(VideoControls);
