'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

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

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    invariant_1(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
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

  ReactPropTypes.checkPropTypes = emptyFunction_1;
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

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
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

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Check if there are unused properties or properties that were not set
 *
 * @export
 * @param {any} propTypes
 * @param {any} [ignoreData=[]]
 * @returns {Boolean}
 */
function checkProps (propTypes) {
  var ignoreData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var ignoreList = ['children', 'history', 'location', 'params', 'route', 'routes', 'routeParams', 'windowHeight', 'windowWidth', 'context', 'slug', 'fn', 'mobileLayout', 'phoneLayout', 'tabletLayout', 'match', 'staticContext'].concat(toConsumableArray(ignoreData));

  return _extends({}, propTypes, {
    fn: function fn(props, self, componentName) {
      var unspecifiedProps = Object.keys(props).filter(function (prop) {
        return !propTypes.hasOwnProperty(prop) && ignoreList.indexOf(prop) === -1;
      });

      if (unspecifiedProps.length) {
        throw new TypeError('Component ' + componentName + ' has unspecified props: ' + unspecifiedProps.join(', '));
      }
    }
  });
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

var css = ".CloseButton {\n  position: relative;\n  width: 25px;\n  height: 25px;\n  border: none; }\n  .CloseButton span {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    display: block;\n    width: 3px;\n    height: 100%;\n    background-color: #000; }\n    .CloseButton span:first-child {\n      transform: translate(-50%, -50%) rotate(45deg); }\n    .CloseButton span:last-child {\n      transform: translate(-50%, -50%) rotate(-45deg); }\n";
styleInject(css);

var styles = /*#__PURE__*/Object.freeze({
	default: css
});

console.log(styles);

var CloseButton = function (_React$PureComponent) {
  inherits(CloseButton, _React$PureComponent);

  function CloseButton() {
    classCallCheck(this, CloseButton);
    return possibleConstructorReturn(this, (CloseButton.__proto__ || Object.getPrototypeOf(CloseButton)).apply(this, arguments));
  }

  createClass(CloseButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          component = _props.component,
          buttonProps = objectWithoutProperties(_props, ['className', 'component']);

      var Component = component;

      return React.createElement(
        Component,
        _extends({
          className: classnames('CloseButton', className)
        }, buttonProps),
        React.createElement('span', null),
        React.createElement('span', null)
      );
    }
  }]);
  return CloseButton;
}(React.PureComponent);

CloseButton.propTypes = checkProps({
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

var backgroundCover = createCommonjsModule(function (module) {
(function (root) {

  function BackgroundCover(el, container, hAlign, vAlign) {

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
  }

  if ('module' in root && 'exports' in module) {
    module.exports = BackgroundCover;
  } else {
    root.BackgroundCover = BackgroundCover;
  }

})(commonjsGlobal);
});

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

var iphoneInlineVideo_esModules = /*#__PURE__*/Object.freeze({
	default: enableInlineVideo
});

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

var _iphoneInlineVideo = ( iphoneInlineVideo_esModules && enableInlineVideo ) || iphoneInlineVideo_esModules;

var dist = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _react2 = _interopRequireDefault(React);



var _propTypes2 = _interopRequireDefault(propTypes);





var _iphoneInlineVideo2 = _interopRequireDefault(_iphoneInlineVideo);



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
      _this.video && (0, backgroundCover.BackgroundCover)(_this.video, _this.container, _this.props.horizontalAlign, _this.props.verticalAlign);
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

var css$1 = ".VideoPlayer {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n  .VideoPlayer .BackgroundVideo video {\n    width: 100%;\n    height: 100%; }\n  .VideoPlayer:fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    background-color: #000; }\n    .VideoPlayer:fullscreen .BackgroundVideo {\n      display: flex; }\n    .VideoPlayer:fullscreen video {\n      position: relative !important;\n      width: 100% !important;\n      height: auto !important;\n      left: 0 !important;\n      top: 0 !important; }\n    .VideoPlayer:fullscreen button.close {\n      opacity: 0; }\n  .VideoPlayer-captions-container {\n    position: absolute;\n    left: 50%;\n    bottom: 8rem;\n    background-color: rgba(0, 0, 0, 0.8);\n    transform: translateX(-50%); }\n    .VideoPlayer-captions-container p {\n      margin: 0;\n      font-size: 3rem;\n      font-weight: bold;\n      color: #fff;\n      padding: 1rem;\n      max-width: 50rem;\n      text-align: center; }\n";
styleInject(css$1);

var css$2 = ".VideoControls {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  height: 5rem;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 1; }\n  .VideoControls-button {\n    width: 2rem;\n    height: 2rem;\n    margin-left: 2rem;\n    opacity: 0.8;\n    transition: opacity 0.3s;\n    border: none;\n    cursor: pointer;\n    background: transparent;\n    padding: 0;\n    text-align: inherit;\n    letter-spacing: inherit;\n    font-size: inherit;\n    text-transform: inherit;\n    color: inherit; }\n    .VideoControls-button:hover {\n      opacity: 1; }\n    .VideoControls-button:first-of-type {\n      margin-right: 2rem; }\n    .VideoControls-button:last-of-type {\n      margin-right: 2rem; }\n    .VideoControls-button img {\n      width: 100%;\n      height: 100%; }\n  .VideoControls-time {\n    width: 4rem;\n    color: #fff;\n    font-size: 1.5rem;\n    margin-left: 2rem; }\n";
styleInject(css$2);

var PlayIcon = 'data:image/svg+xml;base64,UmVhY3QuY3JlYXRlRWxlbWVudCgKICAgICJzdmciLAogICAgeyB4bWxuczogImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiwgd2lkdGg6ICIyNCIsIGhlaWdodDogIjI0Iiwgdmlld0JveDogIjAgMCAyNCAyNCIgfSwKICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoInBhdGgiLCB7IGZpbGw6ICIjZmZmIiwgZDogIk00IDMuNTMybDE0LjExMyA4LjQ2OC0xNC4xMTMgOC40Njh2LTE2LjkzNnptLTItMy41MzJ2MjRsMjAtMTItMjAtMTJ6IiB9KQopOw==';

var PauseIcon = 'data:image/svg+xml;base64,UmVhY3QuY3JlYXRlRWxlbWVudCgKCSJzdmciLAoJeyB2ZXJzaW9uOiAiMS4xIiwgeG1sbnM6ICJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIsIHg6ICIwcHgiLCB5OiAiMHB4IiwKCQl2aWV3Qm94OiAiMCAwIDE3LjUgMzMuNSIgfSwKCVJlYWN0LmNyZWF0ZUVsZW1lbnQoInJlY3QiLCB7IGZpbGw6ICIjZmZmIiwgeDogIjIuMiIsIHk6ICIyLjIiLCB3aWR0aDogIjMiLCBoZWlnaHQ6ICIyOSIgfSksCglSZWFjdC5jcmVhdGVFbGVtZW50KCJyZWN0IiwgeyBmaWxsOiAiI2ZmZiIsIHg6ICIxMi4yIiwgeTogIjIuMiIsIHdpZHRoOiAiMyIsIGhlaWdodDogIjI5IiB9KQopOw==';

var MutedIcon = 'data:image/svg+xml;base64,UmVhY3QuY3JlYXRlRWxlbWVudCgKICAgICJzdmciLAogICAgeyB4bWxuczogImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiwgd2lkdGg6ICIyNCIsIGhlaWdodDogIjI0Iiwgdmlld0JveDogIjAgMCAyNCAyNCIgfSwKICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoInBhdGgiLCB7IGZpbGw6ICIjZmZmIiwgZDogIk0zIDl2NmgtMXYtNmgxem0xMy03bC05IDV2Mi4yODhsNy0zLjg4OXYxMy4yMDJsLTctMy44ODl2Mi4yODhsOSA1di0yMHptLTExIDVoLTV2MTBoNXYtMTB6bTE3LjMyNCA0Ljk5M2wxLjY0Ni0xLjY1OS0xLjMyNC0xLjMyNC0xLjY1MSAxLjY3LTEuNjY1LTEuNjQ4LTEuMzE2IDEuMzE4IDEuNjcgMS42NTctMS42NSAxLjY2OSAxLjMxOCAxLjMxNyAxLjY1OC0xLjY3MiAxLjY2NiAxLjY1MyAxLjMyNC0xLjMyNS0xLjY3Ni0xLjY1NnoiIH0pCik7';

var UnmutedIcon = 'data:image/svg+xml;base64,UmVhY3QuY3JlYXRlRWxlbWVudCgKICAgICJzdmciLAogICAgeyB4bWxuczogImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiwgd2lkdGg6ICIyNCIsIGhlaWdodDogIjI0Iiwgdmlld0JveDogIjAgMCAyNCAyNCIgfSwKICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoInBhdGgiLCB7IGZpbGw6ICIjZmZmIiwgZDogIk0zIDl2NmgtMXYtNmgxem0xMy03bC05IDV2Mi4yODhsNy0zLjg4OXYxMy4yMDJsLTctMy44ODl2Mi4yODhsOSA1di0yMHptLTExIDVoLTV2MTBoNXYtMTB6bTEzLjAwOCAyLjA5M2MuNzQyLjc0MyAxLjIgMS43NyAxLjE5OCAyLjkwMy0uMDAyIDEuMTMzLS40NjIgMi4xNTgtMS4yMDUgMi45bDEuMjE5IDEuMjIzYzEuMDU3LTEuMDUzIDEuNzEyLTIuNTExIDEuNzE1LTQuMTIxLjAwMi0xLjYxMS0uNjQ4LTMuMDY4LTEuNzAyLTQuMTI1bC0xLjIyNSAxLjIyem0yLjE0Mi0yLjEzNWMxLjI4OCAxLjI5MiAyLjA4MiAzLjA3MyAyLjA3OSA1LjA0MXMtLjgwNCAzLjc1LTIuMDk2IDUuMDM5bDEuMjUgMS4yNTRjMS42MTItMS42MDggMi42MTMtMy44MzQgMi42MTYtNi4yOTEuMDA1LTIuNDU3LS45ODYtNC42ODEtMi41OTUtNi4yOTNsLTEuMjU0IDEuMjV6IiB9KQopOw==';

var ExitFullscreenIcon = 'data:image/svg+xml;base64,UmVhY3QuY3JlYXRlRWxlbWVudCgKCSJzdmciLAoJeyB4bWxuczogImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiwgeDogIjBweCIsCgkJeTogIjBweCIsIHZpZXdCb3g6ICIwIDAgMjEuMiAyMS4yIiwgImVuYWJsZS1iYWNrZ3JvdW5kIjogIm5ldyAwIDAgMjEuMiAyMS4yIiB9LAoJUmVhY3QuY3JlYXRlRWxlbWVudCgicGF0aCIsIHsgZmlsbDogIiNmZmYiLCBkOiAiTTEzLjYsMTIuOUgxN2MwLjYsMCwxLDAuNCwxLDFzLTAuNCwxLTEsMWgtMi40djIuM2MwLDAuNi0wLjQsMS0xLDFzLTEtMC40LTEtMXYtMy4zIEMxMi42LDEzLjQsMTMsMTIuOSwxMy42LDEyLjl6IE00LDEyLjhoMy4zYzAuNiwwLDEsMC40LDEsMXYzLjRjMCwwLjYtMC40LDEtMSwxcy0xLTAuNC0xLTF2LTIuNEg0Yy0wLjYsMC0xLTAuNC0xLTEgUzMuNCwxMi44LDQsMTIuOHogTTcuMywzLjNjMC42LDAsMSwwLjQsMSwxdjMuNGMwLDAuNi0wLjQsMS0xLDFINGMtMC42LDAtMS0wLjQtMS0xYzAtMC42LDAuNC0xLDEtMWgyLjNWNC4zIEM2LjMsMy44LDYuNywzLjMsNy4zLDMuM3ogTTEzLjYsMy4zYzAuNiwwLDEsMC40LDEsMXYyLjNIMTdjMC42LDAsMSwwLjQsMSwxcy0wLjQsMS0xLDFoLTMuNGMtMC42LDAtMS0wLjQtMS0xVjQuMyBDMTIuNiwzLjgsMTMsMy4zLDEzLjYsMy4zeiIgfSkKKTs=';

var EnterFullscreenIcon = 'data:image/svg+xml;base64,UmVhY3QuY3JlYXRlRWxlbWVudCgKCSJzdmciLAoJeyB4bWxuczogImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiwgeDogIjBweCIsIHk6ICIwcHgiLAoJCXZpZXdCb3g6ICIwIDAgMjEuMiAyMS4yIiwgImVuYWJsZS1iYWNrZ3JvdW5kIjogIm5ldyAwIDAgMjEuMiAyMS4yIiB9LAoJUmVhY3QuY3JlYXRlRWxlbWVudCgicGF0aCIsIHsgZmlsbDogIiNmZmYiLCBkOiAiTTIwLjIsMjEuMmgtMy40Yy0wLjYsMC0xLTAuNC0xLTFzMC40LTEsMS0xaDIuNHYtMi4zYzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDF2My4zIEMyMS4yLDIwLjcsMjAuOCwyMS4yLDIwLjIsMjEuMnogTTQuMywyMS4ySDFjLTAuNiwwLTEtMC40LTEtMXYtMy40YzAtMC42LDAuNC0xLDEtMXMxLDAuNCwxLDF2Mi40aDIuM2MwLjYsMCwxLDAuNCwxLDEgUzQuOSwyMS4yLDQuMywyMS4yeiBNMSw1LjRjLTAuNiwwLTEtMC40LTEtMVYxYzAtMC42LDAuNC0xLDEtMWgzLjNjMC42LDAsMSwwLjQsMSwxcy0wLjQsMS0xLDFIMnYyLjRDMiw0LjksMS42LDUuNCwxLDUuNHogTTIwLjIsNS4zYy0wLjYsMC0xLTAuNC0xLTFWMmgtMi40Yy0wLjYsMC0xLTAuNC0xLTFzMC40LTEsMS0xaDMuNGMwLjYsMCwxLDAuNCwxLDF2My4zQzIxLjIsNC44LDIwLjgsNS4zLDIwLjIsNS4zeiIgfSkKKTs=';

var captionsOnIcon = 'data:image/svg+xml;base64,UmVhY3QuY3JlYXRlRWxlbWVudCgKICAgICJzdmciLAogICAgeyB4bWxuczogImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiwgd2lkdGg6ICIyNCIsIGhlaWdodDogIjI0Iiwgdmlld0JveDogIjAgMCAyNCAyNCIgfSwKICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoInBhdGgiLCB7IGZpbGw6ICIjZmZmIiwgZDogIk0yMiAzdjEzaC0xMS42NDNsLTQuMzU3IDMuMTA1di0zLjEwNWgtNHYtMTNoMjB6bTItMmgtMjR2MTYuOTgxaDR2NS4wMTlsNy01LjAxOWgxM3YtMTYuOTgxem0tNSA2aC0xNHYtMWgxNHYxem0wIDJoLTE0djFoMTR2LTF6bS02IDNoLTh2MWg4di0xeiIgfSkKKTs=';

var captionsOffIcon = 'data:image/svg+xml;base64,UmVhY3QuY3JlYXRlRWxlbWVudCgKICAgICJzdmciLAogICAgeyB4bWxuczogImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiwgd2lkdGg6ICIyNCIsIGhlaWdodDogIjI0Iiwgdmlld0JveDogIjAgMCAyNCAyNCIgfSwKICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoInBhdGgiLCB7IGZpbGw6ICIjZmZmIiwgZDogIk0yMiAzdjEzaC0xMS42NDNsLTQuMzU3IDMuMTA1di0zLjEwNWgtNHYtMTNoMjB6bTItMmgtMjR2MTYuOTgxaDR2NS4wMTlsNy01LjAxOWgxM3YtMTYuOTgxeiIgfSkKKTs=';

var css$3 = ".VideoTimeline {\n  display: flex;\n  align-items: center;\n  position: relative;\n  height: 3px;\n  flex-grow: 1; }\n  .VideoTimeline-progress {\n    position: absolute;\n    height: 3px;\n    background-color: red; }\n  .VideoTimeline input {\n    margin: 0; }\n  .VideoTimeline input[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    -moz-appearance: none; }\n  .VideoTimeline input[type='range']::-moz-focus-outer {\n    border: 0; }\n  .VideoTimeline input[type=range]:focus {\n    border: none; }\n  .VideoTimeline input[type=range] {\n    -webkit-appearance: none;\n    position: absolute;\n    width: 100%;\n    height: 3px;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n    cursor: pointer;\n    padding: 0;\n    outline: none; }\n    .VideoTimeline input[type=range]::-webkit-slider-runnable-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-moz-range-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-ms-track {\n      width: 100%;\n      height: 3px;\n      background-color: rgba(255, 0, 0, 0.3);\n      cursor: pointer;\n      border: none;\n      outline: none;\n      color: transparent; }\n    .VideoTimeline input[type=range]::-ms-tooltip {\n      display: none; }\n    .VideoTimeline input[type=range]::-ms-fill-lower {\n      background: transparent; }\n    .VideoTimeline input[type=range]::-ms-fill-upper {\n      background: transparent; }\n    .VideoTimeline input[type=range]::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      width: 1rem;\n      height: 1rem;\n      margin-top: -0.3rem;\n      margin-left: 0.05rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none; }\n    .VideoTimeline input[type=range]::-moz-range-thumb {\n      width: 1rem;\n      height: 1rem;\n      margin-top: -0.3rem;\n      margin-left: 0.05rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none; }\n    .VideoTimeline input[type=range]::-ms-thumb {\n      width: 1rem;\n      height: 1rem;\n      margin-top: -0.3rem;\n      margin-left: 0.05rem;\n      background: red;\n      border-radius: 50%;\n      border: none;\n      outline: none; }\n";
styleInject(css$3);

/**
 * Wait a specific amount of time and return a promise
 * Promisified setTimeout
 *
 * @export
 * @param {number} [ms=0]
 * @returns {Promise}
 */

/**
 * Noop function to reuse in function definitions
 *
 * @export
 */
function noop() {}

var VideoTimeline = function (_React$PureComponent) {
  inherits(VideoTimeline, _React$PureComponent);
  createClass(VideoTimeline, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.currentTime !== prevState.currentTime && !prevState.isMouseDown) {
        return { currentTime: nextProps.currentTime };
      }

      return null;
    }
  }]);

  function VideoTimeline(props) {
    classCallCheck(this, VideoTimeline);

    var _this = possibleConstructorReturn(this, (VideoTimeline.__proto__ || Object.getPrototypeOf(VideoTimeline)).call(this, props));

    _this.onChange = function () {
      _this.props.onTimeUpdate(_this.input.value, _this.input.value / _this.props.duration);
      _this.setState({ currentTime: parseFloat(_this.input.value) });
    };

    _this.onMouseDown = function () {
      _this.setState({ isMouseDown: true });
    };

    _this.onMouseUp = function () {
      _this.setState({ isMouseDown: false });
    };

    _this.state = {
      currentTime: _this.props.currentTime,
      isMouseDown: false
    };
    return _this;
  }

  createClass(VideoTimeline, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var progressStyle = { width: this.state.currentTime / this.props.duration * 100 + '%' };
      return React.createElement(
        'div',
        {
          className: classnames('VideoTimeline', this.props.className),
          style: this.props.style,
          ref: function ref(r) {
            return _this2.container = r;
          }
        },
        React.createElement('div', { className: 'VideoTimeline-progress', style: progressStyle }),
        React.createElement('input', {
          type: 'range',
          ref: function ref(r) {
            return _this2.input = r;
          },
          min: '0',
          max: this.props.duration,
          step: '0.001',
          onChange: this.onChange,
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp,
          value: this.state.currentTime,
          'aria-label': 'Seek Video'
        })
      );
    }
  }]);
  return VideoTimeline;
}(React.PureComponent);


VideoTimeline.propTypes = checkProps({
  className: propTypes.string,
  style: propTypes.object,
  duration: propTypes.number.isRequired,
  currentTime: propTypes.number,
  onTimeUpdate: propTypes.func
});

VideoTimeline.defaultProps = {
  style: {},
  currentTime: 0,
  onTimeUpdate: noop
};

var VideoControls = function VideoControls(props) {
  function formatTime(totalSeconds) {
    var totalSecondsFloat = totalSeconds;
    var minutes = Math.floor(totalSecondsFloat / 60);
    var seconds = Math.round(totalSecondsFloat - minutes * 60);

    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return minutes + ':' + seconds;
  }

  return React.createElement(
    'nav',
    { className: classnames('VideoControls', props.className), 'aria-label': 'Video Controls' },
    React.createElement(
      'button',
      {
        className: 'VideoControls-button',
        'aria-label': props.isPlaying ? 'Pause Video' : 'Play Video',
        title: props.isPlaying ? 'Pause Video' : 'Play Video',
        onClick: props.onPlayToggle,
        tabIndex: '0'
      },
      React.createElement('img', { src: props.isPlaying ? PauseIcon : PlayIcon, alt: props.isPlaying ? 'Pause Icon' : 'Play Icon' })
    ),
    React.createElement(VideoTimeline, {
      duration: props.duration,
      currentTime: Number(props.currentTime),
      onTimeUpdate: props.onTimeUpdate
    }),
    React.createElement(
      'time',
      { className: 'VideoControls-time', tabIndex: '0' },
      formatTime(Number(props.currentTime))
    ),
    props.captions && React.createElement(
      'button',
      {
        className: 'VideoControls-button',
        'aria-label': props.isShowingCaptions ? 'Hide Captions' : 'Show Captions',
        title: props.isShowingCaptions ? 'Hide Captions' : 'Show Captions',
        onClick: props.onCaptionsToggle,
        tabIndex: '0'
      },
      React.createElement('img', {
        src: props.isShowingCaptions ? captionsOnIcon : captionsOffIcon,
        alt: props.isShowingCaptions ? 'Captions On Icon' : 'Captions Off Icon'
      })
    ),
    React.createElement(
      'button',
      {
        className: 'VideoControls-button',
        'aria-label': props.isMuted ? 'Unmute Video' : 'Mute Video',
        title: props.isMuted ? 'Unmute Video' : 'Mute Video',
        onClick: props.onMuteToggle,
        tabIndex: '0'
      },
      React.createElement('img', { src: props.isMuted ? MutedIcon : UnmutedIcon, alt: props.isMuted ? 'Muted Icon' : 'Unmuted Icon' })
    ),
    React.createElement(
      'button',
      {
        className: 'VideoControls-button',
        'aria-label': props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode',
        title: props.isFullScreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode',
        onClick: props.onFullscreenToggle,
        tabIndex: '0'
      },
      React.createElement('img', {
        src: props.isFullScreen ? ExitFullscreenIcon : EnterFullscreenIcon,
        alt: props.isFullScreen ? 'Fullscreen Mode Icon' : 'Normal Mode Icon'
      })
    )
  );
};

VideoControls.propTypes = checkProps({
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
  onTimeUpdate: propTypes.func
});

VideoControls.defaultProps = {
  onPlayToggle: noop,
  onMuteToggle: noop,
  onFullscreenToggle: noop,
  onCaptionsToggle: noop,
  onTimeUpdate: noop
};

/*
 * GSAP promisified
 * By default we are using TweenLite, TweenMax has a size cost in your final bundle
 * Example:
 * import animate from '../../util/gsap-animate';
 * animate.to(this.container, 0.3, { autoAlpha: 1, delay: 0.2 }).then(()=>{});
 */

require('gsap/src/uncompressed/plugins/CSSPlugin.js');
require('gsap/src/uncompressed/TweenLite.js');

var animate = require('gsap-promisify')(Promise, window.TweenLite);

animate.staggerTo = function (els, duration, props, delay) {
  return Promise.all(els.map(function (el, i) {
    return animate.to(el, duration, _extends({}, props, {
      delay: props.delay + delay * i
    }));
  }));
};

var TweenLite = window.TweenLite;

var VideoPlayer = function (_React$PureComponent) {
  inherits(VideoPlayer, _React$PureComponent);
  createClass(VideoPlayer, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.windowWidth !== prevState.containerWidth || nextProps.windowHeight !== prevState.containerHeight) {
        return {
          containerWidth: nextProps.windowWidth,
          containerHeight: nextProps.windowHeight
        };
      }

      if (nextProps.startTime !== prevState.startTime) {
        return { startTime: nextProps.startTime };
      }

      return null;
    }
  }]);

  function VideoPlayer(props) {
    classCallCheck(this, VideoPlayer);

    var _this = possibleConstructorReturn(this, (VideoPlayer.__proto__ || Object.getPrototypeOf(VideoPlayer)).call(this, props));

    _this.showControls = function () {
      var dur = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;

      _this.controls && animate.to(_this.controls, dur, { y: '0%' });
      _this.captions && animate.to(_this.captionsContainer, dur, { x: '-50%', y: '0%' });
    };

    _this.hideControls = function () {
      var dur = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.2;

      _this.controls && animate.to(_this.controls, dur, { y: '100%' });
      _this.captions && animate.to(_this.captionsContainer, dur, { x: '-50%', y: '100%' });
    };

    _this.play = function () {
      !_this.state.isPlaying && _this.video.play();
    };

    _this.pause = function () {
      _this.state.isPlaying && _this.video.pause();
    };

    _this.mute = function () {
      !_this.state.isMuted && _this.video.mute();
    };

    _this.unmute = function () {
      _this.state.isMuted && _this.video.unmute();
    };

    _this.togglePlay = function () {
      _this.video.togglePlay();
    };

    _this.toggleMute = function () {
      _this.video.toggleMute();
    };

    _this.toggleFullscreen = function () {
      _this.state.isFullScreen ? _this.fullScreen.exit() : _this.fullScreen.enter();
    };

    _this.toggleCaptions = function () {
      _this.setState({ isShowingCaptions: !_this.state.isShowingCaptions });
    };

    _this.setCaptions = function () {
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
    };

    _this.clearHideControlsTimeout = function () {
      if (_this.hideControlsTimeout) {
        clearTimeout(_this.hideControlsTimeout);
        _this.hideControlsTimeout = undefined;
      }
    };

    _this.clearAutoPlayTimeout = function () {
      _this.autoPlayTimeout && clearTimeout(_this.autoPlayTimeout);
    };

    _this.setHideControlsTimeout = function () {
      _this.clearHideControlsTimeout();
      _this.hideControlsTimeout = setTimeout(function () {
        _this.state.isPlaying && _this.hideControls();
      }, _this.props.controlsTimeout * 1000);
    };

    _this.updateTime = function (currentTime) {
      _this.video.setCurrentTime(Number(currentTime));
    };

    _this.onReady = function (duration) {
      if (_this.props.captions) {
        _this.props.captions.src && _this.setCaptions();
      }
      _this.setState({ duration: duration });
    };

    _this.onTrackChange = function () {
      var trackList = _this.video.video.textTracks;
      var textTracks = trackList && trackList.length > 0 ? trackList[0] : null;
      var cue = textTracks && textTracks.activeCues.length > 0 ? textTracks.activeCues[0] : null;
      var text = cue ? cue.text : '';
      _this.setState({ currentCaptions: text });
    };

    _this.onResize = function (newSize) {
      _this.setState(newSize);
    };

    _this.onEnterFullScreen = function () {
      _this.setState({ isFullScreen: true });
    };

    _this.onExitFullScreen = function () {
      _this.setState({ isFullScreen: false });
    };

    _this.onPlay = function () {
      _this.setState({ isPlaying: true });
    };

    _this.onPause = function () {
      _this.setState({ isPlaying: false });
    };

    _this.onTimeUpdate = function (currentTime, progress, duration) {
      _this.setState({ currentTime: currentTime, progress: progress, duration: duration });
    };

    _this.onMute = function () {
      _this.setState({ isMuted: true });
    };

    _this.onUnmute = function () {
      _this.setState({ isMuted: false });
    };

    _this.onEnd = function () {
      _this.props.onEnd();
      _this.fullScreen.isFullScreen() && _this.fullScreen.exit();
    };

    _this.onMouseMove = function () {
      if (_this.state.isPlaying && _this.props.hasControls) {
        _this.showControls();
        _this.setHideControlsTimeout();
      }
    };

    _this.onKeyPress = function (e) {
      if (_this.props.allowKeyboardControl) {
        var event = e.keyCode || e.which || e.charCode;
        if (event === 32) {
          _this.togglePlay();
        }
      }
    };

    _this.state = {
      containerWidth: props.windowWidth || 0,
      containerHeight: props.windowHeight || 0,
      isPlaying: false,
      isMuted: props.muted,
      isFullScreen: false,
      isShowingCaptions: props.captions && props.captions.default,
      currentCaptions: '',
      currentTime: 0,
      progress: 0,
      duration: 0,
      startTime: props.startTime
    };
    return _this;
  }

  createClass(VideoPlayer, [{
    key: 'componentDidMount',
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

      if (this.props.captions) {
        animate.set(this.captionsContainer, {
          autoAlpha: Boolean(this.state.isShowingCaptions)
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
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

      if (prevState.isShowingCaptions !== this.state.isShowingCaptions) {
        this.captions && animate.to(this.captionsContainer, 0.1, {
          autoAlpha: Boolean(this.state.isShowingCaptions)
        });
      }

      if (this.props.captions && prevProps.captions.src !== this.props.captions.src) {
        this.setCaptions(this.props.captions);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.fullScreen.destroy();
      this.pause();
      this.clearAutoPlayTimeout();
      this.props.hasControls && this.clearHideControlsTimeout();
      this.captions && this.captions.removeEventListener('cuechange', this.onTrackChange);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        {
          className: classnames('VideoPlayer', this.props.className),
          style: this.props.style,
          ref: function ref(r) {
            return _this3.container = r;
          },
          onMouseMove: this.onMouseMove
        },
        React.createElement(BackgroundVideo, {
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
        }),
        this.props.captions && React.createElement(
          'div',
          {
            className: 'VideoPlayer-captions-container',
            ref: function ref(r) {
              return _this3.captionsContainer = r;
            }
          },
          this.state.currentCaptions && React.createElement(
            'p',
            null,
            this.state.currentCaptions
          )
        ),
        this.props.hasControls && React.createElement(VideoControls, {
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
          onTimeUpdate: this.updateTime
        })
      );
    }
  }]);
  return VideoPlayer;
}(React.PureComponent);

VideoPlayer.propTypes = checkProps({
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
  onEnd: propTypes.func
});

VideoPlayer.defaultProps = {
  style: {},
  togglePlayOnClick: true,
  allowKeyboardControl: true,
  autoPlay: false,
  autoPlayDelay: 0, // in seconds
  muted: false,
  loop: false,
  hasControls: true,
  controlsTimeout: 2.5, // in seconds
  showControlsOnLoad: true,
  disableBackgroundCover: true,
  preload: 'auto',
  playsInline: false,
  volume: 1,
  startTime: 0, // in seconds
  onPlay: noop,
  onPause: noop,
  onEnd: noop
};

exports.CloseButton = CloseButton;
exports.VideoPlayer = VideoPlayer;
//# sourceMappingURL=index.js.map
