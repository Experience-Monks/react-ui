import React from 'react';
import { storiesOf } from '@storybook/react';
import 'default-passive-events';

import HlsPlayer from './HlsPlayer';

const captions = {
  kind: 'captions',
  label: 'English',
  srclang: 'en',
  default: true, // hide by default
  src: 'http://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt'
};
const poster = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';
const regular = { width: '720px', height: '405px' };

storiesOf('HlsPlayer', module)
  //
  .add('Video On Demand', () => (
    <div style={regular}>
      <HlsPlayer captions={captions} streamSrc={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} poster={poster} />
    </div>
  ))
  .add('LiveStream', () => (
    <div style={regular}>
      <HlsPlayer
        streamSrc={'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8'}
        poster={poster}
        isLive={true}
      />
    </div>
  ));
