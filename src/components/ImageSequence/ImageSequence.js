import React, { memo, useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './ImageSequence.css';

import { clamp, getViewportHeight, drawImageCoverDimensions, isImageLoaded } from './utils';

const IMAGE_LOAD_GAP = 4;

// Terminology
// Ratio: 0 - 1 (0.25)
// Percentage: 0 - 100 (25%)

function ImageSequence({ className, imageUrls, heightMultiplier, tooltips, percentDrawOffsetX, percentDrawOffsetY }) {
  const ImageSequenceElRef = useRef(null);
  const stickyContainerElRef = useRef(null);
  const canvasElRef = useRef(null);
  const tooltipElsRef = useRef([]);

  const activeImageOnLoadRef = useRef(null);
  const scrolledRatioRef = useRef(0);
  const canvasContextRef = useRef(null);
  const imagesRef = useRef(
    imageUrls.map((imageUrl, index) => {
      const image = new Image();
      image.dataSrc = imageUrl;
      if (index % IMAGE_LOAD_GAP === 0) image.src = image.dataSrc;
      return image;
    })
  );

  const setCanvasSize = useCallback(() => {
    const { width, height } = stickyContainerElRef.current.getBoundingClientRect();

    canvasElRef.current.width = width;
    canvasElRef.current.height = height;
  }, []);

  const setTooltipsVisibility = useCallback(() => {
    tooltips.forEach(({ percentVisibleStart, percentVisibleEnd }, index) => {
      const tooltipEl = tooltipElsRef.current[index];
      const ratioVisibleStart = percentVisibleStart / 100;
      const ratioVisibleEnd = percentVisibleEnd / 100;

      if (scrolledRatioRef.current >= ratioVisibleStart && scrolledRatioRef.current <= ratioVisibleEnd) {
        tooltipEl.style.visibility = 'visible';
      } else {
        tooltipEl.style.visibility = 'hidden';
      }
    });
  }, []);

  const setTooltipsPosition = useCallback(({ cx, cy, ih, iw, nw, nh }) => {
    tooltips.forEach(({ percentPostionX, percentPositionY }, index) => {
      const tooltipEl = tooltipElsRef.current[index];
      const ratioPostionX = percentPostionX / 100;
      const ratioPositionY = percentPositionY / 100;

      tooltipEl.style.top = `${nh * ratioPositionY - (cy / ih) * nh}px`;
      tooltipEl.style.left = `${nw * ratioPostionX - (cx / iw) * nw}px`;
    });
  }, []);

  const drawImage = useCallback(image => {
    const ratioDrawOffsetX = percentDrawOffsetX / 100;
    const ratioDrawOffsetY = percentDrawOffsetY / 100;

    const dimensions = drawImageCoverDimensions(
      image.width,
      image.height,
      canvasElRef.current.width,
      canvasElRef.current.height,
      ratioDrawOffsetX,
      ratioDrawOffsetY
    );

    const { cx, cy, cw, ch, x, y, w, h } = dimensions;
    canvasContextRef.current.drawImage(image, cx, cy, cw, ch, x, y, w, h);

    setTooltipsPosition(dimensions);
  }, []);

  const drawActiveImage = useCallback(() => {
    if (activeImageOnLoadRef.current) activeImageOnLoadRef.current.onload = null;

    const activeImageIndex = Math.round((imagesRef.current.length - 1) * scrolledRatioRef.current) || 0;
    const activeImage = imagesRef.current[activeImageIndex];

    if (isImageLoaded(activeImage)) {
      drawImage(activeImage);
    } else {
      for (let substituteImageIndex = activeImageIndex - 1; substituteImageIndex >= 0; substituteImageIndex--) {
        const substituteImage = imagesRef.current[substituteImageIndex];
        if (isImageLoaded(substituteImage)) {
          drawImage(substituteImage);
          break;
        }
      }

      activeImageOnLoadRef.current = activeImage;
      activeImage.onload = () => {
        drawImage(activeImage);
      };
    }
  }, []);

  useLayoutEffect(() => {
    canvasContextRef.current = canvasElRef.current.getContext('2d');
    canvasContextRef.current.imageSmoothingEnabled = true;

    function update() {
      const { top, height } = ImageSequenceElRef.current.getBoundingClientRect();
      scrolledRatioRef.current = clamp((top / (height - getViewportHeight())) * -1, 0, 1);

      setCanvasSize();
      drawActiveImage();
      setTooltipsVisibility();
    }

    update();

    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.addEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    // load remainder of the images
    imagesRef.current.forEach(image => {
      if (!image.src) image.src = image.dataSrc;
    });
  }, []);

  return (
    <div
      className={classnames('ImageSequence', className)}
      ref={ImageSequenceElRef}
      style={{
        height: `${imagesRef.current.length * heightMultiplier}vh`
      }}
    >
      <div className="stickyContainer" ref={stickyContainerElRef}>
        <canvas className="canvas" ref={canvasElRef} />

        {tooltips.map(({ percentPostionX, percentPositionY, content }, index) => {
          return (
            <button
              key={index}
              className="tooltip"
              style={{
                top: `${percentPositionY}%`,
                left: `${percentPostionX}%`
              }}
              onClick={() => {
                alert(content);
              }}
              ref={el => (tooltipElsRef.current[index] = el)}
            />
          );
        })}
      </div>
    </div>
  );
}

ImageSequence.propTypes = checkProps({
  className: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  heightMultiplier: PropTypes.number,
  percentDrawOffsetX: PropTypes.number,
  percentDrawOffsetY: PropTypes.number
});

ImageSequence.defaultProps = {
  imageUrls: [],
  heightMultiplier: 3,
  percentDrawOffsetX: 50,
  percentDrawOffsetY: 50
};

export default memo(ImageSequence);
