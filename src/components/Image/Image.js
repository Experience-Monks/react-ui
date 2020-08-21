import React, { memo, forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './Image.css';

import { intersectionObserver } from './utils';

const Image = forwardRef(
  (
    {
      className,
      src,
      alt,
      quality,
      draggable,
      lazyLoad,
      lazyLoadFallbackWidth,
      lazyLoadFallbackQuality,
      srcSetTotal,
      srcSetWidthIncrement
    },
    ref
  ) => {
    const ImageElRef = useRef(null);

    const [loadImage, setLoadImage] = useState(!lazyLoad);
    const [hasFilterBlur, setHasFilterBlur] = useState(lazyLoad);

    const buildSrc = useCallback(
      (w, q) => {
        return `${src}?w=${w}&q=${q}`;
      },
      [src]
    );

    const buildSrcSet = useCallback(
      () => {
        let srcSetString = '';

        for (let index = 1; index <= srcSetTotal; index++) {
          const width = srcSetWidthIncrement * index;
          srcSetString += `${buildSrc(width, quality)} ${width}w,`;
        }

        return srcSetString;
      },
      [buildSrc, srcSetTotal, srcSetWidthIncrement, quality]
    );

    const handleOnLoad = useCallback(
      () => {
        if (hasFilterBlur && loadImage) {
          setHasFilterBlur(false);
        }
      },
      [hasFilterBlur, loadImage, setHasFilterBlur]
    );

    useEffect(() => {
      if (!lazyLoad) return;

      const observer = intersectionObserver(ImageElRef.current, {
        onIntersectionIn: () => {
          setLoadImage(true);
        },
        viewportTriggerPercentageTop: -5,
        viewportTriggerPercentageBottom: -5,
        viewportTriggerPercentageLeft: -5,
        viewportTriggerPercentageRight: -5
      });

      return () => {
        observer && observer.destroy();
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <img
        alt={alt}
        src={loadImage ? src : buildSrc(lazyLoadFallbackWidth, lazyLoadFallbackQuality)}
        srcSet={loadImage ? buildSrcSet() : null}
        draggable={draggable}
        className={classnames('Image', className, {
          hasFilterBlur: hasFilterBlur
        })}
        ref={el => {
          ImageElRef.current = el;
          if (ref) typeof ref === 'object' ? (ref.current = el) : ref(el);
        }}
        onLoad={handleOnLoad}
      />
    );
  }
);

Image.propTypes = checkProps({
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  draggable: PropTypes.bool,
  quality: PropTypes.number,
  lazyLoad: PropTypes.bool,
  lazyLoadFallbackWidth: PropTypes.number,
  lazyLoadFallbackQuality: PropTypes.number,
  srcSetTotal: PropTypes.number,
  srcSetWidthIncrement: PropTypes.number
});

Image.defaultProps = {
  src: '',
  alt: '',
  draggable: true,
  quality: 80,
  lazyLoad: true,
  lazyLoadFallbackWidth: 100,
  lazyLoadFallbackQuality: 50,
  srcSetTotal: 20,
  srcSetWidthIncrement: 200
};

export default memo(Image);
