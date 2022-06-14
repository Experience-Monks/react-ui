import React, { memo, useLayoutEffect, useRef, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './ImageSequence.module.scss';

import BaseButton from '../BaseButton/BaseButton';

import { clamp, getViewportHeight, imageCoverDimensions, isImageLoaded } from './utils';

const IMAGE_LOAD_GAP = 4;

// Terminology
// Ratio: 0 - 1 (0.25)
// Percentage: 0 - 100 (25)

function ImageSequence({
  className,
  imageUrls,
  heightMultiplier, // Multiplier for scroll height based on number of images
  percentDrawOffsetX, // Background position left for background cover
  percentDrawOffsetY, // Background position top for background cover
  tooltips
}) {
  const ImageSequenceElRef = useRef(null);
  const stickyContainerElRef = useRef(null);
  const canvasElRef = useRef(null);
  const tooltipElsRef = useRef([]);

  const activeImageOnLoadRef = useRef(null);
  const scrolledRatioRef = useRef(0);
  const canvasContextRef = useRef(null);

  const images = useMemo(
    () =>
      imageUrls.map((imageUrl, index) => {
        const image = new Image();
        image.dataSrc = imageUrl;

        // Load first batch of images in gaps
        if (index % IMAGE_LOAD_GAP === 0) image.src = image.dataSrc;

        return image;
      }),
    [imageUrls]
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
  }, [tooltips]);

  const setTooltipsPosition = useCallback(
    ({ cx, cy, ih, iw, nw, nh }) => {
      tooltips.forEach(({ percentPositionX, percentPositionY }, index) => {
        const tooltipEl = tooltipElsRef.current[index];
        const ratioPositionX = percentPositionX / 100;
        const ratioPositionY = percentPositionY / 100;

        tooltipEl.style.top = `${nh * ratioPositionY - (cy / ih) * nh}px`;
        tooltipEl.style.left = `${nw * ratioPositionX - (cx / iw) * nw}px`;
      });
    },
    [tooltips]
  );

  const drawImage = useCallback(
    (image) => {
      const ratioDrawOffsetX = percentDrawOffsetX / 100;
      const ratioDrawOffsetY = percentDrawOffsetY / 100;

      const dimensions = imageCoverDimensions(
        image.width,
        image.height,
        canvasElRef.current.width,
        canvasElRef.current.height,
        ratioDrawOffsetX,
        ratioDrawOffsetY
      );

      const { cx, cy, cw, ch, x, y, w, h } = dimensions;
      canvasContextRef.current.drawImage(image, cx, cy, cw, ch, x, y, w, h);

      // Advanced positioning of tooltips based on draw dimensions (tooltips will follow pinned point on canvas)
      // Comment this line out if you'd prefer basic positioning
      setTooltipsPosition(dimensions);
    },
    [setTooltipsPosition, percentDrawOffsetX, percentDrawOffsetY]
  );

  const drawActiveImage = useCallback(() => {
    if (activeImageOnLoadRef.current) activeImageOnLoadRef.current.onload = null;

    const activeImageIndex = Math.round((images.length - 1) * scrolledRatioRef.current) || 0;
    const activeImage = images[activeImageIndex];

    if (isImageLoaded(activeImage)) {
      drawImage(activeImage);
    } else {
      // Draw nearest previous loaded image as substitute
      for (let substituteImageIndex = activeImageIndex - 1; substituteImageIndex >= 0; substituteImageIndex--) {
        const substituteImage = images[substituteImageIndex];
        if (isImageLoaded(substituteImage)) {
          drawImage(substituteImage);
          break;
        }
      }

      // Draw current image when loaded
      activeImageOnLoadRef.current = activeImage;
      activeImage.onload = () => {
        drawImage(activeImage);
      };
    }
  }, [images, drawImage]);

  const setScrolledRatio = useCallback(() => {
    const { top, height } = ImageSequenceElRef.current.getBoundingClientRect();
    scrolledRatioRef.current = clamp((top / (height - getViewportHeight())) * -1, 0, 1);
  }, []);

  useLayoutEffect(() => {
    function commonUpdates() {
      setScrolledRatio();
      drawActiveImage();
      setTooltipsVisibility();
    }

    function scrollHandler() {
      commonUpdates();
    }

    function resizeHandler() {
      setCanvasSize();
      commonUpdates();
    }

    canvasContextRef.current = canvasElRef.current.getContext('2d');
    canvasContextRef.current.imageSmoothingEnabled = true;
    setCanvasSize();
    commonUpdates();

    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);
    };
  }, [setCanvasSize, setScrolledRatio, drawActiveImage, setTooltipsVisibility]);

  useEffect(() => {
    // Load remainder of the images
    images.forEach((image) => {
      if (!image.src) image.src = image.dataSrc;
    });
  }, [images]);

  return (
    <div
      className={classnames(styles.ImageSequence, className)}
      ref={ImageSequenceElRef}
      style={{
        height: `${images.length * heightMultiplier}vh`
      }}
    >
      <div className={styles.stickyContainer} ref={stickyContainerElRef}>
        <canvas className={styles.canvas} ref={canvasElRef} />

        {tooltips.map(({ percentPositionX, percentPositionY, content, tooltipLabel }, index) => {
          return (
            <div
              key={content}
              className={styles.tooltip}
              // Basic tooltip positioning, overwritten by setTooltipsPosition() when canvas drawn
              style={{
                top: `${percentPositionY}%`,
                left: `${percentPositionX}%`
              }}
            >
              <BaseButton
                onClick={() => {
                  alert(content);
                }}
                aria-label={tooltipLabel}
                className={styles.button}
                ref={(el) => (tooltipElsRef.current[index] = el)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

ImageSequence.propTypes = {
  className: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  heightMultiplier: PropTypes.number,
  percentDrawOffsetX: PropTypes.number,
  percentDrawOffsetY: PropTypes.number,
  tooltips: PropTypes.arrayOf(
    PropTypes.exact({
      percentPositionX: PropTypes.number,
      percentPositionY: PropTypes.number,
      percentVisibleStart: PropTypes.number,
      percentVisibleEnd: PropTypes.number,
      content: PropTypes.string,
      tooltipLabel: PropTypes.string
    })
  )
};

ImageSequence.defaultProps = {
  imageUrls: [],
  heightMultiplier: 3,
  percentDrawOffsetX: 50,
  percentDrawOffsetY: 50,
  tooltips: []
};

export default memo(ImageSequence);
