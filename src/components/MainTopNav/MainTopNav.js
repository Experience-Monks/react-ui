import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'no-op';
import cleanPath from 'remove-trailing-separator';

import './MainTopNav.css';

import BaseLink from '../BaseLink/BaseLink';
import HamburgerButton, { STATES } from '../HamburgerButton/HamburgerButton';

import checkProps from '../../util/check-props';

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
    return (
      <header className={classnames('MainTopNav', this.props.className)}>
        {this.props.ariaSiteTitle && <h1 className="only-aria-visible">{this.props.ariaSiteTitle}</h1>}
        <nav className="nav" aria-label={this.props.ariaNavLabel}>
          {this.props.ariaNavTitle && <h2 className="only-aria-visible">{this.props.ariaNavTitle}</h2>}
          {this.props.logoSrc && (
            <BaseLink link={this.props.logoLink} aria-label={this.props.logoAriaLabel}>
              <img className="nav-logo" src={this.props.logoSrc} alt={this.props.logoAlt} />
            </BaseLink>
          )}
          {this.props.showHamburger ? (
            <HamburgerButton onClick={this.handleHamburgerClick} currentState={this.state.buttonState} />
          ) : (
            this.props.links && (
              <ul className="nav-list">
                {this.props.links.map((link, index) => (
                  <li key={index} className="nav-item">
                    <BaseLink
                      link={link.path}
                      className={classnames({
                        active: cleanPath(this.props.location.pathname) === cleanPath(link.path)
                      })}
                    >
                      {link.text}
                    </BaseLink>
                  </li>
                ))}
              </ul>
            )
          )}
        </nav>
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
  links: PropTypes.array,
  showHamburger: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func
});

MainTopNav.defaultProps = {
  logoAlt: 'logo',
  logoLink: '/',
  logoAriaLabel: 'Home',
  ariaNavLabel: 'Main Navigation',
  setIsMobileMenuOpen: noop
};

export default withRouter(MainTopNav);
