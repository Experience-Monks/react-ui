import { memo, forwardRef, useMemo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './BaseLink.module.scss';

const excludes = ['children', 'download', 'target', 'rel', 'link'];
const targets = {
  self: '_self',
  blank: '_blank'
};

const externalLinkRegex = /^(https:\/\/|http:\/\/|www\.|tel:|mailto:)/;
const externalSiteRegex = /^(https:\/\/|http:\/\/|www\.)/;

const BaseLink = forwardRef(
  ({ className, href, download, rel, target, children, prefetch, shallow, ...props }, ref) => {
    const isDownload = useMemo(() => Boolean(download), [download]);
    const Component = useMemo(() => (externalLinkRegex.test(href) || isDownload ? 'a' : Link), [href, isDownload]);

    const componentProps = useMemo(
      () =>
        Object.keys(props).reduce(
          (acc, key) => ([...excludes].indexOf(key) > -1 ? acc : { ...acc, [key]: props[key] }),
          { className: classnames(styles.BaseLink, className) }
        ),
      [className, props]
    );

    return useMemo(() => {
      componentProps['aria-label'] = props['aria-label'] || props.title;

      if (Component === 'a') {
        componentProps.href = href;

        if (isDownload) {
          componentProps.download = download;
        }

        // set external link attributes
        if (externalSiteRegex.test(href) && !isDownload) {
          componentProps.target = target;
          if (target === targets.blank) {
            componentProps.rel = rel || 'noreferrer noopener';
          }
        }

        return (
          <Component ref={ref} {...componentProps}>
            {children}
          </Component>
        );
      } else {
        return (
          <Component ref={ref} href={href}>
            <a {...componentProps}>{children}</a>
          </Component>
        );
      }
    }, [Component, children, componentProps, download, href, isDownload, props, ref, rel, target]);
  }
);

BaseLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  rel: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.oneOf(Object.values(targets)),
  shallow: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  download: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-current': PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  onClick: PropTypes.func
};

BaseLink.defaultProps = {
  href: '#',
  target: targets.blank
};

export default memo(BaseLink);
