import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'default-passive-events';

import './RotateScreen.css';

import checkProps from '../../util/check-props';
import detect from '../../util/detect';

export default class RotateScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orientation: detect.orientation
    };
  }

  componentDidMount() {
    this.setOrientationParentClass();

    if (detect.isAndroid) {
      window.addEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.addEventListener('resize', this.handleOrientationChange);
    }

    this.container.addEventListener('touchmove', this.preventScrolling);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.orientation !== prevState.orientation) {
      this.setOrientationParentClass();
    }
  }

  componentWillUnmount() {
    if (detect.isAndroid) {
      window.removeEventListener('orientationchange', this.handleOrientationChange);
    } else {
      window.removeEventListener('resize', this.handleOrientationChange);
    }
    this.container.removeEventListener('touchmove', this.preventScrolling, {passive: false});
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
    if (detect.orientation !== this.state.orientation) {
      this.setState({ orientation: detect.orientation });
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
  copy: PropTypes.string,
  iconSrc: PropTypes.string,
  iconAlt: PropTypes.string
});

RotateScreen.defaultProps = {
  copy: 'Please rotate your device into portrait mode.',
  iconAlt: 'Please rotate your device'
};
