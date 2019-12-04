import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'default-passive-events';
import checkProps from '@jam3/react-check-extra-props';
import { device, os } from '@jam3/detect';

import './RotateScreen.css';

export default class RotateScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientation: device.getOrientation()
    };
  }

  componentDidMount() {
    this.setOrientationParentClass();

    if (os.isAndroid) {
      window.addEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.addEventListener('resize', this.handleOrientationChange);
    }

    this.container.addEventListener('touchmove', this.preventScrolling, { passive: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.orientation !== prevState.orientation) {
      this.setOrientationParentClass();
    }
  }

  componentWillUnmount() {
    if (os.isAndroid) {
      window.removeEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.removeEventListener('resize', this.handleOrientationChange);
    }
    this.container.removeEventListener('touchmove', this.preventScrolling);
  }

  preventScrolling = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  setOrientationParentClass = (orientation = this.state.orientation) => {
    orientation === 'landscape'
      ? document.body.classList.add('rotate-screen-visible')
      : document.body.classList.remove('rotate-screen-visible');
  };

  handleOrientationChange = () => {
    if (device.getOrientation() !== this.state.orientation) {
      this.setState({ orientation: device.getOrientation() });
    }
  };

  render() {
    const visible = this.state.orientation === 'landscape';
    const style = {
      visibility: visible ? 'visible' : 'hidden'
    };

    return (
      <div className={classnames('RotateScreen', this.props.className)} style={style} ref={r => (this.container = r)}>
        <div className="container">
          {this.props.iconSrc && <img src={this.props.iconSrc} className="rotate-icon" alt={this.props.iconAlt} />}
          {this.props.copy && <p className="rotate-text">{this.props.copy}</p>}
          {this.props.children}
        </div>
      </div>
    );
  }
}

RotateScreen.propTypes = checkProps({
  className: PropTypes.string,
  copy: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string
});

RotateScreen.defaultProps = {
  className: '',
  copy: 'Please rotate your device into portrait mode.',
  iconAlt: 'Please rotate your device'
};
