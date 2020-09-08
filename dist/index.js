'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRouterDom = require('react-router-dom');
var PropTypes = _interopDefault(require('prop-types'));
var classnames = _interopDefault(require('classnames'));
var checkProps = _interopDefault(require('@jam3/react-check-extra-props'));
var noop = _interopDefault(require('no-op'));
var cleanPath = _interopDefault(require('remove-trailing-separator'));
var reactUse = require('react-use');
require('default-passive-events');
var detect = require('@jam3/detect');
var BackgroundVideo = _interopDefault(require('react-background-video-player'));
var fullScreen = _interopDefault(require('fullscreen-handler'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".BaseLink {\n  display: inline-block; }\n";
styleInject(css_248z);

var excludes = ['children', 'download', 'target', 'rel', 'link'];
var externalLinkRegex = /^(https:\/\/|http:\/\/|www\.|tel:|mailto:)/;
var externalSiteRegex = /^(https:\/\/|http:\/\/|www\.)/;
var BaseLink = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var Tag = externalLinkRegex.test(props.link) || props.download ? 'a' : reactRouterDom.Link; // clean props

  var componentProps = Object.keys(props).reduce(function (acc, key) {
    return [].concat(excludes).indexOf(key) > -1 ? acc : _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, props[key]));
  }, {});

  if (Tag === 'a') {
    componentProps.href = props.link;
    componentProps.download = props.download; // set external link attributes

    if (externalSiteRegex.test(props.link) && !props.download) {
      componentProps.target = props.target;

      if (props.target === '_blank') {
        componentProps.rel = props.rel || 'noopener';
      }
    }
  } else {
    // react router Link
    componentProps.to = props.link;
  }

  return /*#__PURE__*/React__default.createElement(Tag, _extends({
    ref: ref,
    className: classnames('BaseLink', props.className)
  }, componentProps), props.children);
});
BaseLink.propTypes = checkProps({
  className: PropTypes.string,
  rel: PropTypes.string,
  link: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  download: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  onClick: PropTypes.func,
  'aria-label': PropTypes.string
});
BaseLink.defaultProps = {
  link: '',
  target: '_blank'
};
var BaseLink$1 = /*#__PURE__*/React.memo(BaseLink);

var BaseButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var Component = props.component,
      children = props.children,
      buttonRole = props.role,
      buttonProps = _objectWithoutProperties(props, ["component", "children", "role"]);

  var role = Component === 'button' ? buttonRole : 'button';
  return /*#__PURE__*/React__default.createElement(Component, _extends({
    className: classnames('BaseButton', props.className),
    ref: ref,
    role: role
  }, buttonProps), children);
});
BaseButton.propTypes = checkProps({
  style: PropTypes.object,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  role: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  'aria-label': PropTypes.string,
  title: PropTypes.string
});
BaseButton.defaultProps = {
  component: 'button'
};
var BaseButton$1 = /*#__PURE__*/React.memo(BaseButton);

var css_248z$1 = ".CloseButton {\n  position: relative;\n  width: 2.5rem;\n  height: 2.5rem;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  background: transparent;\n  padding: 0;\n  text-align: inherit;\n  letter-spacing: inherit;\n  font-size: inherit;\n  text-transform: inherit;\n  color: inherit; }\n  .CloseButton span {\n    display: block;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 3px;\n    height: 100%;\n    background-color: #000; }\n    .CloseButton span:first-child {\n      transform: translate(-50%, -50%) rotate(45deg); }\n    .CloseButton span:last-child {\n      transform: translate(-50%, -50%) rotate(-45deg); }\n";
styleInject(css_248z$1);

var CloseButton = function CloseButton(_ref) {
  var className = _ref.className,
      buttonProps = _objectWithoutProperties(_ref, ["className"]);

  return /*#__PURE__*/React__default.createElement(BaseButton$1, _extends({
    className: classnames('CloseButton', className)
  }, buttonProps), /*#__PURE__*/React__default.createElement("span", null), /*#__PURE__*/React__default.createElement("span", null));
};

CloseButton.propTypes = checkProps({
  style: PropTypes.object,
  className: PropTypes.string,
  nodeRef: PropTypes.func,
  children: PropTypes.node,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  role: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  'aria-label': PropTypes.string
});
CloseButton.defaultProps = {
  component: 'button'
};
var CloseButton$1 = /*#__PURE__*/React.memo(CloseButton);

var css_248z$2 = ".Footer {\n  display: inline-block;\n  width: 100%;\n  padding: 0 4rem;\n  background: #000;\n  box-sizing: border-box; }\n  .Footer .footer-nav .nav-list {\n    display: inline-block;\n    padding-left: 0; }\n    .Footer .footer-nav .nav-list .nav-item {\n      display: inline-block;\n      margin-right: 1.6rem;\n      font-size: 1.6rem; }\n      .Footer .footer-nav .nav-list .nav-item:last-of-type {\n        margin-right: 0; }\n    .Footer .footer-nav .nav-list a {\n      color: #fff; }\n  .Footer .footer-copyright {\n    font-size: 1.6rem;\n    color: #fff; }\n";
styleInject(css_248z$2);

var Footer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var LinkComponent = props.linkComponent;
  return /*#__PURE__*/React__default.createElement("footer", {
    className: classnames('Footer', props.className),
    ref: ref
  }, props.links && /*#__PURE__*/React__default.createElement("nav", {
    className: "footer-nav",
    "aria-label": props.ariaNavLabel
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "nav-list"
  }, props.links.map(function (link, index) {
    return /*#__PURE__*/React__default.createElement("li", {
      key: index,
      className: "nav-item"
    }, /*#__PURE__*/React__default.createElement(LinkComponent, {
      link: link.path
    }, link.text));
  }))), props.children, props.copyright && /*#__PURE__*/React__default.createElement("p", {
    className: "footer-copyright"
  }, props.copyright));
});
Footer.propTypes = checkProps({
  className: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    path: PropTypes.string
  })),
  ariaNavLabel: PropTypes.string,
  copyright: PropTypes.string,
  linkComponent: function linkComponent(props, propName) {
    if (props[propName] && !props[propName]['$$typeof']) {
      return new Error("Invalid prop '".concat(propName, "' supplied to 'Footer'. A valid React component expected"));
    }
  }
});
Footer.defaultProps = {
  ariaNavLabel: 'Footer Navigation',
  copyright: '© Copyright',
  linkComponent: BaseLink$1
};
var Footer$1 = /*#__PURE__*/React.memo(Footer);

var css_248z$3 = ".HamburgerButton {\n  border: none;\n  outline: none;\n  cursor: pointer;\n  background: transparent;\n  padding: 0;\n  text-align: inherit;\n  letter-spacing: inherit;\n  font-size: inherit;\n  text-transform: inherit;\n  color: inherit; }\n  .HamburgerButton .bars-container {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    width: 2.5rem;\n    height: 2rem; }\n    .HamburgerButton .bars-container .bar {\n      width: 100%;\n      height: 2px;\n      background: #000;\n      transform-origin: top left;\n      transition: transform 0.2s ease-out, opacity 0.2s ease-out; }\n  .HamburgerButton.close .bar:nth-child(1) {\n    transform: translateX(1px) rotate(45deg); }\n  .HamburgerButton.close .bar:nth-child(2) {\n    transform: scaleX(0);\n    opacity: 0; }\n  .HamburgerButton.close .bar:nth-child(3) {\n    transform: rotate(-45deg); }\n  .HamburgerButton.back .bar:nth-child(1) {\n    transform: translateX(-1px) translateY(10px) rotate(-45deg) scaleX(0.8); }\n  .HamburgerButton.back .bar:nth-child(2) {\n    transform: scaleX(0);\n    opacity: 0; }\n  .HamburgerButton.back .bar:nth-child(3) {\n    transform: translateX(1px) translateY(-9px) rotate(45deg) scaleX(0.8); }\n";
styleInject(css_248z$3);

var STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};
var bars = [0, 1, 2].map(function (item) {
  return /*#__PURE__*/React__default.createElement("span", {
    key: item,
    className: "bar ".concat(item)
  });
});

var HamburgerButton = function HamburgerButton(_ref) {
  var className = _ref.className,
      currentState = _ref.currentState,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick,
      tabIndex = _ref.tabIndex,
      ariaLabel = _ref.ariaLabel;
  return /*#__PURE__*/React__default.createElement(BaseButton$1, {
    className: classnames('HamburgerButton', className, currentState),
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onClick: onClick,
    tabIndex: tabIndex,
    "aria-label": ariaLabel
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "bars-container"
  }, bars));
};

HamburgerButton.propTypes = checkProps({
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  currentState: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  ariaLabel: PropTypes.string
});
HamburgerButton.defaultProps = {
  tabIndex: 0,
  currentState: STATES.idle,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  ariaLabel: 'Mobile menu button'
};
var HamburgerButton$1 = /*#__PURE__*/React.memo(HamburgerButton);

var css_248z$4 = ".HamburgerMenu {\n  position: fixed;\n  top: 0;\n  right: 0;\n  width: 100%;\n  height: 100vh;\n  background: #eee;\n  padding: 2rem;\n  transform: translateX(100%);\n  transition: 0.2s; }\n  .HamburgerMenu.open {\n    transform: translateX(0%); }\n  .HamburgerMenu .nav-list {\n    width: 100%; }\n    .HamburgerMenu .nav-list .nav-item {\n      display: block;\n      margin-bottom: 2rem; }\n      .HamburgerMenu .nav-list .nav-item:last-of-type {\n        margin-bottom: 0; }\n      .HamburgerMenu .nav-list .nav-item a {\n        font-size: 2rem;\n        color: rgba(0, 0, 0, 0.6);\n        text-decoration: none; }\n        .HamburgerMenu .nav-list .nav-item a.active {\n          color: black;\n          text-decoration: underline; }\n        .HamburgerMenu .nav-list .nav-item a:hover:not(.active) {\n          color: black;\n          text-decoration: none; }\n";
styleInject(css_248z$4);

var HamburgerMenu = function HamburgerMenu(_ref) {
  var className = _ref.className,
      closeOnRouteChange = _ref.closeOnRouteChange,
      isMobileMenuOpen = _ref.isMobileMenuOpen,
      linkComponent = _ref.linkComponent,
      links = _ref.links,
      children = _ref.children,
      setIsMobileMenuOpen = _ref.setIsMobileMenuOpen;
  var LinkComponent = linkComponent;
  var refContainer = React.useRef(null);
  var previousPathname = React.useRef('');
  var location = reactRouterDom.useLocation();
  React.useEffect(function () {
    if (closeOnRouteChange && previousPathname.current && previousPathname.current !== location.pathname) {
      isMobileMenuOpen && setIsMobileMenuOpen(false);
    }

    previousPathname.current = location.pathname;
    return function () {
      isMobileMenuOpen && setIsMobileMenuOpen(false);
    };
  }, [isMobileMenuOpen, closeOnRouteChange, location]);
  return /*#__PURE__*/React__default.createElement("nav", {
    className: classnames("HamburgerMenu", className, {
      open: isMobileMenuOpen
    }),
    ref: refContainer
  }, links && /*#__PURE__*/React__default.createElement("ul", {
    className: "nav-list"
  }, links.map(function (link, index) {
    return /*#__PURE__*/React__default.createElement("li", {
      key: index,
      className: "nav-item"
    }, /*#__PURE__*/React__default.createElement(LinkComponent, {
      link: link.path,
      className: classnames({
        active: cleanPath(location.pathname) === cleanPath(link.path)
      })
    }, link.text));
  })), children);
};

HamburgerMenu.propTypes = checkProps({
  className: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    path: PropTypes.string
  })),
  closeOnRouteChange: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func,
  linkComponent: function linkComponent(props, propName) {
    if (props[propName] && !props[propName]['$$typeof']) {
      return new Error("Invalid prop '".concat(propName, "' supplied to 'HamburgerMenu'. A valid React component expected"));
    }
  }
});
HamburgerMenu.defaultProps = {
  setIsMobileMenuOpen: noop,
  closeOnRouteChange: true,
  linkComponent: BaseLink$1
};
var HamburgerMenu$1 = /*#__PURE__*/React.memo(HamburgerMenu);

var css_248z$5 = ".MainTopNav {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  padding: 0 4rem;\n  height: 6rem;\n  background: #eee;\n  box-sizing: border-box; }\n  .MainTopNav .only-aria-visible {\n    clip-path: inset(100%);\n    clip: rect(1px 1px 1px 1px);\n    /* IE 6/7 */\n    clip: rect(1px, 1px, 1px, 1px);\n    height: 1px;\n    overflow: hidden;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px; }\n  .MainTopNav .nav {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    height: 100%; }\n    .MainTopNav .nav .nav-logo {\n      width: 4rem; }\n    .MainTopNav .nav .nav-list {\n      display: inline-block; }\n      .MainTopNav .nav .nav-list .nav-item {\n        display: inline-block;\n        margin-left: 2rem; }\n        .MainTopNav .nav .nav-list .nav-item a {\n          font-size: 2rem;\n          color: rgba(0, 0, 0, 0.6);\n          text-decoration: none; }\n          .MainTopNav .nav .nav-list .nav-item a.active {\n            color: black;\n            text-decoration: underline; }\n          .MainTopNav .nav .nav-list .nav-item a:hover:not(.active) {\n            color: black;\n            text-decoration: none; }\n";
styleInject(css_248z$5);

var getButtonState = function getButtonState(isMenuOpen) {
  return isMenuOpen ? STATES.close : STATES.idle;
};

var MainTopNav = function MainTopNav(props) {
  var location = reactRouterDom.useLocation();

  var _useState = React.useState(getButtonState(props.isMobileMenuOpen)),
      _useState2 = _slicedToArray(_useState, 2),
      buttonState = _useState2[0],
      setButtonState = _useState2[1];

  var nextStateButton = getButtonState(props.isMobileMenuOpen);

  if (nextStateButton !== buttonState) {
    setButtonState(nextStateButton);
  }

  function handleHamburgerClick() {
    props.setIsMobileMenuOpen(!props.isMobileMenuOpen);
  }

  var LinkComponent = props.linkComponent;
  return /*#__PURE__*/React__default.createElement("header", {
    className: classnames('MainTopNav', props.className)
  }, props.ariaSiteTitle && /*#__PURE__*/React__default.createElement("h1", {
    className: "only-aria-visible"
  }, props.ariaSiteTitle), /*#__PURE__*/React__default.createElement("nav", {
    className: "nav",
    "aria-label": props.ariaNavLabel
  }, props.ariaNavTitle && /*#__PURE__*/React__default.createElement("h2", {
    className: "only-aria-visible"
  }, props.ariaNavTitle), props.logoSrc && /*#__PURE__*/React__default.createElement(LinkComponent, {
    link: props.logoLink,
    "aria-label": props.logoAriaLabel
  }, /*#__PURE__*/React__default.createElement("img", {
    className: "nav-logo",
    src: props.logoSrc,
    alt: props.logoAlt
  })), props.showHamburger ? /*#__PURE__*/React__default.createElement(HamburgerButton$1, {
    onClick: handleHamburgerClick,
    currentState: buttonState
  }) : props.links && /*#__PURE__*/React__default.createElement("ul", {
    className: "nav-list"
  }, props.links.map(function (link, index) {
    return /*#__PURE__*/React__default.createElement("li", {
      key: index,
      className: "nav-item"
    }, /*#__PURE__*/React__default.createElement(LinkComponent, {
      link: link.path,
      className: classnames({
        active: cleanPath(location.pathname) === cleanPath(link.path)
      })
    }, link.text));
  }))), props.children);
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
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    path: PropTypes.string
  })),
  showHamburger: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  setIsMobileMenuOpen: PropTypes.func,
  linkComponent: function linkComponent(props, propName) {
    if (props[propName] && !props[propName]['$$typeof']) {
      return new Error("Invalid prop '".concat(propName, "' supplied to 'MainTopNav'. A valid React component expected"));
    }
  }
});
MainTopNav.defaultProps = {
  logoAlt: 'logo',
  logoLink: '/',
  logoAriaLabel: 'Home',
  ariaNavLabel: 'Main Navigation',
  setIsMobileMenuOpen: noop,
  linkComponent: BaseLink$1
};
var MainTopNav$1 = /*#__PURE__*/React.memo(MainTopNav);

var css_248z$6 = ".RotateScreen {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000; }\n  .RotateScreen.show {\n    display: flex;\n    align-items: center;\n    justify-content: center; }\n  .RotateScreen .container {\n    text-align: center; }\n    .RotateScreen .container .rotate-text {\n      color: #fff;\n      font-size: 1.6rem; }\n    .RotateScreen .container .rotate-icon {\n      width: 10rem; }\n";
styleInject(css_248z$6);

var RotateScreen = function RotateScreen(_ref) {
  var className = _ref.className,
      iconSrc = _ref.iconSrc,
      iconAlt = _ref.iconAlt,
      copy = _ref.copy,
      children = _ref.children;
  var containerRef = React.useRef();
  var orientation = reactUse.useOrientation();
  React.useLayoutEffect(function () {
    containerRef.current.addEventListener('touchmove', preventScrolling, {
      passive: false
    });
    console.log(containerRef.current);
    return function () {
      containerRef.current.removeEventListener('touchmove', preventScrolling);
    };
  }, []);

  function preventScrolling(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: classnames('RotateScreen', className, {
      show: detect.device.isMobile && orientation.angle !== 0
    }),
    ref: containerRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "container"
  }, iconSrc && /*#__PURE__*/React__default.createElement("img", {
    src: iconSrc,
    className: "rotate-icon",
    alt: iconAlt
  }), copy && /*#__PURE__*/React__default.createElement("p", {
    className: "rotate-text"
  }, copy), children));
};

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
var RotateScreen$1 = /*#__PURE__*/React.memo(RotateScreen);

var css_248z$7 = ".VideoPlayer {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n  .VideoPlayer .BackgroundVideo video {\n    width: 100%;\n    height: 100%; }\n  .VideoPlayer:fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    background-color: #000; }\n    .VideoPlayer:fullscreen .BackgroundVideo {\n      display: flex; }\n    .VideoPlayer:fullscreen video {\n      position: relative !important;\n      width: 100% !important;\n      height: auto !important;\n      left: 0 !important;\n      top: 0 !important; }\n    .VideoPlayer:fullscreen button.close {\n      opacity: 0; }\n  .VideoPlayer-captions-container {\n    position: absolute;\n    left: 50%;\n    bottom: 3rem;\n    background-color: rgba(0, 0, 0, 0.8);\n    transform: translateX(-50%);\n    color: #fff;\n    transition: 0.2s;\n    visibility: hidden; }\n    .VideoPlayer-captions-container p {\n      margin: 0;\n      font-size: 3rem;\n      font-weight: bold;\n      padding: 1rem;\n      max-width: 50rem;\n      text-align: center; }\n  .VideoPlayer .VideoControls {\n    transform: translateY(100%);\n    transition: 0.2s; }\n  .VideoPlayer.show-captions .VideoPlayer-captions-container {\n    visibility: visible; }\n  .VideoPlayer.show-controls .VideoControls {\n    transform: translateY(0%); }\n  .VideoPlayer.show-controls .VideoPlayer-captions-container {\n    bottom: 8rem; }\n";
styleInject(css_248z$7);

var css_248z$8 = ".VideoControls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 5rem;\n  background-color: #000;\n  z-index: 1;\n  box-sizing: border-box; }\n  .VideoControls-button {\n    width: 2rem;\n    height: 2rem;\n    margin-left: 2rem;\n    border: none;\n    cursor: pointer;\n    background: transparent;\n    padding: 0;\n    text-align: inherit;\n    letter-spacing: inherit;\n    font-size: inherit;\n    text-transform: inherit;\n    color: inherit;\n    outline: none; }\n    .VideoControls-button:first-of-type {\n      margin-right: 2rem; }\n    .VideoControls-button:last-of-type {\n      margin-right: 2rem; }\n    .VideoControls-button img {\n      width: 100%;\n      height: 100%; }\n  .VideoControls-time {\n    width: 4rem;\n    color: #fff;\n    font-size: 1.5rem;\n    margin-left: 2rem; }\n";
styleInject(css_248z$8);

var PlayIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n    <path fill=\"#fff\" d=\"M4 3.532l14.113 8.468-14.113 8.468v-16.936zm-2-3.532v24l20-12-20-12z\"/>\n</svg>";

var PauseIcon = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 17.5 33.5\" xml:space=\"preserve\">\n<rect fill=\"#fff\" x=\"2.2\" y=\"2.2\" width=\"3\" height=\"29\"/>\n<rect fill=\"#fff\" x=\"12.2\" y=\"2.2\" width=\"3\" height=\"29\"/>\n</svg>";

var MutedIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n    <path fill=\"#fff\" d=\"M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm17.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z\"/>\n</svg>";

var UnmutedIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n    <path fill=\"#fff\" d=\"M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm13.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z\"/>\n</svg>";

var ExitFullscreenIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\n\t y=\"0px\" viewBox=\"0 0 21.2 21.2\" enable-background=\"new 0 0 21.2 21.2\" xml:space=\"preserve\">\n<path fill=\"#fff\" d=\"M13.6,12.9H17c0.6,0,1,0.4,1,1s-0.4,1-1,1h-2.4v2.3c0,0.6-0.4,1-1,1s-1-0.4-1-1v-3.3\n\tC12.6,13.4,13,12.9,13.6,12.9z M4,12.8h3.3c0.6,0,1,0.4,1,1v3.4c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2.4H4c-0.6,0-1-0.4-1-1\n\tS3.4,12.8,4,12.8z M7.3,3.3c0.6,0,1,0.4,1,1v3.4c0,0.6-0.4,1-1,1H4c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h2.3V4.3\n\tC6.3,3.8,6.7,3.3,7.3,3.3z M13.6,3.3c0.6,0,1,0.4,1,1v2.3H17c0.6,0,1,0.4,1,1s-0.4,1-1,1h-3.4c-0.6,0-1-0.4-1-1V4.3\n\tC12.6,3.8,13,3.3,13.6,3.3z\"/>\n</svg>";

var EnterFullscreenIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 21.2 21.2\" enable-background=\"new 0 0 21.2 21.2\" xml:space=\"preserve\">\n<path fill=\"#fff\" d=\"M20.2,21.2h-3.4c-0.6,0-1-0.4-1-1s0.4-1,1-1h2.4v-2.3c0-0.6,0.4-1,1-1s1,0.4,1,1v3.3\n\tC21.2,20.7,20.8,21.2,20.2,21.2z M4.3,21.2H1c-0.6,0-1-0.4-1-1v-3.4c0-0.6,0.4-1,1-1s1,0.4,1,1v2.4h2.3c0.6,0,1,0.4,1,1\n\tS4.9,21.2,4.3,21.2z M1,5.4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h3.3c0.6,0,1,0.4,1,1s-0.4,1-1,1H2v2.4C2,4.9,1.6,5.4,1,5.4z\n\t M20.2,5.3c-0.6,0-1-0.4-1-1V2h-2.4c-0.6,0-1-0.4-1-1s0.4-1,1-1h3.4c0.6,0,1,0.4,1,1v3.3C21.2,4.8,20.8,5.3,20.2,5.3z\"/>\n</svg>";

var CaptionsOnIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n    <path fill=\"#fff\" d=\"M22 3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981zm-5 6h-14v-1h14v1zm0 2h-14v1h14v-1zm-6 3h-8v1h8v-1z\"/>\n</svg>";

var CaptionsOffIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n    <path fill=\"#fff\" d=\"M22 3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981z\"/>\n</svg>";

var css_248z$9 = ".VideoTimeline {\n  display: flex;\n  align-items: center;\n  position: relative;\n  height: 3px;\n  flex-grow: 1; }\n  .VideoTimeline-progress {\n    position: absolute;\n    height: 3px;\n    background-color: red; }\n  .VideoTimeline input {\n    margin: 0; }\n  .VideoTimeline input[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    -moz-appearance: none; }\n  .VideoTimeline input[type='range']::-moz-focus-outer {\n    border: 0; }\n  .VideoTimeline input[type=range]:focus {\n    border: none; }\n  .VideoTimeline input[type=range] {\n    -webkit-appearance: none;\n    position: absolute;\n    width: 100%;\n    height: 3px;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n    cursor: pointer;\n    padding: 0;\n    outline: none; }\n    .VideoTimeline input[type=range]::-webkit-slider-runnable-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-moz-range-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-ms-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-ms-tooltip {\n      display: none; }\n    .VideoTimeline input[type=range]::-ms-fill-lower {\n      background: transparent; }\n    .VideoTimeline input[type=range]::-ms-fill-upper {\n      background: transparent; }\n    .VideoTimeline input[type=range]::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      width: 1rem;\n      height: 1rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none;\n      margin-top: -0.25rem; }\n    .VideoTimeline input[type=range]::-moz-range-thumb {\n      width: 1rem;\n      height: 1rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none; }\n    .VideoTimeline input[type=range]::-ms-thumb {\n      width: 1rem;\n      height: 1rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none; }\n";
styleInject(css_248z$9);

var VideoTimeline = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(VideoTimeline, _React$PureComponent);

  var _super = _createSuper(VideoTimeline);

  _createClass(VideoTimeline, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.currentTime !== prevState.currentTime && !prevState.isMouseDown) {
        return {
          currentTime: nextProps.currentTime
        };
      }

      return null;
    }
  }]);

  function VideoTimeline(props) {
    var _this;

    _classCallCheck(this, VideoTimeline);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onChange", function () {
      _this.props.onTimeUpdate(_this.input.value, _this.input.value / _this.props.duration);

      _this.setState({
        currentTime: parseFloat(_this.input.value)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function () {
      _this.setState({
        isMouseDown: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
      _this.setState({
        isMouseDown: false
      });
    });

    _this.state = {
      currentTime: _this.props.currentTime,
      isMouseDown: false
    };
    return _this;
  }

  _createClass(VideoTimeline, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var progressStyle = {
        width: this.state.currentTime / this.props.duration * 100 + '%'
      };
      return /*#__PURE__*/React__default.createElement("div", {
        className: classnames('VideoTimeline', this.props.className),
        style: this.props.style,
        ref: function ref(r) {
          return _this2.container = r;
        }
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "VideoTimeline-progress",
        style: progressStyle
      }), /*#__PURE__*/React__default.createElement("input", {
        type: "range",
        ref: function ref(r) {
          return _this2.input = r;
        },
        min: "0",
        max: this.props.duration,
        step: "0.001",
        onChange: this.onChange,
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        value: this.state.currentTime,
        "aria-label": "Seek Video"
      }));
    }
  }]);

  return VideoTimeline;
}(React__default.PureComponent);
VideoTimeline.propTypes = checkProps({
  className: PropTypes.string,
  style: PropTypes.object,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  onTimeUpdate: PropTypes.func
});
VideoTimeline.defaultProps = {
  style: {},
  currentTime: 0,
  onTimeUpdate: noop
};

var VideoControls = /*#__PURE__*/React__default.memo(function (props) {
  function formatTime(totalSeconds) {
    var totalSecondsFloat = totalSeconds;
    var minutes = Math.floor(totalSecondsFloat / 60);
    var seconds = Math.round(totalSecondsFloat - minutes * 60);
    if (minutes < 10) minutes = "0".concat(minutes);
    if (seconds < 10) seconds = "0".concat(seconds);
    return "".concat(minutes, ":").concat(seconds);
  }

  return /*#__PURE__*/React__default.createElement("nav", {
    className: classnames('VideoControls', props.className),
    "aria-label": "Video Controls"
  }, /*#__PURE__*/React__default.createElement(BaseButton$1, {
    className: "VideoControls-button",
    "aria-label": props.isPlaying ? 'Pause Video' : 'Play Video',
    title: props.isPlaying ? 'Pause Video' : 'Play Video',
    onClick: props.onPlayToggle
  }, /*#__PURE__*/React__default.createElement("img", {
    src: props.isPlaying ? props.pauseIcon : props.playIcon,
    alt: props.isPlaying ? 'Pause Icon' : 'Play Icon'
  })), /*#__PURE__*/React__default.createElement(VideoTimeline, {
    duration: props.duration,
    currentTime: Number(props.currentTime),
    onTimeUpdate: props.onTimeUpdate
  }), /*#__PURE__*/React__default.createElement("time", {
    className: "VideoControls-time",
    tabIndex: "0"
  }, formatTime(Number(props.currentTime))), props.captions && /*#__PURE__*/React__default.createElement(BaseButton$1, {
    className: "VideoControls-button",
    "aria-label": props.isShowingCaptions ? 'Hide Captions' : 'Show Captions',
    title: props.isShowingCaptions ? 'Hide Captions' : 'Show Captions',
    onClick: props.onCaptionsToggle
  }, /*#__PURE__*/React__default.createElement("img", {
    src: props.isShowingCaptions ? props.captionsOnIcon : props.captionsOffIcon,
    alt: props.isShowingCaptions ? 'Captions On Icon' : 'Captions Off Icon'
  })), /*#__PURE__*/React__default.createElement(BaseButton$1, {
    className: "VideoControls-button",
    "aria-label": props.isMuted ? 'Unmute Video' : 'Mute Video',
    title: props.isMuted ? 'Unmute Video' : 'Mute Video',
    onClick: props.onMuteToggle
  }, /*#__PURE__*/React__default.createElement("img", {
    src: props.isMuted ? props.mutedIcon : props.unmutedIcon,
    alt: props.isMuted ? 'Muted Icon' : 'Unmuted Icon'
  })), /*#__PURE__*/React__default.createElement(BaseButton$1, {
    className: "VideoControls-button",
    "aria-label": props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode',
    title: props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode',
    onClick: props.onFullscreenToggle
  }, /*#__PURE__*/React__default.createElement("img", {
    src: props.isFullScreen ? props.exitFullscreenIcon : props.enterFullscreenIcon,
    alt: props.isFullScreen ? 'Fullscreen Mode Icon' : 'Normal Mode Icon'
  })));
});
VideoControls.propTypes = checkProps({
  className: PropTypes.string,
  captions: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isMuted: PropTypes.bool,
  isShowingCaptions: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number,
  onPlayToggle: PropTypes.func,
  onMuteToggle: PropTypes.func,
  onFullscreenToggle: PropTypes.func,
  onCaptionsToggle: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  playIcon: PropTypes.string,
  pauseIcon: PropTypes.string,
  mutedIcon: PropTypes.string,
  unmutedIcon: PropTypes.string,
  exitFullscreenIcon: PropTypes.string,
  enterFullscreenIcon: PropTypes.string,
  captionsOnIcon: PropTypes.string,
  captionsOffIcon: PropTypes.string
});
VideoControls.defaultProps = {
  onPlayToggle: noop,
  onMuteToggle: noop,
  onFullscreenToggle: noop,
  onCaptionsToggle: noop,
  onTimeUpdate: noop,
  playIcon: PlayIcon,
  pauseIcon: PauseIcon,
  mutedIcon: MutedIcon,
  unmutedIcon: UnmutedIcon,
  exitFullscreenIcon: ExitFullscreenIcon,
  enterFullscreenIcon: EnterFullscreenIcon,
  captionsOnIcon: CaptionsOnIcon,
  captionsOffIcon: CaptionsOffIcon
};

var VideoPlayer = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(VideoPlayer, _React$PureComponent);

  var _super = _createSuper(VideoPlayer);

  _createClass(VideoPlayer, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.windowWidth !== prevState.containerWidth || nextProps.windowHeight !== prevState.containerHeight) {
        return {
          containerWidth: nextProps.windowWidth,
          containerHeight: nextProps.windowHeight
        };
      }

      if (nextProps.startTime !== prevState.startTime) {
        return {
          startTime: nextProps.startTime
        };
      }

      return null;
    }
  }]);

  function VideoPlayer(props) {
    var _this;

    _classCallCheck(this, VideoPlayer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "showControls", function () {
      _this.setState({
        isShowingControls: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hideControls", function () {
      _this.setState({
        isShowingControls: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "play", function () {
      !_this.state.isPlaying && _this.video.play();
    });

    _defineProperty(_assertThisInitialized(_this), "pause", function () {
      _this.state.isPlaying && _this.video.pause();
    });

    _defineProperty(_assertThisInitialized(_this), "mute", function () {
      !_this.state.isMuted && _this.video.mute();
    });

    _defineProperty(_assertThisInitialized(_this), "unmute", function () {
      _this.state.isMuted && _this.video.unmute();
    });

    _defineProperty(_assertThisInitialized(_this), "togglePlay", function () {
      _this.video.togglePlay();
    });

    _defineProperty(_assertThisInitialized(_this), "toggleMute", function () {
      _this.video.toggleMute();
    });

    _defineProperty(_assertThisInitialized(_this), "toggleFullscreen", function () {
      _this.state.isFullScreen ? _this.fullScreen.exit() : _this.fullScreen.enter();
    });

    _defineProperty(_assertThisInitialized(_this), "toggleCaptions", function () {
      _this.setState({
        isShowingCaptions: !_this.state.isShowingCaptions
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setCaptions", function () {
      var captions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.captions;
      var video = _this.video.video;

      if (video.contains(_this.captions)) {
        video.removeChild(_this.captions);

        _this.captions.removeEventListener('cuechange', _this.onTrackChange);
      }

      var track = document.createElement('track');
      track.kind = captions.kind;
      track.label = captions.label;
      track.srclang = captions.srclang;
      track["default"] = captions["default"];
      track.src = captions.src;
      track.mode = 'hidden';
      _this.captions = track;
      video.appendChild(_this.captions);
      video.textTracks[0].mode = 'hidden';

      _this.captions.addEventListener('cuechange', _this.onTrackChange);
    });

    _defineProperty(_assertThisInitialized(_this), "clearHideControlsTimeout", function () {
      if (_this.hideControlsTimeout) {
        clearTimeout(_this.hideControlsTimeout);
        _this.hideControlsTimeout = undefined;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearAutoPlayTimeout", function () {
      _this.autoPlayTimeout && clearTimeout(_this.autoPlayTimeout);
    });

    _defineProperty(_assertThisInitialized(_this), "setHideControlsTimeout", function () {
      _this.clearHideControlsTimeout();

      _this.hideControlsTimeout = setTimeout(function () {
        _this.state.isPlaying && _this.hideControls();
      }, _this.props.controlsTimeout * 1000);
    });

    _defineProperty(_assertThisInitialized(_this), "updateTime", function (currentTime) {
      _this.video.setCurrentTime(Number(currentTime));
    });

    _defineProperty(_assertThisInitialized(_this), "onReady", function (duration) {
      if (_this.props.captions) {
        _this.props.captions.src && _this.setCaptions();
      }

      _this.setState({
        duration: duration
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTrackChange", function () {
      var trackList = _this.video.video.textTracks;
      var textTracks = trackList && trackList.length > 0 ? trackList[0] : null;
      var cue = textTracks && textTracks.activeCues.length > 0 ? textTracks.activeCues[0] : null;
      var text = cue ? cue.text : '';

      _this.setState({
        currentCaptions: text
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function (newSize) {
      _this.setState(newSize);
    });

    _defineProperty(_assertThisInitialized(_this), "onEnterFullScreen", function () {
      _this.setState({
        isFullScreen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onExitFullScreen", function () {
      _this.setState({
        isFullScreen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPlay", function () {
      _this.setState({
        isPlaying: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPause", function () {
      _this.setState({
        isPlaying: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTimeUpdate", function (currentTime, progress, duration) {
      _this.setState({
        currentTime: currentTime,
        progress: progress,
        duration: duration
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMute", function () {
      _this.setState({
        isMuted: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onUnmute", function () {
      _this.setState({
        isMuted: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onEnd", function () {
      _this.props.onEnd();

      _this.fullScreen.isFullScreen() && _this.fullScreen.exit();
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function () {
      if (_this.state.isPlaying && _this.props.hasControls) {
        _this.showControls();

        _this.setHideControlsTimeout();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (e) {
      if (_this.props.allowKeyboardControl) {
        var event = e.keyCode || e.which || e.charCode;

        if (event === 32) {
          _this.togglePlay();
        }
      }
    });

    _this.state = {
      containerWidth: props.windowWidth || 0,
      containerHeight: props.windowHeight || 0,
      isPlaying: false,
      isMuted: props.muted,
      isFullScreen: false,
      isShowingControls: props.showControlsOnLoad,
      isShowingCaptions: props.captions && props.captions["default"],
      currentCaptions: '',
      currentTime: 0,
      progress: 0,
      duration: 0,
      startTime: props.startTime
    };
    return _this;
  }

  _createClass(VideoPlayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.fullScreen = fullScreen(this.container, this.onEnterFullScreen, this.onExitFullScreen);
      this.controls = this.container.querySelector('.VideoControls');

      if (this.props.hasControls) {
        this.props.showControlsOnLoad ? this.setHideControlsTimeout() : this.hideControls(0);
      }

      if (this.props.autoPlay) {
        this.autoPlayTimeout = setTimeout(function () {
          _this2.play();

          _this2.clearAutoPlayTimeout();
        }, this.props.autoPlayDelay * 1000);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.isPlaying !== this.state.isPlaying) {
        if (this.state.isPlaying) {
          this.props.onPlay();
          this.props.hasControls && this.setHideControlsTimeout();
        } else {
          this.props.onPause();

          if (this.props.hasControls) {
            this.clearHideControlsTimeout();
            this.showControls();
          }
        }
      }

      if (this.props.captions && prevProps.captions.src !== this.props.captions.src) {
        this.setCaptions(this.props.captions);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.fullScreen.destroy();
      this.pause();
      this.clearAutoPlayTimeout();
      this.props.hasControls && this.clearHideControlsTimeout();
      this.captions && this.captions.removeEventListener('cuechange', this.onTrackChange);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/React__default.createElement("div", {
        className: classnames('VideoPlayer', this.props.className, {
          'show-controls': this.state.isShowingControls,
          'show-captions': this.state.isShowingCaptions
        }),
        style: this.props.style,
        ref: function ref(r) {
          return _this3.container = r;
        },
        onMouseMove: this.onMouseMove
      }, /*#__PURE__*/React__default.createElement(BackgroundVideo, {
        ref: function ref(r) {
          return _this3.video = r;
        },
        src: this.props.src,
        containerWidth: this.state.containerWidth,
        containerHeight: this.state.containerHeight,
        autoPlay: false,
        poster: this.props.poster,
        muted: this.props.muted,
        loop: this.props.loop,
        disableBackgroundCover: this.props.disableBackgroundCover,
        preload: this.props.preload,
        playsInline: this.props.playsInline,
        volume: this.props.volume,
        startTime: this.state.startTime,
        onReady: this.onReady,
        onPlay: this.onPlay,
        onPause: this.onPause,
        onTimeUpdate: this.onTimeUpdate,
        onMute: this.onMute,
        onUnmute: this.onUnmute,
        onEnd: this.onEnd,
        onClick: this.props.togglePlayOnClick ? this.togglePlay : function (f) {
          return f;
        },
        onKeyPress: this.onKeyPress
      }), this.props.captions && /*#__PURE__*/React__default.createElement("div", {
        className: "VideoPlayer-captions-container",
        ref: function ref(r) {
          return _this3.captionsContainer = r;
        }
      }, this.state.currentCaptions && /*#__PURE__*/React__default.createElement("p", null, this.state.currentCaptions)), this.props.hasControls && /*#__PURE__*/React__default.createElement(VideoControls, {
        captions: Boolean(this.props.captions),
        currentTime: Number(this.state.currentTime),
        isPlaying: this.state.isPlaying,
        isMuted: this.state.isMuted,
        isFullScreen: this.state.isFullScreen,
        isShowingCaptions: this.state.isShowingCaptions,
        duration: this.state.duration,
        onPlayToggle: this.togglePlay,
        onMuteToggle: this.toggleMute,
        onFullscreenToggle: this.toggleFullscreen,
        onCaptionsToggle: this.toggleCaptions,
        onTimeUpdate: this.updateTime,
        playIcon: this.props.playIcon,
        pauseIcon: this.props.pauseIcon,
        mutedIcon: this.props.mutedIcon,
        unmutedIcon: this.props.unmutedIcon,
        exitFullscreenIcon: this.props.exitFullscreenIcon,
        enterFullscreenIcon: this.props.enterFullscreenIcon,
        captionsOnIcon: this.props.captionsOnIcon,
        captionsOffIcon: this.props.captionsOffIcon
      }));
    }
  }]);

  return VideoPlayer;
}(React__default.PureComponent);
VideoPlayer.propTypes = checkProps({
  className: PropTypes.string,
  style: PropTypes.object,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  preload: PropTypes.string,
  captions: PropTypes.object,
  disableBackgroundCover: PropTypes.bool,
  allowKeyboardControl: PropTypes.bool,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  togglePlayOnClick: PropTypes.bool,
  showControlsOnLoad: PropTypes.bool,
  hasControls: PropTypes.bool,
  playsInline: PropTypes.bool,
  autoPlayDelay: PropTypes.number,
  controlsTimeout: PropTypes.number,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number,
  volume: PropTypes.number,
  startTime: PropTypes.number,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onEnd: PropTypes.func,
  playIcon: PropTypes.string,
  pauseIcon: PropTypes.string,
  mutedIcon: PropTypes.string,
  unmutedIcon: PropTypes.string,
  exitFullscreenIcon: PropTypes.string,
  enterFullscreenIcon: PropTypes.string,
  captionsOnIcon: PropTypes.string,
  captionsOffIcon: PropTypes.string
});
VideoPlayer.defaultProps = {
  style: {},
  togglePlayOnClick: true,
  allowKeyboardControl: true,
  autoPlay: false,
  autoPlayDelay: 0,
  // in seconds
  muted: false,
  loop: false,
  hasControls: true,
  controlsTimeout: 2.5,
  // in seconds
  showControlsOnLoad: true,
  disableBackgroundCover: true,
  preload: 'auto',
  playsInline: false,
  volume: 1,
  startTime: 0,
  // in seconds
  onPlay: noop,
  onPause: noop,
  onEnd: noop
};

var css_248z$a = ".PageOverlay {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s;\n  transition-delay: visibility 0.2s; }\n  .PageOverlay.is-showing {\n    opacity: 1;\n    visibility: visible;\n    transition-delay: 0s; }\n";
styleInject(css_248z$a);

var PageOverlay = function PageOverlay(_ref) {
  var className = _ref.className,
      triggerOnRouteChange = _ref.triggerOnRouteChange,
      isShowing = _ref.isShowing,
      onClick = _ref.onClick;
  var previousPathname = React.useRef('');
  var location = reactRouterDom.useLocation();
  React.useEffect(function () {
    if (triggerOnRouteChange && previousPathname.current && previousPathname.current !== location.pathname) {
      triggerOnRouteChange && onClick();
    }

    previousPathname.current = location.pathname;
  }, [triggerOnRouteChange, location]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: classnames('PageOverlay', className, {
      'is-showing': isShowing
    }),
    onClick: onClick
  });
};

PageOverlay.propTypes = checkProps({
  className: PropTypes.string,
  isShowing: PropTypes.bool,
  triggerOnRouteChange: PropTypes.bool,
  onClick: PropTypes.func
});
PageOverlay.defaultProps = {
  triggerOnRouteChange: false,
  onClick: noop
};
var PageOverlay$1 = /*#__PURE__*/React.memo(PageOverlay);

exports.BaseButton = BaseButton$1;
exports.BaseLink = BaseLink$1;
exports.CloseButton = CloseButton$1;
exports.Footer = Footer$1;
exports.HamburgerButton = HamburgerButton$1;
exports.HamburgerMenu = HamburgerMenu$1;
exports.MainTopNav = MainTopNav$1;
exports.PageOverlay = PageOverlay$1;
exports.RotateScreen = RotateScreen$1;
exports.VideoPlayer = VideoPlayer;
//# sourceMappingURL=index.js.map
