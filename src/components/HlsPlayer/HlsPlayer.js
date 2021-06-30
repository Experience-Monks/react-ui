import React, { useLayoutEffect, useEffect, useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import fullscreenHandler from 'fullscreen-handler';
import classnames from 'classnames';
import noop from 'no-op';
import checkProps from '@jam3/react-check-extra-props';
import Hls from 'hls.js';

import './HlsPlayer.scss';

import VideoControls from './VideoControls/VideoControls';

const HlsPlayer = ({
  className,
  poster,
  streamSrc,
  crossOrigin,
  isLive,
  playsInline,
  loop,
  muted,
  autoPlay,
  togglePlayOnClick,
  allowKeyboardControl,
  controlsTimeout,
  captions,
  onEnd
}) => {
  const trackRef = useRef();
  const controlsRef = useRef();
  const containerRef = useRef();
  const videoRef = useRef();
  const captionsContainerRef = useRef();

  const hls = useRef();
  const isStreamReady = useRef(false);
  const fullScreen = useRef();
  const hideControlsTimeout = useRef();

  const [isMuted, setIsMuted] = useState(autoPlay || muted);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowingControls, setIsShowingControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentCaptions, setCurrentCaptions] = useState('');
  const [isShowingCaptions, setIsShowingCaptions] = useState(captions && captions.default);

  // NOTE: controls
  function showControls() {
    !isShowingControls && setIsShowingControls(true);
  }

  function hideControls() {
    isShowingControls && setIsShowingControls(false);
  }

  function clearHideControlsTimeout() {
    hideControlsTimeout.current && clearTimeout(hideControlsTimeout.current);
  }

  function setHideControlsTimeout() {
    clearHideControlsTimeout();
    hideControlsTimeout.current = setTimeout(() => {
      !videoRef.current.paused && hideControls();
    }, controlsTimeout);
  }

  function handleControlsFocus() {
    showControls();
    clearHideControlsTimeout();
  }

  function handleControlsBlur() {
    clearHideControlsTimeout();
    !videoRef.current.paused && setHideControlsTimeout();
  }

  // NOTE: audio/sound
  function handleToggleMute() {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }

  // NOTE: play/pause
  function videoPlay() {
    videoRef.current.paused && videoRef.current.play();
    setIsPlaying(true);
  }

  function videoPause() {
    !videoRef.current.paused && videoRef.current.pause();
    setIsPlaying(false);
  }

  function handleTogglePlay() {
    if (!isStreamReady.current || !togglePlayOnClick) return;

    if (!videoRef.current.paused) {
      videoPause();

      if (progress) {
        clearHideControlsTimeout();
        showControls();
      }
    } else {
      videoPlay();
      setHideControlsTimeout();
    }
  }

  function handleVideoEnd() {
    onEnd();
    isFullScreen && fullScreen.current.exit();
  }

  // NOTE: fullscreen
  function handleToggleFullscreen() {
    isFullScreen ? fullScreen.current.exit() : fullScreen.current.enter();
  }

  function handleEnterFullScreen() {
    setIsFullScreen(true);
  }

  function handleExitFullScreen() {
    setIsFullScreen(false);
  }

  // NOTE: timeline
  function handleUpdateTime(currentTime) {
    videoRef.current.currentTime = Number(currentTime);
  }

  function handleTimeUpdate() {
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    const progress = currentTime / duration;
    setCurrentTime(currentTime);
    setDuration(duration);
    setProgress(progress);
  }

  // NOTE: remaining events handlers
  function handleMouseMove() {
    showControls();
    !videoRef.current.paused && setHideControlsTimeout();
  }

  function handleKeyPress(e) {
    if (allowKeyboardControl) {
      const event = e.keyCode || e.which || e.charCode;
      if (event === 32) {
        handleTogglePlay();
      }
    }
  }

  // NOTE: captions
  function onTrackChange() {
    const trackList = videoRef.current.textTracks;
    const textTracks = trackList && trackList.length > 0 ? trackList[0] : null;
    const cue =
      textTracks && textTracks.activeCues && textTracks.activeCues.length > 0 ? textTracks.activeCues[0] : null;
    const text = cue ? cue.text : '';
    setCurrentCaptions(text);
  }

  function handleToggleCaption() {
    setIsShowingCaptions(!isShowingCaptions);
  }

  function setCaptions(captions) {
    if (!captions) return;

    const video = videoRef.current;
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

  function handleLoadedData(event) {
    if (captions) {
      captions.src && setCaptions(captions);
    }
    setDuration(event.target.duration);
  }

  useEffect(() => {
    setCaptions(captions);
  }, [captions]);

  // NOTE: hls init
  useEffect(() => {
    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = streamSrc;
      isStreamReady.current = true;
      videoPlay();
      setHideControlsTimeout();
    } else if (Hls.isSupported()) {
      hls.current = new Hls();
      hls.current.attachMedia(videoRef.current);
      hls.current.on(Hls.Events.MEDIA_ATTACHED, function() {
        hls.current.loadSource(streamSrc);
        hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
          isStreamReady.current = true;

          if (autoPlay) {
            videoRef.current.muted = true;
            videoPlay();
            setHideControlsTimeout();
          }
        });
      });
    }

    return () => {
      hls.current?.destroy();
    };
  }, [streamSrc]);

  // NOTE: general init
  useLayoutEffect(() => {
    fullScreen.current = fullscreenHandler(containerRef.current, handleEnterFullScreen, handleExitFullScreen);
    controlsRef.current = containerRef.current.querySelector('.VideoControls');

    return () => {
      videoPause();
      clearHideControlsTimeout();

      isFullScreen && fullScreen.current.exit();
      fullScreen.current.destroy();

      trackRef.current && trackRef.current.removeEventListener('cuechange', onTrackChange);
    };
  }, []);

  return (
    <div
      className={classnames('HlsPlayer', className, {
        'show-controls': isShowingControls,
        'show-captions': isShowingCaptions
      })}
      tabIndex="0"
      onKeyPress={handleKeyPress}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <video
        src={null}
        controls={false}
        poster={poster}
        loop={loop}
        muted={isMuted}
        autoPlay={autoPlay}
        playsInline={playsInline}
        onEnded={handleVideoEnd}
        onClick={handleTogglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        crossOrigin={crossOrigin}
        ref={videoRef}
      />

      {captions && (
        <div className="HlsPlayer-captions-container" ref={captionsContainerRef}>
          {currentCaptions && <p>{currentCaptions}</p>}
        </div>
      )}

      <VideoControls
        isLive={isLive}
        isMuted={isMuted}
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        isCaptionAvailable={Boolean(captions)}
        isShowingCaptions={isShowingCaptions}
        currentTime={Number(currentTime)}
        duration={duration}
        onBlur={handleControlsBlur}
        onFocus={handleControlsFocus}
        onTimeUpdate={handleUpdateTime}
        onPlayToggle={handleTogglePlay}
        onMuteToggle={handleToggleMute}
        onCaptionToggle={handleToggleCaption}
        onFullscreenToggle={handleToggleFullscreen}
      />
    </div>
  );
};

HlsPlayer.propTypes = checkProps({
  className: PropTypes.string,
  poster: PropTypes.string,
  streamSrc: PropTypes.string,
  crossOrigin: PropTypes.string,
  isLive: PropTypes.bool,
  loop: PropTypes.bool,
  muted: PropTypes.bool,
  autoPlay: PropTypes.bool,
  playsInline: PropTypes.bool,
  controlsTimeout: PropTypes.number,
  togglePlayOnClick: PropTypes.bool,
  allowKeyboardControl: PropTypes.bool,
  captions: PropTypes.shape({
    default: PropTypes.bool,
    kind: PropTypes.string,
    label: PropTypes.string,
    srclang: PropTypes.string,
    src: PropTypes.string
  }),
  onEnd: PropTypes.func
});

HlsPlayer.defaultProps = {
  poster: null,
  streamSrc: null,
  crossOrigin: 'anonymous',
  isLive: false,
  loop: false,
  muted: false,
  autoPlay: true,
  playsInline: true,
  controlsTimeout: 2500, // in ms
  togglePlayOnClick: true,
  allowKeyboardControl: true,
  onEnd: noop
};

export default memo(HlsPlayer);
