import React, { PureComponent } from 'react';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
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

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var warning = function() {};

var warning_1 = warning;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var warning$1 = function() {};

var warning_1$1 = warning$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1 = invariant;

function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof$1(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof$1(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends$1({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
};

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    warning_1$1(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          warning_1$1(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  invariant_1(canUseDOM, 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    warning_1$1(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = stripBasename(path, basename);

    return createLocation(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = createTransitionManager();

  var setState = function setState(nextState) {
    _extends$2(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + createPath(location);
  };

  var push = function push(path, state) {
    warning_1$1(!((typeof path === 'undefined' ? 'undefined' : _typeof$2(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        warning_1$1(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    warning_1$1(!((typeof path === 'undefined' ? 'undefined' : _typeof$2(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        warning_1$1(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      addEventListener(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) addEventListener(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      removeEventListener(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) removeEventListener(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var HashChangeEvent$1 = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  invariant_1(canUseDOM, 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;


  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    warning_1$1(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = stripBasename(path, basename);

    return createLocation(path);
  };

  var transitionManager = createTransitionManager();

  var setState = function setState(nextState) {
    _extends$3(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && locationsAreEqual(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + createPath(location));
  };

  var push = function push(path, state) {
    warning_1$1(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        warning_1$1(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    warning_1$1(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    warning_1$1(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      addEventListener(window, HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      removeEventListener(window, HashChangeEvent$1, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var transitionManager = createTransitionManager();

  var setState = function setState(nextState) {
    _extends$4(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = createPath;

  var push = function push(path, state) {
    warning_1$1(!((typeof path === 'undefined' ? 'undefined' : _typeof$3(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    warning_1$1(!((typeof path === 'undefined' ? 'undefined' : _typeof$3(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var warning$2 = function() {};

var warning_1$2 = warning$2;

var _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for putting history on context.
 */

var Router = function (_React$Component) {
  _inherits$1(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck$1(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$1(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props.history.location.pathname)
    }, _temp), _possibleConstructorReturn$1(_this, _ret);
  }

  Router.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends$5({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  };

  Router.prototype.computeMatch = function computeMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        history = _props.history;


    invariant_1(children == null || React.Children.count(children) === 1, "A <Router> may have only one child element");

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(function () {
      _this2.setState({
        match: _this2.computeMatch(history.location.pathname)
      });
    });
  };

  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning_1$2(this.props.history === nextProps.history, "You cannot change <Router history>");
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Router.prototype.render = function render() {
    var children = this.props.children;

    return children ? React.Children.only(children) : null;
  };

  return Router;
}(React.Component);

Router.propTypes = {
  history: propTypes.object.isRequired,
  children: propTypes.node
};
Router.contextTypes = {
  router: propTypes.object
};
Router.childContextTypes = {
  router: propTypes.object.isRequired
};

// Written in this round about way for babel-transform-imports

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = function (_React$Component) {
  _inherits$2(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _temp, _this, _ret;

    _classCallCheck$2(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$2(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = createBrowserHistory(_this.props), _temp), _possibleConstructorReturn$2(_this, _ret);
  }

  BrowserRouter.prototype.componentWillMount = function componentWillMount() {
    warning_1(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { BrowserRouter as Router }`.");
  };

  BrowserRouter.prototype.render = function render() {
    return React.createElement(Router, { history: this.history, children: this.props.children });
  };

  return BrowserRouter;
}(React.Component);

BrowserRouter.propTypes = {
  basename: propTypes.string,
  forceRefresh: propTypes.bool,
  getUserConfirmation: propTypes.func,
  keyLength: propTypes.number,
  children: propTypes.node
};

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter = function (_React$Component) {
  _inherits$3(HashRouter, _React$Component);

  function HashRouter() {
    var _temp, _this, _ret;

    _classCallCheck$3(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$3(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = createHashHistory(_this.props), _temp), _possibleConstructorReturn$3(_this, _ret);
  }

  HashRouter.prototype.componentWillMount = function componentWillMount() {
    warning_1(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { HashRouter as Router }`.");
  };

  HashRouter.prototype.render = function render() {
    return React.createElement(Router, { history: this.history, children: this.props.children });
  };

  return HashRouter;
}(React.Component);

HashRouter.propTypes = {
  basename: propTypes.string,
  getUserConfirmation: propTypes.func,
  hashType: propTypes.oneOf(["hashbang", "noslash", "slash"]),
  children: propTypes.node
};

var _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties$1(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * The public API for rendering a history-aware <a>.
 */

var Link = function (_React$Component) {
  _inherits$4(Link, _React$Component);

  function Link() {
    var _temp, _this, _ret;

    _classCallCheck$4(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$4(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();

          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;


          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
    }, _temp), _possibleConstructorReturn$4(_this, _ret);
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        replace = _props.replace,
        to = _props.to,
        innerRef = _props.innerRef,
        props = _objectWithoutProperties$1(_props, ["replace", "to", "innerRef"]); // eslint-disable-line no-unused-vars

    invariant_1(this.context.router, "You should not use <Link> outside a <Router>");

    invariant_1(to !== undefined, 'You must specify the "to" property');

    var history = this.context.router.history;

    var location = typeof to === "string" ? createLocation(to, null, null, history.location) : to;

    var href = history.createHref(location);
    return React.createElement("a", _extends$6({}, props, { onClick: this.handleClick, href: href, ref: innerRef }));
  };

  return Link;
}(React.Component);

Link.propTypes = {
  onClick: propTypes.func,
  target: propTypes.string,
  replace: propTypes.bool,
  to: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired,
  innerRef: propTypes.oneOfType([propTypes.string, propTypes.func])
};
Link.defaultProps = {
  replace: false
};
Link.contextTypes = {
  router: propTypes.shape({
    history: propTypes.shape({
      push: propTypes.func.isRequired,
      replace: propTypes.func.isRequired,
      createHref: propTypes.func.isRequired
    }).isRequired
  }).isRequired
};

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter = function (_React$Component) {
  _inherits$5(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _temp, _this, _ret;

    _classCallCheck$5(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$5(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = createMemoryHistory(_this.props), _temp), _possibleConstructorReturn$5(_this, _ret);
  }

  MemoryRouter.prototype.componentWillMount = function componentWillMount() {
    warning_1$2(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { MemoryRouter as Router }`.");
  };

  MemoryRouter.prototype.render = function render() {
    return React.createElement(Router, { history: this.history, children: this.props.children });
  };

  return MemoryRouter;
}(React.Component);

MemoryRouter.propTypes = {
  initialEntries: propTypes.array,
  initialIndex: propTypes.number,
  getUserConfirmation: propTypes.func,
  keyLength: propTypes.number,
  children: propTypes.node
};

// Written in this round about way for babel-transform-imports

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var keys = [];
  var re = pathToRegexp_1(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments[2];

  if (typeof options === "string") options = { path: options };

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === undefined ? false : _options$sensitive;


  if (path == null) return parent;

  var _compilePath = compilePath(path, { end: exact, strict: strict, sensitive: sensitive }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var url = match[0],
      values = match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path: path, // the path pattern used to match
    url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

var _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isEmptyChildren = function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
};

/**
 * The public API for matching a single path and rendering.
 */

var Route = function (_React$Component) {
  _inherits$6(Route, _React$Component);

  function Route() {
    var _temp, _this, _ret;

    _classCallCheck$6(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$6(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props, _this.context.router)
    }, _temp), _possibleConstructorReturn$6(_this, _ret);
  }

  Route.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends$7({}, this.context.router, {
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      })
    };
  };

  Route.prototype.computeMatch = function computeMatch(_ref, router) {
    var computedMatch = _ref.computedMatch,
        location = _ref.location,
        path = _ref.path,
        strict = _ref.strict,
        exact = _ref.exact,
        sensitive = _ref.sensitive;

    if (computedMatch) return computedMatch; // <Switch> already computed the match for us

    invariant_1(router, "You should not use <Route> or withRouter() outside a <Router>");

    var route = router.route;

    var pathname = (location || route.location).pathname;

    return matchPath(pathname, { path: path, strict: strict, exact: exact, sensitive: sensitive }, route.match);
  };

  Route.prototype.componentWillMount = function componentWillMount() {
    warning_1$2(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored");

    warning_1$2(!(this.props.component && this.props.children && !isEmptyChildren(this.props.children)), "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored");

    warning_1$2(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored");
  };

  Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
    warning_1$2(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    warning_1$2(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  };

  Route.prototype.render = function render() {
    var match = this.state.match;
    var _props = this.props,
        children = _props.children,
        component = _props.component,
        render = _props.render;
    var _context$router = this.context.router,
        history = _context$router.history,
        route = _context$router.route,
        staticContext = _context$router.staticContext;

    var location = this.props.location || route.location;
    var props = { match: match, location: location, history: history, staticContext: staticContext };

    if (component) return match ? React.createElement(component, props) : null;

    if (render) return match ? render(props) : null;

    if (typeof children === "function") return children(props);

    if (children && !isEmptyChildren(children)) return React.Children.only(children);

    return null;
  };

  return Route;
}(React.Component);

Route.propTypes = {
  computedMatch: propTypes.object, // private, from <Switch>
  path: propTypes.string,
  exact: propTypes.bool,
  strict: propTypes.bool,
  sensitive: propTypes.bool,
  component: propTypes.func,
  render: propTypes.func,
  children: propTypes.oneOfType([propTypes.func, propTypes.node]),
  location: propTypes.object
};
Route.contextTypes = {
  router: propTypes.shape({
    history: propTypes.object.isRequired,
    route: propTypes.object.isRequired,
    staticContext: propTypes.object
  })
};
Route.childContextTypes = {
  router: propTypes.object.isRequired
};

// Written in this round about way for babel-transform-imports

var _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _objectWithoutProperties$2(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
var NavLink = function NavLink(_ref) {
  var to = _ref.to,
      exact = _ref.exact,
      strict = _ref.strict,
      location = _ref.location,
      activeClassName = _ref.activeClassName,
      className = _ref.className,
      activeStyle = _ref.activeStyle,
      style = _ref.style,
      getIsActive = _ref.isActive,
      ariaCurrent = _ref["aria-current"],
      rest = _objectWithoutProperties$2(_ref, ["to", "exact", "strict", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "aria-current"]);

  var path = (typeof to === "undefined" ? "undefined" : _typeof$4(to)) === "object" ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

  return React.createElement(Route, {
    path: escapedPath,
    exact: exact,
    strict: strict,
    location: location,
    children: function children(_ref2) {
      var location = _ref2.location,
          match = _ref2.match;

      var isActive = !!(getIsActive ? getIsActive(match, location) : match);

      return React.createElement(Link, _extends$8({
        to: to,
        className: isActive ? [className, activeClassName].filter(function (i) {
          return i;
        }).join(" ") : className,
        style: isActive ? _extends$8({}, style, activeStyle) : style,
        "aria-current": isActive && ariaCurrent || null
      }, rest));
    }
  });
};

NavLink.propTypes = {
  to: Link.propTypes.to,
  exact: propTypes.bool,
  strict: propTypes.bool,
  location: propTypes.object,
  activeClassName: propTypes.string,
  className: propTypes.string,
  activeStyle: propTypes.object,
  style: propTypes.object,
  isActive: propTypes.func,
  "aria-current": propTypes.oneOf(["page", "step", "location", "date", "time", "true"])
};

NavLink.defaultProps = {
  activeClassName: "active",
  "aria-current": "page"
};

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

var Prompt = function (_React$Component) {
  _inherits$7(Prompt, _React$Component);

  function Prompt() {
    _classCallCheck$7(this, Prompt);

    return _possibleConstructorReturn$7(this, _React$Component.apply(this, arguments));
  }

  Prompt.prototype.enable = function enable(message) {
    if (this.unblock) this.unblock();

    this.unblock = this.context.router.history.block(message);
  };

  Prompt.prototype.disable = function disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  };

  Prompt.prototype.componentWillMount = function componentWillMount() {
    invariant_1(this.context.router, "You should not use <Prompt> outside a <Router>");

    if (this.props.when) this.enable(this.props.message);
  };

  Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) this.enable(nextProps.message);
    } else {
      this.disable();
    }
  };

  Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
    this.disable();
  };

  Prompt.prototype.render = function render() {
    return null;
  };

  return Prompt;
}(React.Component);

Prompt.propTypes = {
  when: propTypes.bool,
  message: propTypes.oneOfType([propTypes.func, propTypes.string]).isRequired
};
Prompt.defaultProps = {
  when: true
};
Prompt.contextTypes = {
  router: propTypes.shape({
    history: propTypes.shape({
      block: propTypes.func.isRequired
    }).isRequired
  }).isRequired
};

// Written in this round about way for babel-transform-imports

var patternCache$1 = {};
var cacheLimit$1 = 10000;
var cacheCount$1 = 0;

var compileGenerator = function compileGenerator(pattern) {
  var cacheKey = pattern;
  var cache = patternCache$1[cacheKey] || (patternCache$1[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var compiledGenerator = pathToRegexp_1.compile(pattern);

  if (cacheCount$1 < cacheLimit$1) {
    cache[pattern] = compiledGenerator;
    cacheCount$1++;
  }

  return compiledGenerator;
};

/**
 * Public API for generating a URL pathname from a pattern and parameters.
 */
var generatePath = function generatePath() {
  var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (pattern === "/") {
    return pattern;
  }
  var generator = compileGenerator(pattern);
  return generator(params, { pretty: true });
};

var _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for updating the location programmatically
 * with a component.
 */

var Redirect = function (_React$Component) {
  _inherits$8(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck$8(this, Redirect);

    return _possibleConstructorReturn$8(this, _React$Component.apply(this, arguments));
  }

  Redirect.prototype.isStatic = function isStatic() {
    return this.context.router && this.context.router.staticContext;
  };

  Redirect.prototype.componentWillMount = function componentWillMount() {
    invariant_1(this.context.router, "You should not use <Redirect> outside a <Router>");

    if (this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidMount = function componentDidMount() {
    if (!this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevTo = createLocation(prevProps.to);
    var nextTo = createLocation(this.props.to);

    if (locationsAreEqual(prevTo, nextTo)) {
      warning_1$2(false, "You tried to redirect to the same route you're currently on: " + ("\"" + nextTo.pathname + nextTo.search + "\""));
      return;
    }

    this.perform();
  };

  Redirect.prototype.computeTo = function computeTo(_ref) {
    var computedMatch = _ref.computedMatch,
        to = _ref.to;

    if (computedMatch) {
      if (typeof to === "string") {
        return generatePath(to, computedMatch.params);
      } else {
        return _extends$9({}, to, {
          pathname: generatePath(to.pathname, computedMatch.params)
        });
      }
    }

    return to;
  };

  Redirect.prototype.perform = function perform() {
    var history = this.context.router.history;
    var push = this.props.push;

    var to = this.computeTo(this.props);

    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(React.Component);

Redirect.propTypes = {
  computedMatch: propTypes.object, // private, from <Switch>
  push: propTypes.bool,
  from: propTypes.string,
  to: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired
};
Redirect.defaultProps = {
  push: false
};
Redirect.contextTypes = {
  router: propTypes.shape({
    history: propTypes.shape({
      push: propTypes.func.isRequired,
      replace: propTypes.func.isRequired
    }).isRequired,
    staticContext: propTypes.object
  }).isRequired
};

// Written in this round about way for babel-transform-imports

var _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties$3(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var addLeadingSlash$1 = function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
};

var addBasename = function addBasename(basename, location) {
  if (!basename) return location;

  return _extends$a({}, location, {
    pathname: addLeadingSlash$1(basename) + location.pathname
  });
};

var stripBasename$1 = function stripBasename(basename, location) {
  if (!basename) return location;

  var base = addLeadingSlash$1(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return _extends$a({}, location, {
    pathname: location.pathname.substr(base.length)
  });
};

var createURL = function createURL(location) {
  return typeof location === "string" ? location : createPath(location);
};

var staticHandler = function staticHandler(methodName) {
  return function () {
    invariant_1(false, "You cannot %s with <StaticRouter>", methodName);
  };
};

var noop = function noop() {};

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

var StaticRouter = function (_React$Component) {
  _inherits$9(StaticRouter, _React$Component);

  function StaticRouter() {
    var _temp, _this, _ret;

    _classCallCheck$9(this, StaticRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn$9(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createHref = function (path) {
      return addLeadingSlash$1(_this.props.basename + createURL(path));
    }, _this.handlePush = function (location) {
      var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;

      context.action = "PUSH";
      context.location = addBasename(basename, createLocation(location));
      context.url = createURL(context.location);
    }, _this.handleReplace = function (location) {
      var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;

      context.action = "REPLACE";
      context.location = addBasename(basename, createLocation(location));
      context.url = createURL(context.location);
    }, _this.handleListen = function () {
      return noop;
    }, _this.handleBlock = function () {
      return noop;
    }, _temp), _possibleConstructorReturn$9(_this, _ret);
  }

  StaticRouter.prototype.getChildContext = function getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  };

  StaticRouter.prototype.componentWillMount = function componentWillMount() {
    warning_1$2(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { StaticRouter as Router }`.");
  };

  StaticRouter.prototype.render = function render() {
    var _props = this.props,
        basename = _props.basename,
        context = _props.context,
        location = _props.location,
        props = _objectWithoutProperties$3(_props, ["basename", "context", "location"]);

    var history = {
      createHref: this.createHref,
      action: "POP",
      location: stripBasename$1(basename, createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return React.createElement(Router, _extends$a({}, props, { history: history }));
  };

  return StaticRouter;
}(React.Component);

StaticRouter.propTypes = {
  basename: propTypes.string,
  context: propTypes.object.isRequired,
  location: propTypes.oneOfType([propTypes.string, propTypes.object])
};
StaticRouter.defaultProps = {
  basename: "",
  location: "/"
};
StaticRouter.childContextTypes = {
  router: propTypes.object.isRequired
};

// Written in this round about way for babel-transform-imports

function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$a(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch = function (_React$Component) {
  _inherits$a(Switch, _React$Component);

  function Switch() {
    _classCallCheck$a(this, Switch);

    return _possibleConstructorReturn$a(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillMount = function componentWillMount() {
    invariant_1(this.context.router, "You should not use <Switch> outside a <Router>");
  };

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    warning_1$2(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    warning_1$2(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
        child = void 0;
    React.Children.forEach(children, function (element) {
      if (match == null && React.isValidElement(element)) {
        var _element$props = element.props,
            pathProp = _element$props.path,
            exact = _element$props.exact,
            strict = _element$props.strict,
            sensitive = _element$props.sensitive,
            from = _element$props.from;

        var path = pathProp || from;

        child = element;
        match = matchPath(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }, route.match);
      }
    });

    return match ? React.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(React.Component);

Switch.contextTypes = {
  router: propTypes.shape({
    route: propTypes.object.isRequired
  }).isRequired
};
Switch.propTypes = {
  children: propTypes.node,
  location: propTypes.object
};

// Written in this round about way for babel-transform-imports

// Written in this round about way for babel-transform-imports

// Written in this round about way for babel-transform-imports

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols$1) {
            keys = keys.concat(getOwnPropertySymbols$1(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

var _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties$4(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A public higher-order component to access the imperative API
 */
var withRouter = function withRouter(Component) {
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutProperties$4(props, ["wrappedComponentRef"]);

    return React.createElement(Route, {
      children: function children(routeComponentProps) {
        return React.createElement(Component, _extends$b({}, remainingProps, routeComponentProps, {
          ref: wrappedComponentRef
        }));
      }
    });
  };

  C.displayName = "withRouter(" + (Component.displayName || Component.name) + ")";
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: propTypes.func
  };

  return hoistNonReactStatics_cjs(C, Component);
};

// Written in this round about way for babel-transform-imports

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof undefined === 'function' && typeof undefined.amd === 'object' && undefined.amd) {
		// register as 'classnames', consistent with npm package name
		undefined('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
});

/**
 * Return properties that are present in the source Object, but not in the valid Object and are not ignored
 *
 * @param {Object} srcProps Source Properties
 * @param {Object} validProps List of Valid Properties
 * @param {Array} ignoreProps List of Properties to ignore, even if they are not valid
 * @returns Array with exclude properties
 */
function excludeFilter(srcProps = {}, validProps = {}, ignoreProps = []) {
  return Object.keys(srcProps).filter(prop => !validProps.hasOwnProperty(prop) && ignoreProps.indexOf(prop) === -1);
}

var excludeFilter_1 = excludeFilter;

const BASE_IGNORE_LIST = [
  'children',
  'history',
  'location',
  'params',
  'route',
  'routes',
  'routeParams',
  'context',
  'slug',
  'fn',
  'match',
  'staticContext'
];

/**
 * Check if there are unused properties or properties that were not set
 *
 * @export
 * @param {any} propTypes
 * @param {any} [ignoreData=[]]
 * @returns {Boolean}
 */
function extraPropertiesChecker(propTypes = {}, ignoreData = []) {
  const ignoreList = BASE_IGNORE_LIST.concat(ignoreData);

  return {
    ...propTypes,
    fn: function(props, self, componentName) {
      const unspecifiedProps = excludeFilter_1(props, propTypes, ignoreList);

      if (unspecifiedProps.length) {
        console.warn(`Component ${componentName} has unspecified props: ${unspecifiedProps.join(', ')}`);
      }
    }
  };
}

var src = extraPropertiesChecker;

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

var css = ".BaseLink {\n  display: inline-block; }\n";
styleInject(css);

var excludes = ['children', 'download', 'target', 'rel', 'link'];
var externalLinkRegex = /^(https:\/\/|http:\/\/|www\.|tel:|mailto:)/;
var externalSiteRegex = /^(https:\/\/|http:\/\/|www\.)/;
var BaseLink = React.memo(React.forwardRef(function (props, ref) {
  var Tag = externalLinkRegex.test(props.link) || props.download ? 'a' : Link; // clean props

  var componentProps = Object.keys(props).reduce(function (acc, key) {
    return excludes.concat().indexOf(key) > -1 ? acc : _objectSpread({}, acc, _defineProperty({}, key, props[key]));
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

  return React.createElement(Tag, _extends({
    ref: ref,
    className: classnames('BaseLink', props.className)
  }, componentProps), props.children);
}));
BaseLink.propTypes = src({
  className: propTypes.string,
  rel: propTypes.string,
  link: propTypes.string,
  target: propTypes.oneOf(['_blank', '_self']),
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  download: propTypes.string,
  title: propTypes.string,
  children: propTypes.node,
  onBlur: propTypes.func,
  onFocus: propTypes.func,
  onKeyDown: propTypes.func,
  onKeyUp: propTypes.func,
  onMouseMove: propTypes.func,
  onMouseEnter: propTypes.func,
  onMouseLeave: propTypes.func,
  onMouseUp: propTypes.func,
  onMouseDown: propTypes.func,
  onTouchEnd: propTypes.func,
  onTouchMove: propTypes.func,
  onTouchStart: propTypes.func,
  onClick: propTypes.func,
  'aria-label': propTypes.string
});
BaseLink.defaultProps = {
  link: '',
  target: '_blank'
};

var BaseButton = React.memo(React.forwardRef(function (props, ref) {
  var Component = props.component,
      children = props.children,
      buttonRole = props.role,
      buttonProps = _objectWithoutProperties(props, ["component", "children", "role"]);

  var role = Component === 'button' ? buttonRole : 'button';
  return React.createElement(Component, _extends({
    className: classnames('BaseButton', props.className),
    ref: ref,
    role: role
  }, buttonProps), children);
}));
BaseButton.propTypes = src({
  style: propTypes.object,
  className: propTypes.string,
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  children: propTypes.node,
  onClick: propTypes.func,
  onBlur: propTypes.func,
  onFocus: propTypes.func,
  onKeyDown: propTypes.func,
  onKeyUp: propTypes.func,
  onMouseMove: propTypes.func,
  onMouseEnter: propTypes.func,
  onMouseLeave: propTypes.func,
  onMouseUp: propTypes.func,
  onMouseDown: propTypes.func,
  onTouchEnd: propTypes.func,
  onTouchMove: propTypes.func,
  onTouchStart: propTypes.func,
  role: propTypes.string,
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  disabled: propTypes.bool,
  'aria-label': propTypes.string,
  title: propTypes.string
});
BaseButton.defaultProps = {
  component: 'button'
};

var css$1 = ".CloseButton {\n  position: relative;\n  width: 2.5rem;\n  height: 2.5rem;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  background: transparent;\n  padding: 0;\n  text-align: inherit;\n  letter-spacing: inherit;\n  font-size: inherit;\n  text-transform: inherit;\n  color: inherit; }\n  .CloseButton span {\n    display: block;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 3px;\n    height: 100%;\n    background-color: #000; }\n    .CloseButton span:first-child {\n      transform: translate(-50%, -50%) rotate(45deg); }\n    .CloseButton span:last-child {\n      transform: translate(-50%, -50%) rotate(-45deg); }\n";
styleInject(css$1);

var CloseButton =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CloseButton, _React$PureComponent);

  function CloseButton() {
    _classCallCheck(this, CloseButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(CloseButton).apply(this, arguments));
  }

  _createClass(CloseButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          component = _this$props.component,
          buttonProps = _objectWithoutProperties(_this$props, ["className", "component"]);

      var Component = component;
      return React.createElement(Component, _extends({
        className: classnames('CloseButton', className)
      }, buttonProps), React.createElement("span", null), React.createElement("span", null));
    }
  }]);

  return CloseButton;
}(React.PureComponent);
CloseButton.propTypes = src({
  style: propTypes.object,
  className: propTypes.string,
  nodeRef: propTypes.func,
  children: propTypes.node,
  component: propTypes.oneOfType([propTypes.string, propTypes.func]),
  onClick: propTypes.func,
  onBlur: propTypes.func,
  onFocus: propTypes.func,
  onKeyDown: propTypes.func,
  onKeyUp: propTypes.func,
  onMouseMove: propTypes.func,
  onMouseEnter: propTypes.func,
  onMouseLeave: propTypes.func,
  onMouseUp: propTypes.func,
  onMouseDown: propTypes.func,
  onTouchEnd: propTypes.func,
  onTouchMove: propTypes.func,
  onTouchStart: propTypes.func,
  role: propTypes.string,
  tabIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
  disabled: propTypes.bool,
  'aria-label': propTypes.string
});
CloseButton.defaultProps = {
  component: 'button'
};

var css$2 = ".Footer {\n  display: inline-block;\n  width: 100%;\n  padding: 0 4rem;\n  background: #000;\n  box-sizing: border-box; }\n  .Footer .footer-nav .nav-list {\n    display: inline-block;\n    padding-left: 0; }\n    .Footer .footer-nav .nav-list .nav-item {\n      display: inline-block;\n      margin-right: 1.6rem;\n      font-size: 1.6rem; }\n      .Footer .footer-nav .nav-list .nav-item:last-of-type {\n        margin-right: 0; }\n    .Footer .footer-nav .nav-list a {\n      color: #fff; }\n  .Footer .footer-copyright {\n    font-size: 1.6rem;\n    color: #fff; }\n";
styleInject(css$2);

var Footer = React.memo(React.forwardRef(function (props, ref) {
  return React.createElement("footer", {
    className: classnames('Footer', props.className),
    ref: ref
  }, props.links && React.createElement("nav", {
    className: "footer-nav",
    "aria-label": props.ariaNavLabel
  }, React.createElement("ul", {
    className: "nav-list"
  }, props.links.map(function (link, index) {
    return React.createElement("li", {
      key: index,
      className: "nav-item"
    }, React.createElement(BaseLink, {
      link: link.path
    }, link.text));
  }))), props.children, props.copyright && React.createElement("p", {
    className: "footer-copyright"
  }, props.copyright));
}));
Footer.propTypes = src({
  className: propTypes.string,
  links: propTypes.arrayOf(propTypes.shape({
    text: propTypes.string,
    path: propTypes.string
  })),
  ariaNavLabel: propTypes.string,
  copyright: propTypes.string
});
Footer.defaultProps = {
  ariaNavLabel: 'Footer Navigation',
  copyright: '© Copyright'
};

var noOp = function noop() {};

var css$3 = ".HamburgerButton {\n  border: none;\n  outline: none;\n  cursor: pointer;\n  background: transparent;\n  padding: 0;\n  text-align: inherit;\n  letter-spacing: inherit;\n  font-size: inherit;\n  text-transform: inherit;\n  color: inherit; }\n  .HamburgerButton .bars-container {\n    position: relative;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    width: 2.5rem;\n    height: 2rem; }\n    .HamburgerButton .bars-container .bar {\n      width: 100%;\n      height: 2px;\n      background: #000;\n      transform-origin: top left;\n      transition: transform 0.2s ease-out, opacity 0.2s ease-out; }\n  .HamburgerButton.close .bar:nth-child(1) {\n    transform: translateX(1px) rotate(45deg); }\n  .HamburgerButton.close .bar:nth-child(2) {\n    transform: scaleX(0);\n    opacity: 0; }\n  .HamburgerButton.close .bar:nth-child(3) {\n    transform: rotate(-45deg); }\n  .HamburgerButton.back .bar:nth-child(1) {\n    transform: translateX(-1px) translateY(10px) rotate(-45deg) scaleX(0.8); }\n  .HamburgerButton.back .bar:nth-child(2) {\n    transform: scaleX(0);\n    opacity: 0; }\n  .HamburgerButton.back .bar:nth-child(3) {\n    transform: translateX(1px) translateY(-9px) rotate(45deg) scaleX(0.8); }\n";
styleInject(css$3);

var STATES = {
  idle: 'idle',
  close: 'close',
  back: 'back'
};
var bars = [0, 1, 2].map(function (item) {
  return React.createElement("span", {
    key: item,
    className: "bar ".concat(item)
  });
});

var HamburgerButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(HamburgerButton, _PureComponent);

  function HamburgerButton() {
    _classCallCheck(this, HamburgerButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(HamburgerButton).apply(this, arguments));
  }

  _createClass(HamburgerButton, [{
    key: "render",
    value: function render() {
      return React.createElement(BaseButton, {
        className: classnames('HamburgerButton', this.props.className, this.props.currentState),
        onMouseEnter: this.props.onMouseEnter,
        onMouseLeave: this.props.onMouseLeave,
        onClick: this.props.onClick,
        tabIndex: this.props.tabIndex,
        "aria-label": this.props.ariaLabel
      }, React.createElement("div", {
        className: "bars-container"
      }, bars));
    }
  }]);

  return HamburgerButton;
}(PureComponent);
HamburgerButton.propTypes = src({
  className: propTypes.string,
  tabIndex: propTypes.number,
  currentState: propTypes.string,
  onClick: propTypes.func,
  onMouseEnter: propTypes.func,
  onMouseLeave: propTypes.func,
  ariaLabel: propTypes.string
});
HamburgerButton.defaultProps = {
  tabIndex: 0,
  currentState: STATES.idle,
  onClick: noOp,
  onMouseEnter: noOp,
  onMouseLeave: noOp,
  ariaLabel: 'Mobile menu button'
};

var isWin = process.platform === 'win32';

var removeTrailingSeparator = function (str) {
	var i = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
};

function isSeparator(str, i) {
	var char = str[i];
	return i > 0 && (char === '/' || (isWin && char === '\\'));
}

var css$4 = ".HamburgerMenu {\n  position: fixed;\n  top: 0;\n  right: 0;\n  width: 100%;\n  height: 100vh;\n  background: #eee;\n  padding: 2rem;\n  transform: translateX(100%);\n  transition: 0.2s; }\n  .HamburgerMenu.open {\n    transform: translateX(0%); }\n  .HamburgerMenu .nav-list {\n    width: 100%; }\n    .HamburgerMenu .nav-list .nav-item {\n      display: block;\n      margin-bottom: 2rem; }\n      .HamburgerMenu .nav-list .nav-item:last-of-type {\n        margin-bottom: 0; }\n      .HamburgerMenu .nav-list .nav-item a {\n        font-size: 2rem;\n        color: rgba(0, 0, 0, 0.6);\n        text-decoration: none; }\n        .HamburgerMenu .nav-list .nav-item a.active {\n          color: black;\n          text-decoration: underline; }\n        .HamburgerMenu .nav-list .nav-item a:hover:not(.active) {\n          color: black;\n          text-decoration: none; }\n";
styleInject(css$4);

var HamburgerMenu =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(HamburgerMenu, _React$PureComponent);

  function HamburgerMenu() {
    _classCallCheck(this, HamburgerMenu);

    return _possibleConstructorReturn(this, _getPrototypeOf(HamburgerMenu).apply(this, arguments));
  }

  _createClass(HamburgerMenu, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.closeOnRouteChange && prevProps.location.pathname !== this.props.location.pathname) {
        this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.isMobileMenuOpen && this.props.setIsMobileMenuOpen(false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return React.createElement("nav", {
        className: classnames("HamburgerMenu", this.props.className, {
          open: this.props.isMobileMenuOpen
        }),
        ref: function ref(r) {
          return _this.container = r;
        }
      }, this.props.links && React.createElement("ul", {
        className: "nav-list"
      }, this.props.links.map(function (link, index) {
        return React.createElement("li", {
          key: index,
          className: "nav-item"
        }, React.createElement(BaseLink, {
          link: link.path,
          className: classnames({
            active: removeTrailingSeparator(_this.props.location.pathname) === removeTrailingSeparator(link.path)
          })
        }, link.text));
      })), this.props.children);
    }
  }]);

  return HamburgerMenu;
}(React.PureComponent);

HamburgerMenu.propTypes = src({
  className: propTypes.string,
  links: propTypes.arrayOf(propTypes.shape({
    text: propTypes.string,
    path: propTypes.string
  })),
  closeOnRouteChange: propTypes.bool,
  isMobileMenuOpen: propTypes.bool,
  setIsMobileMenuOpen: propTypes.func
});
HamburgerMenu.defaultProps = {
  setIsMobileMenuOpen: noOp,
  closeOnRouteChange: true
};
var HamburgerMenu$1 = withRouter(HamburgerMenu);

var css$5 = ".MainTopNav {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  padding: 0 4rem;\n  height: 6rem;\n  background: #eee;\n  box-sizing: border-box; }\n  .MainTopNav .only-aria-visible {\n    clip-path: inset(100%);\n    clip: rect(1px 1px 1px 1px);\n    /* IE 6/7 */\n    clip: rect(1px, 1px, 1px, 1px);\n    height: 1px;\n    overflow: hidden;\n    position: absolute;\n    white-space: nowrap;\n    width: 1px; }\n  .MainTopNav .nav {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 100%;\n    height: 100%; }\n    .MainTopNav .nav .nav-logo {\n      width: 4rem; }\n    .MainTopNav .nav .nav-list {\n      display: inline-block; }\n      .MainTopNav .nav .nav-list .nav-item {\n        display: inline-block;\n        margin-left: 2rem; }\n        .MainTopNav .nav .nav-list .nav-item a {\n          font-size: 2rem;\n          color: rgba(0, 0, 0, 0.6);\n          text-decoration: none; }\n          .MainTopNav .nav .nav-list .nav-item a.active {\n            color: black;\n            text-decoration: underline; }\n          .MainTopNav .nav .nav-list .nav-item a:hover:not(.active) {\n            color: black;\n            text-decoration: none; }\n";
styleInject(css$5);

var getButtonState = function getButtonState(isMenuOpen) {
  return isMenuOpen ? STATES.close : STATES.idle;
};

var MainTopNav =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MainTopNav, _React$PureComponent);

  _createClass(MainTopNav, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var nextButtonState = getButtonState(nextProps.isMobileMenuOpen);

      if (nextButtonState !== prevState.buttonState) {
        return {
          buttonState: nextButtonState
        };
      }

      return null;
    }
  }]);

  function MainTopNav(props) {
    var _this;

    _classCallCheck(this, MainTopNav);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainTopNav).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleHamburgerClick", function () {
      _this.props.setIsMobileMenuOpen(!_this.props.isMobileMenuOpen);
    });

    _this.state = {
      buttonState: getButtonState(props.isMobileMenuOpen)
    };
    return _this;
  }

  _createClass(MainTopNav, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("header", {
        className: classnames('MainTopNav', this.props.className)
      }, this.props.ariaSiteTitle && React.createElement("h1", {
        className: "only-aria-visible"
      }, this.props.ariaSiteTitle), React.createElement("nav", {
        className: "nav",
        "aria-label": this.props.ariaNavLabel
      }, this.props.ariaNavTitle && React.createElement("h2", {
        className: "only-aria-visible"
      }, this.props.ariaNavTitle), this.props.logoSrc && React.createElement(BaseLink, {
        link: this.props.logoLink,
        "aria-label": this.props.logoAriaLabel
      }, React.createElement("img", {
        className: "nav-logo",
        src: this.props.logoSrc,
        alt: this.props.logoAlt
      })), this.props.showHamburger ? React.createElement(HamburgerButton, {
        onClick: this.handleHamburgerClick,
        currentState: this.state.buttonState
      }) : this.props.links && React.createElement("ul", {
        className: "nav-list"
      }, this.props.links.map(function (link, index) {
        return React.createElement("li", {
          key: index,
          className: "nav-item"
        }, React.createElement(BaseLink, {
          link: link.path,
          className: classnames({
            active: removeTrailingSeparator(_this2.props.location.pathname) === removeTrailingSeparator(link.path)
          })
        }, link.text));
      }))), this.props.children);
    }
  }]);

  return MainTopNav;
}(React.PureComponent);

MainTopNav.propTypes = src({
  className: propTypes.string,
  logoSrc: propTypes.string,
  ariaSiteTitle: propTypes.string,
  ariaNavTitle: propTypes.string,
  ariaNavLabel: propTypes.string,
  logoLink: propTypes.string,
  logoAriaLabel: propTypes.string,
  logoAlt: propTypes.string,
  links: propTypes.arrayOf(propTypes.shape({
    text: propTypes.string,
    path: propTypes.string
  })),
  showHamburger: propTypes.bool,
  isMobileMenuOpen: propTypes.bool,
  setIsMobileMenuOpen: propTypes.func
});
MainTopNav.defaultProps = {
  logoAlt: 'logo',
  logoLink: '/',
  logoAriaLabel: 'Home',
  ariaNavLabel: 'Main Navigation',
  setIsMobileMenuOpen: noOp
};
var MainTopNav$1 = withRouter(MainTopNav);

!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n});},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0);}([function(e,t,o){var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=o(1),u={passive:!0,capture:!1},i=["scroll","wheel","touchstart","touchmove","touchenter","touchend","touchleave","mouseout","mouseleave","mouseup","mousedown","mousemove","mouseenter","mousewheel","mouseover"],s=function(e,t){return void 0!==e?e:-1!==i.indexOf(t)&&u.passive},c=function(e){var t=Object.getOwnPropertyDescriptor(e,"passive");return t&&!0!==t.writable&&void 0===t.set?Object.assign({},e):e};if((0, r.eventListenerOptionsSupported)()){var p=EventTarget.prototype.addEventListener;!function(e){EventTarget.prototype.addEventListener=function(t,o,r){var i="object"===(void 0===r?"undefined":n(r))&&null!==r,p=i?r.capture:r;r=i?c(r):{},r.passive=s(r.passive,t),r.capture=void 0===p?u.capture:p,e.call(this,t,o,r);},EventTarget.prototype.addEventListener._original=e;}(p);}},function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0});t.eventListenerOptionsSupported=function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0;}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t);}catch(e){}return e};}]);

var css$6 = ".RotateScreen {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000; }\n  .RotateScreen .container {\n    text-align: center; }\n    .RotateScreen .container .rotate-text {\n      color: #fff;\n      font-size: 1.6rem; }\n    .RotateScreen .container .rotate-icon {\n      width: 10rem; }\n";
styleInject(css$6);

var es5 = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=70)}({18:function(e,t,r){var n,i,s;i=[e],void 0===(s="function"==typeof(n=function(e){var t=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);}return t(e,null,[{key:"getFirstMatch",value:function(e,t){var r=t.match(e);return r&&r.length>0&&r[1]||""}},{key:"getSecondMatch",value:function(e,t){var r=t.match(e);return r&&r.length>1&&r[2]||""}},{key:"matchAndReturnConst",value:function(e,t,r){if(e.test(t))return r}},{key:"getWindowsVersionName",value:function(e){switch(e){case"NT":return "NT";case"XP":return "XP";case"NT 5.0":return "2000";case"NT 5.1":return "XP";case"NT 5.2":return "2003";case"NT 6.0":return "Vista";case"NT 6.1":return "7";case"NT 6.2":return "8";case"NT 6.3":return "8.1";case"NT 10.0":return "10";default:return}}},{key:"getVersionPrecision",value:function(e){return e.split(".").length}},{key:"compareVersions",value:function(t,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=e.getVersionPrecision(t),s=e.getVersionPrecision(r),o=Math.max(i,s),a=0,u=e.map([t,r],function(t){var r=o-e.getVersionPrecision(t),n=t+new Array(r+1).join(".0");return e.map(n.split("."),function(e){return new Array(20-e.length).join("0")+e}).reverse()});for(n&&(a=o-Math.min(i,s)),o-=1;o>=a;){if(u[0][o]>u[1][o])return 1;if(u[0][o]===u[1][o]){if(o===a)return 0;o-=1;}else if(u[0][o]<u[1][o])return -1}}},{key:"map",value:function(e,t){var r=[],n=void 0;if(Array.prototype.map)return Array.prototype.map.call(e,t);for(n=0;n<e.length;n+=1)r.push(t(e[n]));return r}}]),e}();e.exports=r;})?n.apply(t,i):n)||(e.exports=s);},65:function(e,t,r){var n,i,s;i=[t,r(18)],void 0===(s="function"==typeof(n=function(t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{test:function(e){return "microsoft edge"===e.getBrowserName(!0)},describe:function(e){var t=(0, r.getFirstMatch)(/edge\/(\d+(\.?_?\d+)+)/i,e);return {name:"EdgeHTML",version:t}}},{test:[/trident/i],describe:function(e){var t={name:"Trident"},n=(0, r.getFirstMatch)(/trident\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:function(e){return e.test(/presto/i)},describe:function(e){var t={name:"Presto"},n=(0, r.getFirstMatch)(/presto\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:function(e){var t=e.test(/gecko/i),r=e.test(/like gecko/i);return t&&!r},describe:function(e){var t={name:"Gecko"},n=(0, r.getFirstMatch)(/gecko\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/(apple)?webkit\/537\.36/i],describe:function(){return {name:"Blink"}}},{test:[/(apple)?webkit/i],describe:function(e){var t={name:"WebKit"},n=(0, r.getFirstMatch)(/webkit\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}}],e.exports=t.default;})?n.apply(t,i):n)||(e.exports=s);},66:function(e,t,r){var n,i,s;i=[t,r(18)],void 0===(s="function"==typeof(n=function(t,r){Object.defineProperty(t,"__esModule",{value:!0});var n={tablet:"tablet",mobile:"mobile",desktop:"desktop"};t.default=[{test:[/nexus\s*(?:7|8|9|10).*/i],describe:function(){return {type:n.tablet,vendor:"Nexus"}}},{test:[/ipad/i],describe:function(){return {type:n.tablet,vendor:"Apple",model:"iPad"}}},{test:[/kftt build/i],describe:function(){return {type:n.tablet,vendor:"Amazon",model:"Kindle Fire HD 7"}}},{test:[/silk/i],describe:function(){return {type:n.tablet,vendor:"Amazon"}}},{test:[/tablet/i],describe:function(){return {type:n.tablet}}},{test:function(e){var t=e.test(/ipod|iphone/i),r=e.test(/like (ipod|iphone)/i);return t&&!r},describe:function(e){var t=(0, r.getFirstMatch)(/(ipod|iphone)/i,e);return {type:n.mobile,vendor:"Apple",model:t}}},{test:[/nexus\s*[0-6].*/i,/galaxy nexus/i],describe:function(){return {type:n.mobile,vendor:"Nexus"}}},{test:[/[^-]mobi/i],describe:function(){return {type:n.mobile}}},{test:function(e){return "blackberry"===e.getBrowserName(!0)},describe:function(){return {type:n.mobile,vendor:"BlackBerry"}}},{test:function(e){return "bada"===e.getBrowserName(!0)},describe:function(){return {type:n.mobile}}},{test:function(e){return "windows phone"===e.getBrowserName()},describe:function(){return {type:n.mobile,vendor:"Microsoft"}}},{test:function(e){var t=Number(String(e.getOSVersion()).split(".")[0]);return "android"===e.getOSName(!0)&&t>=3},describe:function(){return {type:n.tablet}}},{test:function(e){return "android"===e.getOSName(!0)},describe:function(){return {type:n.mobile}}},{test:function(e){return "macos"===e.getOSName(!0)},describe:function(){return {type:n.desktop,vendor:"Apple"}}},{test:function(e){return "windows"===e.getOSName(!0)},describe:function(){return {type:n.desktop}}},{test:function(e){return "linux"===e.getOSName(!0)},describe:function(){return {type:n.desktop}}}],e.exports=t.default;})?n.apply(t,i):n)||(e.exports=s);},67:function(e,t,r){var n,i,s;i=[t,r(18)],void 0===(s="function"==typeof(n=function(t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{test:[/windows phone/i],describe:function(e){var t=(0, r.getFirstMatch)(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i,e);return {name:"Windows Phone",version:t}}},{test:[/windows/i],describe:function(e){var t=(0, r.getFirstMatch)(/Windows ((NT|XP)( \d\d?.\d)?)/i,e),n=(0, r.getWindowsVersionName)(t);return {name:"Windows",version:t,versionName:n}}},{test:[/macintosh/i],describe:function(e){var t=(0, r.getFirstMatch)(/mac os x (\d+(\.?_?\d+)+)/i,e).replace(/[_\s]/g,".");return {name:"macOS",version:t}}},{test:[/(ipod|iphone|ipad)/i],describe:function(e){var t=(0, r.getFirstMatch)(/os (\d+([_\s]\d+)*) like mac os x/i,e).replace(/[_\s]/g,".");return {name:"iOS",version:t}}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t=(0, r.getFirstMatch)(/android[\s/-](\d+(\.\d+)*)/i,e);return {name:"Android",version:t}}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t=(0, r.getFirstMatch)(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i,e),n={name:"WebOS"};return t&&t.length&&(n.version=t),n}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t=(0, r.getFirstMatch)(/rim\stablet\sos\s(\d+(\.\d+)*)/i,e)||(0, r.getFirstMatch)(/blackberry\d+\/(\d+([_\s]\d+)*)/i,e)||(0, r.getFirstMatch)(/\bbb(\d+)/i,e);return {name:"BlackBerry",version:t}}},{test:[/bada/i],describe:function(e){var t=(0, r.getFirstMatch)(/bada\/(\d+(\.\d+)*)/i,e);return {name:"Bada",version:t}}},{test:[/tizen/i],describe:function(e){var t=(0, r.getFirstMatch)(/tizen[/\s](\d+(\.\d+)*)/i,e);return {name:"Tizen",version:t}}},{test:[/linux/i],describe:function(){return {name:"Linux"}}}],e.exports=t.default;})?n.apply(t,i):n)||(e.exports=s);},68:function(e,t,r){var n,i,s;i=[t,r(18)],void 0===(s="function"==typeof(n=function(t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=/version\/(\d+(\.?_?\d+)+)/i,i=[{test:[/opera/i],describe:function(e){var t={name:"Opera"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/opr\/|opios/i],describe:function(e){var t={name:"Opera"},i=(0, r.getFirstMatch)(/(?:opr|opios)[\s/](\S+)/i,e)||(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/SamsungBrowser/i],describe:function(e){var t={name:"Samsung Internet for Android"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/Whale/i],describe:function(e){var t={name:"NAVER Whale Browser"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:whale)[\s/](\d+(?:\.\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/MZBrowser/i],describe:function(e){var t={name:"MZ Browser"},i=(0, r.getFirstMatch)(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i,e)||(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/focus/i],describe:function(e){var t={name:"Focus"},i=(0, r.getFirstMatch)(/(?:focus)[\s/](\d+(?:\.\d+)+)/i,e)||(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/swing/i],describe:function(e){var t={name:"Swing"},i=(0, r.getFirstMatch)(/(?:swing)[\s/](\d+(?:\.\d+)+)/i,e)||(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/coast/i],describe:function(e){var t={name:"Opera Coast"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/yabrowser/i],describe:function(e){var t={name:"Yandex Browser"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/ucbrowser/i],describe:function(e){var t={name:"UC Browser"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/Maxthon|mxios/i],describe:function(e){var t={name:"Maxthon"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/epiphany/i],describe:function(e){var t={name:"Epiphany"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/puffin/i],describe:function(e){var t={name:"Puffin"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/sleipnir/i],describe:function(e){var t={name:"Sleipnir"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/k-meleon/i],describe:function(e){var t={name:"K-Meleon"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/msie|trident/i],describe:function(e){var t={name:"Internet Explorer"},n=(0, r.getFirstMatch)(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/edg([ea]|ios)/i],describe:function(e){var t={name:"Microsoft Edge"},n=(0, r.getSecondMatch)(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/vivaldi/i],describe:function(e){var t={name:"Vivaldi"},n=(0, r.getFirstMatch)(/vivaldi\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/seamonkey/i],describe:function(e){var t={name:"SeaMonkey"},n=(0, r.getFirstMatch)(/seamonkey\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/sailfish/i],describe:function(e){var t={name:"Sailfish"},n=(0, r.getFirstMatch)(/sailfish\s?browser\/(\d+(\.\d+)?)/i,e);return n&&(t.version=n),t}},{test:[/silk/i],describe:function(e){var t={name:"Amazon Silk"},n=(0, r.getFirstMatch)(/silk\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/phantom/i],describe:function(e){var t={name:"PhantomJS"},n=(0, r.getFirstMatch)(/phantomjs\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/slimerjs/i],describe:function(e){var t={name:"SlimerJS"},n=(0, r.getFirstMatch)(/slimerjs\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/blackberry|\bbb\d+/i,/rim\stablet/i],describe:function(e){var t={name:"BlackBerry"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/(web|hpw)[o0]s/i],describe:function(e){var t={name:"WebOS Browser"},i=(0, r.getFirstMatch)(n,e)||(0, r.getFirstMatch)(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i,e);return i&&(t.version=i),t}},{test:[/bada/i],describe:function(e){var t={name:"Bada"},n=(0, r.getFirstMatch)(/dolfin\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/tizen/i],describe:function(e){var t={name:"Tizen"},i=(0, r.getFirstMatch)(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i,e)||(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/qupzilla/i],describe:function(e){var t={name:"QupZilla"},i=(0, r.getFirstMatch)(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i,e)||(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/firefox|iceweasel|fxios/i],describe:function(e){var t={name:"Firefox"},n=(0, r.getFirstMatch)(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:[/chromium/i],describe:function(e){var t={name:"Chromium"},i=(0, r.getFirstMatch)(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i,e)||(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/chrome|crios|crmo/i],describe:function(e){var t={name:"Chrome"},n=(0, r.getFirstMatch)(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i,e);return n&&(t.version=n),t}},{test:function(e){var t=!e.test(/like android/i),r=e.test(/android/i);return t&&r},describe:function(e){var t={name:"Android Browser"},i=(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/safari|applewebkit/i],describe:function(e){var t={name:"Safari"},i=(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/googlebot/i],describe:function(e){var t={name:"Googlebot"},i=(0, r.getFirstMatch)(/googlebot\/(\d+(\.\d+))/i,e)||(0, r.getFirstMatch)(n,e);return i&&(t.version=i),t}},{test:[/.*/i],describe:function(e){return {name:(0, r.getFirstMatch)(/^(.*)\/(.*) /,e),version:(0, r.getSecondMatch)(/^(.*)\/(.*) /,e)}}}];t.default=i,e.exports=t.default;})?n.apply(t,i):n)||(e.exports=s);},69:function(e,t,r){var n,i,s;i=[t,r(68),r(67),r(66),r(65),r(18)],void 0===(s="function"==typeof(n=function(t,r,n,i,s,o){Object.defineProperty(t,"__esModule",{value:!0});var a=f(r),u=f(n),c=f(i),d=f(s);function f(e){return e&&e.__esModule?e:{default:e}}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),p=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),void 0===t||null===t||""===t)throw new Error("UserAgent parameter can't be empty");this._ua=t,this.parsedResult={},!0!==r&&this.parse();}return v(e,[{key:"getUA",value:function(){return this._ua}},{key:"test",value:function(e){return e.test(this._ua)}},{key:"parseBrowser",value:function(){var e=this;this.parsedResult.browser={};var t=a.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.browser=t.describe(this.getUA())),this.parsedResult.browser}},{key:"getBrowser",value:function(){return this.parsedResult.browser?this.parsedResult.browser:this.parseBrowser()}},{key:"getBrowserName",value:function(e){return e?String(this.getBrowser().name).toLowerCase()||"":this.getBrowser().name||""}},{key:"getBrowserVersion",value:function(){return this.getBrowser().version}},{key:"getOS",value:function(){return this.parsedResult.os?this.parsedResult.os:this.parseOS()}},{key:"parseOS",value:function(){var e=this;this.parsedResult.os={};var t=u.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.os=t.describe(this.getUA())),this.parsedResult.os}},{key:"getOSName",value:function(e){var t=this.getOS(),r=t.name;return e?String(r).toLowerCase()||"":r||""}},{key:"getOSVersion",value:function(){return this.getOS().version}},{key:"getPlatform",value:function(){return this.parsedResult.platform?this.parsedResult.platform:this.parsePlatform()}},{key:"getPlatformType",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.getPlatform(),r=t.type;return e?String(r).toLowerCase()||"":r||""}},{key:"parsePlatform",value:function(){var e=this;this.parsedResult.platform={};var t=c.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.platform=t.describe(this.getUA())),this.parsedResult.platform}},{key:"getEngine",value:function(){return this.parsedResult.engine?this.parsedResult.engine:this.parseEngine()}},{key:"parseEngine",value:function(){var e=this;this.parsedResult.engine={};var t=d.default.find(function(t){if("function"==typeof t.test)return t.test(e);if(t.test instanceof Array)return t.test.some(function(t){return e.test(t)});throw new Error("Browser's test function is not valid")});return t&&(this.parsedResult.engine=t.describe(this.getUA())),this.parsedResult.engine}},{key:"parse",value:function(){return this.parseBrowser(),this.parseOS(),this.parsePlatform(),this.parseEngine(),this}},{key:"getResult",value:function(){return this.parsedResult}},{key:"satisfies",value:function(e){var t=this,r={},n=0,i={},s=0,o=Object.keys(e);if(o.forEach(function(t){var o=e[t];"string"==typeof o?(i[t]=o,s+=1):"object"===(void 0===o?"undefined":l(o))&&(r[t]=o,n+=1);}),n>0){var a=Object.keys(r),u=a.find(function(e){return t.isOS(e)});if(u){var c=this.satisfies(r[u]);if(void 0!==c)return c}var d=a.find(function(e){return t.isPlatform(e)});if(d){var f=this.satisfies(r[d]);if(void 0!==f)return f}}if(s>0){var v=Object.keys(i),p=v.find(function(e){return t.isBrowser(e)});if(void 0!==p)return this.compareVersion(i[p])}}},{key:"isBrowser",value:function(e){return this.getBrowserName(!0)===String(e).toLowerCase()}},{key:"compareVersion",value:function(e){var t=0,r=e,n=!1,i=this.getBrowserVersion();if("string"==typeof i)return ">"===e[0]?(t=1,r=e.substr(1)):"<"===e[0]?(t=-1,r=e.substr(1)):"="===e[0]?r=e.substr(1):"~"===e[0]&&(n=!0,r=e.substr(1)),(0, o.compareVersions)(i,r,n)===t}},{key:"isOS",value:function(e){return this.getOSName(!0)===String(e).toLowerCase()}},{key:"isPlatform",value:function(e){return this.getPlatformType(!0)===String(e).toLowerCase()}},{key:"is",value:function(e){return this.isBrowser(e)||this.isOS(e)||this.isPlatform(e)}},{key:"some",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.some(function(t){return e.is(t)})}}]),e}();t.default=p,e.exports=t.default;})?n.apply(t,i):n)||(e.exports=s);},70:function(e,t,r){var n,i,s;i=[t,r(69)],void 0===(s="function"==typeof(n=function(t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(r),i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);}return i(e,null,[{key:"getParser",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("string"!=typeof e)throw new Error("UserAgent should be a string");return new n.default(e,t)}},{key:"parse",value:function(e){return new n.default(e).getResult()}}]),e}();t.default=s,e.exports=t.default;})?n.apply(t,i):n)||(e.exports=s);}})});
});

var bowser = unwrapExports(es5);
var es5_1 = es5.bowser;

var ua = window.navigator.userAgent.toLowerCase();
var bots = ['facebookexternalhit', 'linkedinbot', 'google (+https://developers.google.com/+/web/snippet/)', 'facebot', 'https://developers.google.com/+/web/snippet/', 'twitterbot', 'tumblr', 'googlebot'];

var checkBot = function checkBot() {
  return Boolean(bots.filter(function (bot) {
    return ua.indexOf(bot.toLowerCase()) !== -1;
  }).length);
};

var checkVendor = function checkVendor() {
  return window.navigator.vendor ? window.navigator.vendor.toLowerCase() : '';
};

var checkOSVersion = function checkOSVersion() {
  return bowser.osversion;
};

var checkOSMajorVersion = function checkOSMajorVersion() {
  return parseInt(bowser.osversion, 10);
};

var checkBrowserVersion = function checkBrowserVersion() {
  return bowser.version;
};

var checkBrowserMajorVersion = function checkBrowserMajorVersion() {
  return parseInt(bowser.version, 10);
};

var checkDevicePixelRatio = function checkDevicePixelRatio() {
  return window.devicePixelRatio;
};

var checkFacebook = function checkFacebook() {
  return /fban|fbav/.test(ua);
};

var checkTwitter = function checkTwitter() {
  return /twitter/.test(ua);
};

var checkInstagram = function checkInstagram() {
  return /instagram/.test(ua);
};

var checkPinterest = function checkPinterest() {
  return /pinterest/.test(ua);
}; // Bot flags


var isBot = checkBot(); // OS flags

var isiOS = bowser.ios === true;
var isAndroid = bowser.android === true;
var isFirefoxOS = bowser.firefoxos === true;
var isWindowsPhone = bowser.windowsphone === true;
var isBlackberry = bowser.blackberry === true;
var isMac = bowser.mac === true;
var isWindows = bowser.windows === true;
var isLinux = bowser.linux === true;
var isChromeOS = bowser.chromeos === true; // Device flags

var isPhone = bowser.mobile === true;
var isTablet = bowser.tablet === true;
var isMobile = isPhone || isTablet;
var isDesktop = !isMobile;
var isiPhone = isiOS && bowser.iphone === true;
var isiPad = isiOS && bowser.ipad === true;
var isiPod = isiOS && bowser.ipod === true; // Browser flags

var isChrome = bowser.chrome === true;
var isFirefox = bowser.firefox === true;
var isSafari = bowser.safari === true;
var isEdge = bowser.msedge === true;
var isIE = bowser.msie === true;
var isOpera = bowser.opera === true;

var checkDevice = function checkDevice() {
  if (isPhone) return 'phone';
  if (isTablet) return 'tablet';
  if (isDesktop) return 'desktop';
  return '';
};

var checkOSName = function checkOSName() {
  if (isiOS) return 'ios';
  if (isAndroid) return 'android';
  if (isFirefoxOS) return 'firefoxos';
  if (isWindowsPhone) return 'windowsphone';
  if (isBlackberry) return 'blackberry';
  if (isMac) return 'mac';
  if (isWindows) return 'windows';
  if (isLinux) return 'linux';
  if (isChromeOS) return 'chromeos';
  return '';
};

var checkBrowserName = function checkBrowserName() {
  if (isChrome) return 'chrome';
  if (isFirefox) return 'firefox';
  if (isSafari) return 'safari';
  if (isEdge) return 'edge';
  if (isIE) return 'ie';
  if (isOpera) return 'opera';
  return '';
}; // OS


var os = checkOSName();
var osVersion = checkOSVersion();
var osMajorVersion = checkOSMajorVersion(); // Browser

var browser = checkBrowserName();
var browserVersion = checkBrowserVersion();
var browserMajorVersion = checkBrowserMajorVersion(); // InAppBrowser flags

var isFacebook = checkFacebook();
var isTwitter = checkTwitter();
var isInstagram = checkInstagram();
var isPinterest = checkPinterest();

var checkInAppBrowser = function checkInAppBrowser() {
  var isInAppBrowser = isFacebook || isTwitter || isInstagram || isPinterest;

  if (!isInAppBrowser) {
    isInAppBrowser = isiOS && osMajorVersion >= 11 && isSafari && typeof window.navigator.mediaDevices === 'undefined';
  }

  return isInAppBrowser;
};

var checkInAppBrowserVersion = function checkInAppBrowserVersion() {
  if (isiOS) return osMajorVersion;
  if (isAndroid) return browserMajorVersion;
  return 9999;
};

var isInAppBrowser = checkInAppBrowser();
var inAppBrowserVersion = checkInAppBrowserVersion(); // Orientation

var PORTRAIT = 'portrait';
var LANDSCAPE = 'landscape';

var checkOrientation = function checkOrientation() {
  if (_typeof(window.screen) === 'object') {
    var orientationType = window.screen.msOrientation || (window.screen.orientation || window.screen.mozOrientation || {}).type;

    if (typeof orientationType === 'string') {
      return orientationType.split('-', 1)[0];
    }
  }

  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(orientation: portrait)').matches === true ? PORTRAIT : LANDSCAPE;
  }

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return w < h ? PORTRAIT : LANDSCAPE;
};

var checkPortrait = function checkPortrait() {
  return checkOrientation() === PORTRAIT;
};

var checkLandscape = function checkLandscape() {
  return checkOrientation() === LANDSCAPE;
}; // Other


var vendor = checkVendor();
var device = checkDevice();

var getClasses = function getClasses() {
  return [isMobile ? 'mobile' : '', device, os, browser].filter(function (className) {
    return Boolean(className);
  });
};

var classes = getClasses();
var devicePixelRatio = checkDevicePixelRatio(); // Create default object

var detect = {
  // Bot flags
  isBot: isBot,
  // Device flags
  isPhone: isPhone,
  isTablet: isTablet,
  isMobile: isMobile,
  isDesktop: isDesktop,
  isiPhone: isiPhone,
  isiPad: isiPad,
  isiPod: isiPod,
  // OS flags
  isiOS: isiOS,
  isAndroid: isAndroid,
  isFirefoxOS: isFirefoxOS,
  isWindowsPhone: isWindowsPhone,
  isBlackberry: isBlackberry,
  isMac: isMac,
  isWindows: isWindows,
  isLinux: isLinux,
  isChromeOS: isChromeOS,
  // Browser flags
  isChrome: isChrome,
  isFirefox: isFirefox,
  isSafari: isSafari,
  isEdge: isEdge,
  isIE: isIE,
  isOpera: isOpera,
  // InAppBrowser flags & version
  isFacebook: isFacebook,
  isTwitter: isTwitter,
  isInstagram: isInstagram,
  isPinterest: isPinterest,
  isInAppBrowser: isInAppBrowser,
  inAppBrowserVersion: inAppBrowserVersion,
  // OS
  os: os,
  osVersion: osVersion,
  osMajorVersion: osMajorVersion,
  // Browser
  browser: browser,
  browserVersion: browserVersion,
  browserMajorVersion: browserMajorVersion,
  // Orientation
  PORTRAIT: PORTRAIT,
  LANDSCAPE: LANDSCAPE,

  get orientation() {
    return checkOrientation();
  },

  get isPortrait() {
    return checkPortrait();
  },

  get isLandscape() {
    return checkLandscape();
  },

  // Other
  classes: classes,
  vendor: vendor,
  device: device,
  devicePixelRatio: devicePixelRatio,
  // Libraries
  bowser: bowser
}; // Named exports

var RotateScreen =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RotateScreen, _PureComponent);

  function RotateScreen(props) {
    var _this;

    _classCallCheck(this, RotateScreen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RotateScreen).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "preventScrolling", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setOrientationParentClass", function () {
      var orientation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.orientation;
      orientation === 'landscape' ? document.body.classList.add('rotate-screen-visible') : document.body.classList.remove('rotate-screen-visible');
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOrientationChange", function () {
      if (detect.orientation !== _this.state.orientation) {
        _this.setState({
          orientation: detect.orientation
        });
      }
    });

    _this.state = {
      orientation: detect.orientation
    };
    return _this;
  }

  _createClass(RotateScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setOrientationParentClass();

      if (detect.isAndroid) {
        window.addEventListener('orientationchange', this.handleOrientationChange);
      } else {
        window.addEventListener('resize', this.handleOrientationChange);
      }

      this.container.addEventListener('touchmove', this.preventScrolling, {
        passive: false
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.orientation !== prevState.orientation) {
        this.setOrientationParentClass();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (detect.isAndroid) {
        window.removeEventListener('orientationchange', this.handleOrientationChange);
      } else {
        window.removeEventListener('resize', this.handleOrientationChange);
      }

      this.container.removeEventListener('touchmove', this.preventScrolling);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var visible = this.state.orientation === 'landscape';
      var style = {
        visibility: visible ? 'visible' : 'hidden'
      };
      return React.createElement("div", {
        className: classnames('RotateScreen', this.props.className),
        style: style,
        ref: function ref(r) {
          return _this2.container = r;
        }
      }, React.createElement("div", {
        className: "container"
      }, this.props.iconSrc && React.createElement("img", {
        src: this.props.iconSrc,
        className: "rotate-icon",
        alt: this.props.iconAlt
      }), this.props.copy && React.createElement("p", {
        className: "rotate-text"
      }, this.props.copy), this.props.children));
    }
  }]);

  return RotateScreen;
}(PureComponent);
RotateScreen.propTypes = src({
  copy: propTypes.string,
  iconSrc: propTypes.string,
  iconAlt: propTypes.string
});
RotateScreen.defaultProps = {
  copy: 'Please rotate your device into portrait mode.',
  iconAlt: 'Please rotate your device'
};

var backgroundCover = function(el, container, hAlign, vAlign) {
    hAlign = (hAlign !== undefined) ? hAlign : 0.5;
    vAlign = (vAlign !== undefined) ? vAlign : 0.5;

    var elAspect, elWidth, elHeight, elPosTop, elPosLeft;

    var w = container.clientWidth;
    var h = container.clientHeight;
    var contAspect = w / h;

    if (el instanceof HTMLVideoElement) {
      elAspect = el.videoWidth / el.videoHeight;
    } else if (el instanceof HTMLImageElement) {
      elAspect = (el.naturalWidth !== undefined) ? (el.naturalWidth / el.naturalHeight) : (el.width / el.height);
    } else {
      elAspect = el.clientWidth / el.clientHeight;
    }

    if (contAspect > elAspect) {
      elWidth = w;
      elHeight = w / elAspect;
      elPosTop = -(elHeight - h) * vAlign;
      elPosLeft = 0;
    } else {
      elWidth = h * elAspect;
      elHeight = h;
      elPosTop = 0;
      elPosLeft = -(elWidth - w) * hAlign;
    }

    container.style.overflow = 'hidden';

    el.style.position = 'absolute';
    el.width = elWidth;
    el.height = elHeight;
    el.style.width = elWidth + 'px';
    el.style.height = elHeight + 'px';
    el.style.top = elPosTop + 'px';
    el.style.left = elPosLeft + 'px';

    return {
      elWidth: elWidth,
      elHeight: elHeight,
      elPosTop: elPosTop,
      elPosLeft: elPosLeft,
    }
  };

/*! npm.im/intervalometer */
function intervalometer(cb, request, cancel, requestParameter) {
	var requestId;
	var previousLoopTime;
	function loop(now) {
		// must be requested before cb() because that might call .stop()
		requestId = request(loop, requestParameter);

		// called with "ms since last call". 0 on start()
		cb(now - (previousLoopTime || now));

		previousLoopTime = now;
	}
	return {
		start: function start() {
			if (!requestId) { // prevent double starts
				loop(0);
			}
		},
		stop: function stop() {
			cancel(requestId);
			requestId = null;
			previousLoopTime = 0;
		}
	};
}

function frameIntervalometer(cb) {
	return intervalometer(cb, requestAnimationFrame, cancelAnimationFrame);
}

/*! npm.im/iphone-inline-video 2.2.2 */

function preventEvent(element, eventName, test) {
	function handler(e) {
		if (!test || test(element, eventName)) {
			e.stopImmediatePropagation();
			// // console.log(eventName, 'prevented on', element);
		}
	}
	element.addEventListener(eventName, handler);

	// Return handler to allow to disable the prevention. Usage:
	// const preventionHandler = preventEvent(el, 'click');
	// el.removeEventHandler('click', preventionHandler);
	return handler;
}

function proxyProperty(object, propertyName, sourceObject, copyFirst) {
	function get() {
		return sourceObject[propertyName];
	}
	function set(value) {
		sourceObject[propertyName] = value;
	}

	if (copyFirst) {
		set(object[propertyName]);
	}

	Object.defineProperty(object, propertyName, {get: get, set: set});
}

function proxyEvent(object, eventName, sourceObject) {
	sourceObject.addEventListener(eventName, function () { return object.dispatchEvent(new Event(eventName)); });
}

function dispatchEventAsync(element, type) {
	Promise.resolve().then(function () {
		element.dispatchEvent(new Event(type));
	});
}

var iOS8or9 = typeof document === 'object' && 'object-fit' in document.head.style && !matchMedia('(-webkit-video-playable-inline)').matches;

var IIV = 'bfred-it:iphone-inline-video';
var IIVEvent = 'bfred-it:iphone-inline-video:event';
var IIVPlay = 'bfred-it:iphone-inline-video:nativeplay';
var IIVPause = 'bfred-it:iphone-inline-video:nativepause';

/**
 * UTILS
 */

function getAudioFromVideo(video) {
	var audio = new Audio();
	proxyEvent(video, 'play', audio);
	proxyEvent(video, 'playing', audio);
	proxyEvent(video, 'pause', audio);
	audio.crossOrigin = video.crossOrigin;

	// 'data:' causes audio.networkState > 0
	// which then allows to keep <audio> in a resumable playing state
	// i.e. once you set a real src it will keep playing if it was if .play() was called
	audio.src = video.src || video.currentSrc || 'data:';

	// // if (audio.src === 'data:') {
	//   TODO: wait for video to be selected
	// // }
	return audio;
}

var lastRequests = [];
var requestIndex = 0;
var lastTimeupdateEvent;

function setTime(video, time, rememberOnly) {
	// Allow one timeupdate event every 200+ ms
	if ((lastTimeupdateEvent || 0) + 200 < Date.now()) {
		video[IIVEvent] = true;
		lastTimeupdateEvent = Date.now();
	}
	if (!rememberOnly) {
		video.currentTime = time;
	}
	lastRequests[++requestIndex % 3] = time * 100 | 0 / 100;
}

function isPlayerEnded(player) {
	return player.driver.currentTime >= player.video.duration;
}

function update(timeDiff) {
	var player = this;
	// // console.log('update', player.video.readyState, player.video.networkState, player.driver.readyState, player.driver.networkState, player.driver.paused);
	if (player.video.readyState >= player.video.HAVE_FUTURE_DATA) {
		if (!player.hasAudio) {
			player.driver.currentTime = player.video.currentTime + ((timeDiff * player.video.playbackRate) / 1000);
			if (player.video.loop && isPlayerEnded(player)) {
				player.driver.currentTime = 0;
			}
		}
		setTime(player.video, player.driver.currentTime);
	} else if (player.video.networkState === player.video.NETWORK_IDLE && player.video.buffered.length === 0) {
		// This should happen when the source is available but:
		// - it's potentially playing (.paused === false)
		// - it's not ready to play
		// - it's not loading
		// If it hasAudio, that will be loaded in the 'emptied' handler below
		player.video.load();
		// // console.log('Will load');
	}

	// // console.assert(player.video.currentTime === player.driver.currentTime, 'Video not updating!');

	if (player.video.ended) {
		delete player.video[IIVEvent]; // Allow timeupdate event
		player.video.pause(true);
	}
}

/**
 * METHODS
 */

function play() {
	// // console.log('play');
	var video = this;
	var player = video[IIV];

	// If it's fullscreen, use the native player
	if (video.webkitDisplayingFullscreen) {
		video[IIVPlay]();
		return;
	}

	if (player.driver.src !== 'data:' && player.driver.src !== video.src) {
		// // console.log('src changed on play', video.src);
		setTime(video, 0, true);
		player.driver.src = video.src;
	}

	if (!video.paused) {
		return;
	}
	player.paused = false;

	if (video.buffered.length === 0) {
		// .load() causes the emptied event
		// the alternative is .play()+.pause() but that triggers play/pause events, even worse
		// possibly the alternative is preventing this event only once
		video.load();
	}

	player.driver.play();
	player.updater.start();

	if (!player.hasAudio) {
		dispatchEventAsync(video, 'play');
		if (player.video.readyState >= player.video.HAVE_ENOUGH_DATA) {
			// // console.log('onplay');
			dispatchEventAsync(video, 'playing');
		}
	}
}
function pause(forceEvents) {
	// // console.log('pause');
	var video = this;
	var player = video[IIV];

	player.driver.pause();
	player.updater.stop();

	// If it's fullscreen, the developer the native player.pause()
	// This is at the end of pause() because it also
	// needs to make sure that the simulation is paused
	if (video.webkitDisplayingFullscreen) {
		video[IIVPause]();
	}

	if (player.paused && !forceEvents) {
		return;
	}

	player.paused = true;
	if (!player.hasAudio) {
		dispatchEventAsync(video, 'pause');
	}

	// Handle the 'ended' event only if it's not fullscreen
	if (video.ended && !video.webkitDisplayingFullscreen) {
		video[IIVEvent] = true;
		dispatchEventAsync(video, 'ended');
	}
}

/**
 * SETUP
 */

function addPlayer(video, hasAudio) {
	var player = {};
	video[IIV] = player;
	player.paused = true; // Track whether 'pause' events have been fired
	player.hasAudio = hasAudio;
	player.video = video;
	player.updater = frameIntervalometer(update.bind(player));

	if (hasAudio) {
		player.driver = getAudioFromVideo(video);
	} else {
		video.addEventListener('canplay', function () {
			if (!video.paused) {
				// // console.log('oncanplay');
				dispatchEventAsync(video, 'playing');
			}
		});
		player.driver = {
			src: video.src || video.currentSrc || 'data:',
			muted: true,
			paused: true,
			pause: function () {
				player.driver.paused = true;
			},
			play: function () {
				player.driver.paused = false;
				// Media automatically goes to 0 if .play() is called when it's done
				if (isPlayerEnded(player)) {
					setTime(video, 0);
				}
			},
			get ended() {
				return isPlayerEnded(player);
			}
		};
	}

	// .load() causes the emptied event
	video.addEventListener('emptied', function () {
		// // console.log('driver src is', player.driver.src);
		var wasEmpty = !player.driver.src || player.driver.src === 'data:';
		if (player.driver.src && player.driver.src !== video.src) {
			// // console.log('src changed to', video.src);
			setTime(video, 0, true);
			player.driver.src = video.src;
			// Playing videos will only keep playing if no src was present when .play()’ed
			if (wasEmpty || (!hasAudio && video.autoplay)) {
				player.driver.play();
			} else {
				player.updater.stop();
			}
		}
	}, false);

	// Stop programmatic player when OS takes over
	video.addEventListener('webkitbeginfullscreen', function () {
		if (!video.paused) {
			// Make sure that the <audio> and the syncer/updater are stopped
			video.pause();

			// Play video natively
			video[IIVPlay]();
		} else if (hasAudio && player.driver.buffered.length === 0) {
			// If the first play is native,
			// the <audio> needs to be buffered manually
			// so when the fullscreen ends, it can be set to the same current time
			player.driver.load();
		}
	});
	if (hasAudio) {
		video.addEventListener('webkitendfullscreen', function () {
			// Sync audio to new video position
			player.driver.currentTime = video.currentTime;
			// // console.assert(player.driver.currentTime === video.currentTime, 'Audio not synced');
		});

		// Allow seeking
		video.addEventListener('seeking', function () {
			if (lastRequests.indexOf(video.currentTime * 100 | 0 / 100) < 0) {
				// // console.log('User-requested seeking');
				player.driver.currentTime = video.currentTime;
			}
		});
	}
}

function preventWithPropOrFullscreen(el) {
	var isAllowed = el[IIVEvent];
	delete el[IIVEvent];
	return !el.webkitDisplayingFullscreen && !isAllowed;
}

function overloadAPI(video) {
	var player = video[IIV];
	video[IIVPlay] = video.play;
	video[IIVPause] = video.pause;
	video.play = play;
	video.pause = pause;
	proxyProperty(video, 'paused', player.driver);
	proxyProperty(video, 'muted', player.driver, true);
	proxyProperty(video, 'playbackRate', player.driver, true);
	proxyProperty(video, 'ended', player.driver);
	proxyProperty(video, 'loop', player.driver, true);

	// IIV works by seeking 60 times per second.
	// These events are now useless.
	preventEvent(video, 'seeking', function (el) { return !el.webkitDisplayingFullscreen; });
	preventEvent(video, 'seeked', function (el) { return !el.webkitDisplayingFullscreen; });

	// Limit timeupdate events
	preventEvent(video, 'timeupdate', preventWithPropOrFullscreen);

	// Prevent occasional native ended events
	preventEvent(video, 'ended', preventWithPropOrFullscreen);
}

function enableInlineVideo(video, opts) {
	if ( opts === void 0 ) opts = {};

	// Stop if already enabled
	if (video[IIV]) {
		return;
	}

	// Allow the user to skip detection
	if (!opts.everywhere) {
		// Only iOS8 and 9 are supported
		if (!iOS8or9) {
			return;
		}

		// Stop if it's not an allowed device
		if (!(opts.iPad || opts.ipad ? /iPhone|iPod|iPad/ : /iPhone|iPod/).test(navigator.userAgent)) {
			return;
		}
	}

	// Try to pause
	video.pause();

	// Prevent autoplay.
	// An non-started autoplaying video can't be .pause()'d
	var willAutoplay = video.autoplay;
	video.autoplay = false;

	addPlayer(video, !video.muted);
	overloadAPI(video);
	video.classList.add('IIV');

	// Autoplay
	if (video.muted && willAutoplay) {
		video.play();
		video.addEventListener('playing', function restoreAutoplay() {
			video.autoplay = true;
			video.removeEventListener('playing', restoreAutoplay);
		});
	}

	if (!/iPhone|iPod|iPad/.test(navigator.platform)) {
		console.warn('iphone-inline-video is not guaranteed to work in emulated environments');
	}
}

if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
    var dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ];
    var dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [];
      var prop;
      var i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}

if (!Array.prototype.map) {
  Array.prototype.map = function (fn) {

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fn !== 'function') {
      throw new TypeError();
    }

    var res = new Array(len);
    var ctx = arguments.length >= 2 ? arguments[1] : void 0;
    var i;
    for (i = 0; i < len; i++) {
      if (i in t) {
        res[i] = fn.call(ctx, t[i], i, t);
      }
    }

    return res;
  };
}

var camel = /([a-z])([A-Z])/g;
var hyphens = '$1-$2';
var contexts = {};

function parseStyles (styles) {
  if (typeof styles === 'string') {
    return styles;
  }
  if (Object.prototype.toString.call(styles) !== '[object Object]') {
    return '';
  }
  return Object.keys(styles).map(function (key) {
    var prop = key.replace(camel, hyphens).toLowerCase();
    return prop + ':' + styles[key];
  }).join(';');
}

function context (name) {
  if (contexts[name]) {
    return contexts[name];
  }
  var cache;
  var rules;
  var remove;

  function getStylesheet () {
    if (cache) {
      return cache;
    }
    var style = document.createElement('style');
    document.body.appendChild(style);
    style.setAttribute('data-context', name);
    cache = document.styleSheets[document.styleSheets.length - 1];
    rules = cache.cssRules ? 'cssRules' : 'rules';
    remove = cache.removeRule ? 'removeRule' : 'deleteRule';
    return cache;
  }

  function add (selector, styles) {
    var css = parseStyles(styles);
    var sheet = getStylesheet();
    var len = sheet[rules].length;
    if (sheet.insertRule) {
      sheet.insertRule(selector + '{' + css + '}', len);
    } else if (sheet.addRule) {
      sheet.addRule(selector, css, len);
    }
  }

  function remove (selector) {
    var sheet = getStylesheet();
    var length = sheet[rules].length;
    var i;
    for (i = length - 1; i >= 0; i--) {
      if (sheet[rules][i].selectorText === selector) {
        sheet[remove](i);
      }
    }
  }

  function clear () {
    var sheet = getStylesheet();
    while (sheet[rules].length) {
      sheet[remove](0);
    }
  }

  add.clear = clear;
  add.remove = remove;
  contexts[name] = add;
  return contexts[name];
}

var ctx = context('default');
ctx.context = context;
var insertRule = ctx;

var dist = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);



var _backgroundCover2 = _interopRequireDefault(backgroundCover);



var _iphoneInlineVideo2 = _interopRequireDefault(enableInlineVideo);



var _insertRule2 = _interopRequireDefault(insertRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iOSNavigator = typeof navigator !== 'undefined' && navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
var iOSVersion = iOSNavigator ? iOSNavigator[1] : null;

var noop = function noop() {};

var absolute100 = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
};

var BackgroundVideo = function (_React$PureComponent) {
  _inherits(BackgroundVideo, _React$PureComponent);

  function BackgroundVideo(props) {
    _classCallCheck(this, BackgroundVideo);

    var _this = _possibleConstructorReturn(this, (BackgroundVideo.__proto__ || Object.getPrototypeOf(BackgroundVideo)).call(this, props));

    _this._handleVideoReady = function () {
      _this._resize();
      _this.setState({ visible: true });
      _this.props.startTime && _this.setCurrentTime(_this.props.startTime);
      _this.props.autoPlay && _this.play();
      _this.props.onReady(_this.video.duration);
    };

    _this._resize = function () {
      _this.video && (0, _backgroundCover2.default)(_this.video, _this.container, _this.props.horizontalAlign, _this.props.verticalAlign);
    };

    _this._handleOnPlay = function () {
      _this.props.onPlay();
    };

    _this._handleOnPause = function () {
      _this.props.onPause();
    };

    _this._handleTimeUpdate = function () {
      iOSVersion && _this._handleIOSStartTime();
      var currentTime = _this.video.currentTime;
      var duration = _this.video.duration;
      var progress = currentTime / duration;
      _this.props.onTimeUpdate(currentTime, progress, duration);
    };

    _this._handleVideoEnd = function () {
      _this.props.onEnd();
    };

    _this._handleIOSStartTime = function () {
      if (_this.video.currentTime < _this.props.startTime && !_this.startTimeIsSet) {
        _this.setCurrentTime(_this.props.startTime);
        _this.startTimeIsSet = true;
      }
    };

    _this.play = function () {
      _this.video.play();
    };

    _this.pause = function () {
      _this.video.pause();
    };

    _this.togglePlay = function () {
      _this.video.paused ? _this.play() : _this.pause();
    };

    _this.isPaused = function () {
      return _this.video.paused;
    };

    _this.mute = function () {
      _this.video.muted = true;
      _this.props.onMute();
    };

    _this.unmute = function () {
      _this.video.muted = false;
      _this.props.onUnmute();
    };

    _this.toggleMute = function () {
      _this.video.muted ? _this.unmute() : _this.mute();
    };

    _this.isMuted = function () {
      return _this.video.muted;
    };

    _this.setCurrentTime = function (val) {
      _this.video.currentTime = val;
    };

    _this.state = {
      visible: false
    };
    _this.startTimeIsSet = false;
    return _this;
  }

  _createClass(BackgroundVideo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.playsInline && iOSVersion) {
        var hasAudio = !(iOSVersion && iOSVersion < 10 && this.props.autoPlay && this.props.muted); // allow autoplay on iOS < 10 for silent videos
        var requireInteractionOnTablet = false;

        (0, _iphoneInlineVideo2.default)(this.video, hasAudio, requireInteractionOnTablet);
        (0, _insertRule2.default)(['video::-webkit-media-controls-start-playback-button', '.IIV::-webkit-media-controls-play-button'], {
          display: 'none'
        });
      }

      if (this.video.readyState !== 4) {
        this.video.addEventListener('loadedmetadata', this._handleVideoReady);
      } else {
        this._handleVideoReady();
      }

      this.video.addEventListener('play', this._handleOnPlay);
      this.video.addEventListener('pause', this._handleOnPause);
      this.video.volume = this.props.volume;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if ((this.props.containerWidth !== prevProps.containerWidth || this.props.containerHeight !== prevProps.containerHeight) && !this.props.disableBackgroundCover) {
        this._resize();
      }

      if (this.props.volume !== prevProps.volume) {
        this.video.volume = this.props.volume;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.video.removeEventListener('loadedmetadata', this._handleVideoReady);
      this.video.removeEventListener('play', this._handleOnPlay);
      this.video.removeEventListener('pause', this._handleOnPause);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var visibility = this.state.visible ? 'visible' : 'hidden';

      var videoProps = _extends({
        ref: function ref(v) {
          return _this2.video = v;
        },
        src: typeof this.props.src === 'string' ? this.props.src : null,
        preload: this.props.preload,
        poster: this.props.poster,
        muted: this.props.muted,
        loop: this.props.loop,
        onTimeUpdate: this._handleTimeUpdate,
        onEnded: this._handleVideoEnd
      }, Object.assign(this.props.extraVideoElementProps, { playsInline: this.props.playsInline }));

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(r) {
            return _this2.container = r;
          },
          className: 'BackgroundVideo ' + this.props.className,
          style: Object.assign(_extends({}, absolute100, { visibility: visibility }), this.props.style),
          onClick: this.props.onClick,
          onKeyPress: this.props.onKeyPress,
          tabIndex: this.props.tabIndex
        },
        _typeof(this.props.src) === 'object' ? _react2.default.createElement(
          'video',
          videoProps,
          this.props.src.map(function (source, key) {
            return _react2.default.createElement('source', _extends({ key: key }, source));
          })
        ) : _react2.default.createElement('video', videoProps)
      );
    }
  }]);

  return BackgroundVideo;
}(_react2.default.PureComponent);

exports.default = BackgroundVideo;


BackgroundVideo.propTypes = {
  playsInline: _propTypes2.default.bool, // play inline on iPhone. avoid triggering native video player
  disableBackgroundCover: _propTypes2.default.bool, // do not apply cover effect (e.g. disable it for specific screen resolution or aspect ratio)
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  containerWidth: _propTypes2.default.number.isRequired,
  containerHeight: _propTypes2.default.number.isRequired,
  src: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired,
  poster: _propTypes2.default.string,
  horizontalAlign: _propTypes2.default.number,
  verticalAlign: _propTypes2.default.number,
  preload: _propTypes2.default.string,
  muted: _propTypes2.default.bool, // required to be set to true for auto play on mobile in combination with 'autoPlay' option
  volume: _propTypes2.default.number,
  loop: _propTypes2.default.bool,
  autoPlay: _propTypes2.default.bool,
  extraVideoElementProps: _propTypes2.default.object,
  startTime: _propTypes2.default.number,
  tabIndex: _propTypes2.default.number,
  onReady: _propTypes2.default.func, // passes back `duration`
  onPlay: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onMute: _propTypes2.default.func,
  onUnmute: _propTypes2.default.func,
  onTimeUpdate: _propTypes2.default.func, // passes back `currentTime`, `progress` and `duration`
  onEnd: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func
};

BackgroundVideo.defaultProps = {
  playsInline: true,
  disableBackgroundCover: false,
  style: {},
  className: '',
  poster: '',
  horizontalAlign: 0.5,
  verticalAlign: 0.5,
  preload: 'auto',
  muted: true,
  volume: 1,
  loop: true,
  autoPlay: true,
  extraVideoElementProps: {},
  startTime: 0,
  tabIndex: 0,
  onReady: noop,
  onPlay: noop,
  onPause: noop,
  onMute: noop,
  onUnmute: noop,
  onTimeUpdate: noop,
  onEnd: noop,
  onClick: noop,
  onKeyPress: noop
};
});

var BackgroundVideo = unwrapExports(dist);

var fullscreenHandler = function(el, onEnter, onExit) {
  init();

  function init() {
    document.addEventListener('fullscreenchange', onFullScreenChange);
    document.addEventListener('mozfullscreenchange', onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', onFullScreenChange);
    document.addEventListener('MSFullscreenChange', onFullScreenChange);
    el.addEventListener('webkitendfullscreen', onExit);
  }

  function destroy() {
    document.removeEventListener('fullscreenchange', onFullScreenChange);
    document.removeEventListener('mozfullscreenchange', onFullScreenChange);
    document.removeEventListener('webkitfullscreenchange', onFullScreenChange);
    document.removeEventListener('MSFullscreenChange', onFullScreenChange);
    el.removeEventListener('webkitendfullscreen', onExit);
  }

  function onFullScreenChange() {
    if (isFullScreen()) {
      onEnter && onEnter();
    } else {
      onExit && onExit();
    }
  }

  function isFullScreen() {
    return (
      document.fullscreen ||
      document.fullScreen ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      (document.msFullscreenElement !== undefined && document.msFullscreenElement !== null)
    );
  }

  return {
    enter: function() {
      var requestFullScreen = (
        el.requestFullScreen ||
        el.mozRequestFullScreen ||
        el.webkitRequestFullScreen ||
        el.webkitRequestFullscreen ||
        el.webkitEnterFullScreen ||
        el.msRequestFullscreen ||
        el.requestFullscreen
      );
      requestFullScreen && requestFullScreen.call(el);
    },
    exit: function() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (el.webkitExitFullScreen) {
        el.webkitExitFullScreen();
      }
    },
    isFullScreen: isFullScreen,
    destroy: destroy
  };
};

var css$7 = ".VideoPlayer {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n  .VideoPlayer .BackgroundVideo video {\n    width: 100%;\n    height: 100%; }\n  .VideoPlayer:fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    background-color: #000; }\n    .VideoPlayer:fullscreen .BackgroundVideo {\n      display: flex; }\n    .VideoPlayer:fullscreen video {\n      position: relative !important;\n      width: 100% !important;\n      height: auto !important;\n      left: 0 !important;\n      top: 0 !important; }\n    .VideoPlayer:fullscreen button.close {\n      opacity: 0; }\n  .VideoPlayer-captions-container {\n    position: absolute;\n    left: 50%;\n    bottom: 3rem;\n    background-color: rgba(0, 0, 0, 0.8);\n    transform: translateX(-50%);\n    color: #fff;\n    transition: 0.2s;\n    visibility: hidden; }\n    .VideoPlayer-captions-container p {\n      margin: 0;\n      font-size: 3rem;\n      font-weight: bold;\n      padding: 1rem;\n      max-width: 50rem;\n      text-align: center; }\n  .VideoPlayer .VideoControls {\n    transform: translateY(100%);\n    transition: 0.2s; }\n  .VideoPlayer.show-captions .VideoPlayer-captions-container {\n    visibility: visible; }\n  .VideoPlayer.show-controls .VideoControls {\n    transform: translateY(0%); }\n  .VideoPlayer.show-controls .VideoPlayer-captions-container {\n    bottom: 8rem; }\n";
styleInject(css$7);

var css$8 = ".VideoControls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 5rem;\n  background-color: #000;\n  z-index: 1;\n  box-sizing: border-box; }\n  .VideoControls-button {\n    width: 2rem;\n    height: 2rem;\n    margin-left: 2rem;\n    border: none;\n    cursor: pointer;\n    background: transparent;\n    padding: 0;\n    text-align: inherit;\n    letter-spacing: inherit;\n    font-size: inherit;\n    text-transform: inherit;\n    color: inherit;\n    outline: none; }\n    .VideoControls-button:first-of-type {\n      margin-right: 2rem; }\n    .VideoControls-button:last-of-type {\n      margin-right: 2rem; }\n    .VideoControls-button img {\n      width: 100%;\n      height: 100%; }\n  .VideoControls-time {\n    width: 4rem;\n    color: #fff;\n    font-size: 1.5rem;\n    margin-left: 2rem; }\n";
styleInject(css$8);

var PlayIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00IDMuNTMybDE0LjExMyA4LjQ2OC0xNC4xMTMgOC40Njh2LTE2LjkzNnptLTItMy41MzJ2MjRsMjAtMTItMjAtMTJ6Ii8+Cjwvc3ZnPg==';

var PauseIcon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDE3LjUgMzMuNSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxyZWN0IGZpbGw9IiNmZmYiIHg9IjIuMiIgeT0iMi4yIiB3aWR0aD0iMyIgaGVpZ2h0PSIyOSIvPgo8cmVjdCBmaWxsPSIjZmZmIiB4PSIxMi4yIiB5PSIyLjIiIHdpZHRoPSIzIiBoZWlnaHQ9IjI5Ii8+Cjwvc3ZnPg==';

var MutedIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zIDl2NmgtMXYtNmgxem0xMy03bC05IDV2Mi4yODhsNy0zLjg4OXYxMy4yMDJsLTctMy44ODl2Mi4yODhsOSA1di0yMHptLTExIDVoLTV2MTBoNXYtMTB6bTE3LjMyNCA0Ljk5M2wxLjY0Ni0xLjY1OS0xLjMyNC0xLjMyNC0xLjY1MSAxLjY3LTEuNjY1LTEuNjQ4LTEuMzE2IDEuMzE4IDEuNjcgMS42NTctMS42NSAxLjY2OSAxLjMxOCAxLjMxNyAxLjY1OC0xLjY3MiAxLjY2NiAxLjY1MyAxLjMyNC0xLjMyNS0xLjY3Ni0xLjY1NnoiLz4KPC9zdmc+';

var UnmutedIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zIDl2NmgtMXYtNmgxem0xMy03bC05IDV2Mi4yODhsNy0zLjg4OXYxMy4yMDJsLTctMy44ODl2Mi4yODhsOSA1di0yMHptLTExIDVoLTV2MTBoNXYtMTB6bTEzLjAwOCAyLjA5M2MuNzQyLjc0MyAxLjIgMS43NyAxLjE5OCAyLjkwMy0uMDAyIDEuMTMzLS40NjIgMi4xNTgtMS4yMDUgMi45bDEuMjE5IDEuMjIzYzEuMDU3LTEuMDUzIDEuNzEyLTIuNTExIDEuNzE1LTQuMTIxLjAwMi0xLjYxMS0uNjQ4LTMuMDY4LTEuNzAyLTQuMTI1bC0xLjIyNSAxLjIyem0yLjE0Mi0yLjEzNWMxLjI4OCAxLjI5MiAyLjA4MiAzLjA3MyAyLjA3OSA1LjA0MXMtLjgwNCAzLjc1LTIuMDk2IDUuMDM5bDEuMjUgMS4yNTRjMS42MTItMS42MDggMi42MTMtMy44MzQgMi42MTYtNi4yOTEuMDA1LTIuNDU3LS45ODYtNC42ODEtMi41OTUtNi4yOTNsLTEuMjU0IDEuMjV6Ii8+Cjwvc3ZnPg==';

var ExitFullscreenIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiCgkgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjEuMiAyMS4yIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMS4yIDIxLjIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTMuNiwxMi45SDE3YzAuNiwwLDEsMC40LDEsMXMtMC40LDEtMSwxaC0yLjR2Mi4zYzAsMC42LTAuNCwxLTEsMXMtMS0wLjQtMS0xdi0zLjMKCUMxMi42LDEzLjQsMTMsMTIuOSwxMy42LDEyLjl6IE00LDEyLjhoMy4zYzAuNiwwLDEsMC40LDEsMXYzLjRjMCwwLjYtMC40LDEtMSwxcy0xLTAuNC0xLTF2LTIuNEg0Yy0wLjYsMC0xLTAuNC0xLTEKCVMzLjQsMTIuOCw0LDEyLjh6IE03LjMsMy4zYzAuNiwwLDEsMC40LDEsMXYzLjRjMCwwLjYtMC40LDEtMSwxSDRjLTAuNiwwLTEtMC40LTEtMWMwLTAuNiwwLjQtMSwxLTFoMi4zVjQuMwoJQzYuMywzLjgsNi43LDMuMyw3LjMsMy4zeiBNMTMuNiwzLjNjMC42LDAsMSwwLjQsMSwxdjIuM0gxN2MwLjYsMCwxLDAuNCwxLDFzLTAuNCwxLTEsMWgtMy40Yy0wLjYsMC0xLTAuNC0xLTFWNC4zCglDMTIuNiwzLjgsMTMsMy4zLDEzLjYsMy4zeiIvPgo8L3N2Zz4=';

var EnterFullscreenIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMjEuMiAyMS4yIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMS4yIDIxLjIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjAuMiwyMS4yaC0zLjRjLTAuNiwwLTEtMC40LTEtMXMwLjQtMSwxLTFoMi40di0yLjNjMC0wLjYsMC40LTEsMS0xczEsMC40LDEsMXYzLjMKCUMyMS4yLDIwLjcsMjAuOCwyMS4yLDIwLjIsMjEuMnogTTQuMywyMS4ySDFjLTAuNiwwLTEtMC40LTEtMXYtMy40YzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDF2Mi40aDIuM2MwLjYsMCwxLDAuNCwxLDEKCVM0LjksMjEuMiw0LjMsMjEuMnogTTEsNS40Yy0wLjYsMC0xLTAuNC0xLTFWMWMwLTAuNiwwLjQtMSwxLTFoMy4zYzAuNiwwLDEsMC40LDEsMXMtMC40LDEtMSwxSDJ2Mi40QzIsNC45LDEuNiw1LjQsMSw1LjR6CgkgTTIwLjIsNS4zYy0wLjYsMC0xLTAuNC0xLTFWMmgtMi40Yy0wLjYsMC0xLTAuNC0xLTFzMC40LTEsMS0xaDMuNGMwLjYsMCwxLDAuNCwxLDF2My4zQzIxLjIsNC44LDIwLjgsNS4zLDIwLjIsNS4zeiIvPgo8L3N2Zz4=';

var CaptionsOnIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMiAzdjEzaC0xMS42NDNsLTQuMzU3IDMuMTA1di0zLjEwNWgtNHYtMTNoMjB6bTItMmgtMjR2MTYuOTgxaDR2NS4wMTlsNy01LjAxOWgxM3YtMTYuOTgxem0tNSA2aC0xNHYtMWgxNHYxem0wIDJoLTE0djFoMTR2LTF6bS02IDNoLTh2MWg4di0xeiIvPgo8L3N2Zz4=';

var CaptionsOffIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMiAzdjEzaC0xMS42NDNsLTQuMzU3IDMuMTA1di0zLjEwNWgtNHYtMTNoMjB6bTItMmgtMjR2MTYuOTgxaDR2NS4wMTlsNy01LjAxOWgxM3YtMTYuOTgxeiIvPgo8L3N2Zz4=';

var css$9 = ".VideoTimeline {\n  display: flex;\n  align-items: center;\n  position: relative;\n  height: 3px;\n  flex-grow: 1; }\n  .VideoTimeline-progress {\n    position: absolute;\n    height: 3px;\n    background-color: red; }\n  .VideoTimeline input {\n    margin: 0; }\n  .VideoTimeline input[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    -moz-appearance: none; }\n  .VideoTimeline input[type='range']::-moz-focus-outer {\n    border: 0; }\n  .VideoTimeline input[type=range]:focus {\n    border: none; }\n  .VideoTimeline input[type=range] {\n    -webkit-appearance: none;\n    position: absolute;\n    width: 100%;\n    height: 3px;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n    cursor: pointer;\n    padding: 0;\n    outline: none; }\n    .VideoTimeline input[type=range]::-webkit-slider-runnable-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-moz-range-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-ms-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-ms-tooltip {\n      display: none; }\n    .VideoTimeline input[type=range]::-ms-fill-lower {\n      background: transparent; }\n    .VideoTimeline input[type=range]::-ms-fill-upper {\n      background: transparent; }\n    .VideoTimeline input[type=range]::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      width: 1rem;\n      height: 1rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none;\n      margin-top: -0.25rem; }\n    .VideoTimeline input[type=range]::-moz-range-thumb {\n      width: 1rem;\n      height: 1rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none; }\n    .VideoTimeline input[type=range]::-ms-thumb {\n      width: 1rem;\n      height: 1rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none; }\n";
styleInject(css$9);

var VideoTimeline =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(VideoTimeline, _React$PureComponent);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoTimeline).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function () {
      _this.props.onTimeUpdate(_this.input.value, _this.input.value / _this.props.duration);

      _this.setState({
        currentTime: parseFloat(_this.input.value)
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseDown", function () {
      _this.setState({
        isMouseDown: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseUp", function () {
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
      return React.createElement("div", {
        className: classnames('VideoTimeline', this.props.className),
        style: this.props.style,
        ref: function ref(r) {
          return _this2.container = r;
        }
      }, React.createElement("div", {
        className: "VideoTimeline-progress",
        style: progressStyle
      }), React.createElement("input", {
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
}(React.PureComponent);
VideoTimeline.propTypes = src({
  className: propTypes.string,
  style: propTypes.object,
  duration: propTypes.number.isRequired,
  currentTime: propTypes.number,
  onTimeUpdate: propTypes.func
});
VideoTimeline.defaultProps = {
  style: {},
  currentTime: 0,
  onTimeUpdate: noOp
};

var VideoControls = React.memo(function (props) {
  function formatTime(totalSeconds) {
    var totalSecondsFloat = totalSeconds;
    var minutes = Math.floor(totalSecondsFloat / 60);
    var seconds = Math.round(totalSecondsFloat - minutes * 60);
    if (minutes < 10) minutes = "0".concat(minutes);
    if (seconds < 10) seconds = "0".concat(seconds);
    return "".concat(minutes, ":").concat(seconds);
  }

  return React.createElement("nav", {
    className: classnames('VideoControls', props.className),
    "aria-label": "Video Controls"
  }, React.createElement(BaseButton, {
    className: "VideoControls-button",
    "aria-label": props.isPlaying ? 'Pause Video' : 'Play Video',
    title: props.isPlaying ? 'Pause Video' : 'Play Video',
    onClick: props.onPlayToggle
  }, React.createElement("img", {
    src: props.isPlaying ? props.pauseIcon : props.playIcon,
    alt: props.isPlaying ? 'Pause Icon' : 'Play Icon'
  })), React.createElement(VideoTimeline, {
    duration: props.duration,
    currentTime: Number(props.currentTime),
    onTimeUpdate: props.onTimeUpdate
  }), React.createElement("time", {
    className: "VideoControls-time",
    tabIndex: "0"
  }, formatTime(Number(props.currentTime))), props.captions && React.createElement(BaseButton, {
    className: "VideoControls-button",
    "aria-label": props.isShowingCaptions ? 'Hide Captions' : 'Show Captions',
    title: props.isShowingCaptions ? 'Hide Captions' : 'Show Captions',
    onClick: props.onCaptionsToggle
  }, React.createElement("img", {
    src: props.isShowingCaptions ? props.captionsOnIcon : props.captionsOffIcon,
    alt: props.isShowingCaptions ? 'Captions On Icon' : 'Captions Off Icon'
  })), React.createElement(BaseButton, {
    className: "VideoControls-button",
    "aria-label": props.isMuted ? 'Unmute Video' : 'Mute Video',
    title: props.isMuted ? 'Unmute Video' : 'Mute Video',
    onClick: props.onMuteToggle
  }, React.createElement("img", {
    src: props.isMuted ? props.mutedIcon : props.unmutedIcon,
    alt: props.isMuted ? 'Muted Icon' : 'Unmuted Icon'
  })), React.createElement(BaseButton, {
    className: "VideoControls-button",
    "aria-label": props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode',
    title: props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode',
    onClick: props.onFullscreenToggle
  }, React.createElement("img", {
    src: props.isFullScreen ? props.exitFullscreenIcon : props.enterFullscreenIcon,
    alt: props.isFullScreen ? 'Fullscreen Mode Icon' : 'Normal Mode Icon'
  })));
});
VideoControls.propTypes = src({
  className: propTypes.string,
  captions: propTypes.bool,
  isFullScreen: propTypes.bool,
  isPlaying: propTypes.bool,
  isMuted: propTypes.bool,
  isShowingCaptions: propTypes.bool,
  duration: propTypes.number.isRequired,
  currentTime: propTypes.number,
  onPlayToggle: propTypes.func,
  onMuteToggle: propTypes.func,
  onFullscreenToggle: propTypes.func,
  onCaptionsToggle: propTypes.func,
  onTimeUpdate: propTypes.func,
  playIcon: propTypes.string,
  pauseIcon: propTypes.string,
  mutedIcon: propTypes.string,
  unmutedIcon: propTypes.string,
  exitFullscreenIcon: propTypes.string,
  enterFullscreenIcon: propTypes.string,
  captionsOnIcon: propTypes.string,
  captionsOffIcon: propTypes.string
});
VideoControls.defaultProps = {
  onPlayToggle: noOp,
  onMuteToggle: noOp,
  onFullscreenToggle: noOp,
  onCaptionsToggle: noOp,
  onTimeUpdate: noOp,
  playIcon: PlayIcon,
  pauseIcon: PauseIcon,
  mutedIcon: MutedIcon,
  unmutedIcon: UnmutedIcon,
  exitFullscreenIcon: ExitFullscreenIcon,
  enterFullscreenIcon: EnterFullscreenIcon,
  captionsOnIcon: CaptionsOnIcon,
  captionsOffIcon: CaptionsOffIcon
};

var VideoPlayer =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(VideoPlayer, _React$PureComponent);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VideoPlayer).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showControls", function () {
      _this.setState({
        isShowingControls: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hideControls", function () {
      _this.setState({
        isShowingControls: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "play", function () {
      !_this.state.isPlaying && _this.video.play();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pause", function () {
      _this.state.isPlaying && _this.video.pause();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mute", function () {
      !_this.state.isMuted && _this.video.mute();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "unmute", function () {
      _this.state.isMuted && _this.video.unmute();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "togglePlay", function () {
      _this.video.togglePlay();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleMute", function () {
      _this.video.toggleMute();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleFullscreen", function () {
      _this.state.isFullScreen ? _this.fullScreen.exit() : _this.fullScreen.enter();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleCaptions", function () {
      _this.setState({
        isShowingCaptions: !_this.state.isShowingCaptions
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setCaptions", function () {
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
      track.default = captions.default;
      track.src = captions.src;
      track.mode = 'hidden';
      _this.captions = track;
      video.appendChild(_this.captions);
      video.textTracks[0].mode = 'hidden';

      _this.captions.addEventListener('cuechange', _this.onTrackChange);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearHideControlsTimeout", function () {
      if (_this.hideControlsTimeout) {
        clearTimeout(_this.hideControlsTimeout);
        _this.hideControlsTimeout = undefined;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearAutoPlayTimeout", function () {
      _this.autoPlayTimeout && clearTimeout(_this.autoPlayTimeout);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setHideControlsTimeout", function () {
      _this.clearHideControlsTimeout();

      _this.hideControlsTimeout = setTimeout(function () {
        _this.state.isPlaying && _this.hideControls();
      }, _this.props.controlsTimeout * 1000);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateTime", function (currentTime) {
      _this.video.setCurrentTime(Number(currentTime));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onReady", function (duration) {
      if (_this.props.captions) {
        _this.props.captions.src && _this.setCaptions();
      }

      _this.setState({
        duration: duration
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTrackChange", function () {
      var trackList = _this.video.video.textTracks;
      var textTracks = trackList && trackList.length > 0 ? trackList[0] : null;
      var cue = textTracks && textTracks.activeCues.length > 0 ? textTracks.activeCues[0] : null;
      var text = cue ? cue.text : '';

      _this.setState({
        currentCaptions: text
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onResize", function (newSize) {
      _this.setState(newSize);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onEnterFullScreen", function () {
      _this.setState({
        isFullScreen: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onExitFullScreen", function () {
      _this.setState({
        isFullScreen: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onPlay", function () {
      _this.setState({
        isPlaying: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onPause", function () {
      _this.setState({
        isPlaying: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTimeUpdate", function (currentTime, progress, duration) {
      _this.setState({
        currentTime: currentTime,
        progress: progress,
        duration: duration
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMute", function () {
      _this.setState({
        isMuted: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onUnmute", function () {
      _this.setState({
        isMuted: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onEnd", function () {
      _this.props.onEnd();

      _this.fullScreen.isFullScreen() && _this.fullScreen.exit();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseMove", function () {
      if (_this.state.isPlaying && _this.props.hasControls) {
        _this.showControls();

        _this.setHideControlsTimeout();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyPress", function (e) {
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
      isShowingCaptions: props.captions && props.captions.default,
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

      this.fullScreen = fullscreenHandler(this.container, this.onEnterFullScreen, this.onExitFullScreen);
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

      return React.createElement("div", {
        className: classnames('VideoPlayer', this.props.className, {
          'show-controls': this.state.isShowingControls,
          'show-captions': this.state.isShowingCaptions
        }),
        style: this.props.style,
        ref: function ref(r) {
          return _this3.container = r;
        },
        onMouseMove: this.onMouseMove
      }, React.createElement(BackgroundVideo, {
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
      }), this.props.captions && React.createElement("div", {
        className: "VideoPlayer-captions-container",
        ref: function ref(r) {
          return _this3.captionsContainer = r;
        }
      }, this.state.currentCaptions && React.createElement("p", null, this.state.currentCaptions)), this.props.hasControls && React.createElement(VideoControls, {
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
}(React.PureComponent);
VideoPlayer.propTypes = src({
  className: propTypes.string,
  style: propTypes.object,
  src: propTypes.string.isRequired,
  poster: propTypes.string,
  preload: propTypes.string,
  captions: propTypes.object,
  disableBackgroundCover: propTypes.bool,
  allowKeyboardControl: propTypes.bool,
  autoPlay: propTypes.bool,
  muted: propTypes.bool,
  loop: propTypes.bool,
  togglePlayOnClick: propTypes.bool,
  showControlsOnLoad: propTypes.bool,
  hasControls: propTypes.bool,
  playsInline: propTypes.bool,
  autoPlayDelay: propTypes.number,
  controlsTimeout: propTypes.number,
  windowWidth: propTypes.number,
  windowHeight: propTypes.number,
  volume: propTypes.number,
  startTime: propTypes.number,
  onPlay: propTypes.func,
  onPause: propTypes.func,
  onEnd: propTypes.func,
  playIcon: propTypes.string,
  pauseIcon: propTypes.string,
  mutedIcon: propTypes.string,
  unmutedIcon: propTypes.string,
  exitFullscreenIcon: propTypes.string,
  enterFullscreenIcon: propTypes.string,
  captionsOnIcon: propTypes.string,
  captionsOffIcon: propTypes.string
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
  onPlay: noOp,
  onPause: noOp,
  onEnd: noOp
};

var css$a = ".PageOverlay {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s;\n  transition-delay: visibility 0.2s; }\n  .PageOverlay.is-showing {\n    opacity: 1;\n    visibility: visible;\n    transition-delay: 0s; }\n";
styleInject(css$a);

var PageOverlay =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PageOverlay, _React$PureComponent);

  function PageOverlay() {
    _classCallCheck(this, PageOverlay);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageOverlay).apply(this, arguments));
  }

  _createClass(PageOverlay, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.closeOnRouteChange && prevProps.location.pathname !== this.props.location.pathname) {
        this.props.hideOnRouteChange && this.props.onClick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var componentProps = {
        className: classnames('PageOverlay', this.props.className, {
          'is-showing': this.props.isShowing
        }),
        onClick: this.props.onClick
      };
      return React.createElement("div", componentProps);
    }
  }]);

  return PageOverlay;
}(React.PureComponent);

PageOverlay.propTypes = src({
  className: propTypes.string,
  isShowing: propTypes.bool,
  hideOnRouteChange: propTypes.bool,
  onClick: propTypes.func
});
PageOverlay.defaultProps = {
  onClick: noOp,
  hideOnRouteChange: true
};
var PageOverlay$1 = withRouter(PageOverlay);

export { BaseLink, BaseButton, CloseButton, Footer, HamburgerButton, HamburgerMenu$1 as HamburgerMenu, MainTopNav$1 as MainTopNav, RotateScreen, PageOverlay$1 as PageOverlay, VideoPlayer };
//# sourceMappingURL=index.module.js.map
