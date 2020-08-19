import React, { memo, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './ImageSequence.css';

import { clamp, getViewportHeight, ctxDrawImageCover } from './utils';

// ratio: 0 - 1 (0.25)
// percentage: 0 - 100 (25%)

function ImageSequence({ className, imageUrls, heightMultiplier }) {
  const ImageSequenceElRef = useRef(null);
  const stickyContainerElRef = useRef(null);
  const canvasElRef = useRef(null);

  const activeImageOnLoad = useRef(null);
  const scrolledRatio = useRef(0);
  const canvasContextRef = useRef(null);
  const images = useRef(
    imageUrls.map(imageUrl => {
      const image = new Image();
      image.src = imageUrl;
      return image;
    })
  );

  const setCanvasSize = useCallback(() => {
    const { width, height } = stickyContainerElRef.current.getBoundingClientRect();

    canvasElRef.current.width = width;
    canvasElRef.current.height = height;
  }, []);

  const drawImage = useCallback(image => {
    ctxDrawImageCover(
      canvasContextRef.current,
      image,
      0,
      0,
      canvasElRef.current.width,
      canvasElRef.current.height,
      0.5,
      0.5
    );
  });

  const drawActiveImage = useCallback(() => {
    if (activeImageOnLoad.current) activeImageOnLoad.current.onload = null;

    const activeImageIndex = Math.round((images.current.length - 1) * scrolledRatio.current) || 0;
    const activeImage = images.current[activeImageIndex];

    if (activeImage.complete || activeImage.naturalWidth !== 0) {
      drawImage(activeImage);
    } else {
      activeImage.onload = () => {
        drawImage(activeImage);
      };
      activeImageOnLoad.current = activeImage;
    }
  }, []);

  useLayoutEffect(() => {
    canvasContextRef.current = canvasElRef.current.getContext('2d');
    canvasContextRef.current.imageSmoothingEnabled = true;

    function update() {
      const { top, height } = ImageSequenceElRef.current.getBoundingClientRect();
      scrolledRatio.current = clamp((top / (height - getViewportHeight())) * -1, 0, 1);

      setCanvasSize();
      drawActiveImage();
    }

    update();

    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.addEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className={classnames('ImageSequence', className)}
      ref={ImageSequenceElRef}
      style={{
        height: `${images.current.length * heightMultiplier}vh`
      }}
    >
      <div className="stickyContainer" ref={stickyContainerElRef}>
        <canvas className="canvas" ref={canvasElRef} />
      </div>
    </div>
  );
}

ImageSequence.propTypes = checkProps({
  className: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  heightMultiplier: PropTypes.number
});

ImageSequence.defaultProps = {
  imageUrls: [],
  heightMultiplier: 3
};

export default memo(ImageSequence);
