import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Footer.module.scss';

import BaseLink from '../BaseLink/BaseLink';

const Footer = forwardRef(({ className, copyright, links, ariaNavLabel }, ref) => {
  return (
    <footer className={classnames(styles.Footer, className)} ref={ref}>
      {links && (
        <nav className={styles.footerNav} aria-label={ariaNavLabel}>
          <ul className={styles.navList}>
            {links.map((link, index) => (
              <li key={index} className={styles.navItem}>
                <BaseLink {...link}>{link.title}</BaseLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {copyright && <p className={styles.footerCopyright}>{copyright}</p>}
    </footer>
  );
});

Footer.propTypes = {
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string
    })
  ),
  ariaNavLabel: PropTypes.string,
  copyright: PropTypes.string
};

Footer.defaultProps = {
  ariaNavLabel: 'Footer Navigation',
  copyright: '© Copyright'
};

export default memo(Footer);
