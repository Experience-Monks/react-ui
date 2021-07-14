import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useLocation } from 'react-router-dom';
import checkProps from '@jam3/react-check-extra-props';
import BaseLink from '../BaseLink/BaseLink';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = ({ routes, breadStyle }) => {
  const [active, setActive] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const pos = routes.map(path => path.route).indexOf(location.pathname);
    if (pos < 0) setActive(0);
    else setActive(pos);
  }, [location]);

  return (
    <nav className={classnames(styles.Breadcrumbs)} aria-label="breadcrumbs">
      {routes
        .map((path, index) => {
          const LinkInstance = <LinkWrapper key={`${index}${path.text}`} {...path} pathname={location.pathname} />;

          if (index <= active + 1 && breadStyle === 'forward') {
            return LinkInstance;
          } else if (index <= active && breadStyle === 'current') {
            return LinkInstance;
          } else if (breadStyle === 'all') {
            return LinkInstance;
          }
        })
        .filter(route => Boolean(route))
        .reduce(
          (prev, curr, index) => [
            prev,
            <span key={index} className={styles.seperator} aria-hidden="true">
              {'>'}
            </span>,
            curr
          ],
          ''
        )}
    </nav>
  );
};

Breadcrumbs.propTypes = checkProps({
  breadStyle: PropTypes.oneOf(['all', 'current', 'forward']),
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string,
      text: PropTypes.string
    }).isRequired
  ).isRequired
});

Breadcrumbs.defaultProps = {
  breadStyle: 'all'
};

// NOTE: Adapt this to your specific router, next/link for example
const LinkWrapper = ({ pathname, text, route }) => {
  const isActive = route === pathname;

  return (
    <BaseLink
      className={classnames(styles.link, { active: isActive })}
      link={route}
      {...(isActive ? { 'aria-current': 'location' } : {})}
    >
      {text}
    </BaseLink>
  );
};

LinkWrapper.propTypes = checkProps({
  pathname: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
});

export default Breadcrumbs;
