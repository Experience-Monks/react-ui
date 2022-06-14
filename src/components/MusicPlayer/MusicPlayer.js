import { forwardRef, memo, useImperativeHandle, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';

import detect from '@jam3/detect';

import styles from './MusicPlayer.module.scss';

const MusicPlayer = forwardRef(({ className, src, isPlaying = false, isLooping = true }, ref) => {
  const audioRef = useRef < HTMLAudioElement > null;

  const handleVisibilityChange = useCallback(() => {
    if (!isPlaying) return;

    if (document.hidden) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (detect.device.desktop) return;

    const unlockSound = () => {
      audioRef.current?.play();
      audioRef.current?.pause();
      window.removeEventListener('click', unlockSound);
      window.removeEventListener('touchstart', unlockSound);
    };

    window.addEventListener('click', unlockSound);
    window.addEventListener('touchstart', unlockSound);

    return () => {
      window.removeEventListener('click', unlockSound);
      window.removeEventListener('touchstart', unlockSound);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange, false);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    }
  }, [isPlaying]);

  useImperativeHandle(ref, () => ({
    audioEl: audioRef.current
  }));

  return (
    <div className={classnames(styles.MusicPlayer, className)}>
      <audio ref={audioRef} src={src} loop={isLooping} />
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default memo(MusicPlayer);
