import { memo, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import cleanPath from 'remove-trailing-slash';

import styles from './Nav.module.scss';

import BaseLink from '../BaseLink/BaseLink';
import Image from '../Image/Image';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

const getNextButtonState = (state) => (state === STATES.idle ? STATES.close : STATES.idle);

const Nav = ({
  className,
  logoImg,
  logoLink,
  links,
  showHamburger,
  onHamburgerClick,
  ariaSiteTitle,
  ariaNavLabel,
  ariaNavTitle
}) => {
  const router = useRouter();
  const [buttonState, setButtonState] = useState(STATES.idle);

  const handleHamburgerClick = useCallback(() => {
    const nextStateButton = getNextButtonState(buttonState);
    setButtonState(nextStateButton);
    onHamburgerClick();
  }, [buttonState, onHamburgerClick]);

  return (
    <header className={classnames(styles.Nav, className)}>
      {ariaSiteTitle && <h1 className={styles.onlyAriaVisible}>{ariaSiteTitle}</h1>}
      <nav className={styles.nav} aria-label={ariaNavLabel}>
        {ariaNavTitle && <h2 className={styles.onlyAriaVisible}>{ariaNavTitle}</h2>}
        {logoImg && (
          <BaseLink {...logoLink} className={styles.navLogo}>
            <Image sizeMobile="40px" sizeTablet="40px" sizeDesktop="40px" {...logoImg} />
          </BaseLink>
        )}
        {showHamburger ? (
          <HamburgerButton onClick={handleHamburgerClick} currentState={buttonState} />
        ) : (
          Array.isArray(links) && (
            <ul className={styles.navList}>
              {links.map((link, index) => (
                <li key={index} className={styles.navItem}>
                  <BaseLink
                    {...link}
                    className={classnames(styles.link, {
                      [styles.active]: cleanPath(router.asPath) === cleanPath(link.href)
                    })}
                  >
                    {link.title}
                  </BaseLink>
                </li>
              ))}
            </ul>
          )
        )}
      </nav>
    </header>
  );
};

Nav.propTypes = {
  className: PropTypes.string,
  logoLink: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
    'aria-label': PropTypes.string
  }),
  logoImg: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string
  }),
  ariaSiteTitle: PropTypes.string,
  ariaNavTitle: PropTypes.string,
  ariaNavLabel: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string
    })
  ),
  showHamburger: PropTypes.bool,
  onHamburgerClick: PropTypes.func
};

Nav.defaultProps = {
  logoLink: {
    title: 'logo',
    href: '/',
    'aria-label': 'Home'
  },
  ariaNavLabel: 'Main Navigation',
  onHamburgerClick: () => {}
};

export default memo(Nav);
