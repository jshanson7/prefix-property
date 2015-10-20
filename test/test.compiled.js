/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _assert = __webpack_require__(2);

	var _assert2 = _interopRequireDefault(_assert);

	var _lodash = __webpack_require__(6);

	var _utilsMockWindow = __webpack_require__(8);

	var _utilsMockWindow2 = _interopRequireDefault(_utilsMockWindow);

	var _utilsGetBrowser = __webpack_require__(14);

	var _utilsGetBrowser2 = _interopRequireDefault(_utilsGetBrowser);

	var isNode = typeof process.browser === 'undefined';
	var browsersToTest = isNode ? ['chrome', 'firefox', 'safari'] : [(0, _utilsGetBrowser2['default'])()];
	var unprefixedPropsByBrowser = {
	  chrome: __webpack_require__(15),
	  safari: __webpack_require__(16),
	  firefox: __webpack_require__(17)
	};
	var prefixesByBrowser = {
	  chrome: { js: 'Webkit', css: '-webkit-' },
	  safari: { js: 'Webkit', css: '-webkit-' },
	  firefox: { js: 'Moz', css: '-moz-' }
	};

	browsersToTest.forEach(function (browser) {
	  if (isNode) {
	    (0, _utilsMockWindow2['default'])({ browser: browser });
	  }

	  var prefixProperty = window.prefixProperty;
	  var js = prefixProperty.js;
	  var css = prefixProperty.css;
	  var jsPrefix = prefixProperty.jsPrefix;
	  var cssPrefix = prefixProperty.cssPrefix;

	  var unprefixedProps = unprefixedPropsByBrowser[browser];
	  var style = document.createElement('div').style;
	  var testProp = function testProp(prop, method) {
	    var prefixed = method(prop);
	    var modifier = prefixed !== prop ? ' => ' + prefixed : '';
	    it('' + prop + modifier, function () {
	      (0, _assert2['default'])(style[prefixed] !== undefined);
	    });
	  };

	  describe('prefixProperty', function () {
	    describe(browser, function () {

	      describe('exists', function () {
	        return it('should exist', function () {
	          return (0, _assert2['default'])(prefixProperty !== undefined);
	        });
	      });

	      describe('is a function', function () {
	        return it('should be a function', function () {
	          return (0, _assert2['default'])(typeof prefixProperty === 'function');
	        });
	      });

	      describe('#jsPrefix()', function () {
	        return it('jsPrefix() === ' + prefixesByBrowser[browser].js, function () {
	          return (0, _assert2['default'])(jsPrefix() === prefixesByBrowser[browser].js);
	        });
	      });

	      describe('#cssPrefix()', function () {
	        return it('cssPrefix() === ' + prefixesByBrowser[browser].css, function () {
	          return (0, _assert2['default'])(cssPrefix() === prefixesByBrowser[browser].css);
	        });
	      });

	      describe('#js()', function () {
	        it('invalidProperty => invalidProperty', function () {
	          (0, _assert2['default'])(js('invalidProperty') === 'invalidProperty');
	          (0, _assert2['default'])(js('invalid-property') === 'invalidProperty');
	        });

	        unprefixedProps.forEach(function (prop) {
	          var tested = {};
	          var camelProp = (0, _lodash.camelCase)(prop);
	          var kebabProp = (0, _lodash.kebabCase)(prop);
	          if (!tested[camelProp]) {
	            testProp(camelProp, js);
	            tested[camelProp] = true;
	          }
	          if (!tested[kebabProp]) {
	            testProp(kebabProp, js);
	            tested[kebabProp] = true;
	          }
	        });
	      });

	      describe('#css()', function () {
	        it('invalid-property => invalid-property', function () {
	          (0, _assert2['default'])(css('invalidProperty') === 'invalid-property');
	          (0, _assert2['default'])(css('invalid-property') === 'invalid-property');
	        });

	        if (browser === 'firefox') {
	          // TODO: in firefox, figure out a way test if prefixed, hyphenated props like -moz-appearance
	          // are valid props since they are undefined on the style object, yet valid in CSS
	          return;
	        }
	        unprefixedProps.forEach(function (prop) {
	          var tested = {};
	          var camelProp = (0, _lodash.camelCase)(prop);
	          var kebabProp = (0, _lodash.kebabCase)(prop);
	          if (!tested[camelProp]) {
	            testProp(camelProp, css);
	            tested[camelProp] = true;
	          }
	          if (!tested[kebabProp]) {
	            testProp(kebabProp, css);
	            tested[kebabProp] = true;
	          }
	        });
	      });
	    });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser

	'use strict';

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	// when used in node, this will actually load the util module we depend on
	// versus loading the builtin util module as happens otherwise
	// this is a bug in node module loading as far as I am concerned
	'use strict';

	var util = __webpack_require__(3);

	var pSlice = Array.prototype.slice;
	var hasOwn = Object.prototype.hasOwnProperty;

	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;

	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = stackStartFunction.name;
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function replacer(key, value) {
	  if (util.isUndefined(value)) {
	    return '' + value;
	  }
	  if (util.isNumber(value) && !isFinite(value)) {
	    return value.toString();
	  }
	  if (util.isFunction(value) || util.isRegExp(value)) {
	    return value.toString();
	  }
	  return value;
	}

	function truncate(s, n) {
	  if (util.isString(s)) {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}

	function getMessage(self) {
	  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' + self.operator + ' ' + truncate(JSON.stringify(self.expected, replacer), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	function _deepEqual(actual, expected) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
	    if (actual.length != expected.length) return false;

	    for (var i = 0; i < actual.length; i++) {
	      if (actual[i] !== expected[i]) return false;
	    }

	    return true;

	    // 7.2. If the expected value is a Date object, the actual value is
	    // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	      return actual.getTime() === expected.getTime();

	      // 7.3 If the expected value is a RegExp object, the actual value is
	      // equivalent if it is also a RegExp object with the same source and
	      // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	    } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	        return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

	        // 7.4. Other pairs that do not both pass typeof value == 'object',
	        // equivalence is determined by ==.
	      } else if (!util.isObject(actual) && !util.isObject(expected)) {
	          return actual == expected;

	          // 7.5 For all other Object pairs, including Array objects, equivalence is
	          // determined by having the same number of owned properties (as verified
	          // with Object.prototype.hasOwnProperty.call), the same set of keys
	          // (although not necessarily the same order), equivalent values for every
	          // corresponding key, and an identical 'prototype' property. Note: this
	          // accounts for both named and indexed properties on Arrays.
	        } else {
	            return objEquiv(actual, expected);
	          }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b) {
	  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b)) return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b)) {
	    return a === b;
	  }
	  var aIsArgs = isArguments(a),
	      bIsArgs = isArguments(b);
	  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b);
	  }
	  var ka = objectKeys(a),
	      kb = objectKeys(b),
	      key,
	      i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length) return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i]) return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key])) return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  } else if (actual instanceof expected) {
	    return true;
	  } else if (expected.call({}, actual) === true) {
	    return true;
	  }

	  return false;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (util.isString(expected)) {
	    message = expected;
	    expected = null;
	  }

	  try {
	    block();
	  } catch (e) {
	    actual = e;
	  }

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  if (!shouldThrow && expectedException(actual, expected)) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function (block, /*optional*/error, /*optional*/message) {
	  _throws.apply(this, [true].concat(pSlice.call(arguments)));
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function (block, /*optional*/message) {
	  _throws.apply(this, [false].concat(pSlice.call(arguments)));
	};

	assert.ifError = function (err) {
	  if (err) {
	    throw err;
	  }
	};

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var formatRegExp = /%[sdj%]/g;
	exports.format = function (f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function (x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s':
	        return String(args[i++]);
	      case '%d':
	        return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function (fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function () {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};

	var debugs = {};
	var debugEnviron;
	exports.debuglog = function (set) {
	  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function () {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function () {};
	    }
	  }
	  return debugs[set];
	};

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold': [1, 22],
	  'italic': [3, 23],
	  'underline': [4, 24],
	  'inverse': [7, 27],
	  'white': [37, 39],
	  'grey': [90, 39],
	  'black': [30, 39],
	  'blue': [34, 39],
	  'cyan': [36, 39],
	  'green': [32, 39],
	  'magenta': [35, 39],
	  'red': [31, 39],
	  'yellow': [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};

	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}

	function stylizeNoColor(str, styleType) {
	  return str;
	}

	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function (val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}

	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect && value && isFunction(value.inspect) &&
	  // Filter out the util module, it's inspect function is special
	  value.inspect !== exports.inspect &&
	  // Also filter out any prototype objects using the circular check.
	  !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '',
	      array = false,
	      braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function (key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}

	function formatPrimitive(ctx, value) {
	  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value)) return ctx.stylize('' + value, 'number');
	  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value)) return ctx.stylize('null', 'null');
	}

	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}

	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function (key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
	    }
	  });
	  return output;
	}

	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function (line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function (line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}

	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function (prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
	  typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(4);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}

	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function () {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};

	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(5);

	exports._extend = function (origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern -d -o ./index.js`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */'use strict';;(function(){ /** Used as a safe reference for `undefined` in pre-ES5 environments. */var undefined; /** Used as the semantic version number. */var VERSION='3.10.1'; /** Used to compose bitmasks for wrapper metadata. */var BIND_FLAG=1,BIND_KEY_FLAG=2,CURRY_BOUND_FLAG=4,CURRY_FLAG=8,CURRY_RIGHT_FLAG=16,PARTIAL_FLAG=32,PARTIAL_RIGHT_FLAG=64,ARY_FLAG=128,REARG_FLAG=256; /** Used as default options for `_.trunc`. */var DEFAULT_TRUNC_LENGTH=30,DEFAULT_TRUNC_OMISSION='...'; /** Used to detect when a function becomes hot. */var HOT_COUNT=150,HOT_SPAN=16; /** Used as the size to enable large array optimizations. */var LARGE_ARRAY_SIZE=200; /** Used to indicate the type of lazy iteratees. */var LAZY_FILTER_FLAG=1,LAZY_MAP_FLAG=2; /** Used as the `TypeError` message for "Functions" methods. */var FUNC_ERROR_TEXT='Expected a function'; /** Used as the internal argument placeholder. */var PLACEHOLDER='__lodash_placeholder__'; /** `Object#toString` result references. */var argsTag='[object Arguments]',arrayTag='[object Array]',boolTag='[object Boolean]',dateTag='[object Date]',errorTag='[object Error]',funcTag='[object Function]',mapTag='[object Map]',numberTag='[object Number]',objectTag='[object Object]',regexpTag='[object RegExp]',setTag='[object Set]',stringTag='[object String]',weakMapTag='[object WeakMap]';var arrayBufferTag='[object ArrayBuffer]',float32Tag='[object Float32Array]',float64Tag='[object Float64Array]',int8Tag='[object Int8Array]',int16Tag='[object Int16Array]',int32Tag='[object Int32Array]',uint8Tag='[object Uint8Array]',uint8ClampedTag='[object Uint8ClampedArray]',uint16Tag='[object Uint16Array]',uint32Tag='[object Uint32Array]'; /** Used to match empty string literals in compiled template source. */var reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g; /** Used to match HTML entities and HTML characters. */var reEscapedHtml=/&(?:amp|lt|gt|quot|#39|#96);/g,reUnescapedHtml=/[&<>"'`]/g,reHasEscapedHtml=RegExp(reEscapedHtml.source),reHasUnescapedHtml=RegExp(reUnescapedHtml.source); /** Used to match template delimiters. */var reEscape=/<%-([\s\S]+?)%>/g,reEvaluate=/<%([\s\S]+?)%>/g,reInterpolate=/<%=([\s\S]+?)%>/g; /** Used to match property names within property paths. */var reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g; /**
	   * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
	   * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
	   */var reRegExpChars=/^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,reHasRegExpChars=RegExp(reRegExpChars.source); /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */var reComboMark=/[\u0300-\u036f\ufe20-\ufe23]/g; /** Used to match backslashes in property paths. */var reEscapeChar=/\\(\\)?/g; /** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */var reEsTemplate=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g; /** Used to match `RegExp` flags from their coerced string values. */var reFlags=/\w*$/; /** Used to detect hexadecimal string values. */var reHasHexPrefix=/^0[xX]/; /** Used to detect host constructors (Safari > 5). */var reIsHostCtor=/^\[object .+?Constructor\]$/; /** Used to detect unsigned integer values. */var reIsUint=/^\d+$/; /** Used to match latin-1 supplementary letters (excluding mathematical operators). */var reLatin1=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g; /** Used to ensure capturing order of template delimiters. */var reNoMatch=/($^)/; /** Used to match unescaped characters in compiled string literals. */var reUnescapedString=/['\n\r\u2028\u2029\\]/g; /** Used to match words to create compound words. */var reWords=(function(){var upper='[A-Z\\xc0-\\xd6\\xd8-\\xde]',lower='[a-z\\xdf-\\xf6\\xf8-\\xff]+';return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+','g');})(); /** Used to assign default `context` object properties. */var contextProps=['Array','ArrayBuffer','Date','Error','Float32Array','Float64Array','Function','Int8Array','Int16Array','Int32Array','Math','Number','Object','RegExp','Set','String','_','clearTimeout','isFinite','parseFloat','parseInt','setTimeout','TypeError','Uint8Array','Uint8ClampedArray','Uint16Array','Uint32Array','WeakMap']; /** Used to make template sourceURLs easier to identify. */var templateCounter=-1; /** Used to identify `toStringTag` values of typed arrays. */var typedArrayTags={};typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false; /** Used to identify `toStringTag` values supported by `_.clone`. */var cloneableTags={};cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false; /** Used to map latin-1 supplementary letters to basic latin letters. */var deburredLetters={'\xc0':'A','\xc1':'A','\xc2':'A','\xc3':'A','\xc4':'A','\xc5':'A','\xe0':'a','\xe1':'a','\xe2':'a','\xe3':'a','\xe4':'a','\xe5':'a','\xc7':'C','\xe7':'c','\xd0':'D','\xf0':'d','\xc8':'E','\xc9':'E','\xca':'E','\xcb':'E','\xe8':'e','\xe9':'e','\xea':'e','\xeb':'e','\xcC':'I','\xcd':'I','\xce':'I','\xcf':'I','\xeC':'i','\xed':'i','\xee':'i','\xef':'i','\xd1':'N','\xf1':'n','\xd2':'O','\xd3':'O','\xd4':'O','\xd5':'O','\xd6':'O','\xd8':'O','\xf2':'o','\xf3':'o','\xf4':'o','\xf5':'o','\xf6':'o','\xf8':'o','\xd9':'U','\xda':'U','\xdb':'U','\xdc':'U','\xf9':'u','\xfa':'u','\xfb':'u','\xfc':'u','\xdd':'Y','\xfd':'y','\xff':'y','\xc6':'Ae','\xe6':'ae','\xde':'Th','\xfe':'th','\xdf':'ss'}; /** Used to map characters to HTML entities. */var htmlEscapes={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#96;'}; /** Used to map HTML entities to characters. */var htmlUnescapes={'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&#96;':'`'}; /** Used to determine if values are of the language type `Object`. */var objectTypes={'function':true,'object':true}; /** Used to escape characters for inclusion in compiled regexes. */var regexpEscapes={'0':'x30','1':'x31','2':'x32','3':'x33','4':'x34','5':'x35','6':'x36','7':'x37','8':'x38','9':'x39','A':'x41','B':'x42','C':'x43','D':'x44','E':'x45','F':'x46','a':'x61','b':'x62','c':'x63','d':'x64','e':'x65','f':'x66','n':'x6e','r':'x72','t':'x74','u':'x75','v':'x76','x':'x78'}; /** Used to escape characters for inclusion in compiled string literals. */var stringEscapes={'\\':'\\',"'":"'",'\n':'n','\r':'r','\u2028':'u2028','\u2029':'u2029'}; /** Detect free variable `exports`. */var freeExports=objectTypes[typeof exports] && exports && !exports.nodeType && exports; /** Detect free variable `module`. */var freeModule=objectTypes[typeof module] && module && !module.nodeType && module; /** Detect free variable `global` from Node.js. */var freeGlobal=freeExports && freeModule && typeof global == 'object' && global && global.Object && global; /** Detect free variable `self`. */var freeSelf=objectTypes[typeof self] && self && self.Object && self; /** Detect free variable `window`. */var freeWindow=objectTypes[typeof window] && window && window.Object && window; /** Detect the popular CommonJS extension `module.exports`. */var moduleExports=freeModule && freeModule.exports === freeExports && freeExports; /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it's the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */var root=freeGlobal || freeWindow !== (this && this.window) && freeWindow || freeSelf || this; /*--------------------------------------------------------------------------*/ /**
	   * The base implementation of `compareAscending` which compares values and
	   * sorts them in ascending order without guaranteeing a stable sort.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */function baseCompareAscending(value,other){if(value !== other){var valIsNull=value === null,valIsUndef=value === undefined,valIsReflexive=value === value;var othIsNull=other === null,othIsUndef=other === undefined,othIsReflexive=other === other;if(value > other && !othIsNull || !valIsReflexive || valIsNull && !othIsUndef && othIsReflexive || valIsUndef && othIsReflexive){return 1;}if(value < other && !valIsNull || !othIsReflexive || othIsNull && !valIsUndef && valIsReflexive || othIsUndef && valIsReflexive){return -1;}}return 0;} /**
	   * The base implementation of `_.findIndex` and `_.findLastIndex` without
	   * support for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */function baseFindIndex(array,predicate,fromRight){var length=array.length,index=fromRight?length:-1;while(fromRight?index--:++index < length) {if(predicate(array[index],index,array)){return index;}}return -1;} /**
	   * The base implementation of `_.indexOf` without support for binary searches.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */function baseIndexOf(array,value,fromIndex){if(value !== value){return indexOfNaN(array,fromIndex);}var index=fromIndex - 1,length=array.length;while(++index < length) {if(array[index] === value){return index;}}return -1;} /**
	   * The base implementation of `_.isFunction` without support for environments
	   * with incorrect `typeof` results.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   */function baseIsFunction(value){ // Avoid a Chakra JIT bug in compatibility modes of IE 11.
	// See https://github.com/jashkenas/underscore/issues/1621 for more details.
	return typeof value == 'function' || false;} /**
	   * Converts `value` to a string if it's not one. An empty string is returned
	   * for `null` or `undefined` values.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   */function baseToString(value){return value == null?'':value + '';} /**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the first character not found in `chars`.
	   */function charsLeftIndex(string,chars){var index=-1,length=string.length;while(++index < length && chars.indexOf(string.charAt(index)) > -1) {}return index;} /**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the last character not found in `chars`.
	   */function charsRightIndex(string,chars){var index=string.length;while(index-- && chars.indexOf(string.charAt(index)) > -1) {}return index;} /**
	   * Used by `_.sortBy` to compare transformed elements of a collection and stable
	   * sort them in ascending order.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */function compareAscending(object,other){return baseCompareAscending(object.criteria,other.criteria) || object.index - other.index;} /**
	   * Used by `_.sortByOrder` to compare multiple properties of a value to another
	   * and stable sort them.
	   *
	   * If `orders` is unspecified, all valuess are sorted in ascending order. Otherwise,
	   * a value is sorted in ascending order if its corresponding order is "asc", and
	   * descending if "desc".
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {boolean[]} orders The order to sort by for each property.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */function compareMultiple(object,other,orders){var index=-1,objCriteria=object.criteria,othCriteria=other.criteria,length=objCriteria.length,ordersLength=orders.length;while(++index < length) {var result=baseCompareAscending(objCriteria[index],othCriteria[index]);if(result){if(index >= ordersLength){return result;}var order=orders[index];return result * (order === 'asc' || order === true?1:-1);}} // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	// that causes it, under certain circumstances, to provide the same value for
	// `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	// for more details.
	//
	// This also ensures a stable sort in V8 and other engines.
	// See https://code.google.com/p/v8/issues/detail?id=90 for more details.
	return object.index - other.index;} /**
	   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	   *
	   * @private
	   * @param {string} letter The matched letter to deburr.
	   * @returns {string} Returns the deburred letter.
	   */function deburrLetter(letter){return deburredLetters[letter];} /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */function escapeHtmlChar(chr){return htmlEscapes[chr];} /**
	   * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @param {string} leadingChar The capture group for a leading character.
	   * @param {string} whitespaceChar The capture group for a whitespace character.
	   * @returns {string} Returns the escaped character.
	   */function escapeRegExpChar(chr,leadingChar,whitespaceChar){if(leadingChar){chr = regexpEscapes[chr];}else if(whitespaceChar){chr = stringEscapes[chr];}return '\\' + chr;} /**
	   * Used by `_.template` to escape characters for inclusion in compiled string literals.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */function escapeStringChar(chr){return '\\' + stringEscapes[chr];} /**
	   * Gets the index at which the first occurrence of `NaN` is found in `array`.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {number} fromIndex The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	   */function indexOfNaN(array,fromIndex,fromRight){var length=array.length,index=fromIndex + (fromRight?0:-1);while(fromRight?index--:++index < length) {var other=array[index];if(other !== other){return index;}}return -1;} /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */function isObjectLike(value){return !!value && typeof value == 'object';} /**
	   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
	   * character code is whitespace.
	   *
	   * @private
	   * @param {number} charCode The character code to inspect.
	   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
	   */function isSpace(charCode){return charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160 || charCode == 5760 || charCode == 6158 || charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279);} /**
	   * Replaces all `placeholder` elements in `array` with an internal placeholder
	   * and returns an array of their indexes.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {*} placeholder The placeholder to replace.
	   * @returns {Array} Returns the new array of placeholder indexes.
	   */function replaceHolders(array,placeholder){var index=-1,length=array.length,resIndex=-1,result=[];while(++index < length) {if(array[index] === placeholder){array[index] = PLACEHOLDER;result[++resIndex] = index;}}return result;} /**
	   * An implementation of `_.uniq` optimized for sorted arrays without support
	   * for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {Function} [iteratee] The function invoked per iteration.
	   * @returns {Array} Returns the new duplicate-value-free array.
	   */function sortedUniq(array,iteratee){var seen,index=-1,length=array.length,resIndex=-1,result=[];while(++index < length) {var value=array[index],computed=iteratee?iteratee(value,index,array):value;if(!index || seen !== computed){seen = computed;result[++resIndex] = value;}}return result;} /**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the first non-whitespace character.
	   */function trimmedLeftIndex(string){var index=-1,length=string.length;while(++index < length && isSpace(string.charCodeAt(index))) {}return index;} /**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the last non-whitespace character.
	   */function trimmedRightIndex(string){var index=string.length;while(index-- && isSpace(string.charCodeAt(index))) {}return index;} /**
	   * Used by `_.unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {string} chr The matched character to unescape.
	   * @returns {string} Returns the unescaped character.
	   */function unescapeHtmlChar(chr){return htmlUnescapes[chr];} /*--------------------------------------------------------------------------*/ /**
	   * Create a new pristine `lodash` function using the given `context` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns a new `lodash` function.
	   * @example
	   *
	   * _.mixin({ 'foo': _.constant('foo') });
	   *
	   * var lodash = _.runInContext();
	   * lodash.mixin({ 'bar': lodash.constant('bar') });
	   *
	   * _.isFunction(_.foo);
	   * // => true
	   * _.isFunction(_.bar);
	   * // => false
	   *
	   * lodash.isFunction(lodash.foo);
	   * // => false
	   * lodash.isFunction(lodash.bar);
	   * // => true
	   *
	   * // using `context` to mock `Date#getTime` use in `_.now`
	   * var mock = _.runInContext({
	   *   'Date': function() {
	   *     return { 'getTime': getTimeMock };
	   *   }
	   * });
	   *
	   * // or creating a suped-up `defer` in Node.js
	   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
	   */function runInContext(context){ // Avoid issues with some ES3 environments that attempt to use values, named
	// after built-in constructors like `Object`, for the creation of literals.
	// ES5 clears this up by stating that literals must use built-in constructors.
	// See https://es5.github.io/#x11.1.5 for more details.
	context = context?_.defaults(root.Object(),context,_.pick(root,contextProps)):root; /** Native constructor references. */var Array=context.Array,Date=context.Date,Error=context.Error,Function=context.Function,Math=context.Math,Number=context.Number,Object=context.Object,RegExp=context.RegExp,String=context.String,TypeError=context.TypeError; /** Used for native method references. */var arrayProto=Array.prototype,objectProto=Object.prototype,stringProto=String.prototype; /** Used to resolve the decompiled source of functions. */var fnToString=Function.prototype.toString; /** Used to check objects for own properties. */var hasOwnProperty=objectProto.hasOwnProperty; /** Used to generate unique IDs. */var idCounter=0; /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */var objToString=objectProto.toString; /** Used to restore the original `_` reference in `_.noConflict`. */var oldDash=root._; /** Used to detect if a method is native. */var reIsNative=RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g,'\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,'$1.*?') + '$'); /** Native method references. */var ArrayBuffer=context.ArrayBuffer,clearTimeout=context.clearTimeout,parseFloat=context.parseFloat,pow=Math.pow,propertyIsEnumerable=objectProto.propertyIsEnumerable,Set=getNative(context,'Set'),setTimeout=context.setTimeout,splice=arrayProto.splice,Uint8Array=context.Uint8Array,WeakMap=getNative(context,'WeakMap'); /* Native method references for those with the same name as other `lodash` methods. */var nativeCeil=Math.ceil,nativeCreate=getNative(Object,'create'),nativeFloor=Math.floor,nativeIsArray=getNative(Array,'isArray'),nativeIsFinite=context.isFinite,nativeKeys=getNative(Object,'keys'),nativeMax=Math.max,nativeMin=Math.min,nativeNow=getNative(Date,'now'),nativeParseInt=context.parseInt,nativeRandom=Math.random; /** Used as references for `-Infinity` and `Infinity`. */var NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY,POSITIVE_INFINITY=Number.POSITIVE_INFINITY; /** Used as references for the maximum length and index of an array. */var MAX_ARRAY_LENGTH=4294967295,MAX_ARRAY_INDEX=MAX_ARRAY_LENGTH - 1,HALF_MAX_ARRAY_LENGTH=MAX_ARRAY_LENGTH >>> 1; /**
	     * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	     * of an array-like value.
	     */var MAX_SAFE_INTEGER=9007199254740991; /** Used to store function metadata. */var metaMap=WeakMap && new WeakMap(); /** Used to lookup unminified function names. */var realNames={}; /*------------------------------------------------------------------------*/ /**
	     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
	     * Methods that operate on and return arrays, collections, and functions can
	     * be chained together. Methods that retrieve a single value or may return a
	     * primitive value will automatically end the chain returning the unwrapped
	     * value. Explicit chaining may be enabled using `_.chain`. The execution of
	     * chained methods is lazy, that is, execution is deferred until `_#value`
	     * is implicitly or explicitly called.
	     *
	     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	     * fusion is an optimization strategy which merge iteratee calls; this can help
	     * to avoid the creation of intermediate data structures and greatly reduce the
	     * number of iteratee executions.
	     *
	     * Chaining is supported in custom builds as long as the `_#value` method is
	     * directly or indirectly included in the build.
	     *
	     * In addition to lodash methods, wrappers have `Array` and `String` methods.
	     *
	     * The wrapper `Array` methods are:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
	     * `splice`, and `unshift`
	     *
	     * The wrapper `String` methods are:
	     * `replace` and `split`
	     *
	     * The wrapper methods that support shortcut fusion are:
	     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
	     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
	     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
	     * and `where`
	     *
	     * The chainable wrapper methods are:
	     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
	     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
	     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
	     * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
	     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
	     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	     * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
	     * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
	     * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	     * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
	     * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
	     * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
	     * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
	     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
	     * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
	     * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
	     *
	     * The wrapper methods that are **not** chainable by default are:
	     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
	     * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
	     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
	     * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
	     * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	     * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
	     * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
	     * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
	     * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
	     * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
	     * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
	     * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
	     * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
	     * `unescape`, `uniqueId`, `value`, and `words`
	     *
	     * The wrapper method `sample` will return a wrapped value when `n` is provided,
	     * otherwise an unwrapped value is returned.
	     *
	     * @name _
	     * @constructor
	     * @category Chain
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(total, n) {
	     *   return total + n;
	     * });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(n) {
	     *   return n * n;
	     * });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */function lodash(value){if(isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)){if(value instanceof LodashWrapper){return value;}if(hasOwnProperty.call(value,'__chain__') && hasOwnProperty.call(value,'__wrapped__')){return wrapperClone(value);}}return new LodashWrapper(value);} /**
	     * The function whose prototype all chaining wrappers inherit from.
	     *
	     * @private
	     */function baseLodash(){} // No operation performed.
	/**
	     * The base constructor for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
	     */function LodashWrapper(value,chainAll,actions){this.__wrapped__ = value;this.__actions__ = actions || [];this.__chain__ = !!chainAll;} /**
	     * An object environment feature flags.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */var support=lodash.support = {}; /**
	     * By default, the template delimiters used by lodash are like those in
	     * embedded Ruby (ERB). Change the following template settings to use
	     * alternative delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */lodash.templateSettings = { /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */'escape':reEscape, /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */'evaluate':reEvaluate, /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */'interpolate':reInterpolate, /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */'variable':'', /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */'imports':{ /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */'_':lodash}}; /*------------------------------------------------------------------------*/ /**
	     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     */function LazyWrapper(value){this.__wrapped__ = value;this.__actions__ = [];this.__dir__ = 1;this.__filtered__ = false;this.__iteratees__ = [];this.__takeCount__ = POSITIVE_INFINITY;this.__views__ = [];} /**
	     * Creates a clone of the lazy wrapper object.
	     *
	     * @private
	     * @name clone
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the cloned `LazyWrapper` object.
	     */function lazyClone(){var result=new LazyWrapper(this.__wrapped__);result.__actions__ = arrayCopy(this.__actions__);result.__dir__ = this.__dir__;result.__filtered__ = this.__filtered__;result.__iteratees__ = arrayCopy(this.__iteratees__);result.__takeCount__ = this.__takeCount__;result.__views__ = arrayCopy(this.__views__);return result;} /**
	     * Reverses the direction of lazy iteration.
	     *
	     * @private
	     * @name reverse
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the new reversed `LazyWrapper` object.
	     */function lazyReverse(){if(this.__filtered__){var result=new LazyWrapper(this);result.__dir__ = -1;result.__filtered__ = true;}else {result = this.clone();result.__dir__ *= -1;}return result;} /**
	     * Extracts the unwrapped value from its lazy wrapper.
	     *
	     * @private
	     * @name value
	     * @memberOf LazyWrapper
	     * @returns {*} Returns the unwrapped value.
	     */function lazyValue(){var array=this.__wrapped__.value(),dir=this.__dir__,isArr=isArray(array),isRight=dir < 0,arrLength=isArr?array.length:0,view=getView(0,arrLength,this.__views__),start=view.start,end=view.end,length=end - start,index=isRight?end:start - 1,iteratees=this.__iteratees__,iterLength=iteratees.length,resIndex=0,takeCount=nativeMin(length,this.__takeCount__);if(!isArr || arrLength < LARGE_ARRAY_SIZE || arrLength == length && takeCount == length){return baseWrapperValue(isRight && isArr?array.reverse():array,this.__actions__);}var result=[];outer: while(length-- && resIndex < takeCount) {index += dir;var iterIndex=-1,value=array[index];while(++iterIndex < iterLength) {var data=iteratees[iterIndex],iteratee=data.iteratee,type=data.type,computed=iteratee(value);if(type == LAZY_MAP_FLAG){value = computed;}else if(!computed){if(type == LAZY_FILTER_FLAG){continue outer;}else {break outer;}}}result[resIndex++] = value;}return result;} /*------------------------------------------------------------------------*/ /**
	     * Creates a cache object to store key/value pairs.
	     *
	     * @private
	     * @static
	     * @name Cache
	     * @memberOf _.memoize
	     */function MapCache(){this.__data__ = {};} /**
	     * Removes `key` and its value from the cache.
	     *
	     * @private
	     * @name delete
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
	     */function mapDelete(key){return this.has(key) && delete this.__data__[key];} /**
	     * Gets the cached value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the cached value.
	     */function mapGet(key){return key == '__proto__'?undefined:this.__data__[key];} /**
	     * Checks if a cached value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */function mapHas(key){return key != '__proto__' && hasOwnProperty.call(this.__data__,key);} /**
	     * Sets `value` to `key` of the cache.
	     *
	     * @private
	     * @name set
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to cache.
	     * @param {*} value The value to cache.
	     * @returns {Object} Returns the cache object.
	     */function mapSet(key,value){if(key != '__proto__'){this.__data__[key] = value;}return this;} /*------------------------------------------------------------------------*/ /**
	     *
	     * Creates a cache object to store unique values.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     */function SetCache(values){var length=values?values.length:0;this.data = {'hash':nativeCreate(null),'set':new Set()};while(length--) {this.push(values[length]);}} /**
	     * Checks if `value` is in `cache` mimicking the return signature of
	     * `_.indexOf` by returning `0` if the value is found, else `-1`.
	     *
	     * @private
	     * @param {Object} cache The cache to search.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns `0` if `value` is found, else `-1`.
	     */function cacheIndexOf(cache,value){var data=cache.data,result=typeof value == 'string' || isObject(value)?data.set.has(value):data.hash[value];return result?0:-1;} /**
	     * Adds `value` to the cache.
	     *
	     * @private
	     * @name push
	     * @memberOf SetCache
	     * @param {*} value The value to cache.
	     */function cachePush(value){var data=this.data;if(typeof value == 'string' || isObject(value)){data.set.add(value);}else {data.hash[value] = true;}} /*------------------------------------------------------------------------*/ /**
	     * Creates a new array joining `array` with `other`.
	     *
	     * @private
	     * @param {Array} array The array to join.
	     * @param {Array} other The other array to join.
	     * @returns {Array} Returns the new concatenated array.
	     */function arrayConcat(array,other){var index=-1,length=array.length,othIndex=-1,othLength=other.length,result=Array(length + othLength);while(++index < length) {result[index] = array[index];}while(++othIndex < othLength) {result[index++] = other[othIndex];}return result;} /**
	     * Copies the values of `source` to `array`.
	     *
	     * @private
	     * @param {Array} source The array to copy values from.
	     * @param {Array} [array=[]] The array to copy values to.
	     * @returns {Array} Returns `array`.
	     */function arrayCopy(source,array){var index=-1,length=source.length;array || (array = Array(length));while(++index < length) {array[index] = source[index];}return array;} /**
	     * A specialized version of `_.forEach` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */function arrayEach(array,iteratee){var index=-1,length=array.length;while(++index < length) {if(iteratee(array[index],index,array) === false){break;}}return array;} /**
	     * A specialized version of `_.forEachRight` for arrays without support for
	     * callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */function arrayEachRight(array,iteratee){var length=array.length;while(length--) {if(iteratee(array[length],length,array) === false){break;}}return array;} /**
	     * A specialized version of `_.every` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     */function arrayEvery(array,predicate){var index=-1,length=array.length;while(++index < length) {if(!predicate(array[index],index,array)){return false;}}return true;} /**
	     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
	     * with one argument: (value).
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {*} Returns the extremum value.
	     */function arrayExtremum(array,iteratee,comparator,exValue){var index=-1,length=array.length,computed=exValue,result=computed;while(++index < length) {var value=array[index],current=+iteratee(value);if(comparator(current,computed)){computed = current;result = value;}}return result;} /**
	     * A specialized version of `_.filter` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */function arrayFilter(array,predicate){var index=-1,length=array.length,resIndex=-1,result=[];while(++index < length) {var value=array[index];if(predicate(value,index,array)){result[++resIndex] = value;}}return result;} /**
	     * A specialized version of `_.map` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */function arrayMap(array,iteratee){var index=-1,length=array.length,result=Array(length);while(++index < length) {result[index] = iteratee(array[index],index,array);}return result;} /**
	     * Appends the elements of `values` to `array`.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to append.
	     * @returns {Array} Returns `array`.
	     */function arrayPush(array,values){var index=-1,length=values.length,offset=array.length;while(++index < length) {array[offset + index] = values[index];}return array;} /**
	     * A specialized version of `_.reduce` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {boolean} [initFromArray] Specify using the first element of `array`
	     *  as the initial value.
	     * @returns {*} Returns the accumulated value.
	     */function arrayReduce(array,iteratee,accumulator,initFromArray){var index=-1,length=array.length;if(initFromArray && length){accumulator = array[++index];}while(++index < length) {accumulator = iteratee(accumulator,array[index],index,array);}return accumulator;} /**
	     * A specialized version of `_.reduceRight` for arrays without support for
	     * callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {boolean} [initFromArray] Specify using the last element of `array`
	     *  as the initial value.
	     * @returns {*} Returns the accumulated value.
	     */function arrayReduceRight(array,iteratee,accumulator,initFromArray){var length=array.length;if(initFromArray && length){accumulator = array[--length];}while(length--) {accumulator = iteratee(accumulator,array[length],length,array);}return accumulator;} /**
	     * A specialized version of `_.some` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */function arraySome(array,predicate){var index=-1,length=array.length;while(++index < length) {if(predicate(array[index],index,array)){return true;}}return false;} /**
	     * A specialized version of `_.sum` for arrays without support for callback
	     * shorthands and `this` binding..
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {number} Returns the sum.
	     */function arraySum(array,iteratee){var length=array.length,result=0;while(length--) {result += +iteratee(array[length]) || 0;}return result;} /**
	     * Used by `_.defaults` to customize its `_.assign` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */function assignDefaults(objectValue,sourceValue){return objectValue === undefined?sourceValue:objectValue;} /**
	     * Used by `_.template` to customize its `_.assign` use.
	     *
	     * **Note:** This function is like `assignDefaults` except that it ignores
	     * inherited property values when checking if a property is `undefined`.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @param {string} key The key associated with the object and source values.
	     * @param {Object} object The destination object.
	     * @returns {*} Returns the value to assign to the destination object.
	     */function assignOwnDefaults(objectValue,sourceValue,key,object){return objectValue === undefined || !hasOwnProperty.call(object,key)?sourceValue:objectValue;} /**
	     * A specialized version of `_.assign` for customizing assigned values without
	     * support for argument juggling, multiple sources, and `this` binding `customizer`
	     * functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     */function assignWith(object,source,customizer){var index=-1,props=keys(source),length=props.length;while(++index < length) {var key=props[index],value=object[key],result=customizer(value,source[key],key,object,source);if((result === result?result !== value:value === value) || value === undefined && !(key in object)){object[key] = result;}}return object;} /**
	     * The base implementation of `_.assign` without support for argument juggling,
	     * multiple sources, and `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */function baseAssign(object,source){return source == null?object:baseCopy(source,keys(source),object);} /**
	     * The base implementation of `_.at` without support for string collections
	     * and individual key arguments.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {number[]|string[]} props The property names or indexes of elements to pick.
	     * @returns {Array} Returns the new array of picked elements.
	     */function baseAt(collection,props){var index=-1,isNil=collection == null,isArr=!isNil && isArrayLike(collection),length=isArr?collection.length:0,propsLength=props.length,result=Array(propsLength);while(++index < propsLength) {var key=props[index];if(isArr){result[index] = isIndex(key,length)?collection[key]:undefined;}else {result[index] = isNil?undefined:collection[key];}}return result;} /**
	     * Copies properties of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy properties from.
	     * @param {Array} props The property names to copy.
	     * @param {Object} [object={}] The object to copy properties to.
	     * @returns {Object} Returns `object`.
	     */function baseCopy(source,props,object){object || (object = {});var index=-1,length=props.length;while(++index < length) {var key=props[index];object[key] = source[key];}return object;} /**
	     * The base implementation of `_.callback` which supports specifying the
	     * number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */function baseCallback(func,thisArg,argCount){var type=typeof func;if(type == 'function'){return thisArg === undefined?func:bindCallback(func,thisArg,argCount);}if(func == null){return identity;}if(type == 'object'){return baseMatches(func);}return thisArg === undefined?property(func):baseMatchesProperty(func,thisArg);} /**
	     * The base implementation of `_.clone` without support for argument juggling
	     * and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {string} [key] The key of `value`.
	     * @param {Object} [object] The object `value` belongs to.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */function baseClone(value,isDeep,customizer,key,object,stackA,stackB){var result;if(customizer){result = object?customizer(value,key,object):customizer(value);}if(result !== undefined){return result;}if(!isObject(value)){return value;}var isArr=isArray(value);if(isArr){result = initCloneArray(value);if(!isDeep){return arrayCopy(value,result);}}else {var tag=objToString.call(value),isFunc=tag == funcTag;if(tag == objectTag || tag == argsTag || isFunc && !object){result = initCloneObject(isFunc?{}:value);if(!isDeep){return baseAssign(result,value);}}else {return cloneableTags[tag]?initCloneByTag(value,tag,isDeep):object?value:{};}} // Check for circular references and return its corresponding clone.
	stackA || (stackA = []);stackB || (stackB = []);var length=stackA.length;while(length--) {if(stackA[length] == value){return stackB[length];}} // Add the source value to the stack of traversed objects and associate it with its clone.
	stackA.push(value);stackB.push(result); // Recursively populate clone (susceptible to call stack limits).
	(isArr?arrayEach:baseForOwn)(value,function(subValue,key){result[key] = baseClone(subValue,isDeep,customizer,key,value,stackA,stackB);});return result;} /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */var baseCreate=(function(){function object(){}return function(prototype){if(isObject(prototype)){object.prototype = prototype;var result=new object();object.prototype = undefined;}return result || {};};})(); /**
	     * The base implementation of `_.delay` and `_.defer` which accepts an index
	     * of where to slice the arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {Object} args The arguments provide to `func`.
	     * @returns {number} Returns the timer id.
	     */function baseDelay(func,wait,args){if(typeof func != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}return setTimeout(function(){func.apply(undefined,args);},wait);} /**
	     * The base implementation of `_.difference` which accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Array} values The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     */function baseDifference(array,values){var length=array?array.length:0,result=[];if(!length){return result;}var index=-1,indexOf=getIndexOf(),isCommon=indexOf == baseIndexOf,cache=isCommon && values.length >= LARGE_ARRAY_SIZE?createCache(values):null,valuesLength=values.length;if(cache){indexOf = cacheIndexOf;isCommon = false;values = cache;}outer: while(++index < length) {var value=array[index];if(isCommon && value === value){var valuesIndex=valuesLength;while(valuesIndex--) {if(values[valuesIndex] === value){continue outer;}}result.push(value);}else if(indexOf(values,value,0) < 0){result.push(value);}}return result;} /**
	     * The base implementation of `_.forEach` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */var baseEach=createBaseEach(baseForOwn); /**
	     * The base implementation of `_.forEachRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */var baseEachRight=createBaseEach(baseForOwnRight,true); /**
	     * The base implementation of `_.every` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`
	     */function baseEvery(collection,predicate){var result=true;baseEach(collection,function(value,index,collection){result = !!predicate(value,index,collection);return result;});return result;} /**
	     * Gets the extremum value of `collection` invoking `iteratee` for each value
	     * in `collection` to generate the criterion by which the value is ranked.
	     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {*} Returns the extremum value.
	     */function baseExtremum(collection,iteratee,comparator,exValue){var computed=exValue,result=computed;baseEach(collection,function(value,index,collection){var current=+iteratee(value,index,collection);if(comparator(current,computed) || current === exValue && current === result){computed = current;result = value;}});return result;} /**
	     * The base implementation of `_.fill` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     */function baseFill(array,value,start,end){var length=array.length;start = start == null?0:+start || 0;if(start < 0){start = -start > length?0:length + start;}end = end === undefined || end > length?length:+end || 0;if(end < 0){end += length;}length = start > end?0:end >>> 0;start >>>= 0;while(start < length) {array[start++] = value;}return array;} /**
	     * The base implementation of `_.filter` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */function baseFilter(collection,predicate){var result=[];baseEach(collection,function(value,index,collection){if(predicate(value,index,collection)){result.push(value);}});return result;} /**
	     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	     * without support for callback shorthands and `this` binding, which iterates
	     * over `collection` using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @param {boolean} [retKey] Specify returning the key of the found element
	     *  instead of the element itself.
	     * @returns {*} Returns the found element or its key, else `undefined`.
	     */function baseFind(collection,predicate,eachFunc,retKey){var result;eachFunc(collection,function(value,key,collection){if(predicate(value,key,collection)){result = retKey?key:value;return false;}});return result;} /**
	     * The base implementation of `_.flatten` with added support for restricting
	     * flattening and specifying the start index.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	     * @param {Array} [result=[]] The initial result value.
	     * @returns {Array} Returns the new flattened array.
	     */function baseFlatten(array,isDeep,isStrict,result){result || (result = []);var index=-1,length=array.length;while(++index < length) {var value=array[index];if(isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))){if(isDeep){ // Recursively flatten arrays (susceptible to call stack limits).
	baseFlatten(value,isDeep,isStrict,result);}else {arrayPush(result,value);}}else if(!isStrict){result[result.length] = value;}}return result;} /**
	     * The base implementation of `baseForIn` and `baseForOwn` which iterates
	     * over `object` properties returned by `keysFunc` invoking `iteratee` for
	     * each property. Iteratee functions may exit iteration early by explicitly
	     * returning `false`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */var baseFor=createBaseFor(); /**
	     * This function is like `baseFor` except that it iterates over properties
	     * in the opposite order.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */var baseForRight=createBaseFor(true); /**
	     * The base implementation of `_.forIn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */function baseForIn(object,iteratee){return baseFor(object,iteratee,keysIn);} /**
	     * The base implementation of `_.forOwn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */function baseForOwn(object,iteratee){return baseFor(object,iteratee,keys);} /**
	     * The base implementation of `_.forOwnRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */function baseForOwnRight(object,iteratee){return baseForRight(object,iteratee,keys);} /**
	     * The base implementation of `_.functions` which creates an array of
	     * `object` function property names filtered from those provided.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} props The property names to filter.
	     * @returns {Array} Returns the new array of filtered property names.
	     */function baseFunctions(object,props){var index=-1,length=props.length,resIndex=-1,result=[];while(++index < length) {var key=props[index];if(isFunction(object[key])){result[++resIndex] = key;}}return result;} /**
	     * The base implementation of `get` without support for string paths
	     * and default values.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} path The path of the property to get.
	     * @param {string} [pathKey] The key representation of path.
	     * @returns {*} Returns the resolved value.
	     */function baseGet(object,path,pathKey){if(object == null){return;}if(pathKey !== undefined && pathKey in toObject(object)){path = [pathKey];}var index=0,length=path.length;while(object != null && index < length) {object = object[path[index++]];}return index && index == length?object:undefined;} /**
	     * The base implementation of `_.isEqual` without support for `this` binding
	     * `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */function baseIsEqual(value,other,customizer,isLoose,stackA,stackB){if(value === other){return true;}if(value == null || other == null || !isObject(value) && !isObjectLike(other)){return value !== value && other !== other;}return baseIsEqualDeep(value,other,baseIsEqual,customizer,isLoose,stackA,stackB);} /**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * deep comparisons and tracks traversed objects enabling objects with circular
	     * references to be compared.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */function baseIsEqualDeep(object,other,equalFunc,customizer,isLoose,stackA,stackB){var objIsArr=isArray(object),othIsArr=isArray(other),objTag=arrayTag,othTag=arrayTag;if(!objIsArr){objTag = objToString.call(object);if(objTag == argsTag){objTag = objectTag;}else if(objTag != objectTag){objIsArr = isTypedArray(object);}}if(!othIsArr){othTag = objToString.call(other);if(othTag == argsTag){othTag = objectTag;}else if(othTag != objectTag){othIsArr = isTypedArray(other);}}var objIsObj=objTag == objectTag,othIsObj=othTag == objectTag,isSameTag=objTag == othTag;if(isSameTag && !(objIsArr || objIsObj)){return equalByTag(object,other,objTag);}if(!isLoose){var objIsWrapped=objIsObj && hasOwnProperty.call(object,'__wrapped__'),othIsWrapped=othIsObj && hasOwnProperty.call(other,'__wrapped__');if(objIsWrapped || othIsWrapped){return equalFunc(objIsWrapped?object.value():object,othIsWrapped?other.value():other,customizer,isLoose,stackA,stackB);}}if(!isSameTag){return false;} // Assume cyclic values are equal.
	// For more information on detecting circular references see https://es5.github.io/#JO.
	stackA || (stackA = []);stackB || (stackB = []);var length=stackA.length;while(length--) {if(stackA[length] == object){return stackB[length] == other;}} // Add `object` and `other` to the stack of traversed objects.
	stackA.push(object);stackB.push(other);var result=(objIsArr?equalArrays:equalObjects)(object,other,equalFunc,customizer,isLoose,stackA,stackB);stackA.pop();stackB.pop();return result;} /**
	     * The base implementation of `_.isMatch` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} matchData The propery names, values, and compare flags to match.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */function baseIsMatch(object,matchData,customizer){var index=matchData.length,length=index,noCustomizer=!customizer;if(object == null){return !length;}object = toObject(object);while(index--) {var data=matchData[index];if(noCustomizer && data[2]?data[1] !== object[data[0]]:!(data[0] in object)){return false;}}while(++index < length) {data = matchData[index];var key=data[0],objValue=object[key],srcValue=data[1];if(noCustomizer && data[2]){if(objValue === undefined && !(key in object)){return false;}}else {var result=customizer?customizer(objValue,srcValue,key):undefined;if(!(result === undefined?baseIsEqual(srcValue,objValue,customizer,true):result)){return false;}}}return true;} /**
	     * The base implementation of `_.map` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */function baseMap(collection,iteratee){var index=-1,result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value,key,collection){result[++index] = iteratee(value,key,collection);});return result;} /**
	     * The base implementation of `_.matches` which does not clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     */function baseMatches(source){var matchData=getMatchData(source);if(matchData.length == 1 && matchData[0][2]){var key=matchData[0][0],value=matchData[0][1];return function(object){if(object == null){return false;}return object[key] === value && (value !== undefined || key in toObject(object));};}return function(object){return baseIsMatch(object,matchData);};} /**
	     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	     *
	     * @private
	     * @param {string} path The path of the property to get.
	     * @param {*} srcValue The value to compare.
	     * @returns {Function} Returns the new function.
	     */function baseMatchesProperty(path,srcValue){var isArr=isArray(path),isCommon=isKey(path) && isStrictComparable(srcValue),pathKey=path + '';path = toPath(path);return function(object){if(object == null){return false;}var key=pathKey;object = toObject(object);if((isArr || !isCommon) && !(key in object)){object = path.length == 1?object:baseGet(object,baseSlice(path,0,-1));if(object == null){return false;}key = last(path);object = toObject(object);}return object[key] === srcValue?srcValue !== undefined || key in object:baseIsEqual(srcValue,object[key],undefined,true);};} /**
	     * The base implementation of `_.merge` without support for argument juggling,
	     * multiple sources, and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {Object} Returns `object`.
	     */function baseMerge(object,source,customizer,stackA,stackB){if(!isObject(object)){return object;}var isSrcArr=isArrayLike(source) && (isArray(source) || isTypedArray(source)),props=isSrcArr?undefined:keys(source);arrayEach(props || source,function(srcValue,key){if(props){key = srcValue;srcValue = source[key];}if(isObjectLike(srcValue)){stackA || (stackA = []);stackB || (stackB = []);baseMergeDeep(object,source,key,baseMerge,customizer,stackA,stackB);}else {var value=object[key],result=customizer?customizer(value,srcValue,key,object,source):undefined,isCommon=result === undefined;if(isCommon){result = srcValue;}if((result !== undefined || isSrcArr && !(key in object)) && (isCommon || (result === result?result !== value:value === value))){object[key] = result;}}});return object;} /**
	     * A specialized version of `baseMerge` for arrays and objects which performs
	     * deep merges and tracks traversed objects enabling objects with circular
	     * references to be merged.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {string} key The key of the value to merge.
	     * @param {Function} mergeFunc The function to merge values.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */function baseMergeDeep(object,source,key,mergeFunc,customizer,stackA,stackB){var length=stackA.length,srcValue=source[key];while(length--) {if(stackA[length] == srcValue){object[key] = stackB[length];return;}}var value=object[key],result=customizer?customizer(value,srcValue,key,object,source):undefined,isCommon=result === undefined;if(isCommon){result = srcValue;if(isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))){result = isArray(value)?value:isArrayLike(value)?arrayCopy(value):[];}else if(isPlainObject(srcValue) || isArguments(srcValue)){result = isArguments(value)?toPlainObject(value):isPlainObject(value)?value:{};}else {isCommon = false;}} // Add the source value to the stack of traversed objects and associate
	// it with its merged value.
	stackA.push(srcValue);stackB.push(result);if(isCommon){ // Recursively merge objects and arrays (susceptible to call stack limits).
	object[key] = mergeFunc(result,srcValue,customizer,stackA,stackB);}else if(result === result?result !== value:value === value){object[key] = result;}} /**
	     * The base implementation of `_.property` without support for deep paths.
	     *
	     * @private
	     * @param {string} key The key of the property to get.
	     * @returns {Function} Returns the new function.
	     */function baseProperty(key){return function(object){return object == null?undefined:object[key];};} /**
	     * A specialized version of `baseProperty` which supports deep paths.
	     *
	     * @private
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     */function basePropertyDeep(path){var pathKey=path + '';path = toPath(path);return function(object){return baseGet(object,path,pathKey);};} /**
	     * The base implementation of `_.pullAt` without support for individual
	     * index arguments and capturing the removed elements.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {number[]} indexes The indexes of elements to remove.
	     * @returns {Array} Returns `array`.
	     */function basePullAt(array,indexes){var length=array?indexes.length:0;while(length--) {var index=indexes[length];if(index != previous && isIndex(index)){var previous=index;splice.call(array,index,1);}}return array;} /**
	     * The base implementation of `_.random` without support for argument juggling
	     * and returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns the random number.
	     */function baseRandom(min,max){return min + nativeFloor(nativeRandom() * (max - min + 1));} /**
	     * The base implementation of `_.reduce` and `_.reduceRight` without support
	     * for callback shorthands and `this` binding, which iterates over `collection`
	     * using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} accumulator The initial value.
	     * @param {boolean} initFromCollection Specify using the first or last element
	     *  of `collection` as the initial value.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @returns {*} Returns the accumulated value.
	     */function baseReduce(collection,iteratee,accumulator,initFromCollection,eachFunc){eachFunc(collection,function(value,index,collection){accumulator = initFromCollection?(initFromCollection = false,value):iteratee(accumulator,value,index,collection);});return accumulator;} /**
	     * The base implementation of `setData` without support for hot loop detection.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */var baseSetData=!metaMap?identity:function(func,data){metaMap.set(func,data);return func;}; /**
	     * The base implementation of `_.slice` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */function baseSlice(array,start,end){var index=-1,length=array.length;start = start == null?0:+start || 0;if(start < 0){start = -start > length?0:length + start;}end = end === undefined || end > length?length:+end || 0;if(end < 0){end += length;}length = start > end?0:end - start >>> 0;start >>>= 0;var result=Array(length);while(++index < length) {result[index] = array[index + start];}return result;} /**
	     * The base implementation of `_.some` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */function baseSome(collection,predicate){var result;baseEach(collection,function(value,index,collection){result = predicate(value,index,collection);return !result;});return !!result;} /**
	     * The base implementation of `_.sortBy` which uses `comparer` to define
	     * the sort order of `array` and replaces criteria objects with their
	     * corresponding values.
	     *
	     * @private
	     * @param {Array} array The array to sort.
	     * @param {Function} comparer The function to define sort order.
	     * @returns {Array} Returns `array`.
	     */function baseSortBy(array,comparer){var length=array.length;array.sort(comparer);while(length--) {array[length] = array[length].value;}return array;} /**
	     * The base implementation of `_.sortByOrder` without param guards.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {boolean[]} orders The sort orders of `iteratees`.
	     * @returns {Array} Returns the new sorted array.
	     */function baseSortByOrder(collection,iteratees,orders){var callback=getCallback(),index=-1;iteratees = arrayMap(iteratees,function(iteratee){return callback(iteratee);});var result=baseMap(collection,function(value){var criteria=arrayMap(iteratees,function(iteratee){return iteratee(value);});return {'criteria':criteria,'index':++index,'value':value};});return baseSortBy(result,function(object,other){return compareMultiple(object,other,orders);});} /**
	     * The base implementation of `_.sum` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {number} Returns the sum.
	     */function baseSum(collection,iteratee){var result=0;baseEach(collection,function(value,index,collection){result += +iteratee(value,index,collection) || 0;});return result;} /**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The function invoked per iteration.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     */function baseUniq(array,iteratee){var index=-1,indexOf=getIndexOf(),length=array.length,isCommon=indexOf == baseIndexOf,isLarge=isCommon && length >= LARGE_ARRAY_SIZE,seen=isLarge?createCache():null,result=[];if(seen){indexOf = cacheIndexOf;isCommon = false;}else {isLarge = false;seen = iteratee?[]:result;}outer: while(++index < length) {var value=array[index],computed=iteratee?iteratee(value,index,array):value;if(isCommon && value === value){var seenIndex=seen.length;while(seenIndex--) {if(seen[seenIndex] === computed){continue outer;}}if(iteratee){seen.push(computed);}result.push(value);}else if(indexOf(seen,computed,0) < 0){if(iteratee || isLarge){seen.push(computed);}result.push(value);}}return result;} /**
	     * The base implementation of `_.values` and `_.valuesIn` which creates an
	     * array of `object` property values corresponding to the property names
	     * of `props`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} props The property names to get values for.
	     * @returns {Object} Returns the array of property values.
	     */function baseValues(object,props){var index=-1,length=props.length,result=Array(length);while(++index < length) {result[index] = object[props[index]];}return result;} /**
	     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
	     * and `_.takeWhile` without support for callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the slice of `array`.
	     */function baseWhile(array,predicate,isDrop,fromRight){var length=array.length,index=fromRight?length:-1;while((fromRight?index--:++index < length) && predicate(array[index],index,array)) {}return isDrop?baseSlice(array,fromRight?0:index,fromRight?index + 1:length):baseSlice(array,fromRight?index + 1:0,fromRight?length:index);} /**
	     * The base implementation of `wrapperValue` which returns the result of
	     * performing a sequence of actions on the unwrapped `value`, where each
	     * successive action is supplied the return value of the previous.
	     *
	     * @private
	     * @param {*} value The unwrapped value.
	     * @param {Array} actions Actions to peform to resolve the unwrapped value.
	     * @returns {*} Returns the resolved value.
	     */function baseWrapperValue(value,actions){var result=value;if(result instanceof LazyWrapper){result = result.value();}var index=-1,length=actions.length;while(++index < length) {var action=actions[index];result = action.func.apply(action.thisArg,arrayPush([result],action.args));}return result;} /**
	     * Performs a binary search of `array` to determine the index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */function binaryIndex(array,value,retHighest){var low=0,high=array?array.length:low;if(typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH){while(low < high) {var mid=low + high >>> 1,computed=array[mid];if((retHighest?computed <= value:computed < value) && computed !== null){low = mid + 1;}else {high = mid;}}return high;}return binaryIndexBy(array,value,identity,retHighest);} /**
	     * This function is like `binaryIndex` except that it invokes `iteratee` for
	     * `value` and each element of `array` to compute their sort ranking. The
	     * iteratee is invoked with one argument; (value).
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */function binaryIndexBy(array,value,iteratee,retHighest){value = iteratee(value);var low=0,high=array?array.length:0,valIsNaN=value !== value,valIsNull=value === null,valIsUndef=value === undefined;while(low < high) {var mid=nativeFloor((low + high) / 2),computed=iteratee(array[mid]),isDef=computed !== undefined,isReflexive=computed === computed;if(valIsNaN){var setLow=isReflexive || retHighest;}else if(valIsNull){setLow = isReflexive && isDef && (retHighest || computed != null);}else if(valIsUndef){setLow = isReflexive && (retHighest || isDef);}else if(computed == null){setLow = false;}else {setLow = retHighest?computed <= value:computed < value;}if(setLow){low = mid + 1;}else {high = mid;}}return nativeMin(high,MAX_ARRAY_INDEX);} /**
	     * A specialized version of `baseCallback` which only supports `this` binding
	     * and specifying the number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */function bindCallback(func,thisArg,argCount){if(typeof func != 'function'){return identity;}if(thisArg === undefined){return func;}switch(argCount){case 1:return function(value){return func.call(thisArg,value);};case 3:return function(value,index,collection){return func.call(thisArg,value,index,collection);};case 4:return function(accumulator,value,index,collection){return func.call(thisArg,accumulator,value,index,collection);};case 5:return function(value,other,key,object,source){return func.call(thisArg,value,other,key,object,source);};}return function(){return func.apply(thisArg,arguments);};} /**
	     * Creates a clone of the given array buffer.
	     *
	     * @private
	     * @param {ArrayBuffer} buffer The array buffer to clone.
	     * @returns {ArrayBuffer} Returns the cloned array buffer.
	     */function bufferClone(buffer){var result=new ArrayBuffer(buffer.byteLength),view=new Uint8Array(result);view.set(new Uint8Array(buffer));return result;} /**
	     * Creates an array that is the composition of partially applied arguments,
	     * placeholders, and provided arguments into a single array of arguments.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to prepend to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */function composeArgs(args,partials,holders){var holdersLength=holders.length,argsIndex=-1,argsLength=nativeMax(args.length - holdersLength,0),leftIndex=-1,leftLength=partials.length,result=Array(leftLength + argsLength);while(++leftIndex < leftLength) {result[leftIndex] = partials[leftIndex];}while(++argsIndex < holdersLength) {result[holders[argsIndex]] = args[argsIndex];}while(argsLength--) {result[leftIndex++] = args[argsIndex++];}return result;} /**
	     * This function is like `composeArgs` except that the arguments composition
	     * is tailored for `_.partialRight`.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to append to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */function composeArgsRight(args,partials,holders){var holdersIndex=-1,holdersLength=holders.length,argsIndex=-1,argsLength=nativeMax(args.length - holdersLength,0),rightIndex=-1,rightLength=partials.length,result=Array(argsLength + rightLength);while(++argsIndex < argsLength) {result[argsIndex] = args[argsIndex];}var offset=argsIndex;while(++rightIndex < rightLength) {result[offset + rightIndex] = partials[rightIndex];}while(++holdersIndex < holdersLength) {result[offset + holders[holdersIndex]] = args[argsIndex++];}return result;} /**
	     * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
	     *
	     * @private
	     * @param {Function} setter The function to set keys and values of the accumulator object.
	     * @param {Function} [initializer] The function to initialize the accumulator object.
	     * @returns {Function} Returns the new aggregator function.
	     */function createAggregator(setter,initializer){return function(collection,iteratee,thisArg){var result=initializer?initializer():{};iteratee = getCallback(iteratee,thisArg,3);if(isArray(collection)){var index=-1,length=collection.length;while(++index < length) {var value=collection[index];setter(result,value,iteratee(value,index,collection),collection);}}else {baseEach(collection,function(value,key,collection){setter(result,value,iteratee(value,key,collection),collection);});}return result;};} /**
	     * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @returns {Function} Returns the new assigner function.
	     */function createAssigner(assigner){return restParam(function(object,sources){var index=-1,length=object == null?0:sources.length,customizer=length > 2?sources[length - 2]:undefined,guard=length > 2?sources[2]:undefined,thisArg=length > 1?sources[length - 1]:undefined;if(typeof customizer == 'function'){customizer = bindCallback(customizer,thisArg,5);length -= 2;}else {customizer = typeof thisArg == 'function'?thisArg:undefined;length -= customizer?1:0;}if(guard && isIterateeCall(sources[0],sources[1],guard)){customizer = length < 3?undefined:customizer;length = 1;}while(++index < length) {var source=sources[index];if(source){assigner(object,source,customizer);}}return object;});} /**
	     * Creates a `baseEach` or `baseEachRight` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */function createBaseEach(eachFunc,fromRight){return function(collection,iteratee){var length=collection?getLength(collection):0;if(!isLength(length)){return eachFunc(collection,iteratee);}var index=fromRight?length:-1,iterable=toObject(collection);while(fromRight?index--:++index < length) {if(iteratee(iterable[index],index,iterable) === false){break;}}return collection;};} /**
	     * Creates a base function for `_.forIn` or `_.forInRight`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */function createBaseFor(fromRight){return function(object,iteratee,keysFunc){var iterable=toObject(object),props=keysFunc(object),length=props.length,index=fromRight?length:-1;while(fromRight?index--:++index < length) {var key=props[index];if(iteratee(iterable[key],key,iterable) === false){break;}}return object;};} /**
	     * Creates a function that wraps `func` and invokes it with the `this`
	     * binding of `thisArg`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @returns {Function} Returns the new bound function.
	     */function createBindWrapper(func,thisArg){var Ctor=createCtorWrapper(func);function wrapper(){var fn=this && this !== root && this instanceof wrapper?Ctor:func;return fn.apply(thisArg,arguments);}return wrapper;} /**
	     * Creates a `Set` cache object to optimize linear searches of large arrays.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	     */function createCache(values){return nativeCreate && Set?new SetCache(values):null;} /**
	     * Creates a function that produces compound words out of the words in a
	     * given string.
	     *
	     * @private
	     * @param {Function} callback The function to combine each word.
	     * @returns {Function} Returns the new compounder function.
	     */function createCompounder(callback){return function(string){var index=-1,array=words(deburr(string)),length=array.length,result='';while(++index < length) {result = callback(result,array[index],index);}return result;};} /**
	     * Creates a function that produces an instance of `Ctor` regardless of
	     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	     *
	     * @private
	     * @param {Function} Ctor The constructor to wrap.
	     * @returns {Function} Returns the new wrapped function.
	     */function createCtorWrapper(Ctor){return function(){ // Use a `switch` statement to work with class constructors.
	// See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	// for more details.
	var args=arguments;switch(args.length){case 0:return new Ctor();case 1:return new Ctor(args[0]);case 2:return new Ctor(args[0],args[1]);case 3:return new Ctor(args[0],args[1],args[2]);case 4:return new Ctor(args[0],args[1],args[2],args[3]);case 5:return new Ctor(args[0],args[1],args[2],args[3],args[4]);case 6:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5]);case 7:return new Ctor(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);}var thisBinding=baseCreate(Ctor.prototype),result=Ctor.apply(thisBinding,args); // Mimic the constructor's `return` behavior.
	// See https://es5.github.io/#x13.2.2 for more details.
	return isObject(result)?result:thisBinding;};} /**
	     * Creates a `_.curry` or `_.curryRight` function.
	     *
	     * @private
	     * @param {boolean} flag The curry bit flag.
	     * @returns {Function} Returns the new curry function.
	     */function createCurry(flag){function curryFunc(func,arity,guard){if(guard && isIterateeCall(func,arity,guard)){arity = undefined;}var result=createWrapper(func,flag,undefined,undefined,undefined,undefined,undefined,arity);result.placeholder = curryFunc.placeholder;return result;}return curryFunc;} /**
	     * Creates a `_.defaults` or `_.defaultsDeep` function.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Function} Returns the new defaults function.
	     */function createDefaults(assigner,customizer){return restParam(function(args){var object=args[0];if(object == null){return object;}args.push(customizer);return assigner.apply(undefined,args);});} /**
	     * Creates a `_.max` or `_.min` function.
	     *
	     * @private
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {Function} Returns the new extremum function.
	     */function createExtremum(comparator,exValue){return function(collection,iteratee,thisArg){if(thisArg && isIterateeCall(collection,iteratee,thisArg)){iteratee = undefined;}iteratee = getCallback(iteratee,thisArg,3);if(iteratee.length == 1){collection = isArray(collection)?collection:toIterable(collection);var result=arrayExtremum(collection,iteratee,comparator,exValue);if(!(collection.length && result === exValue)){return result;}}return baseExtremum(collection,iteratee,comparator,exValue);};} /**
	     * Creates a `_.find` or `_.findLast` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new find function.
	     */function createFind(eachFunc,fromRight){return function(collection,predicate,thisArg){predicate = getCallback(predicate,thisArg,3);if(isArray(collection)){var index=baseFindIndex(collection,predicate,fromRight);return index > -1?collection[index]:undefined;}return baseFind(collection,predicate,eachFunc);};} /**
	     * Creates a `_.findIndex` or `_.findLastIndex` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new find function.
	     */function createFindIndex(fromRight){return function(array,predicate,thisArg){if(!(array && array.length)){return -1;}predicate = getCallback(predicate,thisArg,3);return baseFindIndex(array,predicate,fromRight);};} /**
	     * Creates a `_.findKey` or `_.findLastKey` function.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new find function.
	     */function createFindKey(objectFunc){return function(object,predicate,thisArg){predicate = getCallback(predicate,thisArg,3);return baseFind(object,predicate,objectFunc,true);};} /**
	     * Creates a `_.flow` or `_.flowRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new flow function.
	     */function createFlow(fromRight){return function(){var wrapper,length=arguments.length,index=fromRight?length:-1,leftIndex=0,funcs=Array(length);while(fromRight?index--:++index < length) {var func=funcs[leftIndex++] = arguments[index];if(typeof func != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}if(!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper'){wrapper = new LodashWrapper([],true);}}index = wrapper?-1:length;while(++index < length) {func = funcs[index];var funcName=getFuncName(func),data=funcName == 'wrapper'?getData(func):undefined;if(data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1){wrapper = wrapper[getFuncName(data[0])].apply(wrapper,data[3]);}else {wrapper = func.length == 1 && isLaziable(func)?wrapper[funcName]():wrapper.thru(func);}}return function(){var args=arguments,value=args[0];if(wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE){return wrapper.plant(value).value();}var index=0,result=length?funcs[index].apply(this,args):value;while(++index < length) {result = funcs[index].call(this,result);}return result;};};} /**
	     * Creates a function for `_.forEach` or `_.forEachRight`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over an array.
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @returns {Function} Returns the new each function.
	     */function createForEach(arrayFunc,eachFunc){return function(collection,iteratee,thisArg){return typeof iteratee == 'function' && thisArg === undefined && isArray(collection)?arrayFunc(collection,iteratee):eachFunc(collection,bindCallback(iteratee,thisArg,3));};} /**
	     * Creates a function for `_.forIn` or `_.forInRight`.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new each function.
	     */function createForIn(objectFunc){return function(object,iteratee,thisArg){if(typeof iteratee != 'function' || thisArg !== undefined){iteratee = bindCallback(iteratee,thisArg,3);}return objectFunc(object,iteratee,keysIn);};} /**
	     * Creates a function for `_.forOwn` or `_.forOwnRight`.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new each function.
	     */function createForOwn(objectFunc){return function(object,iteratee,thisArg){if(typeof iteratee != 'function' || thisArg !== undefined){iteratee = bindCallback(iteratee,thisArg,3);}return objectFunc(object,iteratee);};} /**
	     * Creates a function for `_.mapKeys` or `_.mapValues`.
	     *
	     * @private
	     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
	     * @returns {Function} Returns the new map function.
	     */function createObjectMapper(isMapKeys){return function(object,iteratee,thisArg){var result={};iteratee = getCallback(iteratee,thisArg,3);baseForOwn(object,function(value,key,object){var mapped=iteratee(value,key,object);key = isMapKeys?mapped:key;value = isMapKeys?value:mapped;result[key] = value;});return result;};} /**
	     * Creates a function for `_.padLeft` or `_.padRight`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify padding from the right.
	     * @returns {Function} Returns the new pad function.
	     */function createPadDir(fromRight){return function(string,length,chars){string = baseToString(string);return (fromRight?string:'') + createPadding(string,length,chars) + (fromRight?'':string);};} /**
	     * Creates a `_.partial` or `_.partialRight` function.
	     *
	     * @private
	     * @param {boolean} flag The partial bit flag.
	     * @returns {Function} Returns the new partial function.
	     */function createPartial(flag){var partialFunc=restParam(function(func,partials){var holders=replaceHolders(partials,partialFunc.placeholder);return createWrapper(func,flag,undefined,partials,holders);});return partialFunc;} /**
	     * Creates a function for `_.reduce` or `_.reduceRight`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over an array.
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @returns {Function} Returns the new each function.
	     */function createReduce(arrayFunc,eachFunc){return function(collection,iteratee,accumulator,thisArg){var initFromArray=arguments.length < 3;return typeof iteratee == 'function' && thisArg === undefined && isArray(collection)?arrayFunc(collection,iteratee,accumulator,initFromArray):baseReduce(collection,getCallback(iteratee,thisArg,4),accumulator,initFromArray,eachFunc);};} /**
	     * Creates a function that wraps `func` and invokes it with optional `this`
	     * binding of, partial application, and currying.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */function createHybridWrapper(func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity){var isAry=bitmask & ARY_FLAG,isBind=bitmask & BIND_FLAG,isBindKey=bitmask & BIND_KEY_FLAG,isCurry=bitmask & CURRY_FLAG,isCurryBound=bitmask & CURRY_BOUND_FLAG,isCurryRight=bitmask & CURRY_RIGHT_FLAG,Ctor=isBindKey?undefined:createCtorWrapper(func);function wrapper(){ // Avoid `arguments` object use disqualifying optimizations by
	// converting it to an array before providing it to other functions.
	var length=arguments.length,index=length,args=Array(length);while(index--) {args[index] = arguments[index];}if(partials){args = composeArgs(args,partials,holders);}if(partialsRight){args = composeArgsRight(args,partialsRight,holdersRight);}if(isCurry || isCurryRight){var placeholder=wrapper.placeholder,argsHolders=replaceHolders(args,placeholder);length -= argsHolders.length;if(length < arity){var newArgPos=argPos?arrayCopy(argPos):undefined,newArity=nativeMax(arity - length,0),newsHolders=isCurry?argsHolders:undefined,newHoldersRight=isCurry?undefined:argsHolders,newPartials=isCurry?args:undefined,newPartialsRight=isCurry?undefined:args;bitmask |= isCurry?PARTIAL_FLAG:PARTIAL_RIGHT_FLAG;bitmask &= ~(isCurry?PARTIAL_RIGHT_FLAG:PARTIAL_FLAG);if(!isCurryBound){bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);}var newData=[func,bitmask,thisArg,newPartials,newsHolders,newPartialsRight,newHoldersRight,newArgPos,ary,newArity],result=createHybridWrapper.apply(undefined,newData);if(isLaziable(func)){setData(result,newData);}result.placeholder = placeholder;return result;}}var thisBinding=isBind?thisArg:this,fn=isBindKey?thisBinding[func]:func;if(argPos){args = reorder(args,argPos);}if(isAry && ary < args.length){args.length = ary;}if(this && this !== root && this instanceof wrapper){fn = Ctor || createCtorWrapper(func);}return fn.apply(thisBinding,args);}return wrapper;} /**
	     * Creates the padding required for `string` based on the given `length`.
	     * The `chars` string is truncated if the number of characters exceeds `length`.
	     *
	     * @private
	     * @param {string} string The string to create padding for.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the pad for `string`.
	     */function createPadding(string,length,chars){var strLength=string.length;length = +length;if(strLength >= length || !nativeIsFinite(length)){return '';}var padLength=length - strLength;chars = chars == null?' ':chars + '';return repeat(chars,nativeCeil(padLength / chars.length)).slice(0,padLength);} /**
	     * Creates a function that wraps `func` and invokes it with the optional `this`
	     * binding of `thisArg` and the `partials` prepended to those provided to
	     * the wrapper.
	     *
	     * @private
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {Array} partials The arguments to prepend to those provided to the new function.
	     * @returns {Function} Returns the new bound function.
	     */function createPartialWrapper(func,bitmask,thisArg,partials){var isBind=bitmask & BIND_FLAG,Ctor=createCtorWrapper(func);function wrapper(){ // Avoid `arguments` object use disqualifying optimizations by
	// converting it to an array before providing it `func`.
	var argsIndex=-1,argsLength=arguments.length,leftIndex=-1,leftLength=partials.length,args=Array(leftLength + argsLength);while(++leftIndex < leftLength) {args[leftIndex] = partials[leftIndex];}while(argsLength--) {args[leftIndex++] = arguments[++argsIndex];}var fn=this && this !== root && this instanceof wrapper?Ctor:func;return fn.apply(isBind?thisArg:this,args);}return wrapper;} /**
	     * Creates a `_.ceil`, `_.floor`, or `_.round` function.
	     *
	     * @private
	     * @param {string} methodName The name of the `Math` method to use when rounding.
	     * @returns {Function} Returns the new round function.
	     */function createRound(methodName){var func=Math[methodName];return function(number,precision){precision = precision === undefined?0:+precision || 0;if(precision){precision = pow(10,precision);return func(number * precision) / precision;}return func(number);};} /**
	     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
	     *
	     * @private
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {Function} Returns the new index function.
	     */function createSortedIndex(retHighest){return function(array,value,iteratee,thisArg){var callback=getCallback(iteratee);return iteratee == null && callback === baseCallback?binaryIndex(array,value,retHighest):binaryIndexBy(array,value,callback(iteratee,thisArg,1),retHighest);};} /**
	     * Creates a function that either curries or invokes `func` with optional
	     * `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags.
	     *  The bitmask may be composed of the following flags:
	     *     1 - `_.bind`
	     *     2 - `_.bindKey`
	     *     4 - `_.curry` or `_.curryRight` of a bound function
	     *     8 - `_.curry`
	     *    16 - `_.curryRight`
	     *    32 - `_.partial`
	     *    64 - `_.partialRight`
	     *   128 - `_.rearg`
	     *   256 - `_.ary`
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to be partially applied.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */function createWrapper(func,bitmask,thisArg,partials,holders,argPos,ary,arity){var isBindKey=bitmask & BIND_KEY_FLAG;if(!isBindKey && typeof func != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}var length=partials?partials.length:0;if(!length){bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);partials = holders = undefined;}length -= holders?holders.length:0;if(bitmask & PARTIAL_RIGHT_FLAG){var partialsRight=partials,holdersRight=holders;partials = holders = undefined;}var data=isBindKey?undefined:getData(func),newData=[func,bitmask,thisArg,partials,holders,partialsRight,holdersRight,argPos,ary,arity];if(data){mergeData(newData,data);bitmask = newData[1];arity = newData[9];}newData[9] = arity == null?isBindKey?0:func.length:nativeMax(arity - length,0) || 0;if(bitmask == BIND_FLAG){var result=createBindWrapper(newData[0],newData[2]);}else if((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length){result = createPartialWrapper.apply(undefined,newData);}else {result = createHybridWrapper.apply(undefined,newData);}var setter=data?baseSetData:setData;return setter(result,newData);} /**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare.
	     * @param {Array} other The other array to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing arrays.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */function equalArrays(array,other,equalFunc,customizer,isLoose,stackA,stackB){var index=-1,arrLength=array.length,othLength=other.length;if(arrLength != othLength && !(isLoose && othLength > arrLength)){return false;} // Ignore non-index properties.
	while(++index < arrLength) {var arrValue=array[index],othValue=other[index],result=customizer?customizer(isLoose?othValue:arrValue,isLoose?arrValue:othValue,index):undefined;if(result !== undefined){if(result){continue;}return false;} // Recursively compare arrays (susceptible to call stack limits).
	if(isLoose){if(!arraySome(other,function(othValue){return arrValue === othValue || equalFunc(arrValue,othValue,customizer,isLoose,stackA,stackB);})){return false;}}else if(!(arrValue === othValue || equalFunc(arrValue,othValue,customizer,isLoose,stackA,stackB))){return false;}}return true;} /**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `toStringTag`.
	     *
	     * **Note:** This function only supports comparing values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {string} tag The `toStringTag` of the objects to compare.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */function equalByTag(object,other,tag){switch(tag){case boolTag:case dateTag: // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	// to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	return +object == +other;case errorTag:return object.name == other.name && object.message == other.message;case numberTag: // Treat `NaN` vs. `NaN` as equal.
	return object != +object?other != +other:object == +other;case regexpTag:case stringTag: // Coerce regexes to strings and treat strings primitives and string
	// objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	return object == other + '';}return false;} /**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */function equalObjects(object,other,equalFunc,customizer,isLoose,stackA,stackB){var objProps=keys(object),objLength=objProps.length,othProps=keys(other),othLength=othProps.length;if(objLength != othLength && !isLoose){return false;}var index=objLength;while(index--) {var key=objProps[index];if(!(isLoose?key in other:hasOwnProperty.call(other,key))){return false;}}var skipCtor=isLoose;while(++index < objLength) {key = objProps[index];var objValue=object[key],othValue=other[key],result=customizer?customizer(isLoose?othValue:objValue,isLoose?objValue:othValue,key):undefined; // Recursively compare objects (susceptible to call stack limits).
	if(!(result === undefined?equalFunc(objValue,othValue,customizer,isLoose,stackA,stackB):result)){return false;}skipCtor || (skipCtor = key == 'constructor');}if(!skipCtor){var objCtor=object.constructor,othCtor=other.constructor; // Non `Object` object instances with different constructors are not equal.
	if(objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)){return false;}}return true;} /**
	     * Gets the appropriate "callback" function. If the `_.callback` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseCallback` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function} Returns the chosen function or its result.
	     */function getCallback(func,thisArg,argCount){var result=lodash.callback || callback;result = result === callback?baseCallback:result;return argCount?result(func,thisArg,argCount):result;} /**
	     * Gets metadata for `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {*} Returns the metadata for `func`.
	     */var getData=!metaMap?noop:function(func){return metaMap.get(func);}; /**
	     * Gets the name of `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {string} Returns the function name.
	     */function getFuncName(func){var result=func.name,array=realNames[result],length=array?array.length:0;while(length--) {var data=array[length],otherFunc=data.func;if(otherFunc == null || otherFunc == func){return data.name;}}return result;} /**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseIndexOf` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function|number} Returns the chosen function or its result.
	     */function getIndexOf(collection,target,fromIndex){var result=lodash.indexOf || indexOf;result = result === indexOf?baseIndexOf:result;return collection?result(collection,target,fromIndex):result;} /**
	     * Gets the "length" property value of `object`.
	     *
	     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	     * that affects Safari on at least iOS 8.1-8.3 ARM64.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {*} Returns the "length" value.
	     */var getLength=baseProperty('length'); /**
	     * Gets the propery names, values, and compare flags of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the match data of `object`.
	     */function getMatchData(object){var result=pairs(object),length=result.length;while(length--) {result[length][2] = isStrictComparable(result[length][1]);}return result;} /**
	     * Gets the native function at `key` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {string} key The key of the method to get.
	     * @returns {*} Returns the function if it's native, else `undefined`.
	     */function getNative(object,key){var value=object == null?undefined:object[key];return isNative(value)?value:undefined;} /**
	     * Gets the view, applying any `transforms` to the `start` and `end` positions.
	     *
	     * @private
	     * @param {number} start The start of the view.
	     * @param {number} end The end of the view.
	     * @param {Array} transforms The transformations to apply to the view.
	     * @returns {Object} Returns an object containing the `start` and `end`
	     *  positions of the view.
	     */function getView(start,end,transforms){var index=-1,length=transforms.length;while(++index < length) {var data=transforms[index],size=data.size;switch(data.type){case 'drop':start += size;break;case 'dropRight':end -= size;break;case 'take':end = nativeMin(end,start + size);break;case 'takeRight':start = nativeMax(start,end - size);break;}}return {'start':start,'end':end};} /**
	     * Initializes an array clone.
	     *
	     * @private
	     * @param {Array} array The array to clone.
	     * @returns {Array} Returns the initialized clone.
	     */function initCloneArray(array){var length=array.length,result=new array.constructor(length); // Add array properties assigned by `RegExp#exec`.
	if(length && typeof array[0] == 'string' && hasOwnProperty.call(array,'index')){result.index = array.index;result.input = array.input;}return result;} /**
	     * Initializes an object clone.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @returns {Object} Returns the initialized clone.
	     */function initCloneObject(object){var Ctor=object.constructor;if(!(typeof Ctor == 'function' && Ctor instanceof Ctor)){Ctor = Object;}return new Ctor();} /**
	     * Initializes an object clone based on its `toStringTag`.
	     *
	     * **Note:** This function only supports cloning values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @param {string} tag The `toStringTag` of the object to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the initialized clone.
	     */function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case arrayBufferTag:return bufferClone(object);case boolTag:case dateTag:return new Ctor(+object);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:var buffer=object.buffer;return new Ctor(isDeep?bufferClone(buffer):buffer,object.byteOffset,object.length);case numberTag:case stringTag:return new Ctor(object);case regexpTag:var result=new Ctor(object.source,reFlags.exec(object));result.lastIndex = object.lastIndex;}return result;} /**
	     * Invokes the method at `path` on `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {Array} args The arguments to invoke the method with.
	     * @returns {*} Returns the result of the invoked method.
	     */function invokePath(object,path,args){if(object != null && !isKey(path,object)){path = toPath(path);object = path.length == 1?object:baseGet(object,baseSlice(path,0,-1));path = last(path);}var func=object == null?object:object[path];return func == null?undefined:func.apply(object,args);} /**
	     * Checks if `value` is array-like.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	     */function isArrayLike(value){return value != null && isLength(getLength(value));} /**
	     * Checks if `value` is a valid array-like index.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	     */function isIndex(value,length){value = typeof value == 'number' || reIsUint.test(value)?+value:-1;length = length == null?MAX_SAFE_INTEGER:length;return value > -1 && value % 1 == 0 && value < length;} /**
	     * Checks if the provided arguments are from an iteratee call.
	     *
	     * @private
	     * @param {*} value The potential iteratee value argument.
	     * @param {*} index The potential iteratee index or key argument.
	     * @param {*} object The potential iteratee object argument.
	     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	     */function isIterateeCall(value,index,object){if(!isObject(object)){return false;}var type=typeof index;if(type == 'number'?isArrayLike(object) && isIndex(index,object.length):type == 'string' && index in object){var other=object[index];return value === value?value === other:other !== other;}return false;} /**
	     * Checks if `value` is a property name and not a property path.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	     */function isKey(value,object){var type=typeof value;if(type == 'string' && reIsPlainProp.test(value) || type == 'number'){return true;}if(isArray(value)){return false;}var result=!reIsDeepProp.test(value);return result || object != null && value in toObject(object);} /**
	     * Checks if `func` has a lazy counterpart.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	     */function isLaziable(func){var funcName=getFuncName(func);if(!(funcName in LazyWrapper.prototype)){return false;}var other=lodash[funcName];if(func === other){return true;}var data=getData(other);return !!data && func === data[0];} /**
	     * Checks if `value` is a valid array-like length.
	     *
	     * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	     */function isLength(value){return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;} /**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */function isStrictComparable(value){return value === value && !isObject(value);} /**
	     * Merges the function metadata of `source` into `data`.
	     *
	     * Merging metadata reduces the number of wrappers required to invoke a function.
	     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	     * augment function arguments, making the order in which they are executed important,
	     * preventing the merging of metadata. However, we make an exception for a safe
	     * common case where curried functions have `_.ary` and or `_.rearg` applied.
	     *
	     * @private
	     * @param {Array} data The destination metadata.
	     * @param {Array} source The source metadata.
	     * @returns {Array} Returns `data`.
	     */function mergeData(data,source){var bitmask=data[1],srcBitmask=source[1],newBitmask=bitmask | srcBitmask,isCommon=newBitmask < ARY_FLAG;var isCombo=srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG || srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8] || srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG; // Exit early if metadata can't be merged.
	if(!(isCommon || isCombo)){return data;} // Use source `thisArg` if available.
	if(srcBitmask & BIND_FLAG){data[2] = source[2]; // Set when currying a bound function.
	newBitmask |= bitmask & BIND_FLAG?0:CURRY_BOUND_FLAG;} // Compose partial arguments.
	var value=source[3];if(value){var partials=data[3];data[3] = partials?composeArgs(partials,value,source[4]):arrayCopy(value);data[4] = partials?replaceHolders(data[3],PLACEHOLDER):arrayCopy(source[4]);} // Compose partial right arguments.
	value = source[5];if(value){partials = data[5];data[5] = partials?composeArgsRight(partials,value,source[6]):arrayCopy(value);data[6] = partials?replaceHolders(data[5],PLACEHOLDER):arrayCopy(source[6]);} // Use source `argPos` if available.
	value = source[7];if(value){data[7] = arrayCopy(value);} // Use source `ary` if it's smaller.
	if(srcBitmask & ARY_FLAG){data[8] = data[8] == null?source[8]:nativeMin(data[8],source[8]);} // Use source `arity` if one is not provided.
	if(data[9] == null){data[9] = source[9];} // Use source `func` and merge bitmasks.
	data[0] = source[0];data[1] = newBitmask;return data;} /**
	     * Used by `_.defaultsDeep` to customize its `_.merge` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */function mergeDefaults(objectValue,sourceValue){return objectValue === undefined?sourceValue:merge(objectValue,sourceValue,mergeDefaults);} /**
	     * A specialized version of `_.pick` which picks `object` properties specified
	     * by `props`.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} props The property names to pick.
	     * @returns {Object} Returns the new object.
	     */function pickByArray(object,props){object = toObject(object);var index=-1,length=props.length,result={};while(++index < length) {var key=props[index];if(key in object){result[key] = object[key];}}return result;} /**
	     * A specialized version of `_.pick` which picks `object` properties `predicate`
	     * returns truthy for.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Object} Returns the new object.
	     */function pickByCallback(object,predicate){var result={};baseForIn(object,function(value,key,object){if(predicate(value,key,object)){result[key] = value;}});return result;} /**
	     * Reorder `array` according to the specified indexes where the element at
	     * the first index is assigned as the first element, the element at
	     * the second index is assigned as the second element, and so on.
	     *
	     * @private
	     * @param {Array} array The array to reorder.
	     * @param {Array} indexes The arranged array indexes.
	     * @returns {Array} Returns `array`.
	     */function reorder(array,indexes){var arrLength=array.length,length=nativeMin(indexes.length,arrLength),oldArray=arrayCopy(array);while(length--) {var index=indexes[length];array[length] = isIndex(index,arrLength)?oldArray[index]:undefined;}return array;} /**
	     * Sets metadata for `func`.
	     *
	     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	     * period of time, it will trip its breaker and transition to an identity function
	     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	     * for more details.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */var setData=(function(){var count=0,lastCalled=0;return function(key,value){var stamp=now(),remaining=HOT_SPAN - (stamp - lastCalled);lastCalled = stamp;if(remaining > 0){if(++count >= HOT_COUNT){return key;}}else {count = 0;}return baseSetData(key,value);};})(); /**
	     * A fallback implementation of `Object.keys` which creates an array of the
	     * own enumerable property names of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */function shimKeys(object){var props=keysIn(object),propsLength=props.length,length=propsLength && object.length;var allowIndexes=!!length && isLength(length) && (isArray(object) || isArguments(object));var index=-1,result=[];while(++index < propsLength) {var key=props[index];if(allowIndexes && isIndex(key,length) || hasOwnProperty.call(object,key)){result.push(key);}}return result;} /**
	     * Converts `value` to an array-like object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array|Object} Returns the array-like object.
	     */function toIterable(value){if(value == null){return [];}if(!isArrayLike(value)){return values(value);}return isObject(value)?value:Object(value);} /**
	     * Converts `value` to an object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Object} Returns the object.
	     */function toObject(value){return isObject(value)?value:Object(value);} /**
	     * Converts `value` to property path array if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array} Returns the property path array.
	     */function toPath(value){if(isArray(value)){return value;}var result=[];baseToString(value).replace(rePropName,function(match,number,quote,string){result.push(quote?string.replace(reEscapeChar,'$1'):number || match);});return result;} /**
	     * Creates a clone of `wrapper`.
	     *
	     * @private
	     * @param {Object} wrapper The wrapper to clone.
	     * @returns {Object} Returns the cloned wrapper.
	     */function wrapperClone(wrapper){return wrapper instanceof LazyWrapper?wrapper.clone():new LodashWrapper(wrapper.__wrapped__,wrapper.__chain__,arrayCopy(wrapper.__actions__));} /*------------------------------------------------------------------------*/ /**
	     * Creates an array of elements split into groups the length of `size`.
	     * If `collection` can't be split evenly, the final chunk will be the remaining
	     * elements.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to process.
	     * @param {number} [size=1] The length of each chunk.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new array containing chunks.
	     * @example
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 2);
	     * // => [['a', 'b'], ['c', 'd']]
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 3);
	     * // => [['a', 'b', 'c'], ['d']]
	     */function chunk(array,size,guard){if(guard?isIterateeCall(array,size,guard):size == null){size = 1;}else {size = nativeMax(nativeFloor(size) || 1,1);}var index=0,length=array?array.length:0,resIndex=-1,result=Array(nativeCeil(length / size));while(index < length) {result[++resIndex] = baseSlice(array,index,index += size);}return result;} /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */function compact(array){var index=-1,length=array?array.length:0,resIndex=-1,result=[];while(++index < length) {var value=array[index];if(value){result[++resIndex] = value;}}return result;} /**
	     * Creates an array of unique `array` values not included in the other
	     * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3], [4, 2]);
	     * // => [1, 3]
	     */var difference=restParam(function(array,values){return isObjectLike(array) && isArrayLike(array)?baseDifference(array,baseFlatten(values,false,true)):[];}); /**
	     * Creates a slice of `array` with `n` elements dropped from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.drop([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.drop([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.drop([1, 2, 3], 5);
	     * // => []
	     *
	     * _.drop([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */function drop(array,n,guard){var length=array?array.length:0;if(!length){return [];}if(guard?isIterateeCall(array,n,guard):n == null){n = 1;}return baseSlice(array,n < 0?0:n);} /**
	     * Creates a slice of `array` with `n` elements dropped from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRight([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.dropRight([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.dropRight([1, 2, 3], 5);
	     * // => []
	     *
	     * _.dropRight([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */function dropRight(array,n,guard){var length=array?array.length:0;if(!length){return [];}if(guard?isIterateeCall(array,n,guard):n == null){n = 1;}n = length - (+n || 0);return baseSlice(array,0,n < 0?0:n);} /**
	     * Creates a slice of `array` excluding elements dropped from the end.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that match the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRightWhile([1, 2, 3], function(n) {
	     *   return n > 1;
	     * });
	     * // => [1]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
	     * // => ['barney', 'fred']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */function dropRightWhile(array,predicate,thisArg){return array && array.length?baseWhile(array,getCallback(predicate,thisArg,3),true,true):[];} /**
	     * Creates a slice of `array` excluding elements dropped from the beginning.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropWhile([1, 2, 3], function(n) {
	     *   return n < 3;
	     * });
	     * // => [3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.dropWhile(users, 'active', false), 'user');
	     * // => ['pebbles']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.dropWhile(users, 'active'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */function dropWhile(array,predicate,thisArg){return array && array.length?baseWhile(array,getCallback(predicate,thisArg,3),true):[];} /**
	     * Fills elements of `array` with `value` from `start` up to, but not
	     * including, `end`.
	     *
	     * **Note:** This method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.fill(array, 'a');
	     * console.log(array);
	     * // => ['a', 'a', 'a']
	     *
	     * _.fill(Array(3), 2);
	     * // => [2, 2, 2]
	     *
	     * _.fill([4, 6, 8], '*', 1, 2);
	     * // => [4, '*', 8]
	     */function fill(array,value,start,end){var length=array?array.length:0;if(!length){return [];}if(start && typeof start != 'number' && isIterateeCall(array,value,start)){start = 0;end = length;}return baseFill(array,value,start,end);} /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.findIndex(users, function(chr) {
	     *   return chr.user == 'barney';
	     * });
	     * // => 0
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findIndex(users, { 'user': 'fred', 'active': false });
	     * // => 1
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findIndex(users, 'active', false);
	     * // => 0
	     *
	     * // using the `_.property` callback shorthand
	     * _.findIndex(users, 'active');
	     * // => 2
	     */var findIndex=createFindIndex(); /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of `collection` from right to left.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.findLastIndex(users, function(chr) {
	     *   return chr.user == 'pebbles';
	     * });
	     * // => 2
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	     * // => 0
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findLastIndex(users, 'active', false);
	     * // => 2
	     *
	     * // using the `_.property` callback shorthand
	     * _.findLastIndex(users, 'active');
	     * // => 0
	     */var findLastIndex=createFindIndex(true); /**
	     * Gets the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the first element of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([]);
	     * // => undefined
	     */function first(array){return array?array[0]:undefined;} /**
	     * Flattens a nested array. If `isDeep` is `true` the array is recursively
	     * flattened, otherwise it is only flattened a single level.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, [4]]
	     *
	     * // using `isDeep`
	     * _.flatten([1, [2, 3, [4]]], true);
	     * // => [1, 2, 3, 4]
	     */function flatten(array,isDeep,guard){var length=array?array.length:0;if(guard && isIterateeCall(array,isDeep,guard)){isDeep = false;}return length?baseFlatten(array,isDeep):[];} /**
	     * Recursively flattens a nested array.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to recursively flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flattenDeep([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, 4]
	     */function flattenDeep(array){var length=array?array.length:0;return length?baseFlatten(array,true):[];} /**
	     * Gets the index at which the first occurrence of `value` is found in `array`
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
	     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
	     * performs a faster binary search.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 1, 2], 2);
	     * // => 1
	     *
	     * // using `fromIndex`
	     * _.indexOf([1, 2, 1, 2], 2, 2);
	     * // => 3
	     *
	     * // performing a binary search
	     * _.indexOf([1, 1, 2, 2], 2, true);
	     * // => 2
	     */function indexOf(array,value,fromIndex){var length=array?array.length:0;if(!length){return -1;}if(typeof fromIndex == 'number'){fromIndex = fromIndex < 0?nativeMax(length + fromIndex,0):fromIndex;}else if(fromIndex){var index=binaryIndex(array,value);if(index < length && (value === value?value === array[index]:array[index] !== array[index])){return index;}return -1;}return baseIndexOf(array,value,fromIndex || 0);} /**
	     * Gets all but the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     */function initial(array){return dropRight(array,1);} /**
	     * Creates an array of unique values that are included in all of the provided
	     * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of shared values.
	     * @example
	     * _.intersection([1, 2], [4, 2], [2, 1]);
	     * // => [2]
	     */var intersection=restParam(function(arrays){var othLength=arrays.length,othIndex=othLength,caches=Array(length),indexOf=getIndexOf(),isCommon=indexOf == baseIndexOf,result=[];while(othIndex--) {var value=arrays[othIndex] = isArrayLike(value = arrays[othIndex])?value:[];caches[othIndex] = isCommon && value.length >= 120?createCache(othIndex && value):null;}var array=arrays[0],index=-1,length=array?array.length:0,seen=caches[0];outer: while(++index < length) {value = array[index];if((seen?cacheIndexOf(seen,value):indexOf(result,value,0)) < 0){var othIndex=othLength;while(--othIndex) {var cache=caches[othIndex];if((cache?cacheIndexOf(cache,value):indexOf(arrays[othIndex],value,0)) < 0){continue outer;}}if(seen){seen.push(value);}result.push(value);}}return result;}); /**
	     * Gets the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the last element of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     */function last(array){var length=array?array.length:0;return length?array[length - 1]:undefined;} /**
	     * This method is like `_.indexOf` except that it iterates over elements of
	     * `array` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
	     *  or `true` to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 1, 2], 2);
	     * // => 3
	     *
	     * // using `fromIndex`
	     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	     * // => 1
	     *
	     * // performing a binary search
	     * _.lastIndexOf([1, 1, 2, 2], 2, true);
	     * // => 3
	     */function lastIndexOf(array,value,fromIndex){var length=array?array.length:0;if(!length){return -1;}var index=length;if(typeof fromIndex == 'number'){index = (fromIndex < 0?nativeMax(length + fromIndex,0):nativeMin(fromIndex || 0,length - 1)) + 1;}else if(fromIndex){index = binaryIndex(array,value,true) - 1;var other=array[index];if(value === value?value === other:other !== other){return index;}return -1;}if(value !== value){return indexOfNaN(array,index,true);}while(index--) {if(array[index] === value){return index;}}return -1;} /**
	     * Removes all provided values from `array` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * **Note:** Unlike `_.without`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...*} [values] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     *
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */function pull(){var args=arguments,array=args[0];if(!(array && array.length)){return array;}var index=0,indexOf=getIndexOf(),length=args.length;while(++index < length) {var fromIndex=0,value=args[index];while((fromIndex = indexOf(array,value,fromIndex)) > -1) {splice.call(array,fromIndex,1);}}return array;} /**
	     * Removes elements from `array` corresponding to the given indexes and returns
	     * an array of the removed elements. Indexes may be specified as an array of
	     * indexes or as individual arguments.
	     *
	     * **Note:** Unlike `_.at`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [5, 10, 15, 20];
	     * var evens = _.pullAt(array, 1, 3);
	     *
	     * console.log(array);
	     * // => [5, 15]
	     *
	     * console.log(evens);
	     * // => [10, 20]
	     */var pullAt=restParam(function(array,indexes){indexes = baseFlatten(indexes);var result=baseAt(array,indexes);basePullAt(array,indexes.sort(baseCompareAscending));return result;}); /**
	     * Removes all elements from `array` that `predicate` returns truthy for
	     * and returns an array of the removed elements. The predicate is bound to
	     * `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * **Note:** Unlike `_.filter`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4];
	     * var evens = _.remove(array, function(n) {
	     *   return n % 2 == 0;
	     * });
	     *
	     * console.log(array);
	     * // => [1, 3]
	     *
	     * console.log(evens);
	     * // => [2, 4]
	     */function remove(array,predicate,thisArg){var result=[];if(!(array && array.length)){return result;}var index=-1,indexes=[],length=array.length;predicate = getCallback(predicate,thisArg,3);while(++index < length) {var value=array[index];if(predicate(value,index,array)){result.push(value);indexes.push(index);}}basePullAt(array,indexes);return result;} /**
	     * Gets all but the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias tail
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     */function rest(array){return drop(array,1);} /**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This method is used instead of `Array#slice` to support node
	     * lists in IE < 9 and to ensure dense arrays are returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */function slice(array,start,end){var length=array?array.length:0;if(!length){return [];}if(end && typeof end != 'number' && isIterateeCall(array,start,end)){start = 0;end = length;}return baseSlice(array,start,end);} /**
	     * Uses a binary search to determine the lowest index at which `value` should
	     * be inserted into `array` in order to maintain its sort order. If an iteratee
	     * function is provided it is invoked for `value` and each element of `array`
	     * to compute their sort ranking. The iteratee is bound to `thisArg` and
	     * invoked with one argument; (value).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([30, 50], 40);
	     * // => 1
	     *
	     * _.sortedIndex([4, 4, 5, 5], 5);
	     * // => 2
	     *
	     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
	     *
	     * // using an iteratee function
	     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
	     *   return this.data[word];
	     * }, dict);
	     * // => 1
	     *
	     * // using the `_.property` callback shorthand
	     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 1
	     */var sortedIndex=createSortedIndex(); /**
	     * This method is like `_.sortedIndex` except that it returns the highest
	     * index at which `value` should be inserted into `array` in order to
	     * maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedLastIndex([4, 4, 5, 5], 5);
	     * // => 4
	     */var sortedLastIndex=createSortedIndex(true); /**
	     * Creates a slice of `array` with `n` elements taken from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.take([1, 2, 3]);
	     * // => [1]
	     *
	     * _.take([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.take([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.take([1, 2, 3], 0);
	     * // => []
	     */function take(array,n,guard){var length=array?array.length:0;if(!length){return [];}if(guard?isIterateeCall(array,n,guard):n == null){n = 1;}return baseSlice(array,0,n < 0?0:n);} /**
	     * Creates a slice of `array` with `n` elements taken from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRight([1, 2, 3]);
	     * // => [3]
	     *
	     * _.takeRight([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.takeRight([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.takeRight([1, 2, 3], 0);
	     * // => []
	     */function takeRight(array,n,guard){var length=array?array.length:0;if(!length){return [];}if(guard?isIterateeCall(array,n,guard):n == null){n = 1;}n = length - (+n || 0);return baseSlice(array,n < 0?0:n);} /**
	     * Creates a slice of `array` with elements taken from the end. Elements are
	     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
	     * and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRightWhile([1, 2, 3], function(n) {
	     *   return n > 1;
	     * });
	     * // => [2, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
	     * // => ['pebbles']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
	     * // => []
	     */function takeRightWhile(array,predicate,thisArg){return array && array.length?baseWhile(array,getCallback(predicate,thisArg,3),false,true):[];} /**
	     * Creates a slice of `array` with elements taken from the beginning. Elements
	     * are taken until `predicate` returns falsey. The predicate is bound to
	     * `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeWhile([1, 2, 3], function(n) {
	     *   return n < 3;
	     * });
	     * // => [1, 2]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false},
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.takeWhile(users, 'active', false), 'user');
	     * // => ['barney', 'fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.takeWhile(users, 'active'), 'user');
	     * // => []
	     */function takeWhile(array,predicate,thisArg){return array && array.length?baseWhile(array,getCallback(predicate,thisArg,3)):[];} /**
	     * Creates an array of unique values, in order, from all of the provided arrays
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of combined values.
	     * @example
	     *
	     * _.union([1, 2], [4, 2], [2, 1]);
	     * // => [1, 2, 4]
	     */var union=restParam(function(arrays){return baseUniq(baseFlatten(arrays,false,true));}); /**
	     * Creates a duplicate-free version of an array, using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons, in which only the first occurence of each element
	     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
	     * for sorted arrays. If an iteratee function is provided it is invoked for
	     * each element in the array to generate the criterion by which uniqueness
	     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, array).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {boolean} [isSorted] Specify the array is sorted.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([2, 1, 2]);
	     * // => [2, 1]
	     *
	     * // using `isSorted`
	     * _.uniq([1, 1, 2], true);
	     * // => [1, 2]
	     *
	     * // using an iteratee function
	     * _.uniq([1, 2.5, 1.5, 2], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => [1, 2.5]
	     *
	     * // using the `_.property` callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */function uniq(array,isSorted,iteratee,thisArg){var length=array?array.length:0;if(!length){return [];}if(isSorted != null && typeof isSorted != 'boolean'){thisArg = iteratee;iteratee = isIterateeCall(array,isSorted,thisArg)?undefined:isSorted;isSorted = false;}var callback=getCallback();if(!(iteratee == null && callback === baseCallback)){iteratee = callback(iteratee,thisArg,3);}return isSorted && getIndexOf() == baseIndexOf?sortedUniq(array,iteratee):baseUniq(array,iteratee);} /**
	     * This method is like `_.zip` except that it accepts an array of grouped
	     * elements and creates an array regrouping the elements to their pre-zip
	     * configuration.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     *
	     * _.unzip(zipped);
	     * // => [['fred', 'barney'], [30, 40], [true, false]]
	     */function unzip(array){if(!(array && array.length)){return [];}var index=-1,length=0;array = arrayFilter(array,function(group){if(isArrayLike(group)){length = nativeMax(group.length,length);return true;}});var result=Array(length);while(++index < length) {result[index] = arrayMap(array,baseProperty(index));}return result;} /**
	     * This method is like `_.unzip` except that it accepts an iteratee to specify
	     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
	     * and invoked with four arguments: (accumulator, value, index, group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @param {Function} [iteratee] The function to combine regrouped values.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
	     * // => [[1, 10, 100], [2, 20, 200]]
	     *
	     * _.unzipWith(zipped, _.add);
	     * // => [3, 30, 300]
	     */function unzipWith(array,iteratee,thisArg){var length=array?array.length:0;if(!length){return [];}var result=unzip(array);if(iteratee == null){return result;}iteratee = bindCallback(iteratee,thisArg,4);return arrayMap(result,function(group){return arrayReduce(group,iteratee,undefined,true);});} /**
	     * Creates an array excluding all provided values using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to filter.
	     * @param {...*} [values] The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 3], 1, 2);
	     * // => [3]
	     */var without=restParam(function(array,values){return isArrayLike(array)?baseDifference(array,values):[];}); /**
	     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	     * of the provided arrays.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of values.
	     * @example
	     *
	     * _.xor([1, 2], [4, 2]);
	     * // => [1, 4]
	     */function xor(){var index=-1,length=arguments.length;while(++index < length) {var array=arguments[index];if(isArrayLike(array)){var result=result?arrayPush(baseDifference(result,array),baseDifference(array,result)):array;}}return result?baseUniq(result):[];} /**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second elements
	     * of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */var zip=restParam(unzip); /**
	     * The inverse of `_.pairs`; this method returns an object composed from arrays
	     * of property names and values. Provide either a single two dimensional array,
	     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
	     * and one of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Array
	     * @param {Array} props The property names.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObject([['fred', 30], ['barney', 40]]);
	     * // => { 'fred': 30, 'barney': 40 }
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */function zipObject(props,values){var index=-1,length=props?props.length:0,result={};if(length && !values && !isArray(props[0])){values = [];}while(++index < length) {var key=props[index];if(values){result[key] = values[index];}else if(key){result[key[0]] = key[1];}}return result;} /**
	     * This method is like `_.zip` except that it accepts an iteratee to specify
	     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
	     * and invoked with four arguments: (accumulator, value, index, group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @param {Function} [iteratee] The function to combine grouped values.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
	     * // => [111, 222]
	     */var zipWith=restParam(function(arrays){var length=arrays.length,iteratee=length > 2?arrays[length - 2]:undefined,thisArg=length > 1?arrays[length - 1]:undefined;if(length > 2 && typeof iteratee == 'function'){length -= 2;}else {iteratee = length > 1 && typeof thisArg == 'function'?(--length,thisArg):undefined;thisArg = undefined;}arrays.length = length;return unzipWith(arrays,iteratee,thisArg);}); /*------------------------------------------------------------------------*/ /**
	     * Creates a `lodash` object that wraps `value` with explicit method
	     * chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36 },
	     *   { 'user': 'fred',    'age': 40 },
	     *   { 'user': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(users)
	     *   .sortBy('age')
	     *   .map(function(chr) {
	     *     return chr.user + ' is ' + chr.age;
	     *   })
	     *   .first()
	     *   .value();
	     * // => 'pebbles is 1'
	     */function chain(value){var result=lodash(value);result.__chain__ = true;return result;} /**
	     * This method invokes `interceptor` and returns `value`. The interceptor is
	     * bound to `thisArg` and invoked with one argument; (value). The purpose of
	     * this method is to "tap into" a method chain in order to perform operations
	     * on intermediate results within the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .tap(function(array) {
	     *    array.pop();
	     *  })
	     *  .reverse()
	     *  .value();
	     * // => [2, 1]
	     */function tap(value,interceptor,thisArg){interceptor.call(thisArg,value);return value;} /**
	     * This method is like `_.tap` except that it returns the result of `interceptor`.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns the result of `interceptor`.
	     * @example
	     *
	     * _('  abc  ')
	     *  .chain()
	     *  .trim()
	     *  .thru(function(value) {
	     *    return [value];
	     *  })
	     *  .value();
	     * // => ['abc']
	     */function thru(value,interceptor,thisArg){return interceptor.call(thisArg,value);} /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(users).first();
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(users).chain()
	     *   .first()
	     *   .pick('user')
	     *   .value();
	     * // => { 'user': 'barney' }
	     */function wrapperChain(){return chain(this);} /**
	     * Executes the chained sequence and returns the wrapped result.
	     *
	     * @name commit
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).push(3);
	     *
	     * console.log(array);
	     * // => [1, 2]
	     *
	     * wrapped = wrapped.commit();
	     * console.log(array);
	     * // => [1, 2, 3]
	     *
	     * wrapped.last();
	     * // => 3
	     *
	     * console.log(array);
	     * // => [1, 2, 3]
	     */function wrapperCommit(){return new LodashWrapper(this.value(),this.__chain__);} /**
	     * Creates a new array joining a wrapped array with any additional arrays
	     * and/or values.
	     *
	     * @name concat
	     * @memberOf _
	     * @category Chain
	     * @param {...*} [values] The values to concatenate.
	     * @returns {Array} Returns the new concatenated array.
	     * @example
	     *
	     * var array = [1];
	     * var wrapped = _(array).concat(2, [3], [[4]]);
	     *
	     * console.log(wrapped.value());
	     * // => [1, 2, 3, [4]]
	     *
	     * console.log(array);
	     * // => [1]
	     */var wrapperConcat=restParam(function(values){values = baseFlatten(values);return this.thru(function(array){return arrayConcat(isArray(array)?array:[toObject(array)],values);});}); /**
	     * Creates a clone of the chained sequence planting `value` as the wrapped value.
	     *
	     * @name plant
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).map(function(value) {
	     *   return Math.pow(value, 2);
	     * });
	     *
	     * var other = [3, 4];
	     * var otherWrapped = wrapped.plant(other);
	     *
	     * otherWrapped.value();
	     * // => [9, 16]
	     *
	     * wrapped.value();
	     * // => [1, 4]
	     */function wrapperPlant(value){var result,parent=this;while(parent instanceof baseLodash) {var clone=wrapperClone(parent);if(result){previous.__wrapped__ = clone;}else {result = clone;}var previous=clone;parent = parent.__wrapped__;}previous.__wrapped__ = value;return result;} /**
	     * Reverses the wrapped array so the first element becomes the last, the
	     * second element becomes the second to last, and so on.
	     *
	     * **Note:** This method mutates the wrapped array.
	     *
	     * @name reverse
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _(array).reverse().value()
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */function wrapperReverse(){var value=this.__wrapped__;var interceptor=function interceptor(value){return wrapped && wrapped.__dir__ < 0?value:value.reverse();};if(value instanceof LazyWrapper){var wrapped=value;if(this.__actions__.length){wrapped = new LazyWrapper(this);}wrapped = wrapped.reverse();wrapped.__actions__.push({'func':thru,'args':[interceptor],'thisArg':undefined});return new LodashWrapper(wrapped,this.__chain__);}return this.thru(interceptor);} /**
	     * Produces the result of coercing the unwrapped value to a string.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chain
	     * @returns {string} Returns the coerced string value.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */function wrapperToString(){return this.value() + '';} /**
	     * Executes the chained sequence to extract the unwrapped value.
	     *
	     * @name value
	     * @memberOf _
	     * @alias run, toJSON, valueOf
	     * @category Chain
	     * @returns {*} Returns the resolved unwrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).value();
	     * // => [1, 2, 3]
	     */function wrapperValue(){return baseWrapperValue(this.__wrapped__,this.__actions__);} /*------------------------------------------------------------------------*/ /**
	     * Creates an array of elements corresponding to the given keys, or indexes,
	     * of `collection`. Keys may be specified as individual arguments or as arrays
	     * of keys.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [props] The property names
	     *  or indexes of elements to pick, specified individually or in arrays.
	     * @returns {Array} Returns the new array of picked elements.
	     * @example
	     *
	     * _.at(['a', 'b', 'c'], [0, 2]);
	     * // => ['a', 'c']
	     *
	     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
	     * // => ['barney', 'pebbles']
	     */var at=restParam(function(collection,props){return baseAt(collection,baseFlatten(props));}); /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the number of times the key was returned by `iteratee`.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) {
	     *   return Math.floor(n);
	     * });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */var countBy=createAggregator(function(result,value,key){hasOwnProperty.call(result,key)?++result[key]:result[key] = 1;}); /**
	     * Checks if `predicate` returns truthy for **all** elements of `collection`.
	     * The predicate is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes'], Boolean);
	     * // => false
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': false },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.every(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.every(users, 'active', false);
	     * // => true
	     *
	     * // using the `_.property` callback shorthand
	     * _.every(users, 'active');
	     * // => false
	     */function every(collection,predicate,thisArg){var func=isArray(collection)?arrayEvery:baseEvery;if(thisArg && isIterateeCall(collection,predicate,thisArg)){predicate = undefined;}if(typeof predicate != 'function' || thisArg !== undefined){predicate = getCallback(predicate,thisArg,3);}return func(collection,predicate);} /**
	     * Iterates over elements of `collection`, returning an array of all elements
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * _.filter([4, 5, 6], function(n) {
	     *   return n % 2 == 0;
	     * });
	     * // => [4, 6]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.filter(users, 'active', false), 'user');
	     * // => ['fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.filter(users, 'active'), 'user');
	     * // => ['barney']
	     */function filter(collection,predicate,thisArg){var func=isArray(collection)?arrayFilter:baseFilter;predicate = getCallback(predicate,thisArg,3);return func(collection,predicate);} /**
	     * Iterates over elements of `collection`, returning the first element
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': true },
	     *   { 'user': 'fred',    'age': 40, 'active': false },
	     *   { 'user': 'pebbles', 'age': 1,  'active': true }
	     * ];
	     *
	     * _.result(_.find(users, function(chr) {
	     *   return chr.age < 40;
	     * }), 'user');
	     * // => 'barney'
	     *
	     * // using the `_.matches` callback shorthand
	     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	     * // => 'pebbles'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.result(_.find(users, 'active', false), 'user');
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.result(_.find(users, 'active'), 'user');
	     * // => 'barney'
	     */var find=createFind(baseEach); /**
	     * This method is like `_.find` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 1;
	     * });
	     * // => 3
	     */var findLast=createFind(baseEachRight,true); /**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning the first element that has equivalent property
	     * values.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
	     * // => 'barney'
	     *
	     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
	     * // => 'fred'
	     */function findWhere(collection,source){return find(collection,baseMatches(source));} /**
	     * Iterates over elements of `collection` invoking `iteratee` for each element.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection). Iteratee functions may exit iteration early
	     * by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a "length" property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEach(function(n) {
	     *   console.log(n);
	     * }).value();
	     * // => logs each value from left to right and returns the array
	     *
	     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	     *   console.log(n, key);
	     * });
	     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	     */var forEach=createForEach(arrayEach,baseEach); /**
	     * This method is like `_.forEach` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEachRight(function(n) {
	     *   console.log(n);
	     * }).value();
	     * // => logs each value from right to left and returns the array
	     */var forEachRight=createForEach(arrayEachRight,baseEachRight); /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) {
	     *   return Math.floor(n);
	     * });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using the `_.property` callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */var groupBy=createAggregator(function(result,value,key){if(hasOwnProperty.call(result,key)){result[key].push(value);}else {result[key] = [value];}}); /**
	     * Checks if `value` is in `collection` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
	     * from the end of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @alias contains, include
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {*} target The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
	     * @example
	     *
	     * _.includes([1, 2, 3], 1);
	     * // => true
	     *
	     * _.includes([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.includes('pebbles', 'eb');
	     * // => true
	     */function includes(collection,target,fromIndex,guard){var length=collection?getLength(collection):0;if(!isLength(length)){collection = values(collection);length = collection.length;}if(typeof fromIndex != 'number' || guard && isIterateeCall(target,fromIndex,guard)){fromIndex = 0;}else {fromIndex = fromIndex < 0?nativeMax(length + fromIndex,0):fromIndex || 0;}return typeof collection == 'string' || !isArray(collection) && isString(collection)?fromIndex <= length && collection.indexOf(target,fromIndex) > -1:!!length && getIndexOf(collection,target,fromIndex) > -1;} /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the last element responsible for generating the key. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keyData = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keyData, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) {
	     *   return String.fromCharCode(object.code);
	     * });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) {
	     *   return this.fromCharCode(object.code);
	     * }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */var indexBy=createAggregator(function(result,value,key){result[key] = value;}); /**
	     * Invokes the method at `path` of each element in `collection`, returning
	     * an array of the results of each invoked method. Any additional arguments
	     * are provided to each invoked method. If `methodName` is a function it is
	     * invoked for, and `this` bound to, each element in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|string} path The path of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */var invoke=restParam(function(collection,path,args){var index=-1,isFunc=typeof path == 'function',isProp=isKey(path),result=isArrayLike(collection)?Array(collection.length):[];baseEach(collection,function(value){var func=isFunc?path:isProp && value != null?value[path]:undefined;result[++index] = func?func.apply(value,args):invokePath(value,path,args);});return result;}); /**
	     * Creates an array of values by running each element in `collection` through
	     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	     *
	     * The guarded methods are:
	     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
	     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
	     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
	     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
	     * `sum`, `uniq`, and `words`
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new mapped array.
	     * @example
	     *
	     * function timesThree(n) {
	     *   return n * 3;
	     * }
	     *
	     * _.map([1, 2], timesThree);
	     * // => [3, 6]
	     *
	     * _.map({ 'a': 1, 'b': 2 }, timesThree);
	     * // => [3, 6] (iteration order is not guaranteed)
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * // using the `_.property` callback shorthand
	     * _.map(users, 'user');
	     * // => ['barney', 'fred']
	     */function map(collection,iteratee,thisArg){var func=isArray(collection)?arrayMap:baseMap;iteratee = getCallback(iteratee,thisArg,3);return func(collection,iteratee);} /**
	     * Creates an array of elements split into two groups, the first of which
	     * contains elements `predicate` returns truthy for, while the second of which
	     * contains elements `predicate` returns falsey for. The predicate is bound
	     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the array of grouped elements.
	     * @example
	     *
	     * _.partition([1, 2, 3], function(n) {
	     *   return n % 2;
	     * });
	     * // => [[1, 3], [2]]
	     *
	     * _.partition([1.2, 2.3, 3.4], function(n) {
	     *   return this.floor(n) % 2;
	     * }, Math);
	     * // => [[1.2, 3.4], [2.3]]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': false },
	     *   { 'user': 'fred',    'age': 40, 'active': true },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * var mapper = function(array) {
	     *   return _.pluck(array, 'user');
	     * };
	     *
	     * // using the `_.matches` callback shorthand
	     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
	     * // => [['pebbles'], ['barney', 'fred']]
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.map(_.partition(users, 'active', false), mapper);
	     * // => [['barney', 'pebbles'], ['fred']]
	     *
	     * // using the `_.property` callback shorthand
	     * _.map(_.partition(users, 'active'), mapper);
	     * // => [['fred'], ['barney', 'pebbles']]
	     */var partition=createAggregator(function(result,value,key){result[key?0:1].push(value);},function(){return [[],[]];}); /**
	     * Gets the property value of `path` from all elements in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|string} path The path of the property to pluck.
	     * @returns {Array} Returns the property values.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(users, 'user');
	     * // => ['barney', 'fred']
	     *
	     * var userIndex = _.indexBy(users, 'user');
	     * _.pluck(userIndex, 'age');
	     * // => [36, 40] (iteration order is not guaranteed)
	     */function pluck(collection,path){return map(collection,property(path));} /**
	     * Reduces `collection` to a value which is the accumulated result of running
	     * each element in `collection` through `iteratee`, where each successive
	     * invocation is supplied the return value of the previous. If `accumulator`
	     * is not provided the first element of `collection` is used as the initial
	     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
	     * (accumulator, value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.reduce`, `_.reduceRight`, and `_.transform`.
	     *
	     * The guarded methods are:
	     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `sortByAll`,
	     * and `sortByOrder`
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.reduce([1, 2], function(total, n) {
	     *   return total + n;
	     * });
	     * // => 3
	     *
	     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
	     */var reduce=createReduce(arrayReduce,baseEach); /**
	     * This method is like `_.reduce` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var array = [[0, 1], [2, 3], [4, 5]];
	     *
	     * _.reduceRight(array, function(flattened, other) {
	     *   return flattened.concat(other);
	     * }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */var reduceRight=createReduce(arrayReduceRight,baseEachRight); /**
	     * The opposite of `_.filter`; this method returns the elements of `collection`
	     * that `predicate` does **not** return truthy for.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * _.reject([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 0;
	     * });
	     * // => [1, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.reject(users, 'active', false), 'user');
	     * // => ['fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.reject(users, 'active'), 'user');
	     * // => ['barney']
	     */function reject(collection,predicate,thisArg){var func=isArray(collection)?arrayFilter:baseFilter;predicate = getCallback(predicate,thisArg,3);return func(collection,function(value,index,collection){return !predicate(value,index,collection);});} /**
	     * Gets a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {*} Returns the random sample(s).
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */function sample(collection,n,guard){if(guard?isIterateeCall(collection,n,guard):n == null){collection = toIterable(collection);var length=collection.length;return length > 0?collection[baseRandom(0,length - 1)]:undefined;}var index=-1,result=toArray(collection),length=result.length,lastIndex=length - 1;n = nativeMin(n < 0?0:+n || 0,length);while(++index < n) {var rand=baseRandom(index,lastIndex),value=result[rand];result[rand] = result[index];result[index] = value;}result.length = n;return result;} /**
	     * Creates an array of shuffled values, using a version of the
	     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4]);
	     * // => [4, 1, 3, 2]
	     */function shuffle(collection){return sample(collection,POSITIVE_INFINITY);} /**
	     * Gets the size of `collection` by returning its length for array-like
	     * values or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns the size of `collection`.
	     * @example
	     *
	     * _.size([1, 2, 3]);
	     * // => 3
	     *
	     * _.size({ 'a': 1, 'b': 2 });
	     * // => 2
	     *
	     * _.size('pebbles');
	     * // => 7
	     */function size(collection){var length=collection?getLength(collection):0;return isLength(length)?length:keys(collection).length;} /**
	     * Checks if `predicate` returns truthy for **any** element of `collection`.
	     * The function returns as soon as it finds a passing value and does not iterate
	     * over the entire collection. The predicate is bound to `thisArg` and invoked
	     * with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': true },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.some(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.some(users, 'active', false);
	     * // => true
	     *
	     * // using the `_.property` callback shorthand
	     * _.some(users, 'active');
	     * // => true
	     */function some(collection,predicate,thisArg){var func=isArray(collection)?arraySome:baseSome;if(thisArg && isIterateeCall(collection,predicate,thisArg)){predicate = undefined;}if(typeof predicate != 'function' || thisArg !== undefined){predicate = getCallback(predicate,thisArg,3);}return func(collection,predicate);} /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through `iteratee`. This method performs
	     * a stable sort, that is, it preserves the original sort order of equal elements.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(n) {
	     *   return Math.sin(n);
	     * });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(n) {
	     *   return this.sin(n);
	     * }, Math);
	     * // => [3, 1, 2]
	     *
	     * var users = [
	     *   { 'user': 'fred' },
	     *   { 'user': 'pebbles' },
	     *   { 'user': 'barney' }
	     * ];
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.sortBy(users, 'user'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */function sortBy(collection,iteratee,thisArg){if(collection == null){return [];}if(thisArg && isIterateeCall(collection,iteratee,thisArg)){iteratee = undefined;}var index=-1;iteratee = getCallback(iteratee,thisArg,3);var result=baseMap(collection,function(value,key,collection){return {'criteria':iteratee(value,key,collection),'index':++index,'value':value};});return baseSortBy(result,compareAscending);} /**
	     * This method is like `_.sortBy` except that it can sort by multiple iteratees
	     * or property names.
	     *
	     * If a property name is provided for an iteratee the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If an object is provided for an iteratee the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
	     *  The iteratees to sort by, specified as individual values or arrays of values.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 34 }
	     * ];
	     *
	     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
	     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
	     *
	     * _.map(_.sortByAll(users, 'user', function(chr) {
	     *   return Math.floor(chr.age / 10);
	     * }), _.values);
	     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */var sortByAll=restParam(function(collection,iteratees){if(collection == null){return [];}var guard=iteratees[2];if(guard && isIterateeCall(iteratees[0],iteratees[1],guard)){iteratees.length = 1;}return baseSortByOrder(collection,baseFlatten(iteratees),[]);}); /**
	     * This method is like `_.sortByAll` except that it allows specifying the
	     * sort orders of the iteratees to sort by. If `orders` is unspecified, all
	     * values are sorted in ascending order. Otherwise, a value is sorted in
	     * ascending order if its corresponding order is "asc", and descending if "desc".
	     *
	     * If a property name is provided for an iteratee the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If an object is provided for an iteratee the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {boolean[]} [orders] The sort orders of `iteratees`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 34 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 36 }
	     * ];
	     *
	     * // sort by `user` in ascending order and by `age` in descending order
	     * _.map(_.sortByOrder(users, ['user', 'age'], ['asc', 'desc']), _.values);
	     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */function sortByOrder(collection,iteratees,orders,guard){if(collection == null){return [];}if(guard && isIterateeCall(iteratees,orders,guard)){orders = undefined;}if(!isArray(iteratees)){iteratees = iteratees == null?[]:[iteratees];}if(!isArray(orders)){orders = orders == null?[]:[orders];}return baseSortByOrder(collection,iteratees,orders);} /**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
	     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
	     * // => ['barney']
	     *
	     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
	     * // => ['fred']
	     */function where(collection,source){return filter(collection,baseMatches(source));} /*------------------------------------------------------------------------*/ /**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Date
	     * @example
	     *
	     * _.defer(function(stamp) {
	     *   console.log(_.now() - stamp);
	     * }, _.now());
	     * // => logs the number of milliseconds it took for the deferred function to be invoked
	     */var now=nativeNow || function(){return new Date().getTime();}; /*------------------------------------------------------------------------*/ /**
	     * The opposite of `_.before`; this method creates a function that invokes
	     * `func` once it is called `n` or more times.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls before `func` is invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'done saving!' after the two async saves have completed
	     */function after(n,func){if(typeof func != 'function'){if(typeof n == 'function'){var temp=n;n = func;func = temp;}else {throw new TypeError(FUNC_ERROR_TEXT);}}n = nativeIsFinite(n = +n)?n:0;return function(){if(--n < 1){return func.apply(this,arguments);}};} /**
	     * Creates a function that accepts up to `n` arguments ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @param {number} [n=func.length] The arity cap.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	     * // => [6, 8, 10]
	     */function ary(func,n,guard){if(guard && isIterateeCall(func,n,guard)){n = undefined;}n = func && n == null?func.length:nativeMax(+n || 0,0);return createWrapper(func,ARY_FLAG,undefined,undefined,undefined,undefined,n);} /**
	     * Creates a function that invokes `func`, with the `this` binding and arguments
	     * of the created function, while it is called less than `n` times. Subsequent
	     * calls to the created function return the result of the last `func` invocation.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls at which `func` is no longer invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * jQuery('#add').on('click', _.before(5, addContactToList));
	     * // => allows adding up to 4 contacts to the list
	     */function before(n,func){var result;if(typeof func != 'function'){if(typeof n == 'function'){var temp=n;n = func;func = temp;}else {throw new TypeError(FUNC_ERROR_TEXT);}}return function(){if(--n > 0){result = func.apply(this,arguments);}if(n <= 1){func = undefined;}return result;};} /**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and prepends any additional `_.bind` arguments to those provided to the
	     * bound function.
	     *
	     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** Unlike native `Function#bind` this method does not set the "length"
	     * property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var greet = function(greeting, punctuation) {
	     *   return greeting + ' ' + this.user + punctuation;
	     * };
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * var bound = _.bind(greet, object, 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * // using placeholders
	     * var bound = _.bind(greet, object, _, '!');
	     * bound('hi');
	     * // => 'hi fred!'
	     */var bind=restParam(function(func,thisArg,partials){var bitmask=BIND_FLAG;if(partials.length){var holders=replaceHolders(partials,bind.placeholder);bitmask |= PARTIAL_FLAG;}return createWrapper(func,bitmask,thisArg,partials,holders);}); /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all enumerable function
	     * properties, own and inherited, of `object` are bound.
	     *
	     * **Note:** This method does not set the "length" property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...(string|string[])} [methodNames] The object method names to bind,
	     *  specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() {
	     *     console.log('clicked ' + this.label);
	     *   }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs' when the element is clicked
	     */var bindAll=restParam(function(object,methodNames){methodNames = methodNames.length?baseFlatten(methodNames):functions(object);var index=-1,length=methodNames.length;while(++index < length) {var key=methodNames[index];object[key] = createWrapper(object[key],BIND_FLAG,object);}return object;}); /**
	     * Creates a function that invokes the method at `object[key]` and prepends
	     * any additional `_.bindKey` arguments to those provided to the bound function.
	     *
	     * This method differs from `_.bind` by allowing bound functions to reference
	     * methods that may be redefined or don't yet exist.
	     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
	     * for more details.
	     *
	     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'user': 'fred',
	     *   'greet': function(greeting, punctuation) {
	     *     return greeting + ' ' + this.user + punctuation;
	     *   }
	     * };
	     *
	     * var bound = _.bindKey(object, 'greet', 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * object.greet = function(greeting, punctuation) {
	     *   return greeting + 'ya ' + this.user + punctuation;
	     * };
	     *
	     * bound('!');
	     * // => 'hiya fred!'
	     *
	     * // using placeholders
	     * var bound = _.bindKey(object, 'greet', _, '!');
	     * bound('hi');
	     * // => 'hiya fred!'
	     */var bindKey=restParam(function(object,key,partials){var bitmask=BIND_FLAG | BIND_KEY_FLAG;if(partials.length){var holders=replaceHolders(partials,bindKey.placeholder);bitmask |= PARTIAL_FLAG;}return createWrapper(key,bitmask,object,partials,holders);}); /**
	     * Creates a function that accepts one or more arguments of `func` that when
	     * called either invokes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` may be specified
	     * if `func.length` is not sufficient.
	     *
	     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curry(abc);
	     *
	     * curried(1)(2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(1)(_, 3)(2);
	     * // => [1, 2, 3]
	     */var curry=createCurry(CURRY_FLAG); /**
	     * This method is like `_.curry` except that arguments are applied to `func`
	     * in the manner of `_.partialRight` instead of `_.partial`.
	     *
	     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curryRight(abc);
	     *
	     * curried(3)(2)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(2, 3)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(3)(1, _)(2);
	     * // => [1, 2, 3]
	     */var curryRight=createCurry(CURRY_RIGHT_FLAG); /**
	     * Creates a debounced function that delays invoking `func` until after `wait`
	     * milliseconds have elapsed since the last time the debounced function was
	     * invoked. The debounced function comes with a `cancel` method to cancel
	     * delayed invocations. Provide an options object to indicate that `func`
	     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	     * Subsequent calls to the debounced function return the result of the last
	     * `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.debounce` and `_.throttle`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to debounce.
	     * @param {number} [wait=0] The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	     *  delayed before it is invoked.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	     *
	     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * }));
	     *
	     * // ensure `batchLog` is invoked once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * jQuery(source).on('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }));
	     *
	     * // cancel a debounced call
	     * var todoChanges = _.debounce(batchLog, 1000);
	     * Object.observe(models.todo, todoChanges);
	     *
	     * Object.observe(models, function(changes) {
	     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	     *     todoChanges.cancel();
	     *   }
	     * }, ['delete']);
	     *
	     * // ...at some point `models.todo` is changed
	     * models.todo.completed = true;
	     *
	     * // ...before 1 second has passed `models.todo` is deleted
	     * // which cancels the debounced `todoChanges` call
	     * delete models.todo;
	     */function debounce(func,wait,options){var args,maxTimeoutId,result,stamp,thisArg,timeoutId,trailingCall,lastCalled=0,maxWait=false,trailing=true;if(typeof func != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}wait = wait < 0?0:+wait || 0;if(options === true){var leading=true;trailing = false;}else if(isObject(options)){leading = !!options.leading;maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0,wait);trailing = 'trailing' in options?!!options.trailing:trailing;}function cancel(){if(timeoutId){clearTimeout(timeoutId);}if(maxTimeoutId){clearTimeout(maxTimeoutId);}lastCalled = 0;maxTimeoutId = timeoutId = trailingCall = undefined;}function complete(isCalled,id){if(id){clearTimeout(id);}maxTimeoutId = timeoutId = trailingCall = undefined;if(isCalled){lastCalled = now();result = func.apply(thisArg,args);if(!timeoutId && !maxTimeoutId){args = thisArg = undefined;}}}function delayed(){var remaining=wait - (now() - stamp);if(remaining <= 0 || remaining > wait){complete(trailingCall,maxTimeoutId);}else {timeoutId = setTimeout(delayed,remaining);}}function maxDelayed(){complete(trailing,timeoutId);}function debounced(){args = arguments;stamp = now();thisArg = this;trailingCall = trailing && (timeoutId || !leading);if(maxWait === false){var leadingCall=leading && !timeoutId;}else {if(!maxTimeoutId && !leading){lastCalled = stamp;}var remaining=maxWait - (stamp - lastCalled),isCalled=remaining <= 0 || remaining > maxWait;if(isCalled){if(maxTimeoutId){maxTimeoutId = clearTimeout(maxTimeoutId);}lastCalled = stamp;result = func.apply(thisArg,args);}else if(!maxTimeoutId){maxTimeoutId = setTimeout(maxDelayed,remaining);}}if(isCalled && timeoutId){timeoutId = clearTimeout(timeoutId);}else if(!timeoutId && wait !== maxWait){timeoutId = setTimeout(delayed,wait);}if(leadingCall){isCalled = true;result = func.apply(thisArg,args);}if(isCalled && !timeoutId && !maxTimeoutId){args = thisArg = undefined;}return result;}debounced.cancel = cancel;return debounced;} /**
	     * Defers invoking the `func` until the current call stack has cleared. Any
	     * additional arguments are provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to defer.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) {
	     *   console.log(text);
	     * }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */var defer=restParam(function(func,args){return baseDelay(func,1,args);}); /**
	     * Invokes `func` after `wait` milliseconds. Any additional arguments are
	     * provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) {
	     *   console.log(text);
	     * }, 1000, 'later');
	     * // => logs 'later' after one second
	     */var delay=restParam(function(func,wait,args){return baseDelay(func,wait,args);}); /**
	     * Creates a function that returns the result of invoking the provided
	     * functions with the `this` binding of the created function, where each
	     * successive invocation is supplied the return value of the previous.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flow(_.add, square);
	     * addSquare(1, 2);
	     * // => 9
	     */var flow=createFlow(); /**
	     * This method is like `_.flow` except that it creates a function that
	     * invokes the provided functions from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias backflow, compose
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flowRight(square, _.add);
	     * addSquare(1, 2);
	     * // => 9
	     */var flowRight=createFlow(true); /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is coerced to a string and used as the
	     * cache key. The `func` is invoked with the `this` binding of the memoized
	     * function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	     * method interface of `get`, `has`, and `set`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var upperCase = _.memoize(function(string) {
	     *   return string.toUpperCase();
	     * });
	     *
	     * upperCase('fred');
	     * // => 'FRED'
	     *
	     * // modifying the result cache
	     * upperCase.cache.set('fred', 'BARNEY');
	     * upperCase('fred');
	     * // => 'BARNEY'
	     *
	     * // replacing `_.memoize.Cache`
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'barney' };
	     * var identity = _.memoize(_.identity);
	     *
	     * identity(object);
	     * // => { 'user': 'fred' }
	     * identity(other);
	     * // => { 'user': 'fred' }
	     *
	     * _.memoize.Cache = WeakMap;
	     * var identity = _.memoize(_.identity);
	     *
	     * identity(object);
	     * // => { 'user': 'fred' }
	     * identity(other);
	     * // => { 'user': 'barney' }
	     */function memoize(func,resolver){if(typeof func != 'function' || resolver && typeof resolver != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}var memoized=function memoized(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key)){return cache.get(key);}var result=func.apply(this,args);memoized.cache = cache.set(key,result);return result;};memoized.cache = new memoize.Cache();return memoized;} /**
	     * Creates a function that runs each argument through a corresponding
	     * transform function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to wrap.
	     * @param {...(Function|Function[])} [transforms] The functions to transform
	     * arguments, specified as individual functions or arrays of functions.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function doubled(n) {
	     *   return n * 2;
	     * }
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var modded = _.modArgs(function(x, y) {
	     *   return [x, y];
	     * }, square, doubled);
	     *
	     * modded(1, 2);
	     * // => [1, 4]
	     *
	     * modded(5, 10);
	     * // => [25, 20]
	     */var modArgs=restParam(function(func,transforms){transforms = baseFlatten(transforms);if(typeof func != 'function' || !arrayEvery(transforms,baseIsFunction)){throw new TypeError(FUNC_ERROR_TEXT);}var length=transforms.length;return restParam(function(args){var index=nativeMin(args.length,length);while(index--) {args[index] = transforms[index](args[index]);}return func.apply(this,args);});}); /**
	     * Creates a function that negates the result of the predicate `func`. The
	     * `func` predicate is invoked with the `this` binding and arguments of the
	     * created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} predicate The predicate to negate.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function isEven(n) {
	     *   return n % 2 == 0;
	     * }
	     *
	     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	     * // => [1, 3, 5]
	     */function negate(predicate){if(typeof predicate != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}return function(){return !predicate.apply(this,arguments);};} /**
	     * Creates a function that is restricted to invoking `func` once. Repeat calls
	     * to the function return the value of the first call. The `func` is invoked
	     * with the `this` binding and arguments of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` invokes `createApplication` once
	     */function once(func){return before(2,func);} /**
	     * Creates a function that invokes `func` with `partial` arguments prepended
	     * to those provided to the new function. This method is like `_.bind` except
	     * it does **not** alter the `this` binding.
	     *
	     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var sayHelloTo = _.partial(greet, 'hello');
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     *
	     * // using placeholders
	     * var greetFred = _.partial(greet, _, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     */var partial=createPartial(PARTIAL_FLAG); /**
	     * This method is like `_.partial` except that partially applied arguments
	     * are appended to those provided to the new function.
	     *
	     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var greetFred = _.partialRight(greet, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     *
	     * // using placeholders
	     * var sayHelloTo = _.partialRight(greet, 'hello', _);
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     */var partialRight=createPartial(PARTIAL_RIGHT_FLAG); /**
	     * Creates a function that invokes `func` with arguments arranged according
	     * to the specified indexes where the argument value at the first index is
	     * provided as the first argument, the argument value at the second index is
	     * provided as the second argument, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to rearrange arguments for.
	     * @param {...(number|number[])} indexes The arranged argument indexes,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var rearged = _.rearg(function(a, b, c) {
	     *   return [a, b, c];
	     * }, 2, 0, 1);
	     *
	     * rearged('b', 'c', 'a')
	     * // => ['a', 'b', 'c']
	     *
	     * var map = _.rearg(_.map, [1, 0]);
	     * map(function(n) {
	     *   return n * 3;
	     * }, [1, 2, 3]);
	     * // => [3, 6, 9]
	     */var rearg=restParam(function(func,indexes){return createWrapper(func,REARG_FLAG,undefined,undefined,undefined,baseFlatten(indexes));}); /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * created function and arguments from `start` and beyond provided as an array.
	     *
	     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.restParam(function(what, names) {
	     *   return what + ' ' + _.initial(names).join(', ') +
	     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	     * });
	     *
	     * say('hello', 'fred', 'barney', 'pebbles');
	     * // => 'hello fred, barney, & pebbles'
	     */function restParam(func,start){if(typeof func != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}start = nativeMax(start === undefined?func.length - 1:+start || 0,0);return function(){var args=arguments,index=-1,length=nativeMax(args.length - start,0),rest=Array(length);while(++index < length) {rest[index] = args[start + index];}switch(start){case 0:return func.call(this,rest);case 1:return func.call(this,args[0],rest);case 2:return func.call(this,args[0],args[1],rest);}var otherArgs=Array(start + 1);index = -1;while(++index < start) {otherArgs[index] = args[index];}otherArgs[start] = rest;return func.apply(this,otherArgs);};} /**
	     * Creates a function that invokes `func` with the `this` binding of the created
	     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
	     *
	     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to spread arguments over.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.spread(function(who, what) {
	     *   return who + ' says ' + what;
	     * });
	     *
	     * say(['fred', 'hello']);
	     * // => 'fred says hello'
	     *
	     * // with a Promise
	     * var numbers = Promise.all([
	     *   Promise.resolve(40),
	     *   Promise.resolve(36)
	     * ]);
	     *
	     * numbers.then(_.spread(function(x, y) {
	     *   return x + y;
	     * }));
	     * // => a Promise of 76
	     */function spread(func){if(typeof func != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}return function(array){return func.apply(this,array);};} /**
	     * Creates a throttled function that only invokes `func` at most once per
	     * every `wait` milliseconds. The throttled function comes with a `cancel`
	     * method to cancel delayed invocations. Provide an options object to indicate
	     * that `func` should be invoked on the leading and/or trailing edge of the
	     * `wait` timeout. Subsequent calls to the throttled function return the
	     * result of the last `func` call.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.throttle` and `_.debounce`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to throttle.
	     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	     *
	     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	     *   'trailing': false
	     * }));
	     *
	     * // cancel a trailing throttled call
	     * jQuery(window).on('popstate', throttled.cancel);
	     */function throttle(func,wait,options){var leading=true,trailing=true;if(typeof func != 'function'){throw new TypeError(FUNC_ERROR_TEXT);}if(options === false){leading = false;}else if(isObject(options)){leading = 'leading' in options?!!options.leading:leading;trailing = 'trailing' in options?!!options.trailing:trailing;}return debounce(func,wait,{'leading':leading,'maxWait':+wait,'trailing':trailing});} /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Any additional arguments provided to the function are
	     * appended to those provided to the wrapper function. The wrapper is invoked
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('fred, barney, & pebbles');
	     * // => '<p>fred, barney, &amp; pebbles</p>'
	     */function wrap(value,wrapper){wrapper = wrapper == null?identity:wrapper;return createWrapper(wrapper,PARTIAL_FLAG,undefined,[value],[]);} /*------------------------------------------------------------------------*/ /**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
	     * otherwise they are assigned by reference. If `customizer` is provided it is
	     * invoked to produce the cloned values. If `customizer` returns `undefined`
	     * cloning is handled by the method instead. The `customizer` is bound to
	     * `thisArg` and invoked with two argument; (value [, index|key, object]).
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var shallow = _.clone(users);
	     * shallow[0] === users[0];
	     * // => true
	     *
	     * var deep = _.clone(users, true);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * // using a customizer callback
	     * var el = _.clone(document.body, function(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(false);
	     *   }
	     * });
	     *
	     * el === document.body
	     * // => false
	     * el.nodeName
	     * // => BODY
	     * el.childNodes.length;
	     * // => 0
	     */function clone(value,isDeep,customizer,thisArg){if(isDeep && typeof isDeep != 'boolean' && isIterateeCall(value,isDeep,customizer)){isDeep = false;}else if(typeof isDeep == 'function'){thisArg = customizer;customizer = isDeep;isDeep = false;}return typeof customizer == 'function'?baseClone(value,isDeep,bindCallback(customizer,thisArg,1)):baseClone(value,isDeep);} /**
	     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
	     * to produce the cloned values. If `customizer` returns `undefined` cloning
	     * is handled by the method instead. The `customizer` is bound to `thisArg`
	     * and invoked with two argument; (value [, index|key, object]).
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var deep = _.cloneDeep(users);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * // using a customizer callback
	     * var el = _.cloneDeep(document.body, function(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(true);
	     *   }
	     * });
	     *
	     * el === document.body
	     * // => false
	     * el.nodeName
	     * // => BODY
	     * el.childNodes.length;
	     * // => 20
	     */function cloneDeep(value,customizer,thisArg){return typeof customizer == 'function'?baseClone(value,true,bindCallback(customizer,thisArg,1)):baseClone(value,true);} /**
	     * Checks if `value` is greater than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
	     * @example
	     *
	     * _.gt(3, 1);
	     * // => true
	     *
	     * _.gt(3, 3);
	     * // => false
	     *
	     * _.gt(1, 3);
	     * // => false
	     */function gt(value,other){return value > other;} /**
	     * Checks if `value` is greater than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.gte(3, 1);
	     * // => true
	     *
	     * _.gte(3, 3);
	     * // => true
	     *
	     * _.gte(1, 3);
	     * // => false
	     */function gte(value,other){return value >= other;} /**
	     * Checks if `value` is classified as an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArguments(function() { return arguments; }());
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */function isArguments(value){return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value,'callee') && !propertyIsEnumerable.call(value,'callee');} /**
	     * Checks if `value` is classified as an `Array` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     *
	     * _.isArray(function() { return arguments; }());
	     * // => false
	     */var isArray=nativeIsArray || function(value){return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;}; /**
	     * Checks if `value` is classified as a boolean primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isBoolean(false);
	     * // => true
	     *
	     * _.isBoolean(null);
	     * // => false
	     */function isBoolean(value){return value === true || value === false || isObjectLike(value) && objToString.call(value) == boolTag;} /**
	     * Checks if `value` is classified as a `Date` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     *
	     * _.isDate('Mon April 23 2012');
	     * // => false
	     */function isDate(value){return isObjectLike(value) && objToString.call(value) == dateTag;} /**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     *
	     * _.isElement('<body>');
	     * // => false
	     */function isElement(value){return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);} /**
	     * Checks if `value` is empty. A value is considered empty unless it is an
	     * `arguments` object, array, string, or jQuery-like collection with a length
	     * greater than `0` or an object with own enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty(null);
	     * // => true
	     *
	     * _.isEmpty(true);
	     * // => true
	     *
	     * _.isEmpty(1);
	     * // => true
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({ 'a': 1 });
	     * // => false
	     */function isEmpty(value){if(value == null){return true;}if(isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) || isObjectLike(value) && isFunction(value.splice))){return !value.length;}return !keys(value).length;} /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent. If `customizer` is provided it is invoked to compare values.
	     * If `customizer` returns `undefined` comparisons are handled by the method
	     * instead. The `customizer` is bound to `thisArg` and invoked with three
	     * arguments: (value, other [, index|key]).
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. Functions and DOM nodes
	     * are **not** supported. Provide a customizer function to extend support
	     * for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @alias eq
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize value comparisons.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'fred' };
	     *
	     * object == other;
	     * // => false
	     *
	     * _.isEqual(object, other);
	     * // => true
	     *
	     * // using a customizer callback
	     * var array = ['hello', 'goodbye'];
	     * var other = ['hi', 'goodbye'];
	     *
	     * _.isEqual(array, other, function(value, other) {
	     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
	     *     return true;
	     *   }
	     * });
	     * // => true
	     */function isEqual(value,other,customizer,thisArg){customizer = typeof customizer == 'function'?bindCallback(customizer,thisArg,3):undefined;var result=customizer?customizer(value,other):undefined;return result === undefined?baseIsEqual(value,other,customizer):!!result;} /**
	     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	     * `SyntaxError`, `TypeError`, or `URIError` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	     * @example
	     *
	     * _.isError(new Error);
	     * // => true
	     *
	     * _.isError(Error);
	     * // => false
	     */function isError(value){return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;} /**
	     * Checks if `value` is a finite primitive number.
	     *
	     * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	     * @example
	     *
	     * _.isFinite(10);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => false
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite(Object(10));
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */function isFinite(value){return typeof value == 'number' && nativeIsFinite(value);} /**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */function isFunction(value){ // The use of `Object#toString` avoids issues with the `typeof` operator
	// in older versions of Chrome and Safari which return 'function' for regexes
	// and Safari 8 equivalents which return 'object' for typed array constructors.
	return isObject(value) && objToString.call(value) == funcTag;} /**
	     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */function isObject(value){ // Avoid a V8 JIT bug in Chrome 19-20.
	// See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	var type=typeof value;return !!value && (type == 'object' || type == 'function');} /**
	     * Performs a deep comparison between `object` and `source` to determine if
	     * `object` contains equivalent property values. If `customizer` is provided
	     * it is invoked to compare values. If `customizer` returns `undefined`
	     * comparisons are handled by the method instead. The `customizer` is bound
	     * to `thisArg` and invoked with three arguments: (value, other, index|key).
	     *
	     * **Note:** This method supports comparing properties of arrays, booleans,
	     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
	     * and DOM nodes are **not** supported. Provide a customizer function to extend
	     * support for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Function} [customizer] The function to customize value comparisons.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.isMatch(object, { 'age': 40 });
	     * // => true
	     *
	     * _.isMatch(object, { 'age': 36 });
	     * // => false
	     *
	     * // using a customizer callback
	     * var object = { 'greeting': 'hello' };
	     * var source = { 'greeting': 'hi' };
	     *
	     * _.isMatch(object, source, function(value, other) {
	     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
	     * });
	     * // => true
	     */function isMatch(object,source,customizer,thisArg){customizer = typeof customizer == 'function'?bindCallback(customizer,thisArg,3):undefined;return baseIsMatch(object,getMatchData(source),customizer);} /**
	     * Checks if `value` is `NaN`.
	     *
	     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
	     * which returns `true` for `undefined` and other non-numeric values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */function isNaN(value){ // An `NaN` primitive is the only value that is not equal to itself.
	// Perform the `toStringTag` check first to avoid errors with some host objects in IE.
	return isNumber(value) && value != +value;} /**
	     * Checks if `value` is a native function.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */function isNative(value){if(value == null){return false;}if(isFunction(value)){return reIsNative.test(fnToString.call(value));}return isObjectLike(value) && reIsHostCtor.test(value);} /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(void 0);
	     * // => false
	     */function isNull(value){return value === null;} /**
	     * Checks if `value` is classified as a `Number` primitive or object.
	     *
	     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	     * as numbers, use the `_.isFinite` method.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4);
	     * // => true
	     *
	     * _.isNumber(NaN);
	     * // => true
	     *
	     * _.isNumber('8.4');
	     * // => false
	     */function isNumber(value){return typeof value == 'number' || isObjectLike(value) && objToString.call(value) == numberTag;} /**
	     * Checks if `value` is a plain object, that is, an object created by the
	     * `Object` constructor or one with a `[[Prototype]]` of `null`.
	     *
	     * **Note:** This method assumes objects created by the `Object` constructor
	     * have no inherited enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * _.isPlainObject(new Foo);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     *
	     * _.isPlainObject(Object.create(null));
	     * // => true
	     */function isPlainObject(value){var Ctor; // Exit early for non `Object` objects.
	if(!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) || !hasOwnProperty.call(value,'constructor') && (Ctor = value.constructor,typeof Ctor == 'function' && !(Ctor instanceof Ctor))){return false;} // IE < 9 iterates inherited properties before own properties. If the first
	// iterated property is an object's own property then there are no inherited
	// enumerable properties.
	var result; // In most environments an object's own properties are iterated before
	// its inherited properties. If the last iterated property is an object's
	// own property then there are no inherited enumerable properties.
	baseForIn(value,function(subValue,key){result = key;});return result === undefined || hasOwnProperty.call(value,result);} /**
	     * Checks if `value` is classified as a `RegExp` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isRegExp(/abc/);
	     * // => true
	     *
	     * _.isRegExp('/abc/');
	     * // => false
	     */function isRegExp(value){return isObject(value) && objToString.call(value) == regexpTag;} /**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */function isString(value){return typeof value == 'string' || isObjectLike(value) && objToString.call(value) == stringTag;} /**
	     * Checks if `value` is classified as a typed array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isTypedArray(new Uint8Array);
	     * // => true
	     *
	     * _.isTypedArray([]);
	     * // => false
	     */function isTypedArray(value){return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];} /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     *
	     * _.isUndefined(null);
	     * // => false
	     */function isUndefined(value){return value === undefined;} /**
	     * Checks if `value` is less than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
	     * @example
	     *
	     * _.lt(1, 3);
	     * // => true
	     *
	     * _.lt(3, 3);
	     * // => false
	     *
	     * _.lt(3, 1);
	     * // => false
	     */function lt(value,other){return value < other;} /**
	     * Checks if `value` is less than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.lte(1, 3);
	     * // => true
	     *
	     * _.lte(3, 3);
	     * // => true
	     *
	     * _.lte(3, 1);
	     * // => false
	     */function lte(value,other){return value <= other;} /**
	     * Converts `value` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the converted array.
	     * @example
	     *
	     * (function() {
	     *   return _.toArray(arguments).slice(1);
	     * }(1, 2, 3));
	     * // => [2, 3]
	     */function toArray(value){var length=value?getLength(value):0;if(!isLength(length)){return values(value);}if(!length){return [];}return arrayCopy(value);} /**
	     * Converts `value` to a plain object flattening inherited enumerable
	     * properties of `value` to own properties of the plain object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Object} Returns the converted plain object.
	     * @example
	     *
	     * function Foo() {
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.assign({ 'a': 1 }, new Foo);
	     * // => { 'a': 1, 'b': 2 }
	     *
	     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	     * // => { 'a': 1, 'b': 2, 'c': 3 }
	     */function toPlainObject(value){return baseCopy(value,keysIn(value));} /*------------------------------------------------------------------------*/ /**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * overwrite property assignments of previous sources. If `customizer` is
	     * provided it is invoked to produce the merged values of the destination and
	     * source properties. If `customizer` returns `undefined` merging is handled
	     * by the method instead. The `customizer` is bound to `thisArg` and invoked
	     * with five arguments: (objectValue, sourceValue, key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var users = {
	     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	     * };
	     *
	     * var ages = {
	     *   'data': [{ 'age': 36 }, { 'age': 40 }]
	     * };
	     *
	     * _.merge(users, ages);
	     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	     *
	     * // using a customizer callback
	     * var object = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var other = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(object, other, function(a, b) {
	     *   if (_.isArray(a)) {
	     *     return a.concat(b);
	     *   }
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	     */var merge=createAssigner(baseMerge); /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources overwrite property assignments of previous sources.
	     * If `customizer` is provided it is invoked to produce the assigned values.
	     * The `customizer` is bound to `thisArg` and invoked with five arguments:
	     * (objectValue, sourceValue, key, object, source).
	     *
	     * **Note:** This method mutates `object` and is based on
	     * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	     *
	     * @static
	     * @memberOf _
	     * @alias extend
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	     * // => { 'user': 'fred', 'age': 40 }
	     *
	     * // using a customizer callback
	     * var defaults = _.partialRight(_.assign, function(value, other) {
	     *   return _.isUndefined(value) ? other : value;
	     * });
	     *
	     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	     * // => { 'user': 'barney', 'age': 36 }
	     */var assign=createAssigner(function(object,source,customizer){return customizer?assignWith(object,source,customizer):baseAssign(object,source);}); /**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, {
	     *   'constructor': Circle
	     * });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */function create(prototype,properties,guard){var result=baseCreate(prototype);if(guard && isIterateeCall(prototype,properties,guard)){properties = undefined;}return properties?baseAssign(result,properties):result;} /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional values of the same property are ignored.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	     * // => { 'user': 'barney', 'age': 36 }
	     */var defaults=createDefaults(assign,assignDefaults); /**
	     * This method is like `_.defaults` except that it recursively assigns
	     * default properties.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
	     * // => { 'user': { 'name': 'barney', 'age': 36 } }
	     *
	     */var defaultsDeep=createDefaults(merge,mergeDefaults); /**
	     * This method is like `_.find` except that it returns the key of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findKey(users, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => 'barney' (iteration order is not guaranteed)
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findKey(users, { 'age': 1, 'active': true });
	     * // => 'pebbles'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findKey(users, 'active', false);
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.findKey(users, 'active');
	     * // => 'barney'
	     */var findKey=createFindKey(baseForOwn); /**
	     * This method is like `_.findKey` except that it iterates over elements of
	     * a collection in the opposite order.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findLastKey(users, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => returns `pebbles` assuming `_.findKey` returns `barney`
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findLastKey(users, { 'age': 36, 'active': true });
	     * // => 'barney'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findLastKey(users, 'active', false);
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.findLastKey(users, 'active');
	     * // => 'pebbles'
	     */var findLastKey=createFindKey(baseForOwnRight); /**
	     * Iterates over own and inherited enumerable properties of an object invoking
	     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	     * with three arguments: (value, key, object). Iteratee functions may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forIn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
	     */var forIn=createForIn(baseFor); /**
	     * This method is like `_.forIn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forInRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
	     */var forInRight=createForIn(baseForRight); /**
	     * Iterates over own enumerable properties of an object invoking `iteratee`
	     * for each property. The `iteratee` is bound to `thisArg` and invoked with
	     * three arguments: (value, key, object). Iteratee functions may exit iteration
	     * early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a' and 'b' (iteration order is not guaranteed)
	     */var forOwn=createForOwn(baseForOwn); /**
	     * This method is like `_.forOwn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwnRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
	     */var forOwnRight=createForOwn(baseForOwnRight); /**
	     * Creates an array of function property names from all enumerable properties,
	     * own and inherited, of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the new array of property names.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['after', 'ary', 'assign', ...]
	     */function functions(object){return baseFunctions(object,keysIn(object));} /**
	     * Gets the property value at `path` of `object`. If the resolved value is
	     * `undefined` the `defaultValue` is used in its place.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.get(object, 'a[0].b.c');
	     * // => 3
	     *
	     * _.get(object, ['a', '0', 'b', 'c']);
	     * // => 3
	     *
	     * _.get(object, 'a.b.c', 'default');
	     * // => 'default'
	     */function get(object,path,defaultValue){var result=object == null?undefined:baseGet(object,toPath(path),path + '');return result === undefined?defaultValue:result;} /**
	     * Checks if `path` is a direct property.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
	     * @example
	     *
	     * var object = { 'a': { 'b': { 'c': 3 } } };
	     *
	     * _.has(object, 'a');
	     * // => true
	     *
	     * _.has(object, 'a.b.c');
	     * // => true
	     *
	     * _.has(object, ['a', 'b', 'c']);
	     * // => true
	     */function has(object,path){if(object == null){return false;}var result=hasOwnProperty.call(object,path);if(!result && !isKey(path)){path = toPath(path);object = path.length == 1?object:baseGet(object,baseSlice(path,0,-1));if(object == null){return false;}path = last(path);result = hasOwnProperty.call(object,path);}return result || isLength(object.length) && isIndex(path,object.length) && (isArray(object) || isArguments(object));} /**
	     * Creates an object composed of the inverted keys and values of `object`.
	     * If `object` contains duplicate values, subsequent values overwrite property
	     * assignments of previous values unless `multiValue` is `true`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to invert.
	     * @param {boolean} [multiValue] Allow multiple values per key.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new inverted object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2, 'c': 1 };
	     *
	     * _.invert(object);
	     * // => { '1': 'c', '2': 'b' }
	     *
	     * // with `multiValue`
	     * _.invert(object, true);
	     * // => { '1': ['a', 'c'], '2': ['b'] }
	     */function invert(object,multiValue,guard){if(guard && isIterateeCall(object,multiValue,guard)){multiValue = undefined;}var index=-1,props=keys(object),length=props.length,result={};while(++index < length) {var key=props[index],value=object[key];if(multiValue){if(hasOwnProperty.call(result,value)){result[value].push(key);}else {result[value] = [key];}}else {result[value] = key;}}return result;} /**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects. See the
	     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keys(new Foo);
	     * // => ['a', 'b'] (iteration order is not guaranteed)
	     *
	     * _.keys('hi');
	     * // => ['0', '1']
	     */var keys=!nativeKeys?shimKeys:function(object){var Ctor=object == null?undefined:object.constructor;if(typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)){return shimKeys(object);}return isObject(object)?nativeKeys(object):[];}; /**
	     * Creates an array of the own and inherited enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keysIn(new Foo);
	     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	     */function keysIn(object){if(object == null){return [];}if(!isObject(object)){object = Object(object);}var length=object.length;length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;var Ctor=object.constructor,index=-1,isProto=typeof Ctor == 'function' && Ctor.prototype === object,result=Array(length),skipIndexes=length > 0;while(++index < length) {result[index] = index + '';}for(var key in object) {if(!(skipIndexes && isIndex(key,length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object,key)))){result.push(key);}}return result;} /**
	     * The opposite of `_.mapValues`; this method creates an object with the
	     * same values as `object` and keys generated by running each own enumerable
	     * property of `object` through `iteratee`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   return key + value;
	     * });
	     * // => { 'a1': 1, 'b2': 2 }
	     */var mapKeys=createObjectMapper(true); /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through `iteratee`. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments:
	     * (value, key, object).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
	     *   return n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6 }
	     *
	     * var users = {
	     *   'fred':    { 'user': 'fred',    'age': 40 },
	     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using the `_.property` callback shorthand
	     * _.mapValues(users, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     */var mapValues=createObjectMapper(); /**
	     * The opposite of `_.pick`; this method creates an object composed of the
	     * own and inherited enumerable properties of `object` that are not omitted.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to omit, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.omit(object, 'age');
	     * // => { 'user': 'fred' }
	     *
	     * _.omit(object, _.isNumber);
	     * // => { 'user': 'fred' }
	     */var omit=restParam(function(object,props){if(object == null){return {};}if(typeof props[0] != 'function'){var props=arrayMap(baseFlatten(props),String);return pickByArray(object,baseDifference(keysIn(object),props));}var predicate=bindCallback(props[0],props[1],3);return pickByCallback(object,function(value,key,object){return !predicate(value,key,object);});}); /**
	     * Creates a two dimensional array of the key-value pairs for `object`,
	     * e.g. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	     */function pairs(object){object = toObject(object);var index=-1,props=keys(object),length=props.length,result=Array(length);while(++index < length) {var key=props[index];result[index] = [key,object[key]];}return result;} /**
	     * Creates an object composed of the picked `object` properties. Property
	     * names may be specified as individual arguments or as arrays of property
	     * names. If `predicate` is provided it is invoked for each property of `object`
	     * picking the properties `predicate` returns truthy for. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.pick(object, 'user');
	     * // => { 'user': 'fred' }
	     *
	     * _.pick(object, _.isString);
	     * // => { 'user': 'fred' }
	     */var pick=restParam(function(object,props){if(object == null){return {};}return typeof props[0] == 'function'?pickByCallback(object,bindCallback(props[0],props[1],3)):pickByArray(object,baseFlatten(props));}); /**
	     * This method is like `_.get` except that if the resolved value is a function
	     * it is invoked with the `this` binding of its parent object and its result
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to resolve.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	     *
	     * _.result(object, 'a[0].b.c1');
	     * // => 3
	     *
	     * _.result(object, 'a[0].b.c2');
	     * // => 4
	     *
	     * _.result(object, 'a.b.c', 'default');
	     * // => 'default'
	     *
	     * _.result(object, 'a.b.c', _.constant('default'));
	     * // => 'default'
	     */function result(object,path,defaultValue){var result=object == null?undefined:object[path];if(result === undefined){if(object != null && !isKey(path,object)){path = toPath(path);object = path.length == 1?object:baseGet(object,baseSlice(path,0,-1));result = object == null?undefined:object[last(path)];}result = result === undefined?defaultValue:result;}return isFunction(result)?result.call(object):result;} /**
	     * Sets the property value of `path` on `object`. If a portion of `path`
	     * does not exist it is created.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to augment.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.set(object, 'a[0].b.c', 4);
	     * console.log(object.a[0].b.c);
	     * // => 4
	     *
	     * _.set(object, 'x[0].y.z', 5);
	     * console.log(object.x[0].y.z);
	     * // => 5
	     */function set(object,path,value){if(object == null){return object;}var pathKey=path + '';path = object[pathKey] != null || isKey(path,object)?[pathKey]:toPath(path);var index=-1,length=path.length,lastIndex=length - 1,nested=object;while(nested != null && ++index < length) {var key=path[index];if(isObject(nested)){if(index == lastIndex){nested[key] = value;}else if(nested[key] == null){nested[key] = isIndex(path[index + 1])?[]:{};}}nested = nested[key];}return object;} /**
	     * An alternative to `_.reduce`; this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own enumerable
	     * properties through `iteratee`, with each invocation potentially mutating
	     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
	     * with four arguments: (accumulator, value, key, object). Iteratee functions
	     * may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.transform([2, 3, 4], function(result, n) {
	     *   result.push(n *= n);
	     *   return n % 2 == 0;
	     * });
	     * // => [4, 9]
	     *
	     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6 }
	     */function transform(object,iteratee,accumulator,thisArg){var isArr=isArray(object) || isTypedArray(object);iteratee = getCallback(iteratee,thisArg,4);if(accumulator == null){if(isArr || isObject(object)){var Ctor=object.constructor;if(isArr){accumulator = isArray(object)?new Ctor():[];}else {accumulator = baseCreate(isFunction(Ctor)?Ctor.prototype:undefined);}}else {accumulator = {};}}(isArr?arrayEach:baseForOwn)(object,function(value,index,object){return iteratee(accumulator,value,index,object);});return accumulator;} /**
	     * Creates an array of the own enumerable property values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.values(new Foo);
	     * // => [1, 2] (iteration order is not guaranteed)
	     *
	     * _.values('hi');
	     * // => ['h', 'i']
	     */function values(object){return baseValues(object,keys(object));} /**
	     * Creates an array of the own and inherited enumerable property values
	     * of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.valuesIn(new Foo);
	     * // => [1, 2, 3] (iteration order is not guaranteed)
	     */function valuesIn(object){return baseValues(object,keysIn(object));} /*------------------------------------------------------------------------*/ /**
	     * Checks if `n` is between `start` and up to but not including, `end`. If
	     * `end` is not specified it is set to `start` with `start` then set to `0`.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} n The number to check.
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
	     * @example
	     *
	     * _.inRange(3, 2, 4);
	     * // => true
	     *
	     * _.inRange(4, 8);
	     * // => true
	     *
	     * _.inRange(4, 2);
	     * // => false
	     *
	     * _.inRange(2, 2);
	     * // => false
	     *
	     * _.inRange(1.2, 2);
	     * // => true
	     *
	     * _.inRange(5.2, 4);
	     * // => false
	     */function inRange(value,start,end){start = +start || 0;if(end === undefined){end = start;start = 0;}else {end = +end || 0;}return value >= nativeMin(start,end) && value < nativeMax(start,end);} /**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number is returned.
	     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
	     * number is returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating] Specify returning a floating-point number.
	     * @returns {number} Returns the random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */function random(min,max,floating){if(floating && isIterateeCall(min,max,floating)){max = floating = undefined;}var noMin=min == null,noMax=max == null;if(floating == null){if(noMax && typeof min == 'boolean'){floating = min;min = 1;}else if(typeof max == 'boolean'){floating = max;noMax = true;}}if(noMin && noMax){max = 1;noMax = false;}min = +min || 0;if(noMax){max = min;min = 0;}else {max = +max || 0;}if(floating || min % 1 || max % 1){var rand=nativeRandom();return nativeMin(min + rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1))),max);}return baseRandom(min,max);} /*------------------------------------------------------------------------*/ /**
	     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the camel cased string.
	     * @example
	     *
	     * _.camelCase('Foo Bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('--foo-bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('__foo_bar__');
	     * // => 'fooBar'
	     */var camelCase=createCompounder(function(result,word,index){word = word.toLowerCase();return result + (index?word.charAt(0).toUpperCase() + word.slice(1):word);}); /**
	     * Capitalizes the first character of `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to capitalize.
	     * @returns {string} Returns the capitalized string.
	     * @example
	     *
	     * _.capitalize('fred');
	     * // => 'Fred'
	     */function capitalize(string){string = baseToString(string);return string && string.charAt(0).toUpperCase() + string.slice(1);} /**
	     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to deburr.
	     * @returns {string} Returns the deburred string.
	     * @example
	     *
	     * _.deburr('déjà vu');
	     * // => 'deja vu'
	     */function deburr(string){string = baseToString(string);return string && string.replace(reLatin1,deburrLetter).replace(reComboMark,'');} /**
	     * Checks if `string` ends with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=string.length] The position to search from.
	     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
	     * @example
	     *
	     * _.endsWith('abc', 'c');
	     * // => true
	     *
	     * _.endsWith('abc', 'b');
	     * // => false
	     *
	     * _.endsWith('abc', 'b', 2);
	     * // => true
	     */function endsWith(string,target,position){string = baseToString(string);target = target + '';var length=string.length;position = position === undefined?length:nativeMin(position < 0?0:+position || 0,length);position -= target.length;return position >= 0 && string.indexOf(target,position) == position;} /**
	     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
	     * their corresponding HTML entities.
	     *
	     * **Note:** No other characters are escaped. To escape additional characters
	     * use a third-party library like [_he_](https://mths.be/he).
	     *
	     * Though the ">" character is escaped for symmetry, characters like
	     * ">" and "/" don't need escaping in HTML and have no special meaning
	     * unless they're part of a tag or unquoted attribute value.
	     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	     * (under "semi-related fun fact") for more details.
	     *
	     * Backticks are escaped because in Internet Explorer < 9, they can break out
	     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	     * for more details.
	     *
	     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	     * to reduce XSS vectors.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('fred, barney, & pebbles');
	     * // => 'fred, barney, &amp; pebbles'
	     */function escape(string){ // Reset `lastIndex` because in IE < 9 `String#replace` does not.
	string = baseToString(string);return string && reHasUnescapedHtml.test(string)?string.replace(reUnescapedHtml,escapeHtmlChar):string;} /**
	     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escapeRegExp('[lodash](https://lodash.com/)');
	     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	     */function escapeRegExp(string){string = baseToString(string);return string && reHasRegExpChars.test(string)?string.replace(reRegExpChars,escapeRegExpChar):string || '(?:)';} /**
	     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the kebab cased string.
	     * @example
	     *
	     * _.kebabCase('Foo Bar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('fooBar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('__foo_bar__');
	     * // => 'foo-bar'
	     */var kebabCase=createCompounder(function(result,word,index){return result + (index?'-':'') + word.toLowerCase();}); /**
	     * Pads `string` on the left and right sides if it's shorter than `length`.
	     * Padding characters are truncated if they can't be evenly divided by `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.pad('abc', 8);
	     * // => '  abc   '
	     *
	     * _.pad('abc', 8, '_-');
	     * // => '_-abc_-_'
	     *
	     * _.pad('abc', 3);
	     * // => 'abc'
	     */function pad(string,length,chars){string = baseToString(string);length = +length;var strLength=string.length;if(strLength >= length || !nativeIsFinite(length)){return string;}var mid=(length - strLength) / 2,leftLength=nativeFloor(mid),rightLength=nativeCeil(mid);chars = createPadding('',rightLength,chars);return chars.slice(0,leftLength) + string + chars;} /**
	     * Pads `string` on the left side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padLeft('abc', 6);
	     * // => '   abc'
	     *
	     * _.padLeft('abc', 6, '_-');
	     * // => '_-_abc'
	     *
	     * _.padLeft('abc', 3);
	     * // => 'abc'
	     */var padLeft=createPadDir(); /**
	     * Pads `string` on the right side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padRight('abc', 6);
	     * // => 'abc   '
	     *
	     * _.padRight('abc', 6, '_-');
	     * // => 'abc_-_'
	     *
	     * _.padRight('abc', 3);
	     * // => 'abc'
	     */var padRight=createPadDir(true); /**
	     * Converts `string` to an integer of the specified radix. If `radix` is
	     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
	     * in which case a `radix` of `16` is used.
	     *
	     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
	     * of `parseInt`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} string The string to convert.
	     * @param {number} [radix] The radix to interpret `value` by.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     *
	     * _.map(['6', '08', '10'], _.parseInt);
	     * // => [6, 8, 10]
	     */function parseInt(string,radix,guard){ // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
	// Chrome fails to trim leading <BOM> whitespace characters.
	// See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
	if(guard?isIterateeCall(string,radix,guard):radix == null){radix = 0;}else if(radix){radix = +radix;}string = trim(string);return nativeParseInt(string,radix || (reHasHexPrefix.test(string)?16:10));} /**
	     * Repeats the given string `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to repeat.
	     * @param {number} [n=0] The number of times to repeat the string.
	     * @returns {string} Returns the repeated string.
	     * @example
	     *
	     * _.repeat('*', 3);
	     * // => '***'
	     *
	     * _.repeat('abc', 2);
	     * // => 'abcabc'
	     *
	     * _.repeat('abc', 0);
	     * // => ''
	     */function repeat(string,n){var result='';string = baseToString(string);n = +n;if(n < 1 || !string || !nativeIsFinite(n)){return result;} // Leverage the exponentiation by squaring algorithm for a faster repeat.
	// See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
	do {if(n % 2){result += string;}n = nativeFloor(n / 2);string += string;}while(n);return result;} /**
	     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the snake cased string.
	     * @example
	     *
	     * _.snakeCase('Foo Bar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('fooBar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('--foo-bar');
	     * // => 'foo_bar'
	     */var snakeCase=createCompounder(function(result,word,index){return result + (index?'_':'') + word.toLowerCase();}); /**
	     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the start cased string.
	     * @example
	     *
	     * _.startCase('--foo-bar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('fooBar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('__foo_bar__');
	     * // => 'Foo Bar'
	     */var startCase=createCompounder(function(result,word,index){return result + (index?' ':'') + (word.charAt(0).toUpperCase() + word.slice(1));}); /**
	     * Checks if `string` starts with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=0] The position to search from.
	     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
	     * @example
	     *
	     * _.startsWith('abc', 'a');
	     * // => true
	     *
	     * _.startsWith('abc', 'b');
	     * // => false
	     *
	     * _.startsWith('abc', 'b', 1);
	     * // => true
	     */function startsWith(string,target,position){string = baseToString(string);position = position == null?0:nativeMin(position < 0?0:+position || 0,string.length);return string.lastIndexOf(target,position) == position;} /**
	     * Creates a compiled template function that can interpolate data properties
	     * in "interpolate" delimiters, HTML-escape interpolated data properties in
	     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	     * properties may be accessed as free variables in the template. If a setting
	     * object is provided it takes precedence over `_.templateSettings` values.
	     *
	     * **Note:** In the development build `_.template` utilizes
	     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	     * for easier debugging.
	     *
	     * For more information on precompiling templates see
	     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	     *
	     * For more information on Chrome extension sandboxes see
	     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The template string.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as free variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [options.variable] The data object variable name.
	     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
	     * @returns {Function} Returns the compiled template function.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= user %>!');
	     * compiled({ 'user': 'fred' });
	     * // => 'hello fred!'
	     *
	     * // using the HTML "escape" delimiter to escape data property values
	     * var compiled = _.template('<b><%- value %></b>');
	     * compiled({ 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
	     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * var compiled = _.template('<% print("hello " + user); %>!');
	     * compiled({ 'user': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
	     * var compiled = _.template('hello ${ user }!');
	     * compiled({ 'user': 'pebbles' });
	     * // => 'hello pebbles!'
	     *
	     * // using custom template delimiters
	     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	     * var compiled = _.template('hello {{ user }}!');
	     * compiled({ 'user': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using backslashes to treat delimiters as plain text
	     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	     * compiled({ 'value': 'ignored' });
	     * // => '<%- value %>'
	     *
	     * // using the `imports` option to import `jQuery` as `jq`
	     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     * //   var __t, __p = '';
	     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	     * //   return __p;
	     * // }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */function template(string,options,otherOptions){ // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
	// and Laura Doktorova's doT.js (https://github.com/olado/doT).
	var settings=lodash.templateSettings;if(otherOptions && isIterateeCall(string,options,otherOptions)){options = otherOptions = undefined;}string = baseToString(string);options = assignWith(baseAssign({},otherOptions || options),settings,assignOwnDefaults);var imports=assignWith(baseAssign({},options.imports),settings.imports,assignOwnDefaults),importsKeys=keys(imports),importsValues=baseValues(imports,importsKeys);var isEscaping,isEvaluating,index=0,interpolate=options.interpolate || reNoMatch,source="__p += '"; // Compile the regexp to match each delimiter.
	var reDelimiters=RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate?reEsTemplate:reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$','g'); // Use a sourceURL for easier debugging.
	var sourceURL='//# sourceURL=' + ('sourceURL' in options?options.sourceURL:'lodash.templateSources[' + ++templateCounter + ']') + '\n';string.replace(reDelimiters,function(match,escapeValue,interpolateValue,esTemplateValue,evaluateValue,offset){interpolateValue || (interpolateValue = esTemplateValue); // Escape characters that can't be included in string literals.
	source += string.slice(index,offset).replace(reUnescapedString,escapeStringChar); // Replace delimiters with snippets.
	if(escapeValue){isEscaping = true;source += "' +\n__e(" + escapeValue + ") +\n'";}if(evaluateValue){isEvaluating = true;source += "';\n" + evaluateValue + ";\n__p += '";}if(interpolateValue){source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";}index = offset + match.length; // The JS engine embedded in Adobe products requires returning the `match`
	// string in order to produce the correct `offset` value.
	return match;});source += "';\n"; // If `variable` is not specified wrap a with-statement around the generated
	// code to add the data object to the top of the scope chain.
	var variable=options.variable;if(!variable){source = 'with (obj) {\n' + source + '\n}\n';} // Cleanup code by stripping empty strings.
	source = (isEvaluating?source.replace(reEmptyStringLeading,''):source).replace(reEmptyStringMiddle,'$1').replace(reEmptyStringTrailing,'$1;'); // Frame code as the function body.
	source = 'function(' + (variable || 'obj') + ') {\n' + (variable?'':'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping?', __e = _.escape':'') + (isEvaluating?', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n":';\n') + source + 'return __p\n}';var result=attempt(function(){return Function(importsKeys,sourceURL + 'return ' + source).apply(undefined,importsValues);}); // Provide the compiled function's source by its `toString` method or
	// the `source` property as a convenience for inlining compiled templates.
	result.source = source;if(isError(result)){throw result;}return result;} /**
	     * Removes leading and trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trim('  abc  ');
	     * // => 'abc'
	     *
	     * _.trim('-_-abc-_-', '_-');
	     * // => 'abc'
	     *
	     * _.map(['  foo  ', '  bar  '], _.trim);
	     * // => ['foo', 'bar']
	     */function trim(string,chars,guard){var value=string;string = baseToString(string);if(!string){return string;}if(guard?isIterateeCall(value,chars,guard):chars == null){return string.slice(trimmedLeftIndex(string),trimmedRightIndex(string) + 1);}chars = chars + '';return string.slice(charsLeftIndex(string,chars),charsRightIndex(string,chars) + 1);} /**
	     * Removes leading whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimLeft('  abc  ');
	     * // => 'abc  '
	     *
	     * _.trimLeft('-_-abc-_-', '_-');
	     * // => 'abc-_-'
	     */function trimLeft(string,chars,guard){var value=string;string = baseToString(string);if(!string){return string;}if(guard?isIterateeCall(value,chars,guard):chars == null){return string.slice(trimmedLeftIndex(string));}return string.slice(charsLeftIndex(string,chars + ''));} /**
	     * Removes trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimRight('  abc  ');
	     * // => '  abc'
	     *
	     * _.trimRight('-_-abc-_-', '_-');
	     * // => '-_-abc'
	     */function trimRight(string,chars,guard){var value=string;string = baseToString(string);if(!string){return string;}if(guard?isIterateeCall(value,chars,guard):chars == null){return string.slice(0,trimmedRightIndex(string) + 1);}return string.slice(0,charsRightIndex(string,chars + '') + 1);} /**
	     * Truncates `string` if it's longer than the given maximum string length.
	     * The last characters of the truncated string are replaced with the omission
	     * string which defaults to "...".
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to truncate.
	     * @param {Object|number} [options] The options object or maximum string length.
	     * @param {number} [options.length=30] The maximum string length.
	     * @param {string} [options.omission='...'] The string to indicate text is omitted.
	     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the truncated string.
	     * @example
	     *
	     * _.trunc('hi-diddly-ho there, neighborino');
	     * // => 'hi-diddly-ho there, neighbo...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', 24);
	     * // => 'hi-diddly-ho there, n...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': ' '
	     * });
	     * // => 'hi-diddly-ho there,...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': /,? +/
	     * });
	     * // => 'hi-diddly-ho there...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'omission': ' [...]'
	     * });
	     * // => 'hi-diddly-ho there, neig [...]'
	     */function trunc(string,options,guard){if(guard && isIterateeCall(string,options,guard)){options = undefined;}var length=DEFAULT_TRUNC_LENGTH,omission=DEFAULT_TRUNC_OMISSION;if(options != null){if(isObject(options)){var separator='separator' in options?options.separator:separator;length = 'length' in options?+options.length || 0:length;omission = 'omission' in options?baseToString(options.omission):omission;}else {length = +options || 0;}}string = baseToString(string);if(length >= string.length){return string;}var end=length - omission.length;if(end < 1){return omission;}var result=string.slice(0,end);if(separator == null){return result + omission;}if(isRegExp(separator)){if(string.slice(end).search(separator)){var match,newEnd,substring=string.slice(0,end);if(!separator.global){separator = RegExp(separator.source,(reFlags.exec(separator) || '') + 'g');}separator.lastIndex = 0;while(match = separator.exec(substring)) {newEnd = match.index;}result = result.slice(0,newEnd == null?end:newEnd);}}else if(string.indexOf(separator,end) != end){var index=result.lastIndexOf(separator);if(index > -1){result = result.slice(0,index);}}return result + omission;} /**
	     * The inverse of `_.escape`; this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
	     * corresponding characters.
	     *
	     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
	     * entities use a third-party library like [_he_](https://mths.be/he).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('fred, barney, &amp; pebbles');
	     * // => 'fred, barney, & pebbles'
	     */function unescape(string){string = baseToString(string);return string && reHasEscapedHtml.test(string)?string.replace(reEscapedHtml,unescapeHtmlChar):string;} /**
	     * Splits `string` into an array of its words.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {RegExp|string} [pattern] The pattern to match words.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the words of `string`.
	     * @example
	     *
	     * _.words('fred, barney, & pebbles');
	     * // => ['fred', 'barney', 'pebbles']
	     *
	     * _.words('fred, barney, & pebbles', /[^, ]+/g);
	     * // => ['fred', 'barney', '&', 'pebbles']
	     */function words(string,pattern,guard){if(guard && isIterateeCall(string,pattern,guard)){pattern = undefined;}string = baseToString(string);return string.match(pattern || reWords) || [];} /*------------------------------------------------------------------------*/ /**
	     * Attempts to invoke `func`, returning either the result or the caught error
	     * object. Any additional arguments are provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function} func The function to attempt.
	     * @returns {*} Returns the `func` result or error object.
	     * @example
	     *
	     * // avoid throwing errors for invalid selectors
	     * var elements = _.attempt(function(selector) {
	     *   return document.querySelectorAll(selector);
	     * }, '>_>');
	     *
	     * if (_.isError(elements)) {
	     *   elements = [];
	     * }
	     */var attempt=restParam(function(func,args){try{return func.apply(undefined,args);}catch(e) {return isError(e)?e:new Error(e);}}); /**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and arguments of the created function. If `func` is a property name the
	     * created callback returns the property value for a given element. If `func`
	     * is an object the created callback returns `true` for elements that contain
	     * the equivalent object properties, otherwise it returns `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias iteratee
	     * @category Utility
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the callback.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
	     *   if (!match) {
	     *     return callback(func, thisArg);
	     *   }
	     *   return function(object) {
	     *     return match[2] == 'gt'
	     *       ? object[match[1]] > match[3]
	     *       : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(users, 'age__gt36');
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     */function callback(func,thisArg,guard){if(guard && isIterateeCall(func,thisArg,guard)){thisArg = undefined;}return isObjectLike(func)?matches(func):baseCallback(func,thisArg);} /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var getter = _.constant(object);
	     *
	     * getter() === object;
	     * // => true
	     */function constant(value){return function(){return value;};} /**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.identity(object) === object;
	     * // => true
	     */function identity(value){return value;} /**
	     * Creates a function that performs a deep comparison between a given object
	     * and `source`, returning `true` if the given object has equivalent property
	     * values, else `false`.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
	     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
	     */function matches(source){return baseMatches(baseClone(source,true));} /**
	     * Creates a function that compares the property value of `path` on a given
	     * object to `value`.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * _.find(users, _.matchesProperty('user', 'fred'));
	     * // => { 'user': 'fred' }
	     */function matchesProperty(path,srcValue){return baseMatchesProperty(path,baseClone(srcValue,true));} /**
	     * Creates a function that invokes the method at `path` on a given object.
	     * Any additional arguments are provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': _.constant(2) } } },
	     *   { 'a': { 'b': { 'c': _.constant(1) } } }
	     * ];
	     *
	     * _.map(objects, _.method('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */var method=restParam(function(path,args){return function(object){return invokePath(object,path,args);};}); /**
	     * The opposite of `_.method`; this method creates a function that invokes
	     * the method at a given path on `object`. Any additional arguments are
	     * provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to query.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = _.times(3, _.constant),
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
	     * // => [2, 0]
	     */var methodOf=restParam(function(object,args){return function(path){return invokePath(object,path,args);};}); /**
	     * Adds all own enumerable function properties of a source object to the
	     * destination object. If `object` is a function then methods are added to
	     * its prototype as well.
	     *
	     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	     * avoid conflicts caused by modifying the original.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function|Object} [object=lodash] The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added
	     *  are chainable.
	     * @returns {Function|Object} Returns `object`.
	     * @example
	     *
	     * function vowels(string) {
	     *   return _.filter(string, function(v) {
	     *     return /[aeiou]/i.test(v);
	     *   });
	     * }
	     *
	     * _.mixin({ 'vowels': vowels });
	     * _.vowels('fred');
	     * // => ['e']
	     *
	     * _('fred').vowels().value();
	     * // => ['e']
	     *
	     * _.mixin({ 'vowels': vowels }, { 'chain': false });
	     * _('fred').vowels();
	     * // => ['e']
	     */function mixin(object,source,options){if(options == null){var isObj=isObject(source),props=isObj?keys(source):undefined,methodNames=props && props.length?baseFunctions(source,props):undefined;if(!(methodNames?methodNames.length:isObj)){methodNames = false;options = source;source = object;object = this;}}if(!methodNames){methodNames = baseFunctions(source,keys(source));}var chain=true,index=-1,isFunc=isFunction(object),length=methodNames.length;if(options === false){chain = false;}else if(isObject(options) && 'chain' in options){chain = options.chain;}while(++index < length) {var methodName=methodNames[index],func=source[methodName];object[methodName] = func;if(isFunc){object.prototype[methodName] = (function(func){return function(){var chainAll=this.__chain__;if(chain || chainAll){var result=object(this.__wrapped__),actions=result.__actions__ = arrayCopy(this.__actions__);actions.push({'func':func,'args':arguments,'thisArg':object});result.__chain__ = chainAll;return result;}return func.apply(object,arrayPush([this.value()],arguments));};})(func);}}return object;} /**
	     * Reverts the `_` variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */function noConflict(){root._ = oldDash;return this;} /**
	     * A no-operation function that returns `undefined` regardless of the
	     * arguments it receives.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.noop(object) === undefined;
	     * // => true
	     */function noop(){} // No operation performed.
	/**
	     * Creates a function that returns the property value at `path` on a
	     * given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': 2 } } },
	     *   { 'a': { 'b': { 'c': 1 } } }
	     * ];
	     *
	     * _.map(objects, _.property('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */function property(path){return isKey(path)?baseProperty(path):basePropertyDeep(path);} /**
	     * The opposite of `_.property`; this method creates a function that returns
	     * the property value at a given path on `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to query.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = [0, 1, 2],
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
	     * // => [2, 0]
	     */function propertyOf(object){return function(path){return baseGet(object,toPath(path),path + '');};} /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to, but not including, `end`. If `end` is not specified it is
	     * set to `start` with `start` then set to `0`. If `end` is less than `start`
	     * a zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns the new array of numbers.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */function range(start,end,step){if(step && isIterateeCall(start,end,step)){end = step = undefined;}start = +start || 0;step = step == null?1:+step || 0;if(end == null){end = start;start = 0;}else {end = +end || 0;} // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	// See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	var index=-1,length=nativeMax(nativeCeil((end - start) / (step || 1)),0),result=Array(length);while(++index < length) {result[index] = start;start += step;}return result;} /**
	     * Invokes the iteratee function `n` times, returning an array of the results
	     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
	     * one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) {
	     *   mage.castSpell(n);
	     * });
	     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
	     *
	     * _.times(3, function(n) {
	     *   this.cast(n);
	     * }, mage);
	     * // => also invokes `mage.castSpell(n)` three times
	     */function times(n,iteratee,thisArg){n = nativeFloor(n); // Exit early to avoid a JSC JIT bug in Safari 8
	// where `Array(0)` is treated as `Array(1)`.
	if(n < 1 || !nativeIsFinite(n)){return [];}var index=-1,result=Array(nativeMin(n,MAX_ARRAY_LENGTH));iteratee = bindCallback(iteratee,thisArg,1);while(++index < n) {if(index < MAX_ARRAY_LENGTH){result[index] = iteratee(index);}else {iteratee(index);}}return result;} /**
	     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */function uniqueId(prefix){var id=++idCounter;return baseToString(prefix) + id;} /*------------------------------------------------------------------------*/ /**
	     * Adds two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} augend The first number to add.
	     * @param {number} addend The second number to add.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.add(6, 4);
	     * // => 10
	     */function add(augend,addend){return (+augend || 0) + (+addend || 0);} /**
	     * Calculates `n` rounded up to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round up.
	     * @param {number} [precision=0] The precision to round up to.
	     * @returns {number} Returns the rounded up number.
	     * @example
	     *
	     * _.ceil(4.006);
	     * // => 5
	     *
	     * _.ceil(6.004, 2);
	     * // => 6.01
	     *
	     * _.ceil(6040, -2);
	     * // => 6100
	     */var ceil=createRound('ceil'); /**
	     * Calculates `n` rounded down to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round down.
	     * @param {number} [precision=0] The precision to round down to.
	     * @returns {number} Returns the rounded down number.
	     * @example
	     *
	     * _.floor(4.006);
	     * // => 4
	     *
	     * _.floor(0.046, 2);
	     * // => 0.04
	     *
	     * _.floor(4060, -2);
	     * // => 4000
	     */var floor=createRound('floor'); /**
	     * Gets the maximum value of `collection`. If `collection` is empty or falsey
	     * `-Infinity` is returned. If an iteratee function is provided it is invoked
	     * for each value in `collection` to generate the criterion by which the value
	     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * _.max([]);
	     * // => -Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(users, function(chr) {
	     *   return chr.age;
	     * });
	     * // => { 'user': 'fred', 'age': 40 }
	     *
	     * // using the `_.property` callback shorthand
	     * _.max(users, 'age');
	     * // => { 'user': 'fred', 'age': 40 }
	     */var max=createExtremum(gt,NEGATIVE_INFINITY); /**
	     * Gets the minimum value of `collection`. If `collection` is empty or falsey
	     * `Infinity` is returned. If an iteratee function is provided it is invoked
	     * for each value in `collection` to generate the criterion by which the value
	     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * _.min([]);
	     * // => Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(users, function(chr) {
	     *   return chr.age;
	     * });
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // using the `_.property` callback shorthand
	     * _.min(users, 'age');
	     * // => { 'user': 'barney', 'age': 36 }
	     */var min=createExtremum(lt,POSITIVE_INFINITY); /**
	     * Calculates `n` rounded to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round.
	     * @param {number} [precision=0] The precision to round to.
	     * @returns {number} Returns the rounded number.
	     * @example
	     *
	     * _.round(4.006);
	     * // => 4
	     *
	     * _.round(4.006, 2);
	     * // => 4.01
	     *
	     * _.round(4060, -2);
	     * // => 4100
	     */var round=createRound('round'); /**
	     * Gets the sum of the values in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.sum([4, 6]);
	     * // => 10
	     *
	     * _.sum({ 'a': 4, 'b': 6 });
	     * // => 10
	     *
	     * var objects = [
	     *   { 'n': 4 },
	     *   { 'n': 6 }
	     * ];
	     *
	     * _.sum(objects, function(object) {
	     *   return object.n;
	     * });
	     * // => 10
	     *
	     * // using the `_.property` callback shorthand
	     * _.sum(objects, 'n');
	     * // => 10
	     */function sum(collection,iteratee,thisArg){if(thisArg && isIterateeCall(collection,iteratee,thisArg)){iteratee = undefined;}iteratee = getCallback(iteratee,thisArg,3);return iteratee.length == 1?arraySum(isArray(collection)?collection:toIterable(collection),iteratee):baseSum(collection,iteratee);} /*------------------------------------------------------------------------*/ // Ensure wrappers are instances of `baseLodash`.
	lodash.prototype = baseLodash.prototype;LodashWrapper.prototype = baseCreate(baseLodash.prototype);LodashWrapper.prototype.constructor = LodashWrapper;LazyWrapper.prototype = baseCreate(baseLodash.prototype);LazyWrapper.prototype.constructor = LazyWrapper; // Add functions to the `Map` cache.
	MapCache.prototype['delete'] = mapDelete;MapCache.prototype.get = mapGet;MapCache.prototype.has = mapHas;MapCache.prototype.set = mapSet; // Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush; // Assign cache to `_.memoize`.
	memoize.Cache = MapCache; // Add functions that return wrapped values when chaining.
	lodash.after = after;lodash.ary = ary;lodash.assign = assign;lodash.at = at;lodash.before = before;lodash.bind = bind;lodash.bindAll = bindAll;lodash.bindKey = bindKey;lodash.callback = callback;lodash.chain = chain;lodash.chunk = chunk;lodash.compact = compact;lodash.constant = constant;lodash.countBy = countBy;lodash.create = create;lodash.curry = curry;lodash.curryRight = curryRight;lodash.debounce = debounce;lodash.defaults = defaults;lodash.defaultsDeep = defaultsDeep;lodash.defer = defer;lodash.delay = delay;lodash.difference = difference;lodash.drop = drop;lodash.dropRight = dropRight;lodash.dropRightWhile = dropRightWhile;lodash.dropWhile = dropWhile;lodash.fill = fill;lodash.filter = filter;lodash.flatten = flatten;lodash.flattenDeep = flattenDeep;lodash.flow = flow;lodash.flowRight = flowRight;lodash.forEach = forEach;lodash.forEachRight = forEachRight;lodash.forIn = forIn;lodash.forInRight = forInRight;lodash.forOwn = forOwn;lodash.forOwnRight = forOwnRight;lodash.functions = functions;lodash.groupBy = groupBy;lodash.indexBy = indexBy;lodash.initial = initial;lodash.intersection = intersection;lodash.invert = invert;lodash.invoke = invoke;lodash.keys = keys;lodash.keysIn = keysIn;lodash.map = map;lodash.mapKeys = mapKeys;lodash.mapValues = mapValues;lodash.matches = matches;lodash.matchesProperty = matchesProperty;lodash.memoize = memoize;lodash.merge = merge;lodash.method = method;lodash.methodOf = methodOf;lodash.mixin = mixin;lodash.modArgs = modArgs;lodash.negate = negate;lodash.omit = omit;lodash.once = once;lodash.pairs = pairs;lodash.partial = partial;lodash.partialRight = partialRight;lodash.partition = partition;lodash.pick = pick;lodash.pluck = pluck;lodash.property = property;lodash.propertyOf = propertyOf;lodash.pull = pull;lodash.pullAt = pullAt;lodash.range = range;lodash.rearg = rearg;lodash.reject = reject;lodash.remove = remove;lodash.rest = rest;lodash.restParam = restParam;lodash.set = set;lodash.shuffle = shuffle;lodash.slice = slice;lodash.sortBy = sortBy;lodash.sortByAll = sortByAll;lodash.sortByOrder = sortByOrder;lodash.spread = spread;lodash.take = take;lodash.takeRight = takeRight;lodash.takeRightWhile = takeRightWhile;lodash.takeWhile = takeWhile;lodash.tap = tap;lodash.throttle = throttle;lodash.thru = thru;lodash.times = times;lodash.toArray = toArray;lodash.toPlainObject = toPlainObject;lodash.transform = transform;lodash.union = union;lodash.uniq = uniq;lodash.unzip = unzip;lodash.unzipWith = unzipWith;lodash.values = values;lodash.valuesIn = valuesIn;lodash.where = where;lodash.without = without;lodash.wrap = wrap;lodash.xor = xor;lodash.zip = zip;lodash.zipObject = zipObject;lodash.zipWith = zipWith; // Add aliases.
	lodash.backflow = flowRight;lodash.collect = map;lodash.compose = flowRight;lodash.each = forEach;lodash.eachRight = forEachRight;lodash.extend = assign;lodash.iteratee = callback;lodash.methods = functions;lodash.object = zipObject;lodash.select = filter;lodash.tail = rest;lodash.unique = uniq; // Add functions to `lodash.prototype`.
	mixin(lodash,lodash); /*------------------------------------------------------------------------*/ // Add functions that return unwrapped values when chaining.
	lodash.add = add;lodash.attempt = attempt;lodash.camelCase = camelCase;lodash.capitalize = capitalize;lodash.ceil = ceil;lodash.clone = clone;lodash.cloneDeep = cloneDeep;lodash.deburr = deburr;lodash.endsWith = endsWith;lodash.escape = escape;lodash.escapeRegExp = escapeRegExp;lodash.every = every;lodash.find = find;lodash.findIndex = findIndex;lodash.findKey = findKey;lodash.findLast = findLast;lodash.findLastIndex = findLastIndex;lodash.findLastKey = findLastKey;lodash.findWhere = findWhere;lodash.first = first;lodash.floor = floor;lodash.get = get;lodash.gt = gt;lodash.gte = gte;lodash.has = has;lodash.identity = identity;lodash.includes = includes;lodash.indexOf = indexOf;lodash.inRange = inRange;lodash.isArguments = isArguments;lodash.isArray = isArray;lodash.isBoolean = isBoolean;lodash.isDate = isDate;lodash.isElement = isElement;lodash.isEmpty = isEmpty;lodash.isEqual = isEqual;lodash.isError = isError;lodash.isFinite = isFinite;lodash.isFunction = isFunction;lodash.isMatch = isMatch;lodash.isNaN = isNaN;lodash.isNative = isNative;lodash.isNull = isNull;lodash.isNumber = isNumber;lodash.isObject = isObject;lodash.isPlainObject = isPlainObject;lodash.isRegExp = isRegExp;lodash.isString = isString;lodash.isTypedArray = isTypedArray;lodash.isUndefined = isUndefined;lodash.kebabCase = kebabCase;lodash.last = last;lodash.lastIndexOf = lastIndexOf;lodash.lt = lt;lodash.lte = lte;lodash.max = max;lodash.min = min;lodash.noConflict = noConflict;lodash.noop = noop;lodash.now = now;lodash.pad = pad;lodash.padLeft = padLeft;lodash.padRight = padRight;lodash.parseInt = parseInt;lodash.random = random;lodash.reduce = reduce;lodash.reduceRight = reduceRight;lodash.repeat = repeat;lodash.result = result;lodash.round = round;lodash.runInContext = runInContext;lodash.size = size;lodash.snakeCase = snakeCase;lodash.some = some;lodash.sortedIndex = sortedIndex;lodash.sortedLastIndex = sortedLastIndex;lodash.startCase = startCase;lodash.startsWith = startsWith;lodash.sum = sum;lodash.template = template;lodash.trim = trim;lodash.trimLeft = trimLeft;lodash.trimRight = trimRight;lodash.trunc = trunc;lodash.unescape = unescape;lodash.uniqueId = uniqueId;lodash.words = words; // Add aliases.
	lodash.all = every;lodash.any = some;lodash.contains = includes;lodash.eq = isEqual;lodash.detect = find;lodash.foldl = reduce;lodash.foldr = reduceRight;lodash.head = first;lodash.include = includes;lodash.inject = reduce;mixin(lodash,(function(){var source={};baseForOwn(lodash,function(func,methodName){if(!lodash.prototype[methodName]){source[methodName] = func;}});return source;})(),false); /*------------------------------------------------------------------------*/ // Add functions capable of returning wrapped and unwrapped values when chaining.
	lodash.sample = sample;lodash.prototype.sample = function(n){if(!this.__chain__ && n == null){return sample(this.value());}return this.thru(function(value){return sample(value,n);});}; /*------------------------------------------------------------------------*/ /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */lodash.VERSION = VERSION; // Assign default placeholders.
	arrayEach(['bind','bindKey','curry','curryRight','partial','partialRight'],function(methodName){lodash[methodName].placeholder = lodash;}); // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
	arrayEach(['drop','take'],function(methodName,index){LazyWrapper.prototype[methodName] = function(n){var filtered=this.__filtered__;if(filtered && !index){return new LazyWrapper(this);}n = n == null?1:nativeMax(nativeFloor(n) || 0,0);var result=this.clone();if(filtered){result.__takeCount__ = nativeMin(result.__takeCount__,n);}else {result.__views__.push({'size':n,'type':methodName + (result.__dir__ < 0?'Right':'')});}return result;};LazyWrapper.prototype[methodName + 'Right'] = function(n){return this.reverse()[methodName](n).reverse();};}); // Add `LazyWrapper` methods that accept an `iteratee` value.
	arrayEach(['filter','map','takeWhile'],function(methodName,index){var type=index + 1,isFilter=type != LAZY_MAP_FLAG;LazyWrapper.prototype[methodName] = function(iteratee,thisArg){var result=this.clone();result.__iteratees__.push({'iteratee':getCallback(iteratee,thisArg,1),'type':type});result.__filtered__ = result.__filtered__ || isFilter;return result;};}); // Add `LazyWrapper` methods for `_.first` and `_.last`.
	arrayEach(['first','last'],function(methodName,index){var takeName='take' + (index?'Right':'');LazyWrapper.prototype[methodName] = function(){return this[takeName](1).value()[0];};}); // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
	arrayEach(['initial','rest'],function(methodName,index){var dropName='drop' + (index?'':'Right');LazyWrapper.prototype[methodName] = function(){return this.__filtered__?new LazyWrapper(this):this[dropName](1);};}); // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
	arrayEach(['pluck','where'],function(methodName,index){var operationName=index?'filter':'map',createCallback=index?baseMatches:property;LazyWrapper.prototype[methodName] = function(value){return this[operationName](createCallback(value));};});LazyWrapper.prototype.compact = function(){return this.filter(identity);};LazyWrapper.prototype.reject = function(predicate,thisArg){predicate = getCallback(predicate,thisArg,1);return this.filter(function(value){return !predicate(value);});};LazyWrapper.prototype.slice = function(start,end){start = start == null?0:+start || 0;var result=this;if(result.__filtered__ && (start > 0 || end < 0)){return new LazyWrapper(result);}if(start < 0){result = result.takeRight(-start);}else if(start){result = result.drop(start);}if(end !== undefined){end = +end || 0;result = end < 0?result.dropRight(-end):result.take(end - start);}return result;};LazyWrapper.prototype.takeRightWhile = function(predicate,thisArg){return this.reverse().takeWhile(predicate,thisArg).reverse();};LazyWrapper.prototype.toArray = function(){return this.take(POSITIVE_INFINITY);}; // Add `LazyWrapper` methods to `lodash.prototype`.
	baseForOwn(LazyWrapper.prototype,function(func,methodName){var checkIteratee=/^(?:filter|map|reject)|While$/.test(methodName),retUnwrapped=/^(?:first|last)$/.test(methodName),lodashFunc=lodash[retUnwrapped?'take' + (methodName == 'last'?'Right':''):methodName];if(!lodashFunc){return;}lodash.prototype[methodName] = function(){var args=retUnwrapped?[1]:arguments,chainAll=this.__chain__,value=this.__wrapped__,isHybrid=!!this.__actions__.length,isLazy=value instanceof LazyWrapper,iteratee=args[0],useLazy=isLazy || isArray(value);if(useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1){ // Avoid lazy use if the iteratee has a "length" value other than `1`.
	isLazy = useLazy = false;}var interceptor=function interceptor(value){return retUnwrapped && chainAll?lodashFunc(value,1)[0]:lodashFunc.apply(undefined,arrayPush([value],args));};var action={'func':thru,'args':[interceptor],'thisArg':undefined},onlyLazy=isLazy && !isHybrid;if(retUnwrapped && !chainAll){if(onlyLazy){value = value.clone();value.__actions__.push(action);return func.call(value);}return lodashFunc.call(undefined,this.value())[0];}if(!retUnwrapped && useLazy){value = onlyLazy?value:new LazyWrapper(this);var result=func.apply(value,args);result.__actions__.push(action);return new LodashWrapper(result,chainAll);}return this.thru(interceptor);};}); // Add `Array` and `String` methods to `lodash.prototype`.
	arrayEach(['join','pop','push','replace','shift','sort','splice','split','unshift'],function(methodName){var func=(/^(?:replace|split)$/.test(methodName)?stringProto:arrayProto)[methodName],chainName=/^(?:push|sort|unshift)$/.test(methodName)?'tap':'thru',retUnwrapped=/^(?:join|pop|replace|shift)$/.test(methodName);lodash.prototype[methodName] = function(){var args=arguments;if(retUnwrapped && !this.__chain__){return func.apply(this.value(),args);}return this[chainName](function(value){return func.apply(value,args);});};}); // Map minified function names to their real names.
	baseForOwn(LazyWrapper.prototype,function(func,methodName){var lodashFunc=lodash[methodName];if(lodashFunc){var key=lodashFunc.name,names=realNames[key] || (realNames[key] = []);names.push({'name':methodName,'func':lodashFunc});}});realNames[createHybridWrapper(undefined,BIND_KEY_FLAG).name] = [{'name':'wrapper','func':undefined}]; // Add functions to the lazy wrapper.
	LazyWrapper.prototype.clone = lazyClone;LazyWrapper.prototype.reverse = lazyReverse;LazyWrapper.prototype.value = lazyValue; // Add chaining functions to the `lodash` wrapper.
	lodash.prototype.chain = wrapperChain;lodash.prototype.commit = wrapperCommit;lodash.prototype.concat = wrapperConcat;lodash.prototype.plant = wrapperPlant;lodash.prototype.reverse = wrapperReverse;lodash.prototype.toString = wrapperToString;lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue; // Add function aliases to the `lodash` wrapper.
	lodash.prototype.collect = lodash.prototype.map;lodash.prototype.head = lodash.prototype.first;lodash.prototype.select = lodash.prototype.filter;lodash.prototype.tail = lodash.prototype.rest;return lodash;} /*--------------------------------------------------------------------------*/ // Export lodash.
	var _=runInContext(); // Some AMD build optimizers like r.js check for condition patterns like the following:
	if(true){ // Expose lodash to the global object when an AMD loader is present to avoid
	// errors in cases where lodash is loaded by a script tag and not intended
	// as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
	// more details.
	root._ = _; // Define as an anonymous module so, through path mapping, it can be
	// referenced as the "underscore" module.
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return _;}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));} // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
	else if(freeExports && freeModule){ // Export for Node.js or RingoJS.
	if(moduleExports){(freeModule.exports = _)._ = _;} // Export for Rhino with CommonJS support.
	else {freeExports._ = _;}}else { // Export for a browser or Rhino.
	root._ = _;}}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module), (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _MockCSSStyleDeclaration = __webpack_require__(9);

	var _MockCSSStyleDeclaration2 = _interopRequireDefault(_MockCSSStyleDeclaration);

	var styleMocksByBrowser = {
	  chrome: __webpack_require__(10),
	  safari: __webpack_require__(11),
	  firefox: __webpack_require__(12)
	};

	exports['default'] = function (_ref) {
	  var browser = _ref.browser;

	  var style = new _MockCSSStyleDeclaration2['default'](styleMocksByBrowser[browser]);
	  var document = {
	    body: { style: style },
	    createElement: function createElement() {
	      return { style: style };
	    }
	  };
	  global.window = {
	    document: document,
	    getComputedStyle: function getComputedStyle() {
	      return style;
	    }
	  };
	  global.document = document;
	  global.mockedBrowser = window.mockedBrowser = browser;

	  delete __webpack_require__.c[/*require.resolve*/(13)];
	  window.prefixProperty = __webpack_require__(13);

	  return window;
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = MockCSSStyleDeclaration;

	var _lodash = __webpack_require__(6);

	function MockCSSStyleDeclaration(styleObj) {
	  var _this = this;

	  (0, _lodash.forEach)(styleObj, function (value, key) {
	    return (0, _lodash.isNaN)((0, _lodash.parseInt)(key)) ? _this[key] = value : _this.push(value);
	  });
	}

	MockCSSStyleDeclaration.prototype = Object.create(Array.prototype);
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = {
		"0": "animation-delay",
		"1": "animation-direction",
		"2": "animation-duration",
		"3": "animation-fill-mode",
		"4": "animation-iteration-count",
		"5": "animation-name",
		"6": "animation-play-state",
		"7": "animation-timing-function",
		"8": "background-attachment",
		"9": "background-blend-mode",
		"10": "background-clip",
		"11": "background-color",
		"12": "background-image",
		"13": "background-origin",
		"14": "background-position",
		"15": "background-repeat",
		"16": "background-size",
		"17": "border-bottom-color",
		"18": "border-bottom-left-radius",
		"19": "border-bottom-right-radius",
		"20": "border-bottom-style",
		"21": "border-bottom-width",
		"22": "border-collapse",
		"23": "border-image-outset",
		"24": "border-image-repeat",
		"25": "border-image-slice",
		"26": "border-image-source",
		"27": "border-image-width",
		"28": "border-left-color",
		"29": "border-left-style",
		"30": "border-left-width",
		"31": "border-right-color",
		"32": "border-right-style",
		"33": "border-right-width",
		"34": "border-top-color",
		"35": "border-top-left-radius",
		"36": "border-top-right-radius",
		"37": "border-top-style",
		"38": "border-top-width",
		"39": "bottom",
		"40": "box-shadow",
		"41": "box-sizing",
		"42": "caption-side",
		"43": "clear",
		"44": "clip",
		"45": "color",
		"46": "cursor",
		"47": "direction",
		"48": "display",
		"49": "empty-cells",
		"50": "float",
		"51": "font-family",
		"52": "font-kerning",
		"53": "font-size",
		"54": "font-stretch",
		"55": "font-style",
		"56": "font-variant",
		"57": "font-variant-ligatures",
		"58": "font-weight",
		"59": "height",
		"60": "image-rendering",
		"61": "isolation",
		"62": "left",
		"63": "letter-spacing",
		"64": "line-height",
		"65": "list-style-image",
		"66": "list-style-position",
		"67": "list-style-type",
		"68": "margin-bottom",
		"69": "margin-left",
		"70": "margin-right",
		"71": "margin-top",
		"72": "max-height",
		"73": "max-width",
		"74": "min-height",
		"75": "min-width",
		"76": "mix-blend-mode",
		"77": "object-fit",
		"78": "object-position",
		"79": "opacity",
		"80": "orphans",
		"81": "outline-color",
		"82": "outline-offset",
		"83": "outline-style",
		"84": "outline-width",
		"85": "overflow-wrap",
		"86": "overflow-x",
		"87": "overflow-y",
		"88": "padding-bottom",
		"89": "padding-left",
		"90": "padding-right",
		"91": "padding-top",
		"92": "page-break-after",
		"93": "page-break-before",
		"94": "page-break-inside",
		"95": "pointer-events",
		"96": "position",
		"97": "resize",
		"98": "right",
		"99": "speak",
		"100": "table-layout",
		"101": "tab-size",
		"102": "text-align",
		"103": "text-decoration",
		"104": "text-indent",
		"105": "text-rendering",
		"106": "text-shadow",
		"107": "text-overflow",
		"108": "text-transform",
		"109": "top",
		"110": "touch-action",
		"111": "transition-delay",
		"112": "transition-duration",
		"113": "transition-property",
		"114": "transition-timing-function",
		"115": "unicode-bidi",
		"116": "vertical-align",
		"117": "visibility",
		"118": "white-space",
		"119": "widows",
		"120": "width",
		"121": "will-change",
		"122": "word-break",
		"123": "word-spacing",
		"124": "word-wrap",
		"125": "z-index",
		"126": "zoom",
		"127": "-webkit-appearance",
		"128": "backface-visibility",
		"129": "-webkit-background-clip",
		"130": "-webkit-background-composite",
		"131": "-webkit-background-origin",
		"132": "-webkit-border-horizontal-spacing",
		"133": "-webkit-border-image",
		"134": "-webkit-border-vertical-spacing",
		"135": "-webkit-box-align",
		"136": "-webkit-box-decoration-break",
		"137": "-webkit-box-direction",
		"138": "-webkit-box-flex",
		"139": "-webkit-box-flex-group",
		"140": "-webkit-box-lines",
		"141": "-webkit-box-ordinal-group",
		"142": "-webkit-box-orient",
		"143": "-webkit-box-pack",
		"144": "-webkit-box-reflect",
		"145": "-webkit-clip-path",
		"146": "-webkit-column-break-after",
		"147": "-webkit-column-break-before",
		"148": "-webkit-column-break-inside",
		"149": "-webkit-column-count",
		"150": "-webkit-column-gap",
		"151": "-webkit-column-rule-color",
		"152": "-webkit-column-rule-style",
		"153": "-webkit-column-rule-width",
		"154": "-webkit-column-span",
		"155": "-webkit-column-width",
		"156": "-webkit-filter",
		"157": "align-content",
		"158": "align-items",
		"159": "align-self",
		"160": "flex-basis",
		"161": "flex-grow",
		"162": "flex-shrink",
		"163": "flex-direction",
		"164": "flex-wrap",
		"165": "justify-content",
		"166": "-webkit-font-smoothing",
		"167": "-webkit-highlight",
		"168": "-webkit-hyphenate-character",
		"169": "-webkit-line-box-contain",
		"170": "-webkit-line-break",
		"171": "-webkit-line-clamp",
		"172": "-webkit-locale",
		"173": "-webkit-margin-before-collapse",
		"174": "-webkit-margin-after-collapse",
		"175": "-webkit-mask-box-image",
		"176": "-webkit-mask-box-image-outset",
		"177": "-webkit-mask-box-image-repeat",
		"178": "-webkit-mask-box-image-slice",
		"179": "-webkit-mask-box-image-source",
		"180": "-webkit-mask-box-image-width",
		"181": "-webkit-mask-clip",
		"182": "-webkit-mask-composite",
		"183": "-webkit-mask-image",
		"184": "-webkit-mask-origin",
		"185": "-webkit-mask-position",
		"186": "-webkit-mask-repeat",
		"187": "-webkit-mask-size",
		"188": "order",
		"189": "perspective",
		"190": "perspective-origin",
		"191": "-webkit-print-color-adjust",
		"192": "-webkit-rtl-ordering",
		"193": "shape-outside",
		"194": "shape-image-threshold",
		"195": "shape-margin",
		"196": "-webkit-tap-highlight-color",
		"197": "-webkit-text-combine",
		"198": "-webkit-text-decorations-in-effect",
		"199": "-webkit-text-emphasis-color",
		"200": "-webkit-text-emphasis-position",
		"201": "-webkit-text-emphasis-style",
		"202": "-webkit-text-fill-color",
		"203": "-webkit-text-orientation",
		"204": "-webkit-text-security",
		"205": "-webkit-text-stroke-color",
		"206": "-webkit-text-stroke-width",
		"207": "transform",
		"208": "transform-origin",
		"209": "transform-style",
		"210": "-webkit-user-drag",
		"211": "-webkit-user-modify",
		"212": "-webkit-user-select",
		"213": "-webkit-writing-mode",
		"214": "-webkit-app-region",
		"215": "buffered-rendering",
		"216": "clip-path",
		"217": "clip-rule",
		"218": "mask",
		"219": "filter",
		"220": "flood-color",
		"221": "flood-opacity",
		"222": "lighting-color",
		"223": "stop-color",
		"224": "stop-opacity",
		"225": "color-interpolation",
		"226": "color-interpolation-filters",
		"227": "color-rendering",
		"228": "fill",
		"229": "fill-opacity",
		"230": "fill-rule",
		"231": "marker-end",
		"232": "marker-mid",
		"233": "marker-start",
		"234": "mask-type",
		"235": "shape-rendering",
		"236": "stroke",
		"237": "stroke-dasharray",
		"238": "stroke-dashoffset",
		"239": "stroke-linecap",
		"240": "stroke-linejoin",
		"241": "stroke-miterlimit",
		"242": "stroke-opacity",
		"243": "stroke-width",
		"244": "alignment-baseline",
		"245": "baseline-shift",
		"246": "dominant-baseline",
		"247": "text-anchor",
		"248": "writing-mode",
		"249": "glyph-orientation-horizontal",
		"250": "glyph-orientation-vertical",
		"251": "vector-effect",
		"252": "paint-order",
		"253": "cx",
		"254": "cy",
		"255": "x",
		"256": "y",
		"257": "r",
		"258": "rx",
		"259": "ry",
		"alignContent": "start",
		"alignItems": "start",
		"alignSelf": "start",
		"alignmentBaseline": "auto",
		"all": "",
		"animation": "none 0s ease 0s 1 normal none running",
		"animationDelay": "0s",
		"animationDirection": "normal",
		"animationDuration": "0s",
		"animationFillMode": "none",
		"animationIterationCount": "1",
		"animationName": "none",
		"animationPlayState": "running",
		"animationTimingFunction": "ease",
		"backfaceVisibility": "visible",
		"background": "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box",
		"backgroundAttachment": "scroll",
		"backgroundBlendMode": "normal",
		"backgroundClip": "border-box",
		"backgroundColor": "rgba(0, 0, 0, 0)",
		"backgroundImage": "none",
		"backgroundOrigin": "padding-box",
		"backgroundPosition": "0% 0%",
		"backgroundPositionX": "0%",
		"backgroundPositionY": "0%",
		"backgroundRepeat": "repeat",
		"backgroundRepeatX": "",
		"backgroundRepeatY": "",
		"backgroundSize": "auto",
		"baselineShift": "0px",
		"border": "0px none rgb(0, 0, 0)",
		"borderBottom": "0px none rgb(0, 0, 0)",
		"borderBottomColor": "rgb(0, 0, 0)",
		"borderBottomLeftRadius": "0px",
		"borderBottomRightRadius": "0px",
		"borderBottomStyle": "none",
		"borderBottomWidth": "0px",
		"borderCollapse": "separate",
		"borderColor": "rgb(0, 0, 0)",
		"borderImage": "none",
		"borderImageOutset": "0px",
		"borderImageRepeat": "stretch",
		"borderImageSlice": "100%",
		"borderImageSource": "none",
		"borderImageWidth": "1",
		"borderLeft": "0px none rgb(0, 0, 0)",
		"borderLeftColor": "rgb(0, 0, 0)",
		"borderLeftStyle": "none",
		"borderLeftWidth": "0px",
		"borderRadius": "0px",
		"borderRight": "0px none rgb(0, 0, 0)",
		"borderRightColor": "rgb(0, 0, 0)",
		"borderRightStyle": "none",
		"borderRightWidth": "0px",
		"borderSpacing": "0px 0px",
		"borderStyle": "none",
		"borderTop": "0px none rgb(0, 0, 0)",
		"borderTopColor": "rgb(0, 0, 0)",
		"borderTopLeftRadius": "0px",
		"borderTopRightRadius": "0px",
		"borderTopStyle": "none",
		"borderTopWidth": "0px",
		"borderWidth": "0px",
		"bottom": "auto",
		"boxShadow": "none",
		"boxSizing": "content-box",
		"bufferedRendering": "auto",
		"captionSide": "top",
		"clear": "none",
		"clip": "auto",
		"clipPath": "none",
		"clipRule": "nonzero",
		"color": "rgb(0, 0, 0)",
		"colorInterpolation": "sRGB",
		"colorInterpolationFilters": "linearRGB",
		"colorRendering": "auto",
		"content": "",
		"counterIncrement": "none",
		"counterReset": "none",
		"cursor": "auto",
		"cx": "0px",
		"cy": "0px",
		"direction": "ltr",
		"display": "block",
		"dominantBaseline": "auto",
		"emptyCells": "show",
		"fill": "rgb(0, 0, 0)",
		"fillOpacity": "1",
		"fillRule": "nonzero",
		"filter": "none",
		"flex": "0 1 auto",
		"flexBasis": "auto",
		"flexDirection": "row",
		"flexFlow": "row nowrap",
		"flexGrow": "0",
		"flexShrink": "1",
		"flexWrap": "nowrap",
		"float": "none",
		"floodColor": "rgb(0, 0, 0)",
		"floodOpacity": "1",
		"font": "normal normal normal normal 16px / normal Times",
		"fontFamily": "Times",
		"fontKerning": "auto",
		"fontSize": "16px",
		"fontStretch": "normal",
		"fontStyle": "normal",
		"fontVariant": "normal",
		"fontVariantLigatures": "normal",
		"fontWeight": "normal",
		"glyphOrientationHorizontal": "0deg",
		"glyphOrientationVertical": "auto",
		"height": "928px",
		"imageRendering": "auto",
		"isolation": "auto",
		"justifyContent": "start",
		"left": "auto",
		"letterSpacing": "normal",
		"lightingColor": "rgb(255, 255, 255)",
		"lineHeight": "normal",
		"listStyle": "disc outside none",
		"listStyleImage": "none",
		"listStylePosition": "outside",
		"listStyleType": "disc",
		"margin": "0px",
		"marginBottom": "0px",
		"marginLeft": "0px",
		"marginRight": "0px",
		"marginTop": "0px",
		"marker": "",
		"markerEnd": "none",
		"markerMid": "none",
		"markerStart": "none",
		"mask": "none",
		"maskType": "luminance",
		"maxHeight": "none",
		"maxWidth": "none",
		"maxZoom": "",
		"minHeight": "0px",
		"minWidth": "0px",
		"minZoom": "",
		"mixBlendMode": "normal",
		"objectFit": "fill",
		"objectPosition": "50% 50%",
		"opacity": "1",
		"order": "0",
		"orientation": "",
		"orphans": "auto",
		"outline": "rgb(0, 0, 0) none 0px",
		"outlineColor": "rgb(0, 0, 0)",
		"outlineOffset": "0px",
		"outlineStyle": "none",
		"outlineWidth": "0px",
		"overflow": "visible",
		"overflowWrap": "normal",
		"overflowX": "visible",
		"overflowY": "visible",
		"padding": "0px",
		"paddingBottom": "0px",
		"paddingLeft": "0px",
		"paddingRight": "0px",
		"paddingTop": "0px",
		"page": "",
		"pageBreakAfter": "auto",
		"pageBreakBefore": "auto",
		"pageBreakInside": "auto",
		"paintOrder": "fill stroke markers",
		"perspective": "none",
		"perspectiveOrigin": "840px 464px",
		"pointerEvents": "auto",
		"position": "static",
		"quotes": "",
		"r": "0px",
		"resize": "none",
		"right": "auto",
		"rx": "0px",
		"ry": "0px",
		"shapeImageThreshold": "0",
		"shapeMargin": "0px",
		"shapeOutside": "none",
		"shapeRendering": "auto",
		"size": "",
		"speak": "normal",
		"src": "",
		"stopColor": "rgb(0, 0, 0)",
		"stopOpacity": "1",
		"stroke": "none",
		"strokeDasharray": "none",
		"strokeDashoffset": "0px",
		"strokeLinecap": "butt",
		"strokeLinejoin": "miter",
		"strokeMiterlimit": "4",
		"strokeOpacity": "1",
		"strokeWidth": "1px",
		"tabSize": "8",
		"tableLayout": "auto",
		"textAlign": "start",
		"textAnchor": "start",
		"textDecoration": "none",
		"textIndent": "0px",
		"textOverflow": "clip",
		"textRendering": "auto",
		"textShadow": "none",
		"textTransform": "none",
		"top": "auto",
		"touchAction": "auto",
		"transform": "none",
		"transformOrigin": "840px 464px",
		"transformStyle": "flat",
		"transition": "all 0s ease 0s",
		"transitionDelay": "0s",
		"transitionDuration": "0s",
		"transitionProperty": "all",
		"transitionTimingFunction": "ease",
		"unicodeBidi": "normal",
		"unicodeRange": "",
		"userZoom": "",
		"vectorEffect": "none",
		"verticalAlign": "baseline",
		"visibility": "visible",
		"webkitAppRegion": "no-drag",
		"WebkitAppRegion": "no-drag",
		"webkitAppearance": "none",
		"WebkitAppearance": "none",
		"webkitBackgroundClip": "border-box",
		"WebkitBackgroundClip": "border-box",
		"webkitBackgroundComposite": "source-over",
		"WebkitBackgroundComposite": "source-over",
		"webkitBackgroundOrigin": "padding-box",
		"WebkitBackgroundOrigin": "padding-box",
		"webkitBorderAfter": "0px none rgb(0, 0, 0)",
		"WebkitBorderAfter": "0px none rgb(0, 0, 0)",
		"webkitBorderAfterColor": "rgb(0, 0, 0)",
		"WebkitBorderAfterColor": "rgb(0, 0, 0)",
		"webkitBorderAfterStyle": "none",
		"WebkitBorderAfterStyle": "none",
		"webkitBorderAfterWidth": "0px",
		"WebkitBorderAfterWidth": "0px",
		"webkitBorderBefore": "0px none rgb(0, 0, 0)",
		"WebkitBorderBefore": "0px none rgb(0, 0, 0)",
		"webkitBorderBeforeColor": "rgb(0, 0, 0)",
		"WebkitBorderBeforeColor": "rgb(0, 0, 0)",
		"webkitBorderBeforeStyle": "none",
		"WebkitBorderBeforeStyle": "none",
		"webkitBorderBeforeWidth": "0px",
		"WebkitBorderBeforeWidth": "0px",
		"webkitBorderEnd": "0px none rgb(0, 0, 0)",
		"WebkitBorderEnd": "0px none rgb(0, 0, 0)",
		"webkitBorderEndColor": "rgb(0, 0, 0)",
		"WebkitBorderEndColor": "rgb(0, 0, 0)",
		"webkitBorderEndStyle": "none",
		"WebkitBorderEndStyle": "none",
		"webkitBorderEndWidth": "0px",
		"WebkitBorderEndWidth": "0px",
		"webkitBorderHorizontalSpacing": "0px",
		"WebkitBorderHorizontalSpacing": "0px",
		"webkitBorderImage": "none",
		"WebkitBorderImage": "none",
		"webkitBorderStart": "0px none rgb(0, 0, 0)",
		"WebkitBorderStart": "0px none rgb(0, 0, 0)",
		"webkitBorderStartColor": "rgb(0, 0, 0)",
		"WebkitBorderStartColor": "rgb(0, 0, 0)",
		"webkitBorderStartStyle": "none",
		"WebkitBorderStartStyle": "none",
		"webkitBorderStartWidth": "0px",
		"WebkitBorderStartWidth": "0px",
		"webkitBorderVerticalSpacing": "0px",
		"WebkitBorderVerticalSpacing": "0px",
		"webkitBoxAlign": "stretch",
		"WebkitBoxAlign": "stretch",
		"webkitBoxDecorationBreak": "slice",
		"WebkitBoxDecorationBreak": "slice",
		"webkitBoxDirection": "normal",
		"WebkitBoxDirection": "normal",
		"webkitBoxFlex": "0",
		"WebkitBoxFlex": "0",
		"webkitBoxFlexGroup": "1",
		"WebkitBoxFlexGroup": "1",
		"webkitBoxLines": "single",
		"WebkitBoxLines": "single",
		"webkitBoxOrdinalGroup": "1",
		"WebkitBoxOrdinalGroup": "1",
		"webkitBoxOrient": "horizontal",
		"WebkitBoxOrient": "horizontal",
		"webkitBoxPack": "start",
		"WebkitBoxPack": "start",
		"webkitBoxReflect": "none",
		"WebkitBoxReflect": "none",
		"webkitClipPath": "none",
		"WebkitClipPath": "none",
		"webkitColumnBreakAfter": "auto",
		"WebkitColumnBreakAfter": "auto",
		"webkitColumnBreakBefore": "auto",
		"WebkitColumnBreakBefore": "auto",
		"webkitColumnBreakInside": "auto",
		"WebkitColumnBreakInside": "auto",
		"webkitColumnCount": "auto",
		"WebkitColumnCount": "auto",
		"webkitColumnGap": "normal",
		"WebkitColumnGap": "normal",
		"webkitColumnRule": "0px none rgb(0, 0, 0)",
		"WebkitColumnRule": "0px none rgb(0, 0, 0)",
		"webkitColumnRuleColor": "rgb(0, 0, 0)",
		"WebkitColumnRuleColor": "rgb(0, 0, 0)",
		"webkitColumnRuleStyle": "none",
		"WebkitColumnRuleStyle": "none",
		"webkitColumnRuleWidth": "0px",
		"WebkitColumnRuleWidth": "0px",
		"webkitColumnSpan": "none",
		"WebkitColumnSpan": "none",
		"webkitColumnWidth": "auto",
		"WebkitColumnWidth": "auto",
		"webkitColumns": "auto auto",
		"WebkitColumns": "auto auto",
		"webkitFilter": "none",
		"WebkitFilter": "none",
		"webkitFontFeatureSettings": "normal",
		"WebkitFontFeatureSettings": "normal",
		"webkitFontSizeDelta": "",
		"WebkitFontSizeDelta": "",
		"webkitFontSmoothing": "auto",
		"WebkitFontSmoothing": "auto",
		"webkitHighlight": "none",
		"WebkitHighlight": "none",
		"webkitHyphenateCharacter": "auto",
		"WebkitHyphenateCharacter": "auto",
		"webkitLineBoxContain": "block inline replaced",
		"WebkitLineBoxContain": "block inline replaced",
		"webkitLineBreak": "auto",
		"WebkitLineBreak": "auto",
		"webkitLineClamp": "none",
		"WebkitLineClamp": "none",
		"webkitLocale": "auto",
		"WebkitLocale": "auto",
		"webkitLogicalHeight": "928px",
		"WebkitLogicalHeight": "928px",
		"webkitLogicalWidth": "1680px",
		"WebkitLogicalWidth": "1680px",
		"webkitMarginAfter": "0px",
		"WebkitMarginAfter": "0px",
		"webkitMarginAfterCollapse": "collapse",
		"WebkitMarginAfterCollapse": "collapse",
		"webkitMarginBefore": "0px",
		"WebkitMarginBefore": "0px",
		"webkitMarginBeforeCollapse": "collapse",
		"WebkitMarginBeforeCollapse": "collapse",
		"webkitMarginBottomCollapse": "collapse",
		"WebkitMarginBottomCollapse": "collapse",
		"webkitMarginCollapse": "",
		"WebkitMarginCollapse": "",
		"webkitMarginEnd": "0px",
		"WebkitMarginEnd": "0px",
		"webkitMarginStart": "0px",
		"WebkitMarginStart": "0px",
		"webkitMarginTopCollapse": "collapse",
		"WebkitMarginTopCollapse": "collapse",
		"webkitMask": "",
		"WebkitMask": "",
		"webkitMaskBoxImage": "none",
		"WebkitMaskBoxImage": "none",
		"webkitMaskBoxImageOutset": "0px",
		"WebkitMaskBoxImageOutset": "0px",
		"webkitMaskBoxImageRepeat": "stretch",
		"WebkitMaskBoxImageRepeat": "stretch",
		"webkitMaskBoxImageSlice": "0 fill",
		"WebkitMaskBoxImageSlice": "0 fill",
		"webkitMaskBoxImageSource": "none",
		"WebkitMaskBoxImageSource": "none",
		"webkitMaskBoxImageWidth": "auto",
		"WebkitMaskBoxImageWidth": "auto",
		"webkitMaskClip": "border-box",
		"WebkitMaskClip": "border-box",
		"webkitMaskComposite": "source-over",
		"WebkitMaskComposite": "source-over",
		"webkitMaskImage": "none",
		"WebkitMaskImage": "none",
		"webkitMaskOrigin": "border-box",
		"WebkitMaskOrigin": "border-box",
		"webkitMaskPosition": "0% 0%",
		"WebkitMaskPosition": "0% 0%",
		"webkitMaskPositionX": "0%",
		"WebkitMaskPositionX": "0%",
		"webkitMaskPositionY": "0%",
		"WebkitMaskPositionY": "0%",
		"webkitMaskRepeat": "repeat",
		"WebkitMaskRepeat": "repeat",
		"webkitMaskRepeatX": "",
		"WebkitMaskRepeatX": "",
		"webkitMaskRepeatY": "",
		"WebkitMaskRepeatY": "",
		"webkitMaskSize": "auto",
		"WebkitMaskSize": "auto",
		"webkitMaxLogicalHeight": "none",
		"WebkitMaxLogicalHeight": "none",
		"webkitMaxLogicalWidth": "none",
		"WebkitMaxLogicalWidth": "none",
		"webkitMinLogicalHeight": "0px",
		"WebkitMinLogicalHeight": "0px",
		"webkitMinLogicalWidth": "0px",
		"WebkitMinLogicalWidth": "0px",
		"webkitPaddingAfter": "0px",
		"WebkitPaddingAfter": "0px",
		"webkitPaddingBefore": "0px",
		"WebkitPaddingBefore": "0px",
		"webkitPaddingEnd": "0px",
		"WebkitPaddingEnd": "0px",
		"webkitPaddingStart": "0px",
		"WebkitPaddingStart": "0px",
		"webkitPerspectiveOriginX": "",
		"WebkitPerspectiveOriginX": "",
		"webkitPerspectiveOriginY": "",
		"WebkitPerspectiveOriginY": "",
		"webkitPrintColorAdjust": "economy",
		"WebkitPrintColorAdjust": "economy",
		"webkitRtlOrdering": "logical",
		"WebkitRtlOrdering": "logical",
		"webkitRubyPosition": "before",
		"WebkitRubyPosition": "before",
		"webkitTapHighlightColor": "rgba(0, 0, 0, 0.4)",
		"WebkitTapHighlightColor": "rgba(0, 0, 0, 0.4)",
		"webkitTextCombine": "none",
		"WebkitTextCombine": "none",
		"webkitTextDecorationsInEffect": "none",
		"WebkitTextDecorationsInEffect": "none",
		"webkitTextEmphasis": "",
		"WebkitTextEmphasis": "",
		"webkitTextEmphasisColor": "rgb(0, 0, 0)",
		"WebkitTextEmphasisColor": "rgb(0, 0, 0)",
		"webkitTextEmphasisPosition": "over",
		"WebkitTextEmphasisPosition": "over",
		"webkitTextEmphasisStyle": "none",
		"WebkitTextEmphasisStyle": "none",
		"webkitTextFillColor": "rgb(0, 0, 0)",
		"WebkitTextFillColor": "rgb(0, 0, 0)",
		"webkitTextOrientation": "vertical-right",
		"WebkitTextOrientation": "vertical-right",
		"webkitTextSecurity": "none",
		"WebkitTextSecurity": "none",
		"webkitTextStroke": "",
		"WebkitTextStroke": "",
		"webkitTextStrokeColor": "rgb(0, 0, 0)",
		"WebkitTextStrokeColor": "rgb(0, 0, 0)",
		"webkitTextStrokeWidth": "0px",
		"WebkitTextStrokeWidth": "0px",
		"webkitTransformOriginX": "",
		"WebkitTransformOriginX": "",
		"webkitTransformOriginY": "",
		"WebkitTransformOriginY": "",
		"webkitTransformOriginZ": "",
		"WebkitTransformOriginZ": "",
		"webkitUserDrag": "auto",
		"WebkitUserDrag": "auto",
		"webkitUserModify": "read-only",
		"WebkitUserModify": "read-only",
		"webkitUserSelect": "text",
		"WebkitUserSelect": "text",
		"webkitWritingMode": "horizontal-tb",
		"WebkitWritingMode": "horizontal-tb",
		"whiteSpace": "normal",
		"widows": "1",
		"width": "1680px",
		"willChange": "auto",
		"wordBreak": "normal",
		"wordSpacing": "0px",
		"wordWrap": "normal",
		"writingMode": "lr-tb",
		"x": "0px",
		"y": "0px",
		"zIndex": "0",
		"zoom": "1",
		"-webkit-app-region": "",
		"-webkit-appearance": "",
		"-webkit-background-clip": "",
		"-webkit-background-composite": "",
		"-webkit-background-origin": "",
		"-webkit-border-after": "",
		"-webkit-border-after-color": "",
		"-webkit-border-after-style": "",
		"-webkit-border-after-width": "",
		"-webkit-border-before": "",
		"-webkit-border-before-color": "",
		"-webkit-border-before-style": "",
		"-webkit-border-before-width": "",
		"-webkit-border-end": "",
		"-webkit-border-end-color": "",
		"-webkit-border-end-style": "",
		"-webkit-border-end-width": "",
		"-webkit-border-horizontal-spacing": "",
		"-webkit-border-image": "",
		"-webkit-border-start": "",
		"-webkit-border-start-color": "",
		"-webkit-border-start-style": "",
		"-webkit-border-start-width": "",
		"-webkit-border-vertical-spacing": "",
		"-webkit-box-align": "",
		"-webkit-box-decoration-break": "",
		"-webkit-box-direction": "",
		"-webkit-box-flex": "",
		"-webkit-box-flex-group": "",
		"-webkit-box-lines": "",
		"-webkit-box-ordinal-group": "",
		"-webkit-box-orient": "",
		"-webkit-box-pack": "",
		"-webkit-box-reflect": "",
		"-webkit-clip-path": "",
		"-webkit-column-break-after": "",
		"-webkit-column-break-before": "",
		"-webkit-column-break-inside": "",
		"-webkit-column-count": "",
		"-webkit-column-gap": "",
		"-webkit-column-rule": "",
		"-webkit-column-rule-color": "",
		"-webkit-column-rule-style": "",
		"-webkit-column-rule-width": "",
		"-webkit-column-span": "",
		"-webkit-column-width": "",
		"-webkit-columns": "",
		"-webkit-filter": "",
		"-webkit-font-feature-settings": "",
		"-webkit-font-size-delta": "",
		"-webkit-font-smoothing": "",
		"-webkit-highlight": "",
		"-webkit-hyphenate-character": "",
		"-webkit-line-box-contain": "",
		"-webkit-line-break": "",
		"-webkit-line-clamp": "",
		"-webkit-locale": "",
		"-webkit-logical-height": "",
		"-webkit-logical-width": "",
		"-webkit-margin-after": "",
		"-webkit-margin-after-collapse": "",
		"-webkit-margin-before": "",
		"-webkit-margin-before-collapse": "",
		"-webkit-margin-bottom-collapse": "",
		"-webkit-margin-collapse": "",
		"-webkit-margin-end": "",
		"-webkit-margin-start": "",
		"-webkit-margin-top-collapse": "",
		"-webkit-mask": "",
		"-webkit-mask-box-image": "",
		"-webkit-mask-box-image-outset": "",
		"-webkit-mask-box-image-repeat": "",
		"-webkit-mask-box-image-slice": "",
		"-webkit-mask-box-image-source": "",
		"-webkit-mask-box-image-width": "",
		"-webkit-mask-clip": "",
		"-webkit-mask-composite": "",
		"-webkit-mask-image": "",
		"-webkit-mask-origin": "",
		"-webkit-mask-position": "",
		"-webkit-mask-position-x": "",
		"-webkit-mask-position-y": "",
		"-webkit-mask-repeat": "",
		"-webkit-mask-repeat-x": "",
		"-webkit-mask-repeat-y": "",
		"-webkit-mask-size": "",
		"-webkit-max-logical-height": "",
		"-webkit-max-logical-width": "",
		"-webkit-min-logical-height": "",
		"-webkit-min-logical-width": "",
		"-webkit-padding-after": "",
		"-webkit-padding-before": "",
		"-webkit-padding-end": "",
		"-webkit-padding-start": "",
		"-webkit-perspective-origin-x": "",
		"-webkit-perspective-origin-y": "",
		"-webkit-print-color-adjust": "",
		"-webkit-rtl-ordering": "",
		"-webkit-ruby-position": "",
		"-webkit-tap-highlight-color": "",
		"-webkit-text-combine": "",
		"-webkit-text-decorations-in-effect": "",
		"-webkit-text-emphasis": "",
		"-webkit-text-emphasis-color": "",
		"-webkit-text-emphasis-position": "",
		"-webkit-text-emphasis-style": "",
		"-webkit-text-fill-color": "",
		"-webkit-text-orientation": "",
		"-webkit-text-security": "",
		"-webkit-text-stroke": "",
		"-webkit-text-stroke-color": "",
		"-webkit-text-stroke-width": "",
		"-webkit-transform-origin-x": "",
		"-webkit-transform-origin-y": "",
		"-webkit-transform-origin-z": "",
		"-webkit-user-drag": "",
		"-webkit-user-modify": "",
		"-webkit-user-select": "",
		"-webkit-writing-mode": "",
		"align-content": "",
		"align-items": "",
		"align-self": "",
		"alignment-baseline": "",
		"animation-delay": "",
		"animation-direction": "",
		"animation-duration": "",
		"animation-fill-mode": "",
		"animation-iteration-count": "",
		"animation-name": "",
		"animation-play-state": "",
		"animation-timing-function": "",
		"backface-visibility": "",
		"background-attachment": "",
		"background-blend-mode": "",
		"background-clip": "",
		"background-color": "",
		"background-image": "",
		"background-origin": "",
		"background-position": "",
		"background-position-x": "",
		"background-position-y": "",
		"background-repeat": "",
		"background-repeat-x": "",
		"background-repeat-y": "",
		"background-size": "",
		"baseline-shift": "",
		"border-bottom": "",
		"border-bottom-color": "",
		"border-bottom-left-radius": "",
		"border-bottom-right-radius": "",
		"border-bottom-style": "",
		"border-bottom-width": "",
		"border-collapse": "",
		"border-color": "",
		"border-image": "",
		"border-image-outset": "",
		"border-image-repeat": "",
		"border-image-slice": "",
		"border-image-source": "",
		"border-image-width": "",
		"border-left": "",
		"border-left-color": "",
		"border-left-style": "",
		"border-left-width": "",
		"border-radius": "",
		"border-right": "",
		"border-right-color": "",
		"border-right-style": "",
		"border-right-width": "",
		"border-spacing": "",
		"border-style": "",
		"border-top": "",
		"border-top-color": "",
		"border-top-left-radius": "",
		"border-top-right-radius": "",
		"border-top-style": "",
		"border-top-width": "",
		"border-width": "",
		"box-shadow": "",
		"box-sizing": "",
		"buffered-rendering": "",
		"caption-side": "",
		"clip-path": "",
		"clip-rule": "",
		"color-interpolation": "",
		"color-interpolation-filters": "",
		"color-rendering": "",
		"counter-increment": "",
		"counter-reset": "",
		"dominant-baseline": "",
		"empty-cells": "",
		"fill-opacity": "",
		"fill-rule": "",
		"flex-basis": "",
		"flex-direction": "",
		"flex-flow": "",
		"flex-grow": "",
		"flex-shrink": "",
		"flex-wrap": "",
		"flood-color": "",
		"flood-opacity": "",
		"font-family": "",
		"font-kerning": "",
		"font-size": "",
		"font-stretch": "",
		"font-style": "",
		"font-variant": "",
		"font-variant-ligatures": "",
		"font-weight": "",
		"glyph-orientation-horizontal": "",
		"glyph-orientation-vertical": "",
		"image-rendering": "",
		"justify-content": "",
		"letter-spacing": "",
		"lighting-color": "",
		"line-height": "",
		"list-style": "",
		"list-style-image": "",
		"list-style-position": "",
		"list-style-type": "",
		"margin-bottom": "",
		"margin-left": "",
		"margin-right": "",
		"margin-top": "",
		"marker-end": "",
		"marker-mid": "",
		"marker-start": "",
		"mask-type": "",
		"max-height": "",
		"max-width": "",
		"max-zoom": "",
		"min-height": "",
		"min-width": "",
		"min-zoom": "",
		"mix-blend-mode": "",
		"object-fit": "",
		"object-position": "",
		"outline-color": "",
		"outline-offset": "",
		"outline-style": "",
		"outline-width": "",
		"overflow-wrap": "",
		"overflow-x": "",
		"overflow-y": "",
		"padding-bottom": "",
		"padding-left": "",
		"padding-right": "",
		"padding-top": "",
		"page-break-after": "",
		"page-break-before": "",
		"page-break-inside": "",
		"paint-order": "",
		"perspective-origin": "",
		"pointer-events": "",
		"shape-image-threshold": "",
		"shape-margin": "",
		"shape-outside": "",
		"shape-rendering": "",
		"stop-color": "",
		"stop-opacity": "",
		"stroke-dasharray": "",
		"stroke-dashoffset": "",
		"stroke-linecap": "",
		"stroke-linejoin": "",
		"stroke-miterlimit": "",
		"stroke-opacity": "",
		"stroke-width": "",
		"tab-size": "",
		"table-layout": "",
		"text-align": "",
		"text-anchor": "",
		"text-decoration": "",
		"text-indent": "",
		"text-overflow": "",
		"text-rendering": "",
		"text-shadow": "",
		"text-transform": "",
		"touch-action": "",
		"transform-origin": "",
		"transform-style": "",
		"transition-delay": "",
		"transition-duration": "",
		"transition-property": "",
		"transition-timing-function": "",
		"unicode-bidi": "",
		"unicode-range": "",
		"user-zoom": "",
		"vector-effect": "",
		"vertical-align": "",
		"white-space": "",
		"will-change": "",
		"word-break": "",
		"word-spacing": "",
		"word-wrap": "",
		"writing-mode": "",
		"z-index": ""
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {
		"0": "alt",
		"1": "animation-delay",
		"2": "animation-direction",
		"3": "animation-duration",
		"4": "animation-fill-mode",
		"5": "animation-iteration-count",
		"6": "animation-name",
		"7": "animation-play-state",
		"8": "animation-timing-function",
		"9": "background-attachment",
		"10": "background-blend-mode",
		"11": "background-clip",
		"12": "background-color",
		"13": "background-image",
		"14": "background-origin",
		"15": "background-position",
		"16": "background-repeat",
		"17": "background-size",
		"18": "border-bottom-color",
		"19": "border-bottom-left-radius",
		"20": "border-bottom-right-radius",
		"21": "border-bottom-style",
		"22": "border-bottom-width",
		"23": "border-collapse",
		"24": "border-image-outset",
		"25": "border-image-repeat",
		"26": "border-image-slice",
		"27": "border-image-source",
		"28": "border-image-width",
		"29": "border-left-color",
		"30": "border-left-style",
		"31": "border-left-width",
		"32": "border-right-color",
		"33": "border-right-style",
		"34": "border-right-width",
		"35": "border-top-color",
		"36": "border-top-left-radius",
		"37": "border-top-right-radius",
		"38": "border-top-style",
		"39": "border-top-width",
		"40": "bottom",
		"41": "box-shadow",
		"42": "box-sizing",
		"43": "caption-side",
		"44": "clear",
		"45": "clip",
		"46": "color",
		"47": "cursor",
		"48": "direction",
		"49": "display",
		"50": "empty-cells",
		"51": "float",
		"52": "font-family",
		"53": "font-size",
		"54": "font-style",
		"55": "font-synthesis",
		"56": "font-variant",
		"57": "font-weight",
		"58": "height",
		"59": "image-rendering",
		"60": "left",
		"61": "letter-spacing",
		"62": "line-height",
		"63": "list-style-image",
		"64": "list-style-position",
		"65": "list-style-type",
		"66": "margin-bottom",
		"67": "margin-left",
		"68": "margin-right",
		"69": "margin-top",
		"70": "max-height",
		"71": "max-width",
		"72": "min-height",
		"73": "min-width",
		"74": "opacity",
		"75": "orphans",
		"76": "outline-color",
		"77": "outline-offset",
		"78": "outline-style",
		"79": "outline-width",
		"80": "overflow-wrap",
		"81": "overflow-x",
		"82": "overflow-y",
		"83": "padding-bottom",
		"84": "padding-left",
		"85": "padding-right",
		"86": "padding-top",
		"87": "page-break-after",
		"88": "page-break-before",
		"89": "page-break-inside",
		"90": "pointer-events",
		"91": "position",
		"92": "resize",
		"93": "right",
		"94": "speak",
		"95": "table-layout",
		"96": "tab-size",
		"97": "text-align",
		"98": "text-decoration",
		"99": "-webkit-text-decoration-line",
		"100": "-webkit-text-decoration-style",
		"101": "-webkit-text-decoration-color",
		"102": "-webkit-text-decoration-skip",
		"103": "-webkit-text-underline-position",
		"104": "text-indent",
		"105": "text-rendering",
		"106": "text-shadow",
		"107": "text-overflow",
		"108": "text-transform",
		"109": "top",
		"110": "transform",
		"111": "transform-origin",
		"112": "transform-style",
		"113": "transition-delay",
		"114": "transition-duration",
		"115": "transition-property",
		"116": "transition-timing-function",
		"117": "unicode-bidi",
		"118": "vertical-align",
		"119": "visibility",
		"120": "white-space",
		"121": "widows",
		"122": "width",
		"123": "word-break",
		"124": "word-spacing",
		"125": "word-wrap",
		"126": "-webkit-scroll-snap-type",
		"127": "-webkit-scroll-snap-points-x",
		"128": "-webkit-scroll-snap-points-y",
		"129": "-webkit-scroll-snap-destination",
		"130": "-webkit-scroll-snap-coordinate",
		"131": "z-index",
		"132": "zoom",
		"133": "-webkit-animation-delay",
		"134": "-webkit-animation-direction",
		"135": "-webkit-animation-duration",
		"136": "-webkit-animation-fill-mode",
		"137": "-webkit-animation-iteration-count",
		"138": "-webkit-animation-name",
		"139": "-webkit-animation-play-state",
		"140": "-webkit-animation-timing-function",
		"141": "-webkit-appearance",
		"142": "-webkit-backface-visibility",
		"143": "-webkit-background-clip",
		"144": "-webkit-background-composite",
		"145": "-webkit-background-origin",
		"146": "-webkit-background-size",
		"147": "mix-blend-mode",
		"148": "isolation",
		"149": "-webkit-border-fit",
		"150": "-webkit-border-horizontal-spacing",
		"151": "-webkit-border-image",
		"152": "-webkit-border-vertical-spacing",
		"153": "-webkit-box-align",
		"154": "-webkit-box-decoration-break",
		"155": "-webkit-box-direction",
		"156": "-webkit-box-flex",
		"157": "-webkit-box-flex-group",
		"158": "-webkit-box-lines",
		"159": "-webkit-box-ordinal-group",
		"160": "-webkit-box-orient",
		"161": "-webkit-box-pack",
		"162": "-webkit-box-reflect",
		"163": "-webkit-box-shadow",
		"164": "-webkit-clip-path",
		"165": "-webkit-color-correction",
		"166": "-webkit-column-break-after",
		"167": "-webkit-column-break-before",
		"168": "-webkit-column-break-inside",
		"169": "-webkit-column-axis",
		"170": "column-count",
		"171": "column-fill",
		"172": "column-gap",
		"173": "column-progression",
		"174": "column-rule-color",
		"175": "column-rule-style",
		"176": "column-rule-width",
		"177": "column-span",
		"178": "column-width",
		"179": "-webkit-cursor-visibility",
		"180": "-webkit-dashboard-region",
		"181": "align-content",
		"182": "align-items",
		"183": "align-self",
		"184": "flex-basis",
		"185": "flex-grow",
		"186": "flex-shrink",
		"187": "flex-direction",
		"188": "flex-wrap",
		"189": "justify-content",
		"190": "justify-self",
		"191": "justify-items",
		"192": "-webkit-filter",
		"193": "-webkit-backdrop-filter",
		"194": "-webkit-font-kerning",
		"195": "-webkit-font-smoothing",
		"196": "-webkit-font-variant-ligatures",
		"197": "-webkit-hyphenate-character",
		"198": "-webkit-hyphenate-limit-after",
		"199": "-webkit-hyphenate-limit-before",
		"200": "-webkit-hyphenate-limit-lines",
		"201": "-webkit-hyphens",
		"202": "-webkit-initial-letter",
		"203": "-webkit-line-align",
		"204": "-webkit-line-box-contain",
		"205": "-webkit-line-break",
		"206": "-webkit-line-clamp",
		"207": "-webkit-line-grid",
		"208": "-webkit-line-snap",
		"209": "-webkit-locale",
		"210": "-webkit-margin-before-collapse",
		"211": "-webkit-margin-after-collapse",
		"212": "-webkit-marquee-direction",
		"213": "-webkit-marquee-increment",
		"214": "-webkit-marquee-repetition",
		"215": "-webkit-marquee-style",
		"216": "-webkit-mask-box-image",
		"217": "-webkit-mask-box-image-outset",
		"218": "-webkit-mask-box-image-repeat",
		"219": "-webkit-mask-box-image-slice",
		"220": "-webkit-mask-box-image-source",
		"221": "-webkit-mask-box-image-width",
		"222": "-webkit-mask-clip",
		"223": "-webkit-mask-composite",
		"224": "-webkit-mask-image",
		"225": "-webkit-mask-origin",
		"226": "-webkit-mask-position",
		"227": "-webkit-mask-repeat",
		"228": "-webkit-mask-size",
		"229": "-webkit-mask-source-type",
		"230": "-webkit-nbsp-mode",
		"231": "order",
		"232": "perspective",
		"233": "perspective-origin",
		"234": "-webkit-print-color-adjust",
		"235": "-webkit-rtl-ordering",
		"236": "-webkit-shape-outside",
		"237": "-webkit-text-combine",
		"238": "-webkit-text-decorations-in-effect",
		"239": "-webkit-text-emphasis-color",
		"240": "-webkit-text-emphasis-position",
		"241": "-webkit-text-emphasis-style",
		"242": "-webkit-text-fill-color",
		"243": "-webkit-text-orientation",
		"244": "-webkit-text-security",
		"245": "-webkit-text-stroke-color",
		"246": "-webkit-text-stroke-width",
		"247": "-webkit-transform-style",
		"248": "-webkit-transition-delay",
		"249": "-webkit-transition-duration",
		"250": "-webkit-transition-property",
		"251": "-webkit-transition-timing-function",
		"252": "-webkit-user-drag",
		"253": "-webkit-user-modify",
		"254": "-webkit-user-select",
		"255": "-webkit-writing-mode",
		"256": "-webkit-flow-into",
		"257": "-webkit-flow-from",
		"258": "-webkit-region-break-after",
		"259": "-webkit-region-break-before",
		"260": "-webkit-region-break-inside",
		"261": "-webkit-region-fragment",
		"262": "-webkit-shape-margin",
		"263": "-webkit-shape-image-threshold",
		"264": "buffered-rendering",
		"265": "clip-path",
		"266": "clip-rule",
		"267": "cx",
		"268": "cy",
		"269": "mask",
		"270": "filter",
		"271": "flood-color",
		"272": "flood-opacity",
		"273": "lighting-color",
		"274": "stop-color",
		"275": "stop-opacity",
		"276": "color-interpolation",
		"277": "color-interpolation-filters",
		"278": "color-rendering",
		"279": "fill",
		"280": "fill-opacity",
		"281": "fill-rule",
		"282": "marker-end",
		"283": "marker-mid",
		"284": "marker-start",
		"285": "mask-type",
		"286": "paint-order",
		"287": "r",
		"288": "rx",
		"289": "ry",
		"290": "shape-rendering",
		"291": "stroke",
		"292": "stroke-dasharray",
		"293": "stroke-dashoffset",
		"294": "stroke-linecap",
		"295": "stroke-linejoin",
		"296": "stroke-miterlimit",
		"297": "stroke-opacity",
		"298": "stroke-width",
		"299": "alignment-baseline",
		"300": "baseline-shift",
		"301": "dominant-baseline",
		"302": "kerning",
		"303": "text-anchor",
		"304": "writing-mode",
		"305": "glyph-orientation-horizontal",
		"306": "glyph-orientation-vertical",
		"307": "-webkit-svg-shadow",
		"308": "vector-effect",
		"309": "x",
		"310": "y",
		"alt": "",
		"animation-delay": "",
		"animation-direction": "",
		"animation-duration": "",
		"animation-fill-mode": "",
		"animation-iteration-count": "",
		"animation-name": "",
		"animation-play-state": "",
		"animation-timing-function": "",
		"background-attachment": "",
		"background-blend-mode": "",
		"background-clip": "",
		"background-color": "",
		"background-image": "",
		"background-origin": "",
		"background-position": "",
		"background-repeat": "",
		"background-size": "",
		"border-bottom-color": "",
		"border-bottom-left-radius": "",
		"border-bottom-right-radius": "",
		"border-bottom-style": "",
		"border-bottom-width": "",
		"border-collapse": "",
		"border-image-outset": "",
		"border-image-repeat": "",
		"border-image-slice": "",
		"border-image-source": "",
		"border-image-width": "",
		"border-left-color": "",
		"border-left-style": "",
		"border-left-width": "",
		"border-right-color": "",
		"border-right-style": "",
		"border-right-width": "",
		"border-top-color": "",
		"border-top-left-radius": "",
		"border-top-right-radius": "",
		"border-top-style": "",
		"border-top-width": "",
		"bottom": "",
		"box-shadow": "",
		"box-sizing": "",
		"caption-side": "",
		"clear": "",
		"clip": "",
		"color": "",
		"cursor": "",
		"direction": "",
		"display": "",
		"empty-cells": "",
		"float": "",
		"font-family": "",
		"fontFamily": "",
		"font-size": "",
		"font-style": "",
		"font-synthesis": "",
		"font-variant": "",
		"font-weight": "",
		"height": "",
		"image-rendering": "",
		"left": "",
		"letter-spacing": "",
		"line-height": "",
		"list-style-image": "",
		"list-style-position": "",
		"list-style-type": "",
		"margin-bottom": "",
		"margin-left": "",
		"margin-right": "",
		"margin-top": "",
		"max-height": "",
		"max-width": "",
		"min-height": "",
		"min-width": "",
		"opacity": "",
		"orphans": "",
		"outline-color": "",
		"outline-offset": "",
		"outline-style": "",
		"outline-width": "",
		"overflow-wrap": "",
		"overflow-x": "",
		"overflow-y": "",
		"padding-bottom": "",
		"padding-left": "",
		"padding-right": "",
		"padding-top": "",
		"page-break-after": "",
		"page-break-before": "",
		"page-break-inside": "",
		"pointer-events": "",
		"position": "",
		"resize": "",
		"right": "",
		"speak": "",
		"table-layout": "",
		"tab-size": "",
		"text-align": "",
		"text-decoration": "",
		"text-indent": "",
		"text-rendering": "",
		"text-shadow": "",
		"text-overflow": "",
		"text-transform": "",
		"top": "",
		"transform": "",
		"transform-origin": "",
		"transform-style": "",
		"transition-delay": "",
		"transition-duration": "",
		"transition-property": "",
		"transition-timing-function": "",
		"unicode-bidi": "",
		"vertical-align": "",
		"visibility": "",
		"white-space": "",
		"widows": "",
		"width": "",
		"word-break": "",
		"word-spacing": "",
		"word-wrap": "",
		"z-index": "",
		"zoom": "",
		"mix-blend-mode": "",
		"isolation": "",
		"column-count": "",
		"column-fill": "",
		"column-gap": "",
		"column-progression": "",
		"column-rule-color": "",
		"column-rule-style": "",
		"column-rule-width": "",
		"column-span": "",
		"column-width": "",
		"align-content": "",
		"align-items": "",
		"align-self": "",
		"flex-basis": "",
		"flex-grow": "",
		"flex-shrink": "",
		"flex-direction": "",
		"flex-wrap": "",
		"justify-content": "",
		"justify-self": "",
		"justify-items": "",
		"order": "",
		"perspective": "",
		"perspective-origin": "",
		"buffered-rendering": "",
		"clip-path": "",
		"clip-rule": "",
		"cx": "",
		"cy": "",
		"mask": "",
		"filter": "",
		"flood-color": "",
		"flood-opacity": "",
		"lighting-color": "",
		"stop-color": "",
		"stop-opacity": "",
		"color-interpolation": "",
		"color-interpolation-filters": "",
		"color-rendering": "",
		"fill": "",
		"fill-opacity": "",
		"fill-rule": "",
		"marker-end": "",
		"marker-mid": "",
		"marker-start": "",
		"mask-type": "",
		"paint-order": "",
		"r": "",
		"rx": "",
		"ry": "",
		"shape-rendering": "",
		"stroke": "",
		"stroke-dasharray": "",
		"stroke-dashoffset": "",
		"stroke-linecap": "",
		"stroke-linejoin": "",
		"stroke-miterlimit": "",
		"stroke-opacity": "",
		"stroke-width": "",
		"alignment-baseline": "",
		"baseline-shift": "",
		"dominant-baseline": "",
		"kerning": "",
		"text-anchor": "",
		"writing-mode": "",
		"glyph-orientation-horizontal": "",
		"glyph-orientation-vertical": "",
		"vector-effect": "",
		"x": "",
		"y": "",
		"alignContent": "",
		"alignItems": "",
		"alignSelf": "",
		"alignmentBaseline": "",
		"animation": "",
		"animationDelay": "",
		"animationDirection": "",
		"animationDuration": "",
		"animationFillMode": "",
		"animationIterationCount": "",
		"animationName": "",
		"animationPlayState": "",
		"animationTimingFunction": "",
		"background": "",
		"backgroundAttachment": "",
		"backgroundBlendMode": "",
		"backgroundClip": "",
		"backgroundColor": "",
		"backgroundImage": "",
		"backgroundOrigin": "",
		"backgroundPosition": "",
		"backgroundPositionX": "",
		"backgroundPositionY": "",
		"backgroundRepeat": "",
		"backgroundRepeatX": "",
		"backgroundRepeatY": "",
		"backgroundSize": "",
		"baselineShift": "",
		"border": "",
		"borderBottom": "",
		"borderBottomColor": "",
		"borderBottomLeftRadius": "",
		"borderBottomRightRadius": "",
		"borderBottomStyle": "",
		"borderBottomWidth": "",
		"borderCollapse": "",
		"borderColor": "",
		"borderImage": "",
		"borderImageOutset": "",
		"borderImageRepeat": "",
		"borderImageSlice": "",
		"borderImageSource": "",
		"borderImageWidth": "",
		"borderLeft": "",
		"borderLeftColor": "",
		"borderLeftStyle": "",
		"borderLeftWidth": "",
		"borderRadius": "",
		"borderRight": "",
		"borderRightColor": "",
		"borderRightStyle": "",
		"borderRightWidth": "",
		"borderSpacing": "",
		"borderStyle": "",
		"borderTop": "",
		"borderTopColor": "",
		"borderTopLeftRadius": "",
		"borderTopRightRadius": "",
		"borderTopStyle": "",
		"borderTopWidth": "",
		"borderWidth": "",
		"boxShadow": "",
		"boxSizing": "",
		"bufferedRendering": "",
		"captionSide": "",
		"clipPath": "",
		"clipRule": "",
		"colorInterpolation": "",
		"colorInterpolationFilters": "",
		"colorProfile": "",
		"colorRendering": "",
		"columnCount": "",
		"columnFill": "",
		"columnGap": "",
		"columnProgression": "",
		"columnRule": "",
		"columnRuleColor": "",
		"columnRuleStyle": "",
		"columnRuleWidth": "",
		"columnSpan": "",
		"columnWidth": "",
		"columns": "",
		"content": "",
		"counterIncrement": "",
		"counterReset": "",
		"dominantBaseline": "",
		"emptyCells": "",
		"fillOpacity": "",
		"fillRule": "",
		"flex": "",
		"flexBasis": "",
		"flexDirection": "",
		"flexFlow": "",
		"flexGrow": "",
		"flexShrink": "",
		"flexWrap": "",
		"floodColor": "",
		"floodOpacity": "",
		"font": "",
		"fontSize": "",
		"fontStretch": "",
		"fontStyle": "",
		"fontSynthesis": "",
		"fontVariant": "",
		"fontWeight": "",
		"glyphOrientationHorizontal": "",
		"glyphOrientationVertical": "",
		"imageRendering": "",
		"justifyContent": "",
		"justifyItems": "",
		"justifySelf": "",
		"letterSpacing": "",
		"lightingColor": "",
		"lineHeight": "",
		"listStyle": "",
		"listStyleImage": "",
		"listStylePosition": "",
		"listStyleType": "",
		"margin": "",
		"marginBottom": "",
		"marginLeft": "",
		"marginRight": "",
		"marginTop": "",
		"marker": "",
		"markerEnd": "",
		"markerMid": "",
		"markerStart": "",
		"maskType": "",
		"maxHeight": "",
		"maxWidth": "",
		"minHeight": "",
		"minWidth": "",
		"mixBlendMode": "",
		"objectFit": "",
		"outline": "",
		"outlineColor": "",
		"outlineOffset": "",
		"outlineStyle": "",
		"outlineWidth": "",
		"overflow": "",
		"overflowWrap": "",
		"overflowX": "",
		"overflowY": "",
		"padding": "",
		"paddingBottom": "",
		"paddingLeft": "",
		"paddingRight": "",
		"paddingTop": "",
		"page": "",
		"pageBreakAfter": "",
		"pageBreakBefore": "",
		"pageBreakInside": "",
		"paintOrder": "",
		"parentRule": "",
		"perspectiveOrigin": "",
		"perspectiveOriginX": "",
		"perspectiveOriginY": "",
		"pointerEvents": "",
		"quotes": "",
		"shapeRendering": "",
		"size": "",
		"src": "",
		"stopColor": "",
		"stopOpacity": "",
		"strokeDasharray": "",
		"strokeDashoffset": "",
		"strokeLinecap": "",
		"strokeLinejoin": "",
		"strokeMiterlimit": "",
		"strokeOpacity": "",
		"strokeWidth": "",
		"tabSize": "",
		"tableLayout": "",
		"textAlign": "",
		"textAnchor": "",
		"textDecoration": "",
		"textIndent": "",
		"textLineThrough": "",
		"textLineThroughColor": "",
		"textLineThroughMode": "",
		"textLineThroughStyle": "",
		"textLineThroughWidth": "",
		"textOverflow": "",
		"textOverline": "",
		"textOverlineColor": "",
		"textOverlineMode": "",
		"textOverlineStyle": "",
		"textOverlineWidth": "",
		"textRendering": "",
		"textShadow": "",
		"textTransform": "",
		"textUnderline": "",
		"textUnderlineColor": "",
		"textUnderlineMode": "",
		"textUnderlineStyle": "",
		"textUnderlineWidth": "",
		"transformOrigin": "",
		"transformOriginX": "",
		"transformOriginY": "",
		"transformOriginZ": "",
		"transformStyle": "",
		"transition": "",
		"transitionDelay": "",
		"transitionDuration": "",
		"transitionProperty": "",
		"transitionTimingFunction": "",
		"unicodeBidi": "",
		"unicodeRange": "",
		"vectorEffect": "",
		"verticalAlign": "",
		"background-position-x": "",
		"background-position-y": "",
		"background-repeat-x": "",
		"background-repeat-y": "",
		"border-bottom": "",
		"border-color": "",
		"border-image": "",
		"border-left": "",
		"border-radius": "",
		"border-right": "",
		"border-spacing": "",
		"border-style": "",
		"border-top": "",
		"border-width": "",
		"color-profile": "",
		"column-rule": "",
		"counter-increment": "",
		"counter-reset": "",
		"cssText": "",
		"css-text": "",
		"flex-flow": "",
		"font-stretch": "",
		"list-style": "",
		"object-fit": "",
		"parent-rule": "",
		"perspective-origin-x": "",
		"perspective-origin-y": "",
		"text-line-through": "",
		"text-line-through-color": "",
		"text-line-through-mode": "",
		"text-line-through-style": "",
		"text-line-through-width": "",
		"text-overline": "",
		"text-overline-color": "",
		"text-overline-mode": "",
		"text-overline-style": "",
		"text-overline-width": "",
		"text-underline": "",
		"text-underline-color": "",
		"text-underline-mode": "",
		"text-underline-style": "",
		"text-underline-width": "",
		"transform-origin-x": "",
		"transform-origin-y": "",
		"transform-origin-z": "",
		"unicode-range": "",
		"whiteSpace": "",
		"wordBreak": "",
		"wordSpacing": "",
		"wordWrap": "",
		"writingMode": "",
		"zIndex": "",
		"webkitAnimation": "",
		"WebkitAnimation": "",
		"webkitAnimationDelay": "",
		"WebkitAnimationDelay": "",
		"webkitAnimationDirection": "",
		"WebkitAnimationDirection": "",
		"webkitAnimationDuration": "",
		"WebkitAnimationDuration": "",
		"webkitAnimationFillMode": "",
		"WebkitAnimationFillMode": "",
		"webkitAnimationIterationCount": "",
		"WebkitAnimationIterationCount": "",
		"webkitAnimationName": "",
		"WebkitAnimationName": "",
		"webkitAnimationPlayState": "",
		"WebkitAnimationPlayState": "",
		"webkitAnimationTimingFunction": "",
		"WebkitAnimationTimingFunction": "",
		"webkitAppearance": "",
		"WebkitAppearance": "",
		"webkitAspectRatio": "",
		"WebkitAspectRatio": "",
		"webkitBackdropFilter": "",
		"WebkitBackdropFilter": "",
		"webkitBackfaceVisibility": "",
		"WebkitBackfaceVisibility": "",
		"webkitBackgroundClip": "",
		"WebkitBackgroundClip": "",
		"webkitBackgroundComposite": "",
		"WebkitBackgroundComposite": "",
		"webkitBackgroundOrigin": "",
		"WebkitBackgroundOrigin": "",
		"webkitBackgroundSize": "",
		"WebkitBackgroundSize": "",
		"webkitBorderAfter": "",
		"WebkitBorderAfter": "",
		"webkitBorderAfterColor": "",
		"WebkitBorderAfterColor": "",
		"webkitBorderAfterStyle": "",
		"WebkitBorderAfterStyle": "",
		"webkitBorderAfterWidth": "",
		"WebkitBorderAfterWidth": "",
		"webkitBorderBefore": "",
		"WebkitBorderBefore": "",
		"webkitBorderBeforeColor": "",
		"WebkitBorderBeforeColor": "",
		"webkitBorderBeforeStyle": "",
		"WebkitBorderBeforeStyle": "",
		"webkitBorderBeforeWidth": "",
		"WebkitBorderBeforeWidth": "",
		"webkitBorderEnd": "",
		"WebkitBorderEnd": "",
		"webkitBorderEndColor": "",
		"WebkitBorderEndColor": "",
		"webkitBorderEndStyle": "",
		"WebkitBorderEndStyle": "",
		"webkitBorderEndWidth": "",
		"WebkitBorderEndWidth": "",
		"webkitBorderFit": "",
		"WebkitBorderFit": "",
		"webkitBorderHorizontalSpacing": "",
		"WebkitBorderHorizontalSpacing": "",
		"webkitBorderImage": "",
		"WebkitBorderImage": "",
		"webkitBorderRadius": "",
		"WebkitBorderRadius": "",
		"webkitBorderStart": "",
		"WebkitBorderStart": "",
		"webkitBorderStartColor": "",
		"WebkitBorderStartColor": "",
		"webkitBorderStartStyle": "",
		"WebkitBorderStartStyle": "",
		"webkitBorderStartWidth": "",
		"WebkitBorderStartWidth": "",
		"webkitBorderVerticalSpacing": "",
		"WebkitBorderVerticalSpacing": "",
		"webkitBoxAlign": "",
		"WebkitBoxAlign": "",
		"webkitBoxDecorationBreak": "",
		"WebkitBoxDecorationBreak": "",
		"webkitBoxDirection": "",
		"WebkitBoxDirection": "",
		"webkitBoxFlex": "",
		"WebkitBoxFlex": "",
		"webkitBoxFlexGroup": "",
		"WebkitBoxFlexGroup": "",
		"webkitBoxLines": "",
		"WebkitBoxLines": "",
		"webkitBoxOrdinalGroup": "",
		"WebkitBoxOrdinalGroup": "",
		"webkitBoxOrient": "",
		"WebkitBoxOrient": "",
		"webkitBoxPack": "",
		"WebkitBoxPack": "",
		"webkitBoxReflect": "",
		"WebkitBoxReflect": "",
		"webkitBoxShadow": "",
		"WebkitBoxShadow": "",
		"webkitClipPath": "",
		"WebkitClipPath": "",
		"webkitColorCorrection": "",
		"WebkitColorCorrection": "",
		"webkitColumnAxis": "",
		"WebkitColumnAxis": "",
		"webkitColumnBreakAfter": "",
		"WebkitColumnBreakAfter": "",
		"webkitColumnBreakBefore": "",
		"WebkitColumnBreakBefore": "",
		"webkitColumnBreakInside": "",
		"WebkitColumnBreakInside": "",
		"webkitCursorVisibility": "",
		"WebkitCursorVisibility": "",
		"webkitDashboardRegion": "",
		"WebkitDashboardRegion": "",
		"webkitFilter": "",
		"WebkitFilter": "",
		"webkitFlowFrom": "",
		"WebkitFlowFrom": "",
		"webkitFlowInto": "",
		"WebkitFlowInto": "",
		"webkitFontFeatureSettings": "",
		"WebkitFontFeatureSettings": "",
		"webkitFontKerning": "",
		"WebkitFontKerning": "",
		"webkitFontSizeDelta": "",
		"WebkitFontSizeDelta": "",
		"webkitFontSmoothing": "",
		"WebkitFontSmoothing": "",
		"webkitFontVariantLigatures": "",
		"WebkitFontVariantLigatures": "",
		"webkitHyphenateCharacter": "",
		"WebkitHyphenateCharacter": "",
		"webkitHyphenateLimitAfter": "",
		"WebkitHyphenateLimitAfter": "",
		"webkitHyphenateLimitBefore": "",
		"WebkitHyphenateLimitBefore": "",
		"webkitHyphenateLimitLines": "",
		"WebkitHyphenateLimitLines": "",
		"webkitHyphens": "",
		"WebkitHyphens": "",
		"webkitInitialLetter": "",
		"WebkitInitialLetter": "",
		"webkitLineAlign": "",
		"WebkitLineAlign": "",
		"webkitLineBoxContain": "",
		"WebkitLineBoxContain": "",
		"webkitLineBreak": "",
		"WebkitLineBreak": "",
		"webkitLineClamp": "",
		"WebkitLineClamp": "",
		"webkitLineGrid": "",
		"WebkitLineGrid": "",
		"webkitLineSnap": "",
		"WebkitLineSnap": "",
		"webkitLocale": "",
		"WebkitLocale": "",
		"webkitLogicalHeight": "",
		"WebkitLogicalHeight": "",
		"webkitLogicalWidth": "",
		"WebkitLogicalWidth": "",
		"webkitMarginAfter": "",
		"WebkitMarginAfter": "",
		"webkitMarginAfterCollapse": "",
		"WebkitMarginAfterCollapse": "",
		"webkitMarginBefore": "",
		"WebkitMarginBefore": "",
		"webkitMarginBeforeCollapse": "",
		"WebkitMarginBeforeCollapse": "",
		"webkitMarginBottomCollapse": "",
		"WebkitMarginBottomCollapse": "",
		"webkitMarginCollapse": "",
		"WebkitMarginCollapse": "",
		"webkitMarginEnd": "",
		"WebkitMarginEnd": "",
		"webkitMarginStart": "",
		"WebkitMarginStart": "",
		"webkitMarginTopCollapse": "",
		"WebkitMarginTopCollapse": "",
		"webkitMarquee": "",
		"WebkitMarquee": "",
		"webkitMarqueeDirection": "",
		"WebkitMarqueeDirection": "",
		"webkitMarqueeIncrement": "",
		"WebkitMarqueeIncrement": "",
		"webkitMarqueeRepetition": "",
		"WebkitMarqueeRepetition": "",
		"webkitMarqueeSpeed": "",
		"WebkitMarqueeSpeed": "",
		"webkitMarqueeStyle": "",
		"WebkitMarqueeStyle": "",
		"webkitMask": "",
		"WebkitMask": "",
		"webkitMaskBoxImage": "",
		"WebkitMaskBoxImage": "",
		"webkitMaskBoxImageOutset": "",
		"WebkitMaskBoxImageOutset": "",
		"webkitMaskBoxImageRepeat": "",
		"WebkitMaskBoxImageRepeat": "",
		"webkitMaskBoxImageSlice": "",
		"WebkitMaskBoxImageSlice": "",
		"webkitMaskBoxImageSource": "",
		"WebkitMaskBoxImageSource": "",
		"webkitMaskBoxImageWidth": "",
		"WebkitMaskBoxImageWidth": "",
		"webkitMaskClip": "",
		"WebkitMaskClip": "",
		"webkitMaskComposite": "",
		"WebkitMaskComposite": "",
		"webkitMaskImage": "",
		"WebkitMaskImage": "",
		"webkitMaskOrigin": "",
		"WebkitMaskOrigin": "",
		"webkitMaskPosition": "",
		"WebkitMaskPosition": "",
		"webkitMaskPositionX": "",
		"WebkitMaskPositionX": "",
		"webkitMaskPositionY": "",
		"WebkitMaskPositionY": "",
		"webkitMaskRepeat": "",
		"WebkitMaskRepeat": "",
		"webkitMaskRepeatX": "",
		"WebkitMaskRepeatX": "",
		"webkitMaskRepeatY": "",
		"WebkitMaskRepeatY": "",
		"webkitMaskSize": "",
		"WebkitMaskSize": "",
		"webkitMaskSourceType": "",
		"WebkitMaskSourceType": "",
		"webkitMaxLogicalHeight": "",
		"WebkitMaxLogicalHeight": "",
		"webkitMaxLogicalWidth": "",
		"WebkitMaxLogicalWidth": "",
		"webkitMinLogicalHeight": "",
		"WebkitMinLogicalHeight": "",
		"webkitMinLogicalWidth": "",
		"WebkitMinLogicalWidth": "",
		"webkitNbspMode": "",
		"WebkitNbspMode": "",
		"webkitPaddingAfter": "",
		"WebkitPaddingAfter": "",
		"webkitPaddingBefore": "",
		"WebkitPaddingBefore": "",
		"webkitPaddingEnd": "",
		"WebkitPaddingEnd": "",
		"webkitPaddingStart": "",
		"WebkitPaddingStart": "",
		"webkitPrintColorAdjust": "",
		"WebkitPrintColorAdjust": "",
		"webkitRegionBreakAfter": "",
		"WebkitRegionBreakAfter": "",
		"webkitRegionBreakBefore": "",
		"WebkitRegionBreakBefore": "",
		"webkitRegionBreakInside": "",
		"WebkitRegionBreakInside": "",
		"webkitRegionFragment": "",
		"WebkitRegionFragment": "",
		"webkitRtlOrdering": "",
		"WebkitRtlOrdering": "",
		"webkitRubyPosition": "",
		"WebkitRubyPosition": "",
		"webkitScrollSnapCoordinate": "",
		"WebkitScrollSnapCoordinate": "",
		"webkitScrollSnapDestination": "",
		"WebkitScrollSnapDestination": "",
		"webkitScrollSnapPointsX": "",
		"WebkitScrollSnapPointsX": "",
		"webkitScrollSnapPointsY": "",
		"WebkitScrollSnapPointsY": "",
		"webkitScrollSnapType": "",
		"WebkitScrollSnapType": "",
		"webkitShapeImageThreshold": "",
		"WebkitShapeImageThreshold": "",
		"webkitShapeMargin": "",
		"WebkitShapeMargin": "",
		"webkitShapeOutside": "",
		"WebkitShapeOutside": "",
		"webkitSvgShadow": "",
		"WebkitSvgShadow": "",
		"webkitTextCombine": "",
		"WebkitTextCombine": "",
		"webkitTextDecoration": "",
		"WebkitTextDecoration": "",
		"webkitTextDecorationColor": "",
		"WebkitTextDecorationColor": "",
		"webkitTextDecorationLine": "",
		"WebkitTextDecorationLine": "",
		"webkitTextDecorationSkip": "",
		"WebkitTextDecorationSkip": "",
		"webkitTextDecorationStyle": "",
		"WebkitTextDecorationStyle": "",
		"webkitTextDecorationsInEffect": "",
		"WebkitTextDecorationsInEffect": "",
		"webkitTextEmphasis": "",
		"WebkitTextEmphasis": "",
		"webkitTextEmphasisColor": "",
		"WebkitTextEmphasisColor": "",
		"webkitTextEmphasisPosition": "",
		"WebkitTextEmphasisPosition": "",
		"webkitTextEmphasisStyle": "",
		"WebkitTextEmphasisStyle": "",
		"webkitTextFillColor": "",
		"WebkitTextFillColor": "",
		"webkitTextOrientation": "",
		"WebkitTextOrientation": "",
		"webkitTextSecurity": "",
		"WebkitTextSecurity": "",
		"webkitTextStroke": "",
		"WebkitTextStroke": "",
		"webkitTextStrokeColor": "",
		"WebkitTextStrokeColor": "",
		"webkitTextStrokeWidth": "",
		"WebkitTextStrokeWidth": "",
		"webkitTextUnderlinePosition": "",
		"WebkitTextUnderlinePosition": "",
		"webkitTransformStyle": "",
		"WebkitTransformStyle": "",
		"webkitTransition": "",
		"WebkitTransition": "",
		"webkitTransitionDelay": "",
		"WebkitTransitionDelay": "",
		"webkitTransitionDuration": "",
		"WebkitTransitionDuration": "",
		"webkitTransitionProperty": "",
		"WebkitTransitionProperty": "",
		"webkitTransitionTimingFunction": "",
		"WebkitTransitionTimingFunction": "",
		"webkitUserDrag": "",
		"WebkitUserDrag": "",
		"webkitUserModify": "",
		"WebkitUserModify": "",
		"webkitUserSelect": "",
		"WebkitUserSelect": "",
		"webkitWritingMode": "",
		"WebkitWritingMode": "",
		"-webkit-animation": "",
		"-webkit-animation-delay": "",
		"-webkit-animation-direction": "",
		"-webkit-animation-duration": "",
		"-webkit-animation-fill-mode": "",
		"-webkit-animation-iteration-count": "",
		"-webkit-animation-name": "",
		"-webkit-animation-play-state": "",
		"-webkit-animation-timing-function": "",
		"-webkit-appearance": "",
		"-webkit-aspect-ratio": "",
		"-webkit-backdrop-filter": "",
		"-webkit-backface-visibility": "",
		"-webkit-background-clip": "",
		"-webkit-background-composite": "",
		"-webkit-background-origin": "",
		"-webkit-background-size": "",
		"-webkit-border-after": "",
		"-webkit-border-after-color": "",
		"-webkit-border-after-style": "",
		"-webkit-border-after-width": "",
		"-webkit-border-before": "",
		"-webkit-border-before-color": "",
		"-webkit-border-before-style": "",
		"-webkit-border-before-width": "",
		"-webkit-border-end": "",
		"-webkit-border-end-color": "",
		"-webkit-border-end-style": "",
		"-webkit-border-end-width": "",
		"-webkit-border-fit": "",
		"-webkit-border-horizontal-spacing": "",
		"-webkit-border-image": "",
		"-webkit-border-radius": "",
		"-webkit-border-start": "",
		"-webkit-border-start-color": "",
		"-webkit-border-start-style": "",
		"-webkit-border-start-width": "",
		"-webkit-border-vertical-spacing": "",
		"-webkit-box-align": "",
		"-webkit-box-decoration-break": "",
		"-webkit-box-direction": "",
		"-webkit-box-flex": "",
		"-webkit-box-flex-group": "",
		"-webkit-box-lines": "",
		"-webkit-box-ordinal-group": "",
		"-webkit-box-orient": "",
		"-webkit-box-pack": "",
		"-webkit-box-reflect": "",
		"-webkit-box-shadow": "",
		"-webkit-clip-path": "",
		"-webkit-color-correction": "",
		"-webkit-column-axis": "",
		"-webkit-column-break-after": "",
		"-webkit-column-break-before": "",
		"-webkit-column-break-inside": "",
		"-webkit-cursor-visibility": "",
		"-webkit-dashboard-region": "",
		"-webkit-filter": "",
		"-webkit-flow-from": "",
		"-webkit-flow-into": "",
		"-webkit-font-feature-settings": "",
		"-webkit-font-kerning": "",
		"-webkit-font-size-delta": "",
		"-webkit-font-smoothing": "",
		"-webkit-font-variant-ligatures": "",
		"-webkit-hyphenate-character": "",
		"-webkit-hyphenate-limit-after": "",
		"-webkit-hyphenate-limit-before": "",
		"-webkit-hyphenate-limit-lines": "",
		"-webkit-hyphens": "",
		"-webkit-initial-letter": "",
		"-webkit-line-align": "",
		"-webkit-line-box-contain": "",
		"-webkit-line-break": "",
		"-webkit-line-clamp": "",
		"-webkit-line-grid": "",
		"-webkit-line-snap": "",
		"-webkit-locale": "",
		"-webkit-logical-height": "",
		"-webkit-logical-width": "",
		"-webkit-margin-after": "",
		"-webkit-margin-after-collapse": "",
		"-webkit-margin-before": "",
		"-webkit-margin-before-collapse": "",
		"-webkit-margin-bottom-collapse": "",
		"-webkit-margin-collapse": "",
		"-webkit-margin-end": "",
		"-webkit-margin-start": "",
		"-webkit-margin-top-collapse": "",
		"-webkit-marquee": "",
		"-webkit-marquee-direction": "",
		"-webkit-marquee-increment": "",
		"-webkit-marquee-repetition": "",
		"-webkit-marquee-speed": "",
		"-webkit-marquee-style": "",
		"-webkit-mask": "",
		"-webkit-mask-box-image": "",
		"-webkit-mask-box-image-outset": "",
		"-webkit-mask-box-image-repeat": "",
		"-webkit-mask-box-image-slice": "",
		"-webkit-mask-box-image-source": "",
		"-webkit-mask-box-image-width": "",
		"-webkit-mask-clip": "",
		"-webkit-mask-composite": "",
		"-webkit-mask-image": "",
		"-webkit-mask-origin": "",
		"-webkit-mask-position": "",
		"-webkit-mask-position-x": "",
		"-webkit-mask-position-y": "",
		"-webkit-mask-repeat": "",
		"-webkit-mask-repeat-x": "",
		"-webkit-mask-repeat-y": "",
		"-webkit-mask-size": "",
		"-webkit-mask-source-type": "",
		"-webkit-max-logical-height": "",
		"-webkit-max-logical-width": "",
		"-webkit-min-logical-height": "",
		"-webkit-min-logical-width": "",
		"-webkit-nbsp-mode": "",
		"-webkit-padding-after": "",
		"-webkit-padding-before": "",
		"-webkit-padding-end": "",
		"-webkit-padding-start": "",
		"-webkit-print-color-adjust": "",
		"-webkit-region-break-after": "",
		"-webkit-region-break-before": "",
		"-webkit-region-break-inside": "",
		"-webkit-region-fragment": "",
		"-webkit-rtl-ordering": "",
		"-webkit-ruby-position": "",
		"-webkit-scroll-snap-coordinate": "",
		"-webkit-scroll-snap-destination": "",
		"-webkit-scroll-snap-points-x": "",
		"-webkit-scroll-snap-points-y": "",
		"-webkit-scroll-snap-type": "",
		"-webkit-shape-image-threshold": "",
		"-webkit-shape-margin": "",
		"-webkit-shape-outside": "",
		"-webkit-svg-shadow": "",
		"-webkit-text-combine": "",
		"-webkit-text-decoration": "",
		"-webkit-text-decoration-color": "",
		"-webkit-text-decoration-line": "",
		"-webkit-text-decoration-skip": "",
		"-webkit-text-decoration-style": "",
		"-webkit-text-decorations-in-effect": "",
		"-webkit-text-emphasis": "",
		"-webkit-text-emphasis-color": "",
		"-webkit-text-emphasis-position": "",
		"-webkit-text-emphasis-style": "",
		"-webkit-text-fill-color": "",
		"-webkit-text-orientation": "",
		"-webkit-text-security": "",
		"-webkit-text-stroke": "",
		"-webkit-text-stroke-color": "",
		"-webkit-text-stroke-width": "",
		"-webkit-text-underline-position": "",
		"-webkit-transform-style": "",
		"-webkit-transition": "",
		"-webkit-transition-delay": "",
		"-webkit-transition-duration": "",
		"-webkit-transition-property": "",
		"-webkit-transition-timing-function": "",
		"-webkit-user-drag": "",
		"-webkit-user-modify": "",
		"-webkit-user-select": "",
		"-webkit-writing-mode": ""
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = {
		"0": "align-content",
		"1": "align-items",
		"2": "align-self",
		"3": "animation-delay",
		"4": "animation-direction",
		"5": "animation-duration",
		"6": "animation-fill-mode",
		"7": "animation-iteration-count",
		"8": "animation-name",
		"9": "animation-play-state",
		"10": "animation-timing-function",
		"11": "backface-visibility",
		"12": "background-attachment",
		"13": "background-blend-mode",
		"14": "background-clip",
		"15": "background-color",
		"16": "background-image",
		"17": "background-origin",
		"18": "background-position",
		"19": "background-repeat",
		"20": "background-size",
		"21": "border-bottom-color",
		"22": "border-bottom-left-radius",
		"23": "border-bottom-right-radius",
		"24": "border-bottom-style",
		"25": "border-bottom-width",
		"26": "border-collapse",
		"27": "border-image-outset",
		"28": "border-image-repeat",
		"29": "border-image-slice",
		"30": "border-image-source",
		"31": "border-image-width",
		"32": "border-left-color",
		"33": "border-left-style",
		"34": "border-left-width",
		"35": "border-right-color",
		"36": "border-right-style",
		"37": "border-right-width",
		"38": "border-spacing",
		"39": "border-top-color",
		"40": "border-top-left-radius",
		"41": "border-top-right-radius",
		"42": "border-top-style",
		"43": "border-top-width",
		"44": "bottom",
		"45": "box-decoration-break",
		"46": "box-shadow",
		"47": "box-sizing",
		"48": "caption-side",
		"49": "clear",
		"50": "clip",
		"51": "color",
		"52": "content",
		"53": "counter-increment",
		"54": "counter-reset",
		"55": "cursor",
		"56": "direction",
		"57": "display",
		"58": "empty-cells",
		"59": "flex-basis",
		"60": "flex-direction",
		"61": "flex-grow",
		"62": "flex-shrink",
		"63": "flex-wrap",
		"64": "float",
		"65": "font-family",
		"66": "font-feature-settings",
		"67": "font-kerning",
		"68": "font-language-override",
		"69": "font-size",
		"70": "font-size-adjust",
		"71": "font-stretch",
		"72": "font-style",
		"73": "font-synthesis",
		"74": "font-variant",
		"75": "font-variant-alternates",
		"76": "font-variant-caps",
		"77": "font-variant-east-asian",
		"78": "font-variant-ligatures",
		"79": "font-variant-numeric",
		"80": "font-variant-position",
		"81": "font-weight",
		"82": "height",
		"83": "image-orientation",
		"84": "ime-mode",
		"85": "isolation",
		"86": "justify-content",
		"87": "left",
		"88": "letter-spacing",
		"89": "line-height",
		"90": "list-style-image",
		"91": "list-style-position",
		"92": "list-style-type",
		"93": "margin-bottom",
		"94": "margin-left",
		"95": "margin-right",
		"96": "margin-top",
		"97": "marker-offset",
		"98": "max-height",
		"99": "max-width",
		"100": "min-height",
		"101": "min-width",
		"102": "mix-blend-mode",
		"103": "object-fit",
		"104": "object-position",
		"105": "opacity",
		"106": "order",
		"107": "outline-color",
		"108": "outline-offset",
		"109": "outline-style",
		"110": "outline-width",
		"111": "overflow",
		"112": "overflow-x",
		"113": "overflow-y",
		"114": "padding-bottom",
		"115": "padding-left",
		"116": "padding-right",
		"117": "padding-top",
		"118": "page-break-after",
		"119": "page-break-before",
		"120": "page-break-inside",
		"121": "perspective",
		"122": "perspective-origin",
		"123": "pointer-events",
		"124": "position",
		"125": "quotes",
		"126": "resize",
		"127": "right",
		"128": "ruby-align",
		"129": "ruby-position",
		"130": "scroll-behavior",
		"131": "scroll-snap-coordinate",
		"132": "scroll-snap-destination",
		"133": "scroll-snap-points-x",
		"134": "scroll-snap-points-y",
		"135": "scroll-snap-type-x",
		"136": "scroll-snap-type-y",
		"137": "table-layout",
		"138": "text-align",
		"139": "text-decoration",
		"140": "text-decoration-color",
		"141": "text-decoration-line",
		"142": "text-decoration-style",
		"143": "text-indent",
		"144": "text-orientation",
		"145": "text-overflow",
		"146": "text-shadow",
		"147": "text-transform",
		"148": "top",
		"149": "transform",
		"150": "transform-origin",
		"151": "transform-style",
		"152": "transition-delay",
		"153": "transition-duration",
		"154": "transition-property",
		"155": "transition-timing-function",
		"156": "unicode-bidi",
		"157": "vertical-align",
		"158": "visibility",
		"159": "white-space",
		"160": "width",
		"161": "will-change",
		"162": "word-break",
		"163": "word-spacing",
		"164": "word-wrap",
		"165": "writing-mode",
		"166": "z-index",
		"167": "-moz-appearance",
		"168": "-moz-binding",
		"169": "-moz-border-bottom-colors",
		"170": "-moz-border-left-colors",
		"171": "-moz-border-right-colors",
		"172": "-moz-border-top-colors",
		"173": "-moz-box-align",
		"174": "-moz-box-direction",
		"175": "-moz-box-flex",
		"176": "-moz-box-ordinal-group",
		"177": "-moz-box-orient",
		"178": "-moz-box-pack",
		"179": "-moz-column-count",
		"180": "-moz-column-fill",
		"181": "-moz-column-gap",
		"182": "-moz-column-rule-color",
		"183": "-moz-column-rule-style",
		"184": "-moz-column-rule-width",
		"185": "-moz-column-width",
		"186": "-moz-float-edge",
		"187": "-moz-force-broken-image-icon",
		"188": "-moz-hyphens",
		"189": "-moz-image-region",
		"190": "-moz-orient",
		"191": "-moz-osx-font-smoothing",
		"192": "-moz-outline-radius-bottomleft",
		"193": "-moz-outline-radius-bottomright",
		"194": "-moz-outline-radius-topleft",
		"195": "-moz-outline-radius-topright",
		"196": "-moz-stack-sizing",
		"197": "-moz-tab-size",
		"198": "-moz-text-align-last",
		"199": "-moz-text-size-adjust",
		"200": "-moz-user-focus",
		"201": "-moz-user-input",
		"202": "-moz-user-modify",
		"203": "-moz-user-select",
		"204": "-moz-window-dragging",
		"205": "-moz-window-shadow",
		"206": "clip-path",
		"207": "clip-rule",
		"208": "color-interpolation",
		"209": "color-interpolation-filters",
		"210": "dominant-baseline",
		"211": "fill",
		"212": "fill-opacity",
		"213": "fill-rule",
		"214": "filter",
		"215": "flood-color",
		"216": "flood-opacity",
		"217": "image-rendering",
		"218": "lighting-color",
		"219": "marker-end",
		"220": "marker-mid",
		"221": "marker-start",
		"222": "mask",
		"223": "mask-type",
		"224": "paint-order",
		"225": "shape-rendering",
		"226": "stop-color",
		"227": "stop-opacity",
		"228": "stroke",
		"229": "stroke-dasharray",
		"230": "stroke-dashoffset",
		"231": "stroke-linecap",
		"232": "stroke-linejoin",
		"233": "stroke-miterlimit",
		"234": "stroke-opacity",
		"235": "stroke-width",
		"236": "text-anchor",
		"237": "text-rendering",
		"238": "vector-effect",
		"MozAppearance": "",
		"MozOutlineRadius": "",
		"MozOutlineRadiusTopleft": "",
		"MozOutlineRadiusTopright": "",
		"MozOutlineRadiusBottomright": "",
		"MozOutlineRadiusBottomleft": "",
		"MozTabSize": "",
		"all": "",
		"animation": "",
		"animationDelay": "",
		"animation-delay": "",
		"animationDirection": "",
		"animation-direction": "",
		"animationDuration": "",
		"animation-duration": "",
		"animationFillMode": "",
		"animation-fill-mode": "",
		"animationIterationCount": "",
		"animation-iteration-count": "",
		"animationName": "",
		"animation-name": "",
		"animationPlayState": "",
		"animation-play-state": "",
		"animationTimingFunction": "",
		"animation-timing-function": "",
		"background": "",
		"backgroundAttachment": "",
		"background-attachment": "",
		"backgroundClip": "",
		"background-clip": "",
		"backgroundColor": "",
		"background-color": "",
		"backgroundImage": "",
		"background-image": "",
		"backgroundBlendMode": "",
		"background-blend-mode": "",
		"backgroundOrigin": "",
		"background-origin": "",
		"backgroundPosition": "",
		"background-position": "",
		"backgroundRepeat": "",
		"background-repeat": "",
		"backgroundSize": "",
		"background-size": "",
		"MozBinding": "",
		"blockSize": "",
		"block-size": "",
		"border": "",
		"borderBlockEnd": "",
		"border-block-end": "",
		"borderBlockStart": "",
		"border-block-start": "",
		"borderBlockEndColor": "",
		"border-block-end-color": "",
		"borderBlockEndStyle": "",
		"border-block-end-style": "",
		"borderBlockEndWidth": "",
		"border-block-end-width": "",
		"borderBlockStartColor": "",
		"border-block-start-color": "",
		"borderBlockStartStyle": "",
		"border-block-start-style": "",
		"borderBlockStartWidth": "",
		"border-block-start-width": "",
		"borderBottom": "",
		"border-bottom": "",
		"borderBottomColor": "",
		"border-bottom-color": "",
		"MozBorderBottomColors": "",
		"borderBottomStyle": "",
		"border-bottom-style": "",
		"borderBottomWidth": "",
		"border-bottom-width": "",
		"borderCollapse": "",
		"border-collapse": "",
		"borderColor": "",
		"border-color": "",
		"borderImage": "",
		"border-image": "",
		"borderImageSource": "",
		"border-image-source": "",
		"borderImageSlice": "",
		"border-image-slice": "",
		"borderImageWidth": "",
		"border-image-width": "",
		"borderImageOutset": "",
		"border-image-outset": "",
		"borderImageRepeat": "",
		"border-image-repeat": "",
		"MozBorderEnd": "",
		"MozBorderEndColor": "",
		"MozBorderEndStyle": "",
		"MozBorderEndWidth": "",
		"MozBorderStart": "",
		"MozBorderStartColor": "",
		"MozBorderStartStyle": "",
		"MozBorderStartWidth": "",
		"borderLeft": "",
		"border-left": "",
		"borderLeftColor": "",
		"border-left-color": "",
		"MozBorderLeftColors": "",
		"borderLeftStyle": "",
		"border-left-style": "",
		"borderLeftWidth": "",
		"border-left-width": "",
		"borderRight": "",
		"border-right": "",
		"borderRightColor": "",
		"border-right-color": "",
		"MozBorderRightColors": "",
		"borderRightStyle": "",
		"border-right-style": "",
		"borderRightWidth": "",
		"border-right-width": "",
		"borderSpacing": "",
		"border-spacing": "",
		"borderStyle": "",
		"border-style": "",
		"borderTop": "",
		"border-top": "",
		"borderTopColor": "",
		"border-top-color": "",
		"MozBorderTopColors": "",
		"borderTopStyle": "",
		"border-top-style": "",
		"borderTopWidth": "",
		"border-top-width": "",
		"borderWidth": "",
		"border-width": "",
		"borderRadius": "",
		"border-radius": "",
		"borderTopLeftRadius": "",
		"border-top-left-radius": "",
		"borderTopRightRadius": "",
		"border-top-right-radius": "",
		"borderBottomRightRadius": "",
		"border-bottom-right-radius": "",
		"borderBottomLeftRadius": "",
		"border-bottom-left-radius": "",
		"bottom": "",
		"boxDecorationBreak": "",
		"box-decoration-break": "",
		"boxShadow": "",
		"box-shadow": "",
		"boxSizing": "",
		"box-sizing": "",
		"captionSide": "",
		"caption-side": "",
		"clear": "",
		"clip": "",
		"color": "",
		"MozColumns": "",
		"MozColumnCount": "",
		"MozColumnFill": "",
		"MozColumnWidth": "",
		"MozColumnGap": "",
		"MozColumnRule": "",
		"MozColumnRuleColor": "",
		"MozColumnRuleStyle": "",
		"MozColumnRuleWidth": "",
		"content": "",
		"counterIncrement": "",
		"counter-increment": "",
		"counterReset": "",
		"counter-reset": "",
		"cursor": "",
		"direction": "",
		"display": "",
		"emptyCells": "",
		"empty-cells": "",
		"alignContent": "",
		"align-content": "",
		"alignItems": "",
		"align-items": "",
		"alignSelf": "",
		"align-self": "",
		"flex": "",
		"flexBasis": "",
		"flex-basis": "",
		"flexDirection": "",
		"flex-direction": "",
		"flexFlow": "",
		"flex-flow": "",
		"flexGrow": "",
		"flex-grow": "",
		"flexShrink": "",
		"flex-shrink": "",
		"flexWrap": "",
		"flex-wrap": "",
		"order": "",
		"justifyContent": "",
		"justify-content": "",
		"float": "",
		"MozFloatEdge": "",
		"font": "",
		"fontFamily": "",
		"font-family": "",
		"fontFeatureSettings": "",
		"font-feature-settings": "",
		"fontKerning": "",
		"font-kerning": "",
		"fontLanguageOverride": "",
		"font-language-override": "",
		"fontSize": "",
		"font-size": "",
		"fontSizeAdjust": "",
		"font-size-adjust": "",
		"MozOsxFontSmoothing": "",
		"fontStretch": "",
		"font-stretch": "",
		"fontStyle": "",
		"font-style": "",
		"fontSynthesis": "",
		"font-synthesis": "",
		"fontVariant": "",
		"font-variant": "",
		"fontVariantAlternates": "",
		"font-variant-alternates": "",
		"fontVariantCaps": "",
		"font-variant-caps": "",
		"fontVariantEastAsian": "",
		"font-variant-east-asian": "",
		"fontVariantLigatures": "",
		"font-variant-ligatures": "",
		"fontVariantNumeric": "",
		"font-variant-numeric": "",
		"fontVariantPosition": "",
		"font-variant-position": "",
		"fontWeight": "",
		"font-weight": "",
		"MozForceBrokenImageIcon": "",
		"height": "",
		"imageOrientation": "",
		"image-orientation": "",
		"MozImageRegion": "",
		"imeMode": "",
		"ime-mode": "",
		"inlineSize": "",
		"inline-size": "",
		"left": "",
		"letterSpacing": "",
		"letter-spacing": "",
		"lineHeight": "",
		"line-height": "",
		"listStyle": "",
		"list-style": "",
		"listStyleImage": "",
		"list-style-image": "",
		"listStylePosition": "",
		"list-style-position": "",
		"listStyleType": "",
		"list-style-type": "",
		"margin": "",
		"marginBlockEnd": "",
		"margin-block-end": "",
		"marginBlockStart": "",
		"margin-block-start": "",
		"marginBottom": "",
		"margin-bottom": "",
		"MozMarginEnd": "",
		"MozMarginStart": "",
		"marginLeft": "",
		"margin-left": "",
		"marginRight": "",
		"margin-right": "",
		"marginTop": "",
		"margin-top": "",
		"markerOffset": "",
		"marker-offset": "",
		"marks": "",
		"maxBlockSize": "",
		"max-block-size": "",
		"maxHeight": "",
		"max-height": "",
		"maxInlineSize": "",
		"max-inline-size": "",
		"maxWidth": "",
		"max-width": "",
		"minHeight": "",
		"min-height": "",
		"minBlockSize": "",
		"min-block-size": "",
		"minInlineSize": "",
		"min-inline-size": "",
		"minWidth": "",
		"min-width": "",
		"mixBlendMode": "",
		"mix-blend-mode": "",
		"isolation": "",
		"objectFit": "",
		"object-fit": "",
		"objectPosition": "",
		"object-position": "",
		"offsetBlockEnd": "",
		"offset-block-end": "",
		"offsetBlockStart": "",
		"offset-block-start": "",
		"offsetInlineEnd": "",
		"offset-inline-end": "",
		"offsetInlineStart": "",
		"offset-inline-start": "",
		"opacity": "",
		"MozOrient": "",
		"orphans": "",
		"outline": "",
		"outlineColor": "",
		"outline-color": "",
		"outlineStyle": "",
		"outline-style": "",
		"outlineWidth": "",
		"outline-width": "",
		"outlineOffset": "",
		"outline-offset": "",
		"overflow": "",
		"overflowX": "",
		"overflow-x": "",
		"overflowY": "",
		"overflow-y": "",
		"padding": "",
		"paddingBlockEnd": "",
		"padding-block-end": "",
		"paddingBlockStart": "",
		"padding-block-start": "",
		"paddingBottom": "",
		"padding-bottom": "",
		"MozPaddingEnd": "",
		"MozPaddingStart": "",
		"paddingLeft": "",
		"padding-left": "",
		"paddingRight": "",
		"padding-right": "",
		"paddingTop": "",
		"padding-top": "",
		"page": "",
		"pageBreakAfter": "",
		"page-break-after": "",
		"pageBreakBefore": "",
		"page-break-before": "",
		"pageBreakInside": "",
		"page-break-inside": "",
		"paintOrder": "",
		"paint-order": "",
		"pointerEvents": "",
		"pointer-events": "",
		"position": "",
		"quotes": "",
		"resize": "",
		"right": "",
		"rubyAlign": "",
		"ruby-align": "",
		"rubyPosition": "",
		"ruby-position": "",
		"scrollBehavior": "",
		"scroll-behavior": "",
		"scrollSnapCoordinate": "",
		"scroll-snap-coordinate": "",
		"scrollSnapDestination": "",
		"scroll-snap-destination": "",
		"scrollSnapPointsX": "",
		"scroll-snap-points-x": "",
		"scrollSnapPointsY": "",
		"scroll-snap-points-y": "",
		"scrollSnapType": "",
		"scroll-snap-type": "",
		"scrollSnapTypeX": "",
		"scroll-snap-type-x": "",
		"scrollSnapTypeY": "",
		"scroll-snap-type-y": "",
		"size": "",
		"tableLayout": "",
		"table-layout": "",
		"textAlign": "",
		"text-align": "",
		"MozTextAlignLast": "",
		"textDecoration": "",
		"text-decoration": "",
		"textDecorationColor": "",
		"text-decoration-color": "",
		"textDecorationLine": "",
		"text-decoration-line": "",
		"textDecorationStyle": "",
		"text-decoration-style": "",
		"textIndent": "",
		"text-indent": "",
		"textOrientation": "",
		"text-orientation": "",
		"textOverflow": "",
		"text-overflow": "",
		"textShadow": "",
		"text-shadow": "",
		"MozTextSizeAdjust": "",
		"textTransform": "",
		"text-transform": "",
		"transform": "",
		"transformOrigin": "",
		"transform-origin": "",
		"perspectiveOrigin": "",
		"perspective-origin": "",
		"perspective": "",
		"transformStyle": "",
		"transform-style": "",
		"backfaceVisibility": "",
		"backface-visibility": "",
		"top": "",
		"transition": "",
		"transitionDelay": "",
		"transition-delay": "",
		"transitionDuration": "",
		"transition-duration": "",
		"transitionProperty": "",
		"transition-property": "",
		"transitionTimingFunction": "",
		"transition-timing-function": "",
		"unicodeBidi": "",
		"unicode-bidi": "",
		"MozUserFocus": "",
		"MozUserInput": "",
		"MozUserModify": "",
		"MozUserSelect": "",
		"verticalAlign": "",
		"vertical-align": "",
		"visibility": "",
		"whiteSpace": "",
		"white-space": "",
		"widows": "",
		"width": "",
		"MozWindowDragging": "",
		"MozWindowShadow": "",
		"wordBreak": "",
		"word-break": "",
		"wordSpacing": "",
		"word-spacing": "",
		"wordWrap": "",
		"word-wrap": "",
		"MozHyphens": "",
		"writingMode": "",
		"writing-mode": "",
		"zIndex": "",
		"z-index": "",
		"MozBoxAlign": "",
		"MozBoxDirection": "",
		"MozBoxFlex": "",
		"MozBoxOrient": "",
		"MozBoxPack": "",
		"MozBoxOrdinalGroup": "",
		"MozStackSizing": "",
		"clipPath": "",
		"clip-path": "",
		"clipRule": "",
		"clip-rule": "",
		"colorInterpolation": "",
		"color-interpolation": "",
		"colorInterpolationFilters": "",
		"color-interpolation-filters": "",
		"dominantBaseline": "",
		"dominant-baseline": "",
		"fill": "",
		"fillOpacity": "",
		"fill-opacity": "",
		"fillRule": "",
		"fill-rule": "",
		"filter": "",
		"floodColor": "",
		"flood-color": "",
		"floodOpacity": "",
		"flood-opacity": "",
		"imageRendering": "",
		"image-rendering": "",
		"lightingColor": "",
		"lighting-color": "",
		"marker": "",
		"markerEnd": "",
		"marker-end": "",
		"markerMid": "",
		"marker-mid": "",
		"markerStart": "",
		"marker-start": "",
		"mask": "",
		"maskType": "",
		"mask-type": "",
		"shapeRendering": "",
		"shape-rendering": "",
		"stopColor": "",
		"stop-color": "",
		"stopOpacity": "",
		"stop-opacity": "",
		"stroke": "",
		"strokeDasharray": "",
		"stroke-dasharray": "",
		"strokeDashoffset": "",
		"stroke-dashoffset": "",
		"strokeLinecap": "",
		"stroke-linecap": "",
		"strokeLinejoin": "",
		"stroke-linejoin": "",
		"strokeMiterlimit": "",
		"stroke-miterlimit": "",
		"strokeOpacity": "",
		"stroke-opacity": "",
		"strokeWidth": "",
		"stroke-width": "",
		"textAnchor": "",
		"text-anchor": "",
		"textRendering": "",
		"text-rendering": "",
		"vectorEffect": "",
		"vector-effect": "",
		"willChange": "",
		"will-change": "",
		"MozTransform": "",
		"MozTransformOrigin": "",
		"MozPerspectiveOrigin": "",
		"MozPerspective": "",
		"MozTransformStyle": "",
		"MozBackfaceVisibility": "",
		"MozBorderImage": "",
		"MozTransition": "",
		"MozTransitionDelay": "",
		"MozTransitionDuration": "",
		"MozTransitionProperty": "",
		"MozTransitionTimingFunction": "",
		"MozAnimation": "",
		"MozAnimationDelay": "",
		"MozAnimationDirection": "",
		"MozAnimationDuration": "",
		"MozAnimationFillMode": "",
		"MozAnimationIterationCount": "",
		"MozAnimationName": "",
		"MozAnimationPlayState": "",
		"MozAnimationTimingFunction": "",
		"MozBoxSizing": "",
		"MozFontFeatureSettings": "",
		"MozFontLanguageOverride": "",
		"paddingInlineEnd": "",
		"padding-inline-end": "",
		"paddingInlineStart": "",
		"padding-inline-start": "",
		"marginInlineEnd": "",
		"margin-inline-end": "",
		"marginInlineStart": "",
		"margin-inline-start": "",
		"borderInlineEnd": "",
		"border-inline-end": "",
		"borderInlineEndColor": "",
		"border-inline-end-color": "",
		"borderInlineEndStyle": "",
		"border-inline-end-style": "",
		"borderInlineEndWidth": "",
		"border-inline-end-width": "",
		"borderInlineStart": "",
		"border-inline-start": "",
		"borderInlineStartColor": "",
		"border-inline-start-color": "",
		"borderInlineStartStyle": "",
		"border-inline-start-style": "",
		"borderInlineStartWidth": "",
		"border-inline-start-width": "",
		"item": "",
		"getPropertyValue": "",
		"getPropertyCSSValue": "",
		"getPropertyPriority": "",
		"setProperty": "",
		"removeProperty": "",
		"cssText": "",
		"parentRule": "",
		"-moz-appearance": "",
		"-moz-outline-radius": "",
		"-moz-outline-radius-topleft": "",
		"-moz-outline-radius-topright": "",
		"-moz-outline-radius-bottomright": "",
		"-moz-outline-radius-bottomleft": "",
		"-moz-tab-size": "",
		"-moz-binding": "",
		"-moz-border-bottom-colors": "",
		"-moz-border-end": "",
		"-moz-border-end-color": "",
		"-moz-border-end-style": "",
		"-moz-border-end-width": "",
		"-moz-border-start": "",
		"-moz-border-start-color": "",
		"-moz-border-start-style": "",
		"-moz-border-start-width": "",
		"-moz-border-left-colors": "",
		"-moz-border-right-colors": "",
		"-moz-border-top-colors": "",
		"-moz-columns": "",
		"-moz-column-count": "",
		"-moz-column-fill": "",
		"-moz-column-width": "",
		"-moz-column-gap": "",
		"-moz-column-rule": "",
		"-moz-column-rule-color": "",
		"-moz-column-rule-style": "",
		"-moz-column-rule-width": "",
		"-moz-float-edge": "",
		"-moz-osx-font-smoothing": "",
		"-moz-force-broken-image-icon": "",
		"-moz-image-region": "",
		"-moz-margin-end": "",
		"-moz-margin-start": "",
		"-moz-orient": "",
		"-moz-padding-end": "",
		"-moz-padding-start": "",
		"-moz-text-align-last": "",
		"-moz-text-size-adjust": "",
		"-moz-user-focus": "",
		"-moz-user-input": "",
		"-moz-user-modify": "",
		"-moz-user-select": "",
		"-moz-window-dragging": "",
		"-moz-window-shadow": "",
		"-moz-hyphens": "",
		"-moz-box-align": "",
		"-moz-box-direction": "",
		"-moz-box-flex": "",
		"-moz-box-orient": "",
		"-moz-box-pack": "",
		"-moz-box-ordinal-group": "",
		"-moz-stack-sizing": "",
		"-moz-transform": "",
		"-moz-transform-origin": "",
		"-moz-perspective-origin": "",
		"-moz-perspective": "",
		"-moz-transform-style": "",
		"-moz-backface-visibility": "",
		"-moz-border-image": "",
		"-moz-transition": "",
		"-moz-transition-delay": "",
		"-moz-transition-duration": "",
		"-moz-transition-property": "",
		"-moz-transition-timing-function": "",
		"-moz-animation": "",
		"-moz-animation-delay": "",
		"-moz-animation-direction": "",
		"-moz-animation-duration": "",
		"-moz-animation-fill-mode": "",
		"-moz-animation-iteration-count": "",
		"-moz-animation-name": "",
		"-moz-animation-play-state": "",
		"-moz-animation-timing-function": "",
		"-moz-box-sizing": "",
		"-moz-font-feature-settings": "",
		"-moz-font-language-override": ""
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var jsProp = (function () {
	  var jsMemos = {};
	  return function (property) {
	    return jsMemos[property] || (jsMemos[property] = (function () {
	      var camelProp = camelCase(property);
	      if (propExists(camelProp)) {
	        return camelProp;
	      }
	      var prefixed = getJSPrefix() + capitalize(camelProp);
	      if (propExists(prefixed)) {
	        return prefixed;
	      }

	      return camelProp;
	    })());
	  };
	})();

	var cssProp = (function () {
	  var cssMemos = {};
	  return function (property) {
	    return cssMemos[property] || (cssMemos[property] = (function () {
	      var kebabProp = kebabCase(property);
	      if (propExists(kebabProp)) {
	        return kebabProp;
	      }
	      var prefixed = getCSSPrefix() + kebabProp;
	      if (propExists(prefixed)) {
	        return prefixed;
	      }
	      if (getPrefix() === 'moz') {
	        var prefixedJS = jsProp(property);
	        var mozPrefixed = prefixedJS.lastIndexOf(getJSPrefix(), 0) === 0 ? '-' + kebabCase(prefixedJS) : kebabProp;
	        return mozPrefixed;
	      }

	      return kebabProp;
	    })());
	  };
	})();

	var getJSPrefix = (function () {
	  var jsPrefix = null;
	  return function () {
	    return jsPrefix || (jsPrefix = 'Webkit|Moz|ms|O'.match(new RegExp('(' + getPrefix() + ')', 'i'))[1]);
	  };
	})();

	var getCSSPrefix = (function () {
	  var cssPrefix = null;
	  return function () {
	    return cssPrefix || (cssPrefix = '-' + getPrefix() + '-');
	  };
	})();

	var getPrefix = (function () {
	  var prefix = null;
	  return function () {
	    return prefix || (prefix = (function () {
	      var styles = getStyles();
	      return (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
	    })());
	  };
	})();

	var getStyles = (function () {
	  var styles = null;
	  return function () {
	    return styles || (styles = window.getComputedStyle(document.documentElement, ''));
	  };
	})();

	function propExists(property) {
	  return getStyles()[property] !== undefined;
	}

	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function camelCase(str) {
	  return str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
	    return (/\s+/.test(match) ? '' : index === 0 ? match.toLowerCase() : match.toUpperCase()
	    );
	  });
	}

	function kebabCase(str) {
	  return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase().replace(/[ _]/g, '-');
	}

	function prefixProperty(property) {
	  return jsProp(property);
	}
	prefixProperty.js = jsProp;
	prefixProperty.css = cssProp;
	prefixProperty.jsPrefix = getJSPrefix;
	prefixProperty.cssPrefix = getCSSPrefix;

	exports['default'] = prefixProperty;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function () {
	  var ua = navigator.userAgent;
	  var uaMatches = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

	  if (/trident/i.test(uaMatches[1])) {
	    return 'ie';
	  }

	  if (uaMatches[1] === 'Chrome') {
	    if (ua.match(/\b(OPR|Edge)\/(\d+)/) != null) {
	      return 'Opera';
	    }
	  }

	  return (uaMatches[2] ? uaMatches[1] : navigator.appName).toLowerCase();
	};

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = [
		"alignContent",
		"alignItems",
		"alignSelf",
		"alignmentBaseline",
		"all",
		"animation",
		"animationDelay",
		"animationDirection",
		"animationDuration",
		"animationFillMode",
		"animationIterationCount",
		"animationName",
		"animationPlayState",
		"animationTimingFunction",
		"backfaceVisibility",
		"background",
		"backgroundAttachment",
		"backgroundBlendMode",
		"backgroundClip",
		"backgroundColor",
		"backgroundImage",
		"backgroundOrigin",
		"backgroundPosition",
		"backgroundPositionX",
		"backgroundPositionY",
		"backgroundRepeat",
		"backgroundRepeatX",
		"backgroundRepeatY",
		"backgroundSize",
		"baselineShift",
		"border",
		"borderBottom",
		"borderBottomColor",
		"borderBottomLeftRadius",
		"borderBottomRightRadius",
		"borderBottomStyle",
		"borderBottomWidth",
		"borderCollapse",
		"borderColor",
		"borderImage",
		"borderImageOutset",
		"borderImageRepeat",
		"borderImageSlice",
		"borderImageSource",
		"borderImageWidth",
		"borderLeft",
		"borderLeftColor",
		"borderLeftStyle",
		"borderLeftWidth",
		"borderRadius",
		"borderRight",
		"borderRightColor",
		"borderRightStyle",
		"borderRightWidth",
		"borderSpacing",
		"borderStyle",
		"borderTop",
		"borderTopColor",
		"borderTopLeftRadius",
		"borderTopRightRadius",
		"borderTopStyle",
		"borderTopWidth",
		"borderWidth",
		"bottom",
		"boxShadow",
		"boxSizing",
		"bufferedRendering",
		"captionSide",
		"clear",
		"clip",
		"clipPath",
		"clipRule",
		"color",
		"colorInterpolation",
		"colorInterpolationFilters",
		"colorRendering",
		"content",
		"counterIncrement",
		"counterReset",
		"cursor",
		"cx",
		"cy",
		"direction",
		"display",
		"dominantBaseline",
		"emptyCells",
		"fill",
		"fillOpacity",
		"fillRule",
		"filter",
		"flex",
		"flexBasis",
		"flexDirection",
		"flexFlow",
		"flexGrow",
		"flexShrink",
		"flexWrap",
		"float",
		"floodColor",
		"floodOpacity",
		"font",
		"fontFamily",
		"fontKerning",
		"fontSize",
		"fontStretch",
		"fontStyle",
		"fontVariant",
		"fontVariantLigatures",
		"fontWeight",
		"glyphOrientationHorizontal",
		"glyphOrientationVertical",
		"height",
		"imageRendering",
		"isolation",
		"justifyContent",
		"left",
		"letterSpacing",
		"lightingColor",
		"lineHeight",
		"listStyle",
		"listStyleImage",
		"listStylePosition",
		"listStyleType",
		"margin",
		"marginBottom",
		"marginLeft",
		"marginRight",
		"marginTop",
		"marker",
		"markerEnd",
		"markerMid",
		"markerStart",
		"mask",
		"maskType",
		"maxHeight",
		"maxWidth",
		"maxZoom",
		"minHeight",
		"minWidth",
		"minZoom",
		"mixBlendMode",
		"objectFit",
		"objectPosition",
		"opacity",
		"order",
		"orientation",
		"orphans",
		"outline",
		"outlineColor",
		"outlineOffset",
		"outlineStyle",
		"outlineWidth",
		"overflow",
		"overflowWrap",
		"overflowX",
		"overflowY",
		"padding",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"paddingTop",
		"page",
		"pageBreakAfter",
		"pageBreakBefore",
		"pageBreakInside",
		"paintOrder",
		"perspective",
		"perspectiveOrigin",
		"pointerEvents",
		"position",
		"quotes",
		"r",
		"resize",
		"right",
		"rx",
		"ry",
		"shapeImageThreshold",
		"shapeMargin",
		"shapeOutside",
		"shapeRendering",
		"size",
		"speak",
		"src",
		"stopColor",
		"stopOpacity",
		"stroke",
		"strokeDasharray",
		"strokeDashoffset",
		"strokeLinecap",
		"strokeLinejoin",
		"strokeMiterlimit",
		"strokeOpacity",
		"strokeWidth",
		"tabSize",
		"tableLayout",
		"textAlign",
		"textAnchor",
		"textDecoration",
		"textIndent",
		"textOverflow",
		"textRendering",
		"textShadow",
		"textTransform",
		"top",
		"touchAction",
		"transform",
		"transformOrigin",
		"transformStyle",
		"transition",
		"transitionDelay",
		"transitionDuration",
		"transitionProperty",
		"transitionTimingFunction",
		"unicodeBidi",
		"unicodeRange",
		"userZoom",
		"vectorEffect",
		"verticalAlign",
		"visibility",
		"whiteSpace",
		"widows",
		"width",
		"willChange",
		"wordBreak",
		"wordSpacing",
		"wordWrap",
		"writingMode",
		"x",
		"y",
		"zIndex",
		"zoom",
		"length",
		"appRegion",
		"appearance",
		"backgroundComposite",
		"borderAfter",
		"borderAfterColor",
		"borderAfterStyle",
		"borderAfterWidth",
		"borderBefore",
		"borderBeforeColor",
		"borderBeforeStyle",
		"borderBeforeWidth",
		"borderEnd",
		"borderEndColor",
		"borderEndStyle",
		"borderEndWidth",
		"borderHorizontalSpacing",
		"borderStart",
		"borderStartColor",
		"borderStartStyle",
		"borderStartWidth",
		"borderVerticalSpacing",
		"boxAlign",
		"boxDecorationBreak",
		"boxDirection",
		"boxFlex",
		"boxFlexGroup",
		"boxLines",
		"boxOrdinalGroup",
		"boxOrient",
		"boxPack",
		"boxReflect",
		"columnBreakAfter",
		"columnBreakBefore",
		"columnBreakInside",
		"columnCount",
		"columnGap",
		"columnRule",
		"columnRuleColor",
		"columnRuleStyle",
		"columnRuleWidth",
		"columnSpan",
		"columnWidth",
		"columns",
		"fontFeatureSettings",
		"fontSizeDelta",
		"fontSmoothing",
		"highlight",
		"hyphenateCharacter",
		"lineBoxContain",
		"lineBreak",
		"lineClamp",
		"locale",
		"logicalHeight",
		"logicalWidth",
		"marginAfter",
		"marginAfterCollapse",
		"marginBefore",
		"marginBeforeCollapse",
		"marginBottomCollapse",
		"marginCollapse",
		"marginEnd",
		"marginStart",
		"marginTopCollapse",
		"maskBoxImage",
		"maskBoxImageOutset",
		"maskBoxImageRepeat",
		"maskBoxImageSlice",
		"maskBoxImageSource",
		"maskBoxImageWidth",
		"maskClip",
		"maskComposite",
		"maskImage",
		"maskOrigin",
		"maskPosition",
		"maskPositionX",
		"maskPositionY",
		"maskRepeat",
		"maskRepeatX",
		"maskRepeatY",
		"maskSize",
		"maxLogicalHeight",
		"maxLogicalWidth",
		"minLogicalHeight",
		"minLogicalWidth",
		"paddingAfter",
		"paddingBefore",
		"paddingEnd",
		"paddingStart",
		"perspectiveOriginX",
		"perspectiveOriginY",
		"printColorAdjust",
		"rtlOrdering",
		"rubyPosition",
		"tapHighlightColor",
		"textCombine",
		"textDecorationsInEffect",
		"textEmphasis",
		"textEmphasisColor",
		"textEmphasisPosition",
		"textEmphasisStyle",
		"textFillColor",
		"textOrientation",
		"textSecurity",
		"textStroke",
		"textStrokeColor",
		"textStrokeWidth",
		"transformOriginX",
		"transformOriginY",
		"transformOriginZ",
		"userDrag",
		"userModify",
		"userSelect"
	];

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = [
		"alignmentBaseline",
		"background",
		"backgroundAttachment",
		"backgroundBlendMode",
		"backgroundClip",
		"backgroundColor",
		"backgroundImage",
		"backgroundOrigin",
		"backgroundPosition",
		"backgroundPositionX",
		"backgroundPositionY",
		"backgroundRepeat",
		"backgroundRepeatX",
		"backgroundRepeatY",
		"backgroundSize",
		"baselineShift",
		"border",
		"borderBottom",
		"borderBottomColor",
		"borderBottomLeftRadius",
		"borderBottomRightRadius",
		"borderBottomStyle",
		"borderBottomWidth",
		"borderCollapse",
		"borderColor",
		"borderImage",
		"borderImageOutset",
		"borderImageRepeat",
		"borderImageSlice",
		"borderImageSource",
		"borderImageWidth",
		"borderLeft",
		"borderLeftColor",
		"borderLeftStyle",
		"borderLeftWidth",
		"borderRadius",
		"borderRight",
		"borderRightColor",
		"borderRightStyle",
		"borderRightWidth",
		"borderSpacing",
		"borderStyle",
		"borderTop",
		"borderTopColor",
		"borderTopLeftRadius",
		"borderTopRightRadius",
		"borderTopStyle",
		"borderTopWidth",
		"borderWidth",
		"bottom",
		"boxShadow",
		"boxSizing",
		"bufferedRendering",
		"captionSide",
		"clear",
		"clip",
		"clipPath",
		"clipRule",
		"color",
		"colorInterpolation",
		"colorInterpolationFilters",
		"colorProfile",
		"colorRendering",
		"content",
		"counterIncrement",
		"counterReset",
		"cursor",
		"direction",
		"display",
		"dominantBaseline",
		"emptyCells",
		"fill",
		"fillOpacity",
		"fillRule",
		"filter",
		"float",
		"floodColor",
		"floodOpacity",
		"font",
		"fontFamily",
		"fontSize",
		"fontStretch",
		"fontStyle",
		"fontVariant",
		"fontWeight",
		"glyphOrientationHorizontal",
		"glyphOrientationVertical",
		"height",
		"imageRendering",
		"isolation",
		"kerning",
		"left",
		"letterSpacing",
		"lightingColor",
		"lineHeight",
		"listStyle",
		"listStyleImage",
		"listStylePosition",
		"listStyleType",
		"margin",
		"marginBottom",
		"marginLeft",
		"marginRight",
		"marginTop",
		"marker",
		"markerEnd",
		"markerMid",
		"markerStart",
		"mask",
		"maskType",
		"maxHeight",
		"maxWidth",
		"minHeight",
		"minWidth",
		"mixBlendMode",
		"objectFit",
		"opacity",
		"orphans",
		"outline",
		"outlineColor",
		"outlineOffset",
		"outlineStyle",
		"outlineWidth",
		"overflow",
		"overflowWrap",
		"overflowX",
		"overflowY",
		"padding",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"paddingTop",
		"page",
		"pageBreakAfter",
		"pageBreakBefore",
		"pageBreakInside",
		"paintOrder",
		"pointerEvents",
		"position",
		"quotes",
		"resize",
		"right",
		"shapeRendering",
		"size",
		"speak",
		"src",
		"stopColor",
		"stopOpacity",
		"stroke",
		"strokeDasharray",
		"strokeDashoffset",
		"strokeLinecap",
		"strokeLinejoin",
		"strokeMiterlimit",
		"strokeOpacity",
		"strokeWidth",
		"tabSize",
		"tableLayout",
		"textAlign",
		"textAnchor",
		"textDecoration",
		"textIndent",
		"textLineThrough",
		"textLineThroughColor",
		"textLineThroughMode",
		"textLineThroughStyle",
		"textLineThroughWidth",
		"textOverflow",
		"textOverline",
		"textOverlineColor",
		"textOverlineMode",
		"textOverlineStyle",
		"textOverlineWidth",
		"textRendering",
		"textShadow",
		"textTransform",
		"textUnderline",
		"textUnderlineColor",
		"textUnderlineMode",
		"textUnderlineStyle",
		"textUnderlineWidth",
		"top",
		"transition",
		"transitionDelay",
		"transitionDuration",
		"transitionProperty",
		"transitionTimingFunction",
		"unicodeBidi",
		"unicodeRange",
		"vectorEffect",
		"verticalAlign",
		"visibility",
		"whiteSpace",
		"widows",
		"width",
		"wordBreak",
		"wordSpacing",
		"wordWrap",
		"writingMode",
		"zIndex",
		"zoom",
		"length",
		"alignContent",
		"alignItems",
		"alignSelf",
		"alt",
		"animation",
		"animationDelay",
		"animationDirection",
		"animationDuration",
		"animationFillMode",
		"animationIterationCount",
		"animationName",
		"animationPlayState",
		"animationTimingFunction",
		"appearance",
		"aspectRatio",
		"backfaceVisibility",
		"backgroundComposite",
		"borderAfter",
		"borderAfterColor",
		"borderAfterStyle",
		"borderAfterWidth",
		"borderBefore",
		"borderBeforeColor",
		"borderBeforeStyle",
		"borderBeforeWidth",
		"borderEnd",
		"borderEndColor",
		"borderEndStyle",
		"borderEndWidth",
		"borderFit",
		"borderHorizontalSpacing",
		"borderStart",
		"borderStartColor",
		"borderStartStyle",
		"borderStartWidth",
		"borderVerticalSpacing",
		"boxAlign",
		"boxDecorationBreak",
		"boxDirection",
		"boxFlex",
		"boxFlexGroup",
		"boxLines",
		"boxOrdinalGroup",
		"boxOrient",
		"boxPack",
		"boxReflect",
		"colorCorrection",
		"columnAxis",
		"columnBreakAfter",
		"columnBreakBefore",
		"columnBreakInside",
		"columnCount",
		"columnFill",
		"columnGap",
		"columnProgression",
		"columnRule",
		"columnRuleColor",
		"columnRuleStyle",
		"columnRuleWidth",
		"columnSpan",
		"columnWidth",
		"columns",
		"cursorVisibility",
		"dashboardRegion",
		"flex",
		"flexBasis",
		"flexDirection",
		"flexFlow",
		"flexGrow",
		"flexShrink",
		"flexWrap",
		"flowFrom",
		"flowInto",
		"fontFeatureSettings",
		"fontKerning",
		"fontSizeDelta",
		"fontSmoothing",
		"fontVariantLigatures",
		"hyphenateCharacter",
		"hyphenateLimitAfter",
		"hyphenateLimitBefore",
		"hyphenateLimitLines",
		"hyphens",
		"justifyContent",
		"justifySelf",
		"lineAlign",
		"lineBoxContain",
		"lineBreak",
		"lineClamp",
		"lineGrid",
		"lineSnap",
		"locale",
		"logicalHeight",
		"logicalWidth",
		"marginAfter",
		"marginAfterCollapse",
		"marginBefore",
		"marginBeforeCollapse",
		"marginBottomCollapse",
		"marginCollapse",
		"marginEnd",
		"marginStart",
		"marginTopCollapse",
		"marquee",
		"marqueeDirection",
		"marqueeIncrement",
		"marqueeRepetition",
		"marqueeSpeed",
		"marqueeStyle",
		"maskBoxImage",
		"maskBoxImageOutset",
		"maskBoxImageRepeat",
		"maskBoxImageSlice",
		"maskBoxImageSource",
		"maskBoxImageWidth",
		"maskClip",
		"maskComposite",
		"maskImage",
		"maskOrigin",
		"maskPosition",
		"maskPositionX",
		"maskPositionY",
		"maskRepeat",
		"maskRepeatX",
		"maskRepeatY",
		"maskSize",
		"maskSourceType",
		"maxLogicalHeight",
		"maxLogicalWidth",
		"minLogicalHeight",
		"minLogicalWidth",
		"nbspMode",
		"order",
		"paddingAfter",
		"paddingBefore",
		"paddingEnd",
		"paddingStart",
		"perspective",
		"perspectiveOrigin",
		"perspectiveOriginX",
		"perspectiveOriginY",
		"printColorAdjust",
		"regionBreakAfter",
		"regionBreakBefore",
		"regionBreakInside",
		"regionFragment",
		"rtlOrdering",
		"rubyPosition",
		"shapeImageThreshold",
		"shapeMargin",
		"shapeOutside",
		"svgShadow",
		"textCombine",
		"textDecorationColor",
		"textDecorationLine",
		"textDecorationSkip",
		"textDecorationStyle",
		"textDecorationsInEffect",
		"textEmphasis",
		"textEmphasisColor",
		"textEmphasisPosition",
		"textEmphasisStyle",
		"textFillColor",
		"textOrientation",
		"textSecurity",
		"textStroke",
		"textStrokeColor",
		"textStrokeWidth",
		"textUnderlinePosition",
		"transform",
		"transformOrigin",
		"transformOriginX",
		"transformOriginY",
		"transformOriginZ",
		"transformStyle",
		"userDrag",
		"userModify",
		"userSelect"
	];

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = [
		"all",
		"animation",
		"animationDelay",
		"animation-delay",
		"animationDirection",
		"animation-direction",
		"animationDuration",
		"animation-duration",
		"animationFillMode",
		"animation-fill-mode",
		"animationIterationCount",
		"animation-iteration-count",
		"animationName",
		"animation-name",
		"animationPlayState",
		"animation-play-state",
		"animationTimingFunction",
		"animation-timing-function",
		"background",
		"backgroundAttachment",
		"background-attachment",
		"backgroundClip",
		"background-clip",
		"backgroundColor",
		"background-color",
		"backgroundImage",
		"background-image",
		"backgroundBlendMode",
		"background-blend-mode",
		"backgroundOrigin",
		"background-origin",
		"backgroundPosition",
		"background-position",
		"backgroundRepeat",
		"background-repeat",
		"backgroundSize",
		"background-size",
		"border",
		"borderBottom",
		"border-bottom",
		"borderBottomColor",
		"border-bottom-color",
		"borderBottomStyle",
		"border-bottom-style",
		"borderBottomWidth",
		"border-bottom-width",
		"borderCollapse",
		"border-collapse",
		"borderColor",
		"border-color",
		"borderImage",
		"border-image",
		"borderImageSource",
		"border-image-source",
		"borderImageSlice",
		"border-image-slice",
		"borderImageWidth",
		"border-image-width",
		"borderImageOutset",
		"border-image-outset",
		"borderImageRepeat",
		"border-image-repeat",
		"borderLeft",
		"border-left",
		"borderLeftColor",
		"border-left-color",
		"borderLeftStyle",
		"border-left-style",
		"borderLeftWidth",
		"border-left-width",
		"borderRight",
		"border-right",
		"borderRightColor",
		"border-right-color",
		"borderRightStyle",
		"border-right-style",
		"borderRightWidth",
		"border-right-width",
		"borderSpacing",
		"border-spacing",
		"borderStyle",
		"border-style",
		"borderTop",
		"border-top",
		"borderTopColor",
		"border-top-color",
		"borderTopStyle",
		"border-top-style",
		"borderTopWidth",
		"border-top-width",
		"borderWidth",
		"border-width",
		"borderRadius",
		"border-radius",
		"borderTopLeftRadius",
		"border-top-left-radius",
		"borderTopRightRadius",
		"border-top-right-radius",
		"borderBottomRightRadius",
		"border-bottom-right-radius",
		"borderBottomLeftRadius",
		"border-bottom-left-radius",
		"bottom",
		"boxDecorationBreak",
		"box-decoration-break",
		"boxShadow",
		"box-shadow",
		"boxSizing",
		"box-sizing",
		"captionSide",
		"caption-side",
		"clear",
		"clip",
		"color",
		"content",
		"counterIncrement",
		"counter-increment",
		"counterReset",
		"counter-reset",
		"cursor",
		"direction",
		"display",
		"emptyCells",
		"empty-cells",
		"alignContent",
		"align-content",
		"alignItems",
		"align-items",
		"alignSelf",
		"align-self",
		"flex",
		"flexBasis",
		"flex-basis",
		"flexDirection",
		"flex-direction",
		"flexFlow",
		"flex-flow",
		"flexGrow",
		"flex-grow",
		"flexShrink",
		"flex-shrink",
		"flexWrap",
		"flex-wrap",
		"order",
		"justifyContent",
		"justify-content",
		"float",
		"font",
		"fontFamily",
		"font-family",
		"fontFeatureSettings",
		"font-feature-settings",
		"fontKerning",
		"font-kerning",
		"fontLanguageOverride",
		"font-language-override",
		"fontSize",
		"font-size",
		"fontSizeAdjust",
		"font-size-adjust",
		"fontStretch",
		"font-stretch",
		"fontStyle",
		"font-style",
		"fontSynthesis",
		"font-synthesis",
		"fontVariant",
		"font-variant",
		"fontVariantAlternates",
		"font-variant-alternates",
		"fontVariantCaps",
		"font-variant-caps",
		"fontVariantEastAsian",
		"font-variant-east-asian",
		"fontVariantLigatures",
		"font-variant-ligatures",
		"fontVariantNumeric",
		"font-variant-numeric",
		"fontVariantPosition",
		"font-variant-position",
		"fontWeight",
		"font-weight",
		"height",
		"imageOrientation",
		"image-orientation",
		"imeMode",
		"ime-mode",
		"left",
		"letterSpacing",
		"letter-spacing",
		"lineHeight",
		"line-height",
		"listStyle",
		"list-style",
		"listStyleImage",
		"list-style-image",
		"listStylePosition",
		"list-style-position",
		"listStyleType",
		"list-style-type",
		"margin",
		"marginBottom",
		"margin-bottom",
		"marginLeft",
		"margin-left",
		"marginRight",
		"margin-right",
		"marginTop",
		"margin-top",
		"markerOffset",
		"marker-offset",
		"marks",
		"maxHeight",
		"max-height",
		"maxWidth",
		"max-width",
		"minHeight",
		"min-height",
		"minWidth",
		"min-width",
		"mixBlendMode",
		"mix-blend-mode",
		"isolation",
		"objectFit",
		"object-fit",
		"objectPosition",
		"object-position",
		"opacity",
		"orphans",
		"outline",
		"outlineColor",
		"outline-color",
		"outlineStyle",
		"outline-style",
		"outlineWidth",
		"outline-width",
		"outlineOffset",
		"outline-offset",
		"overflow",
		"overflowX",
		"overflow-x",
		"overflowY",
		"overflow-y",
		"padding",
		"paddingBottom",
		"padding-bottom",
		"paddingLeft",
		"padding-left",
		"paddingRight",
		"padding-right",
		"paddingTop",
		"padding-top",
		"page",
		"pageBreakAfter",
		"page-break-after",
		"pageBreakBefore",
		"page-break-before",
		"pageBreakInside",
		"page-break-inside",
		"paintOrder",
		"paint-order",
		"pointerEvents",
		"pointer-events",
		"position",
		"quotes",
		"resize",
		"right",
		"rubyAlign",
		"ruby-align",
		"rubyPosition",
		"ruby-position",
		"scrollBehavior",
		"scroll-behavior",
		"size",
		"tableLayout",
		"table-layout",
		"textAlign",
		"text-align",
		"textDecoration",
		"text-decoration",
		"textDecorationColor",
		"text-decoration-color",
		"textDecorationLine",
		"text-decoration-line",
		"textDecorationStyle",
		"text-decoration-style",
		"textIndent",
		"text-indent",
		"textOverflow",
		"text-overflow",
		"textShadow",
		"text-shadow",
		"textTransform",
		"text-transform",
		"transform",
		"transformOrigin",
		"transform-origin",
		"perspectiveOrigin",
		"perspective-origin",
		"perspective",
		"transformStyle",
		"transform-style",
		"backfaceVisibility",
		"backface-visibility",
		"top",
		"transition",
		"transitionDelay",
		"transition-delay",
		"transitionDuration",
		"transition-duration",
		"transitionProperty",
		"transition-property",
		"transitionTimingFunction",
		"transition-timing-function",
		"unicodeBidi",
		"unicode-bidi",
		"verticalAlign",
		"vertical-align",
		"visibility",
		"whiteSpace",
		"white-space",
		"widows",
		"width",
		"wordBreak",
		"word-break",
		"wordSpacing",
		"word-spacing",
		"wordWrap",
		"word-wrap",
		"zIndex",
		"z-index",
		"clipPath",
		"clip-path",
		"clipRule",
		"clip-rule",
		"colorInterpolation",
		"color-interpolation",
		"colorInterpolationFilters",
		"color-interpolation-filters",
		"dominantBaseline",
		"dominant-baseline",
		"fill",
		"fillOpacity",
		"fill-opacity",
		"fillRule",
		"fill-rule",
		"filter",
		"floodColor",
		"flood-color",
		"floodOpacity",
		"flood-opacity",
		"imageRendering",
		"image-rendering",
		"lightingColor",
		"lighting-color",
		"marker",
		"markerEnd",
		"marker-end",
		"markerMid",
		"marker-mid",
		"markerStart",
		"marker-start",
		"mask",
		"maskType",
		"mask-type",
		"shapeRendering",
		"shape-rendering",
		"stopColor",
		"stop-color",
		"stopOpacity",
		"stop-opacity",
		"stroke",
		"strokeDasharray",
		"stroke-dasharray",
		"strokeDashoffset",
		"stroke-dashoffset",
		"strokeLinecap",
		"stroke-linecap",
		"strokeLinejoin",
		"stroke-linejoin",
		"strokeMiterlimit",
		"stroke-miterlimit",
		"strokeOpacity",
		"stroke-opacity",
		"strokeWidth",
		"stroke-width",
		"textAnchor",
		"text-anchor",
		"textRendering",
		"text-rendering",
		"vectorEffect",
		"vector-effect",
		"willChange",
		"will-change",
		"length",
		"appearance",
		"outlineRadius",
		"outlineRadiusTopleft",
		"outlineRadiusTopright",
		"outlineRadiusBottomright",
		"outlineRadiusBottomleft",
		"tabSize",
		"binding",
		"borderBottomColors",
		"borderEnd",
		"borderEndColor",
		"borderEndStyle",
		"borderEndWidth",
		"borderStart",
		"borderStartColor",
		"borderStartStyle",
		"borderStartWidth",
		"borderLeftColors",
		"borderRightColors",
		"borderTopColors",
		"columns",
		"columnCount",
		"columnFill",
		"columnWidth",
		"columnGap",
		"columnRule",
		"columnRuleColor",
		"columnRuleStyle",
		"columnRuleWidth",
		"floatEdge",
		"forceBrokenImageIcon",
		"imageRegion",
		"marginEnd",
		"marginStart",
		"orient",
		"paddingEnd",
		"paddingStart",
		"textAlignLast",
		"textSizeAdjust",
		"userFocus",
		"userInput",
		"userModify",
		"userSelect",
		"windowDragging",
		"windowShadow",
		"hyphens",
		"boxAlign",
		"boxDirection",
		"boxFlex",
		"boxOrient",
		"boxPack",
		"boxOrdinalGroup",
		"stackSizing"
	];

/***/ }
/******/ ]);