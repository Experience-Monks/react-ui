import React, { memo, forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { useIntersectionObserver } from '@jam3/react-hooks';

import styles from './Image.module.scss';

const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1024;

const Image = forwardRef(
  (
    {
      sizeMobile,
      sizeTablet,
      sizeDesktop,
      className,
      src,
      alt,
      draggable,
      lazyLoad,
      lazyLoadFallbackWidth,
      lazyLoadFallbackQuality,
      lazyLoadIntersectionRootMargin,
      quality,
      srcSetTotal,
      srcSetWidthIncrement
    },
    ref
  ) => {
    const ImageElRef = useRef(null);

    const [loadImage, setLoadImage] = useState(!lazyLoad);
    const [hasFilterBlur, setHasFilterBlur] = useState(lazyLoad);

    const isLazyLoadIntersecting =
      lazyLoad &&
      useIntersectionObserver(ImageElRef, {
        rootMargin: lazyLoadIntersectionRootMargin
      });

    const buildSrc = useCallback(
      (w, q) => {
        return `${src}?w=${w}&q=${q}`;
      },
      [src]
    );

    const buildSrcSet = useCallback(() => {
      let srcSetString = '';

      for (let index = 1; index <= srcSetTotal; index++) {
        const width = srcSetWidthIncrement * index;
        srcSetString += `${buildSrc(width, quality)} ${width}w,`;
      }

      return srcSetString;
    }, [buildSrc, srcSetTotal, srcSetWidthIncrement, quality]);

    const handleOnLoad = useCallback(() => {
      if (hasFilterBlur && loadImage) {
        setHasFilterBlur(false);
      }
    }, [hasFilterBlur, loadImage, setHasFilterBlur]);

    useEffect(() => {
      if (lazyLoad && isLazyLoadIntersecting) {
        setLoadImage(true);
      }
    }, [lazyLoad, isLazyLoadIntersecting, setLoadImage]);

    return (
      <img
        className={classnames(styles.Image, className, {
          hasFilterBlur: hasFilterBlur
        })}
        alt={alt}
        draggable={draggable}
        onLoad={handleOnLoad}
        src={loadImage ? src : buildSrc(lazyLoadFallbackWidth, lazyLoadFallbackQuality)}
        srcSet={loadImage ? buildSrcSet() : null}
        sizes={`(min-width: ${DESKTOP_WIDTH}px) ${sizeDesktop}, (min-width: ${TABLET_WIDTH}px) ${sizeTablet}, ${sizeMobile}`}
        ref={el => {
          ImageElRef.current = el;
          if (ref) typeof ref === 'object' ? (ref.current = el) : ref(el);
        }}
      />
    );
  }
);

Image.propTypes = checkProps({
  // Width of the container image resides within. Accepts px, vw and rem.
  // For rem, uses 16px as html root value, not set value
  sizeMobile: PropTypes.string,
  sizeTablet: PropTypes.string,
  sizeDesktop: PropTypes.string,

  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  draggable: PropTypes.bool,

  lazyLoad: PropTypes.bool,
  lazyLoadFallbackWidth: PropTypes.number,
  lazyLoadFallbackQuality: PropTypes.number,
  lazyLoadIntersectionRootMargin: PropTypes.string,

  quality: PropTypes.number,
  srcSetTotal: PropTypes.number,
  srcSetWidthIncrement: PropTypes.number
});

Image.defaultProps = {
  sizeMobile: '100vw',
  sizeTablet: '100vw',
  sizeDesktop: '100vw',

  src: '',
  alt: '',
  draggable: true,

  lazyLoad: true,
  lazyLoadFallbackWidth: 100,
  lazyLoadFallbackQuality: 50,
  lazyLoadIntersectionRootMargin: '5%',

  quality: 80,
  srcSetTotal: 20,
  srcSetWidthIncrement: 200
};

export default memo(Image);
