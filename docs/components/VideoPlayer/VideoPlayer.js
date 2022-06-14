import { useLayoutEffect, useEffect, useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import BackgroundVideo from 'react-background-video-player';
import fullscreenHandler from 'fullscreen-handler';
import classnames from 'classnames';

import styles from './VideoPlayer.module.scss';

import VideoControls from './VideoControls/VideoControls';

const VideoPlayer = ({
  className,
  style,
  src,
  preload,
  playsInline,
  crossOrigin,
  poster,
  loop,
  muted,
  captions,
  autoPlay,
  volume,
  togglePlayOnClick,
  windowWidth,
  windowHeight,
  startTime,
  allowKeyboardControl,
  showControlsOnLoad,
  hasControls,
  autoPlayDelay,
  disableBackgroundCover,
  controlsTimeout,
  onEnd,
  playIcon,
  pauseIcon,
  mutedIcon,
  unmutedIcon,
  exitFullscreenIcon,
  enterFullscreenIcon,
  captionsOnIcon,
  captionsOffIcon
}) => {
  const container = useRef();
  const fullScreen = useRef();
  const controls = useRef();
  const captionsContainer = useRef();
  const trackRef = useRef();
  const autoPlayTimeout = useRef();
  const hideControlsTimeout = useRef();
  const VideoRef = useRef();

  const [containerSize, setContainerSize] = useState({ width: windowWidth || 0, height: windowHeight || 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowingControls, setIsShowingControls] = useState(showControlsOnLoad);
  const [isShowingCaptions, setIsShowingCaptions] = useState(captions && captions.default);
  const [currentCaptions, setCurrentCaptions] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    fullScreen.current = fullscreenHandler(container.current, onEnterFullScreen, onExitFullScreen);
    controls.current = container.current.querySelector('.VideoControls');

    if (hasControls) {
      showControlsOnLoad ? setHideControlsTimeout() : hideControls();
    }

    if (autoPlay) {
      autoPlayTimeout.current = setTimeout(() => {
        play();
        clearAutoPlayTimeout();
      }, autoPlayDelay * 1000);
    }

    return () => {
      pause();
      isFullScreen && fullScreen.current.exit();

      clearAutoPlayTimeout();
      clearHideControlsTimeout();
      fullScreen.current.destroy();
      trackRef.current && trackRef.current.removeEventListener('cuechange', onTrackChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setContainerSize({ width: windowWidth, height: windowHeight });
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    if (isPlaying) {
      onPlay();
      hasControls && setHideControlsTimeout();
    } else {
      onPause();
      if (hasControls && progress) {
        clearHideControlsTimeout();
        showControls();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    setCaptions(captions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captions]);

  function showControls() {
    !isShowingControls && setIsShowingControls(true);
  }

  function hideControls() {
    isShowingControls && setIsShowingControls(false);
  }

  function play() {
    !isPlaying && VideoRef.current.play();
  }

  function pause() {
    isPlaying && VideoRef.current.pause();
  }

  function mute() {
    !isMuted && VideoRef.current.mute();
  }

  function unmute() {
    isMuted && VideoRef.current.unmute();
  }

  function togglePlay() {
    VideoRef.current.togglePlay();
  }

  function toggleMute() {
    VideoRef.current.toggleMute();
  }

  function toggleFullscreen() {
    isFullScreen ? fullScreen.current.exit() : fullScreen.current.enter();
  }

  function toggleCaptions() {
    setIsShowingCaptions(!isShowingCaptions);
  }

  function setCaptions(captions) {
    if (!captions) return;

    const video = VideoRef.current.video;
    if (video.contains(trackRef.current)) {
      video.removeChild(trackRef.current);
      trackRef.current.removeEventListener('cuechange', onTrackChange);
    }

    const track = document.createElement('track');
    track.kind = captions.kind;
    track.label = captions.label;
    track.srclang = captions.srclang;
    track.default = captions.default;
    track.src = captions.src;
    track.mode = 'hidden';

    trackRef.current = track;
    video.appendChild(track);
    video.textTracks[0].mode = 'hidden';
    track.style.display = 'none';

    trackRef.current.addEventListener('cuechange', onTrackChange);
  }

  function clearHideControlsTimeout() {
    hideControlsTimeout.current && clearTimeout(hideControlsTimeout.current);
  }

  function clearAutoPlayTimeout() {
    autoPlayTimeout.current && clearTimeout(autoPlayTimeout.current);
  }

  function setHideControlsTimeout() {
    clearHideControlsTimeout();
    hideControlsTimeout.current = setTimeout(() => {
      isPlaying && hideControls();
    }, controlsTimeout * 1000);
  }

  function updateTime(currentTime) {
    VideoRef.current.setCurrentTime(Number(currentTime));
  }

  function onReady(duration) {
    if (captions) {
      captions.src && setCaptions(captions);
    }
    setDuration(duration);
  }

  function onTrackChange() {
    const trackList = VideoRef.current.video.textTracks;
    const textTracks = trackList && trackList.length > 0 ? trackList[0] : null;
    const cue =
      textTracks && textTracks.activeCues && textTracks.activeCues.length > 0 ? textTracks.activeCues[0] : null;
    const text = cue ? cue.text : '';
    setCurrentCaptions(text);
  }

  function onEnterFullScreen() {
    setIsFullScreen(true);
  }

  function onExitFullScreen() {
    setIsFullScreen(false);
  }

  function onPlay() {
    setIsPlaying(true);
  }

  function onPause() {
    setIsPlaying(false);
  }

  function onTimeUpdate(currentTime, progress, duration) {
    setCurrentTime(currentTime);
    setDuration(duration);
    setProgress(progress);
  }

  function onMute() {
    setIsMuted(true);
  }

  function onUnmute() {
    setIsMuted(false);
  }

  function onVideoEnd() {
    onEnd();
    isFullScreen && fullScreen.current.exit();
  }

  function onMouseMove() {
    if (hasControls) {
      showControls();
      isPlaying && setHideControlsTimeout();
    }
  }

  function onKeyPress(e) {
    if (allowKeyboardControl) {
      const event = e.keyCode || e.which || e.charCode;
      if (event === 32) {
        togglePlay();
      }
    }
  }

  function onControlsFocus() {
    if (hasControls) {
      showControls();
      clearHideControlsTimeout();
    }
  }

  function onControlsBlur() {
    if (hasControls) {
      clearHideControlsTimeout();
      isPlaying && setHideControlsTimeout();
    }
  }

  return (
    <div
      className={classnames(styles.VideoPlayer, className, {
        [styles.showControls]: isShowingControls,
        [styles.showCaptions]: isShowingCaptions
      })}
      style={style}
      ref={container}
      onMouseMove={onMouseMove}
    >
      <BackgroundVideo
        ref={VideoRef}
        src={src}
        containerWidth={containerSize.width}
        containerHeight={containerSize.height}
        autoPlay={false}
        poster={poster}
        muted={muted}
        loop={loop}
        disableBackgroundCover={disableBackgroundCover}
        preload={preload}
        playsInline={playsInline}
        volume={volume}
        startTime={startTime}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        onMute={onMute}
        onUnmute={onUnmute}
        onEnd={onVideoEnd}
        onClick={togglePlayOnClick ? togglePlay : () => {}}
        onKeyPress={onKeyPress}
        tabIndex={allowKeyboardControl ? 0 : null}
        extraVideoElementProps={{ crossOrigin }}
      />

      {captions && (
        <div className={styles.captionsContainer} ref={captionsContainer}>
          {currentCaptions && <p>{currentCaptions}</p>}
        </div>
      )}

      {hasControls && (
        <VideoControls
          className={styles.controls}
          captions={Boolean(captions)}
          currentTime={Number(currentTime)}
          isPlaying={isPlaying}
          isMuted={isMuted}
          isFullScreen={isFullScreen}
          isShowingCaptions={isShowingCaptions}
          duration={duration}
          onPlayToggle={togglePlay}
          onMuteToggle={toggleMute}
          onFullscreenToggle={toggleFullscreen}
          onCaptionsToggle={toggleCaptions}
          onTimeUpdate={updateTime}
          playIcon={playIcon}
          pauseIcon={pauseIcon}
          mutedIcon={mutedIcon}
          unmutedIcon={unmutedIcon}
          exitFullscreenIcon={exitFullscreenIcon}
          enterFullscreenIcon={enterFullscreenIcon}
          captionsOnIcon={captionsOnIcon}
          captionsOffIcon={captionsOffIcon}
          onFocus={onControlsFocus}
          onBlur={onControlsBlur}
        />
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  preload: PropTypes.string,
  captions: PropTypes.object,
  disableBackgroundCover: PropTypes.bool,
  allowKeyboardControl: PropTypes.bool,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  togglePlayOnClick: PropTypes.bool,
  showControlsOnLoad: PropTypes.bool,
  hasControls: PropTypes.bool,
  playsInline: PropTypes.bool,
  autoPlayDelay: PropTypes.number,
  controlsTimeout: PropTypes.number,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  volume: PropTypes.number,
  startTime: PropTypes.number,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnd: PropTypes.func,
  playIcon: PropTypes.string,
  pauseIcon: PropTypes.string,
  mutedIcon: PropTypes.string,
  unmutedIcon: PropTypes.string,
  exitFullscreenIcon: PropTypes.string,
  enterFullscreenIcon: PropTypes.string,
  captionsOnIcon: PropTypes.string,
  captionsOffIcon: PropTypes.string,
  crossOrigin: PropTypes.string
};

VideoPlayer.defaultProps = {
  style: {},
  togglePlayOnClick: true,
  allowKeyboardControl: true,
  autoPlay: false,
  autoPlayDelay: 0, // in seconds
  muted: false,
  loop: false,
  hasControls: true,
  controlsTimeout: 2.5, // in seconds
  showControlsOnLoad: true,
  disableBackgroundCover: true,
  preload: 'auto',
  playsInline: true,
  volume: 1,
  startTime: 0, // in seconds
  crossOrigin: 'anonymous',
  onPlay: () => {},
  onPause: () => {},
  onEnd: () => {}
};

export default memo(VideoPlayer);
