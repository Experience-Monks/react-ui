import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useLocation } from 'react-router-dom';
import noop from 'no-op';
import cleanPath from 'remove-trailing-separator';
import checkProps from '@jam3/react-check-extra-props';

import styles from './HamburgerMenu.module.scss';

import BaseLink from '../BaseLink/BaseLink';

const HamburgerMenu = ({
  className,
  closeOnRouteChange,
  isMobileMenuOpen,
  linkComponent,
  links,
  children,
  setIsMobileMenuOpen
}) => {
  const LinkComponent = linkComponent;
  const refContainer = useRef(null);
  const previousPathname = useRef('');

  const location = useLocation();

  useEffect(() => {
    if (closeOnRouteChange && previousPathname.current && previousPathname.current !== location.pathname) {
      isMobileMenuOpen && setIsMobileMenuOpen(false);
    }
    previousPathname.current = location.pathname;

    return () => {
      isMobileMenuOpen && setIsMobileMenuOpen(false);
    };
  }, [isMobileMenuOpen, closeOnRouteChange, location]);

  return (
    <nav className={classnames(styles.HamburgerMenu, className, { open: isMobileMenuOpen })} ref={refContainer}>
      {links && (
        <ul className={styles.navList}>
          {links.map((link, index) => (
            <li key={index} className={styles.navItem}>
              <LinkComponent
                link={link.path}
                className={classnames({ [styles.active]: cleanPath(location.pathname) === cleanPath(link.path) })}
              >
                {link.text}
              </LinkComponent>
            </li>
          ))}
        </ul>
      )}
      {children}
    </nav>
  );
};

HamburgerMenu.propTypes = checkProps({
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string
    })
  ),
  closeOnRouteChange: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func,
  linkComponent: (props, propName) => {
    if (props[propName] && !props[propName]['$$typeof']) {
      return new Error(`Invalid prop '${propName}' supplied to 'HamburgerMenu'. A valid React component expected`);
    }
  }
});

HamburgerMenu.defaultProps = {
  setIsMobileMenuOpen: noop,
  closeOnRouteChange: true,
  linkComponent: BaseLink
};

export default memo(HamburgerMenu);
