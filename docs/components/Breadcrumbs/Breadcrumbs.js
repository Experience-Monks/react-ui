import { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import cleanPath from 'remove-trailing-slash';

import styles from './Breadcrumbs.module.scss';

import BaseLink from '../BaseLink/BaseLink';

const breadStyles = {
  all: 'all',
  current: 'current',
  forward: 'forward'
};

const Breadcrumbs = ({ routes, breadStyle }) => {
  const [active, setActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const pos = routes.map((path) => path.route).indexOf(router.asPath);
    pos < 0 ? setActive(0) : setActive(pos);
  }, [router.asPath, routes]);

  return (
    <nav className={classnames(styles.Breadcrumbs)} aria-label="breadcrumbs">
      {routes
        .map((path, index) => {
          const LinkInstance = <LinkWrapper key={`${index}${path.text}`} {...path} pathname={router.pathname} />;

          if (index <= active + 1 && breadStyle === breadStyles.forward) {
            return LinkInstance;
          } else if (index <= active && breadStyle === breadStyles.current) {
            return LinkInstance;
          } else if (breadStyle === breadStyles.all) {
            return LinkInstance;
          }
          return null;
        })
        .filter((route) => Boolean(route))
        .reduce(
          (prev, curr, index) => [
            prev,
            <span key={index} className={styles.separator} aria-hidden="true">
              {'>'}
            </span>,
            curr
          ],
          ''
        )}
    </nav>
  );
};

Breadcrumbs.propTypes = {
  breadStyle: PropTypes.oneOf(Object.values(breadStyles)),
  routes: PropTypes.arrayOf(
    PropTypes.exact({
      route: PropTypes.string,
      text: PropTypes.string
    }).isRequired
  ).isRequired
};

Breadcrumbs.defaultProps = {
  breadStyle: breadStyles.all
};

const LinkWrapper = ({ pathname, text, route }) => {
  const isActive = cleanPath(route) === cleanPath(pathname);

  return (
    <BaseLink
      className={classnames(styles.link, { [styles.active]: isActive })}
      href={route}
      {...(isActive ? { 'aria-current': 'location' } : {})}
    >
      {text}
    </BaseLink>
  );
};

LinkWrapper.propTypes = {
  pathname: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default memo(Breadcrumbs);
