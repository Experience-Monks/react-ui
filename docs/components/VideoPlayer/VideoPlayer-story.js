import React, { useLayoutEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import 'default-passive-events';

import VideoPlayer from './VideoPlayer';

const poster = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';
const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

const captions = {
  kind: 'captions',
  label: 'English',
  srclang: 'en',
  default: true, // hide by default
  src: 'http://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt'
};

const full = { width: '100vw', height: '100vh' };
const regular = { width: '720px', height: '306px' };

function VideoTest(props) {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleResize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  return <VideoPlayer {...props} windowWidth={windowSize.width} windowHeight={windowSize.height} />;
}

storiesOf('VideoPlayer', module)
  .add('Cover Video + Controls', () => (
    <VideoTest
      src={src}
      poster={poster}
      style={full}
      disableBackgroundCover={false}
      startTime={20}
      captions={captions}
    />
  ))
  .add('Looping Cover Video', () => (
    <VideoTest
      src={src}
      poster={poster}
      autoPlay={true}
      loop={true}
      muted={true}
      hasControls={false}
      style={full}
      togglePlayOnClick={false}
      disableBackgroundCover={false}
      allowKeyboardControl={false}
    />
  ))
  .add('Basic player', () => <VideoTest src={src} poster={poster} style={regular} />);
