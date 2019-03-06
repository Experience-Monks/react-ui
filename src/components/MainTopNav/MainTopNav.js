import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import cleanPath from 'remove-trailing-separator';
import checkProps from '@jam3/react-check-extra-props';

import './MainTopNav.css';

import BaseLink from '../BaseLink/BaseLink';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

const getButtonState = isMenuOpen => (isMenuOpen ? STATES.close : STATES.idle);

class MainTopNav extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextButtonState = getButtonState(nextProps.isMobileMenuOpen);
    if (nextButtonState !== prevState.buttonState) {
      return {
        buttonState: nextButtonState
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      buttonState: getButtonState(props.isMobileMenuOpen)
    };
  }

  handleHamburgerClick = () => {
    this.props.setIsMobileMenuOpen(!this.props.isMobileMenuOpen);
  };

  render() {
    const LinkComponent = this.props.linkComponent;

    return (
      <header className={classnames('MainTopNav', this.props.className)}>
        {this.props.ariaSiteTitle && <h1 className="only-aria-visible">{this.props.ariaSiteTitle}</h1>}
        <nav className="nav" aria-label={this.props.ariaNavLabel}>
          {this.props.ariaNavTitle && <h2 className="only-aria-visible">{this.props.ariaNavTitle}</h2>}
          {this.props.logoSrc && (
            <LinkComponent link={this.props.logoLink} aria-label={this.props.logoAriaLabel}>
              <img className="nav-logo" src={this.props.logoSrc} alt={this.props.logoAlt} />
            </LinkComponent>
          )}
          {this.props.showHamburger ? (
            <HamburgerButton onClick={this.handleHamburgerClick} currentState={this.state.buttonState} />
          ) : (
            this.props.links && (
              <ul className="nav-list">
                {this.props.links.map((link, index) => (
                  <li key={index} className="nav-item">
                    <LinkComponent
                      link={link.path}
                      className={classnames({
                        active: cleanPath(this.props.location.pathname) === cleanPath(link.path)
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
        {this.props.children}
      </header>
    );
  }
}

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

export default withRouter(MainTopNav);
