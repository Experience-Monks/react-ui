import React, { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import cleanPath from 'remove-trailing-separator';
import checkProps from '@jam3/react-check-extra-props';

import './MainTopNav.scss';

import BaseLink from '../BaseLink/BaseLink';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

const getButtonState = isMenuOpen => (isMenuOpen ? STATES.close : STATES.idle);

const MainTopNav = props => {
  const location = useLocation();
  const [buttonState, setButtonState] = useState(getButtonState(props.isMobileMenuOpen));
  const nextStateButton = getButtonState(props.isMobileMenuOpen);

  if (nextStateButton !== buttonState) {
    setButtonState(nextStateButton);
  }

  function handleHamburgerClick() {
    props.setIsMobileMenuOpen(!props.isMobileMenuOpen);
  }

  const LinkComponent = props.linkComponent;

  return (
    <header className={classnames('MainTopNav', props.className)}>
      {props.ariaSiteTitle && <h1 className="only-aria-visible">{props.ariaSiteTitle}</h1>}
      <nav className="nav" aria-label={props.ariaNavLabel}>
        {props.ariaNavTitle && <h2 className="only-aria-visible">{props.ariaNavTitle}</h2>}
        {props.logoSrc && (
          <LinkComponent link={props.logoLink} aria-label={props.logoAriaLabel}>
            <img className="nav-logo" src={props.logoSrc} alt={props.logoAlt} />
          </LinkComponent>
        )}
        {props.showHamburger ? (
          <HamburgerButton onClick={handleHamburgerClick} currentState={buttonState} />
        ) : (
          props.links && (
            <ul className="nav-list">
              {props.links.map((link, index) => (
                <li key={index} className="nav-item">
                  <LinkComponent
                    link={link.path}
                    className={classnames({
                      active: cleanPath(location.pathname) === cleanPath(link.path)
                    })}
                  >
                    {link.text}
                  </LinkComponent>
                </li>
              ))}
            </ul>
          )
        )}
      </nav>
      {props.children}
    </header>
  );
};

MainTopNav.propTypes = checkProps({
  className: PropTypes.string,
  logoSrc: PropTypes.string,
  ariaSiteTitle: PropTypes.string,
  ariaNavTitle: PropTypes.string,
  ariaNavLabel: PropTypes.string,
  logoLink: PropTypes.string,
  logoAriaLabel: PropTypes.string,
  logoAlt: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string
    })
  ),
  showHamburger: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func,
  linkComponent: (props, propName) => {
    if (props[propName] && !props[propName]['$$typeof']) {
      return new Error(`Invalid prop '${propName}' supplied to 'MainTopNav'. A valid React component expected`);
    }
  }
});

MainTopNav.defaultProps = {
  logoAlt: 'logo',
  logoLink: '/',
  logoAriaLabel: 'Home',
  ariaNavLabel: 'Main Navigation',
  setIsMobileMenuOpen: noop,
  linkComponent: BaseLink
};

export default memo(MainTopNav);
