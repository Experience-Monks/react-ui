import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import './Footer.scss';

import BaseLink from '../BaseLink/BaseLink';

const Footer = forwardRef((props, ref) => {
  const LinkComponent = props.linkComponent;
  return (
    <footer className={classnames('Footer', props.className)} ref={ref}>
      {props.links && (
        <nav className="footer-nav" aria-label={props.ariaNavLabel}>
          <ul className="nav-list">
            {props.links.map((link, index) => (
              <li key={index} className="nav-item">
                <LinkComponent link={link.path}>{link.text}</LinkComponent>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {props.children}
      {props.copyright && <p className="footer-copyright">{props.copyright}</p>}
    </footer>
  );
});

Footer.propTypes = checkProps({
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string
    })
  ),
  ariaNavLabel: PropTypes.string,
  copyright: PropTypes.string,
  linkComponent: (props, propName) => {
    if (props[propName] && !props[propName]['$$typeof']) {
      return new Error(`Invalid prop '${propName}' supplied to 'Footer'. A valid React component expected`);
    }
  }
});

Footer.defaultProps = {
  ariaNavLabel: 'Footer Navigation',
  copyright: '© Copyright',
  linkComponent: BaseLink
};

export default memo(Footer);
