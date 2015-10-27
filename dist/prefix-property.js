(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["prefixProperty"] = factory();
	else
		root["prefixProperty"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _ = __webpack_require__(42);

	exports['default'] = _Object$assign(function prefixProperty(property) {
	  return (0, _.js)(property);
	}, { js: _.js, css: _.css, prefix: _.prefix, jsPrefix: _.jsPrefix, cssPrefix: _.cssPrefix });
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	'use strict';

	var $def = __webpack_require__(5);

	$def($def.S + $def.F, 'Object', { assign: __webpack_require__(8) });

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(6),
	    core = __webpack_require__(7),
	    PROTOTYPE = 'prototype';
	var ctx = function ctx(fn, that) {
	  return function () {
	    return fn.apply(that, arguments);
	  };
	};
	var $def = function $def(type, name, source) {
	  var key,
	      own,
	      out,
	      exp,
	      isGlobal = type & $def.G,
	      isProto = type & $def.P,
	      target = isGlobal ? global : type & $def.S ? global[name] : (global[name] || {})[PROTOTYPE],
	      exports = isGlobal ? core : core[name] || (core[name] = {});
	  if (isGlobal) source = name;
	  for (key in source) {
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if (isGlobal && typeof target[key] != 'function') exp = source[key];
	    // bind timers to global for call from export context
	    else if (type & $def.B && own) exp = ctx(out, global);
	      // wrap global constructors for prevent change them in library
	      else if (type & $def.W && target[key] == out) !(function (C) {
	          exp = function (param) {
	            return this instanceof C ? new C(param) : C(param);
	          };
	          exp[PROTOTYPE] = C[PROTOTYPE];
	        })(out);else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if (isProto) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$def.F = 1; // forced
	$def.G = 2; // global
	$def.S = 4; // static
	$def.P = 8; // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	module.exports = $def;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	'use strict';

	var UNDEFINED = 'undefined';
	var global = module.exports = typeof window != UNDEFINED && window.Math == Math ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '1.2.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	'use strict';

	var _Object$assign = __webpack_require__(2)['default'];

	var _Symbol = __webpack_require__(9)['default'];

	var _Object$keys = __webpack_require__(38)['default'];

	var toObject = __webpack_require__(41),
	    IObject = __webpack_require__(25),
	    enumKeys = __webpack_require__(33),
	    has = __webpack_require__(13);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(15)(function () {
	  var a = _Object$assign,
	      A = {},
	      B = {},
	      S = _Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return a({}, A)[S] != 7 || _Object$keys(a({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      l = arguments.length,
	      i = 1;
	  while (l > i) {
	    var S = IObject(arguments[i++]),
	        keys = enumKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) if (has(S, key = keys[j++])) T[key] = S[key];
	  }
	  return T;
	} : _Object$assign;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(11);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $ = __webpack_require__(12),
	    global = __webpack_require__(6),
	    has = __webpack_require__(13),
	    SUPPORT_DESC = __webpack_require__(14),
	    $def = __webpack_require__(5),
	    $redef = __webpack_require__(16),
	    $fails = __webpack_require__(15),
	    shared = __webpack_require__(19),
	    setTag = __webpack_require__(20),
	    uid = __webpack_require__(22),
	    wks = __webpack_require__(21),
	    keyOf = __webpack_require__(23),
	    $names = __webpack_require__(28),
	    enumKeys = __webpack_require__(33),
	    isArray = __webpack_require__(34),
	    isObject = __webpack_require__(35),
	    anObject = __webpack_require__(36),
	    toIObject = __webpack_require__(24),
	    createDesc = __webpack_require__(18),
	    getDesc = $.getDesc,
	    setDesc = $.setDesc,
	    _create = $.create,
	    getNames = $names.get,
	    $Symbol = global.Symbol,
	    $JSON = global.JSON,
	    _stringify = $JSON && $JSON.stringify,
	    setter = false,
	    HIDDEN = wks('_hidden'),
	    isEnum = $.isEnum,
	    SymbolRegistry = shared('symbol-registry'),
	    AllSymbols = shared('symbols'),
	    useNative = typeof $Symbol == 'function',
	    ObjectProto = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = SUPPORT_DESC && $fails(function () {
	  return _create(setDesc({}, 'a', {
	    get: function get() {
	      return setDesc(this, 'a', { value: 7 }).a;
	    }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = getDesc(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  setDesc(it, key, D);
	  if (protoDesc && it !== ObjectProto) setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function wrap(tag) {
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  SUPPORT_DESC && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function set(value) {
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function isSymbol(it) {
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (D && has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    }return setSymbolDesc(it, key, D);
	  }return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P)),
	      i = 0,
	      l = keys.length,
	      key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  var D = getDesc(it = toIObject(it), key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = getNames(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) if (!has(AllSymbols, key = names[i++]) && key != HIDDEN) result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var names = getNames(toIObject(it)),
	      result = [],
	      i = 0,
	      key;
	  while (names.length > i) if (has(AllSymbols, key = names[i++])) result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it) {
	  var args = [it],
	      i = 1,
	      replacer,
	      $replacer;
	  while (arguments.length > i) args.push(arguments[i++]);
	  replacer = args[1];
	  if (typeof replacer == 'function') $replacer = replacer;
	  if ($replacer || !isArray(replacer)) replacer = function (key, value) {
	    if ($replacer) value = $replacer.call(this, key, value);
	    if (!isSymbol(value)) return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if (!useNative) {
	  $Symbol = function Symbol() {
	    if (isSymbol(this)) throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments[0]));
	  };
	  $redef($Symbol.prototype, 'toString', function toString() {
	    return this._k;
	  });

	  isSymbol = function (it) {
	    return it instanceof $Symbol;
	  };

	  $.create = $create;
	  $.isEnum = $propertyIsEnumerable;
	  $.getDesc = $getOwnPropertyDescriptor;
	  $.setDesc = $defineProperty;
	  $.setDescs = $defineProperties;
	  $.getNames = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if (SUPPORT_DESC && !__webpack_require__(37)) {
	    $redef(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function _for(key) {
	    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key) {
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function useSetter() {
	    setter = true;
	  },
	  useSimple: function useSimple() {
	    setter = false;
	  }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call(('hasInstance,isConcatSpreadable,iterator,match,replace,search,' + 'species,split,toPrimitive,toStringTag,unscopables').split(','), function (it) {
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$def($def.G + $def.W, { Symbol: $Symbol });

	$def($def.S, 'Symbol', symbolStatics);

	$def($def.S + $def.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $def($def.S + $def.F * (!useNative || buggyJSON), 'JSON', { stringify: $stringify });

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setTag(global.JSON, 'JSON', true);

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	var $Object = Object;
	module.exports = {
	  create: $Object.create,
	  getProto: $Object.getPrototypeOf,
	  isEnum: ({}).propertyIsEnumerable,
	  getDesc: $Object.getOwnPropertyDescriptor,
	  setDesc: $Object.defineProperty,
	  setDescs: $Object.defineProperties,
	  getKeys: $Object.keys,
	  getNames: $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each: [].forEach
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	var hasOwnProperty = ({}).hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	'use strict';

	module.exports = !__webpack_require__(15)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(17);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(12),
	    createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(14) ? function (object, key, value) {
	  return $.setDesc(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(6),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = __webpack_require__(13),
	    hide = __webpack_require__(17),
	    TAG = __webpack_require__(21)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) hide(it, TAG, tag);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(19)('wks'),
	    Symbol = __webpack_require__(6).Symbol;
	module.exports = function (name) {
	  return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || __webpack_require__(22))('Symbol.' + name));
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(12),
	    toIObject = __webpack_require__(24);
	module.exports = function (object, el) {
	  var O = toIObject(object),
	      keys = $.getKeys(O),
	      length = keys.length,
	      index = 0,
	      key;
	  while (length > index) if (O[key = keys[index++]] === el) return key;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	'use strict';

	var IObject = __webpack_require__(25),
	    defined = __webpack_require__(27);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// indexed object, fallback for non-array-like ES3 strings
	'use strict';

	var cof = __webpack_require__(26);
	module.exports = 0 in Object('z') ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	var toString = ({}).toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	"use strict";

	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	'use strict';

	var _Object$getOwnPropertyNames = __webpack_require__(29)['default'];

	var toString = ({}).toString,
	    toIObject = __webpack_require__(24),
	    getNames = __webpack_require__(12).getNames;

	var windowNames = typeof window == 'object' && _Object$getOwnPropertyNames ? _Object$getOwnPropertyNames(window) : [];

	var getWindowNames = function getWindowNames(it) {
	  try {
	    return getNames(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it) {
	  if (windowNames && toString.call(it) == '[object Window]') return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(12);
	__webpack_require__(31);
	module.exports = function getOwnPropertyNames(it) {
	  return $.getNames(it);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	'use strict';

	__webpack_require__(32)('getOwnPropertyNames', function () {
	  return __webpack_require__(28).get;
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	'use strict';

	module.exports = function (KEY, exec) {
	  var $def = __webpack_require__(5),
	      fn = (__webpack_require__(7).Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $def($def.S + $def.F * __webpack_require__(15)(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	'use strict';

	var $ = __webpack_require__(12);
	module.exports = function (it) {
	  var keys = $.getKeys(it),
	      getSymbols = $.getSymbols;
	  if (getSymbols) {
	    var symbols = getSymbols(it),
	        isEnum = $.isEnum,
	        i = 0,
	        key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	'use strict';

	var cof = __webpack_require__(26);
	module.exports = Array.isArray || function (arg) {
	  return cof(arg) == 'Array';
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(35);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	module.exports = true;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(40);
	module.exports = __webpack_require__(7).Object.keys;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	'use strict';

	var toObject = __webpack_require__(41);

	__webpack_require__(32)('keys', function ($keys) {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	'use strict';

	var defined = __webpack_require__(27);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _prefixProperty = __webpack_require__(1);

	var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

	var _css2 = __webpack_require__(44);

	var _css3 = _interopRequireDefault(_css2);

	exports.css = _css3['default'];

	var _cssPrefix2 = __webpack_require__(52);

	var _cssPrefix3 = _interopRequireDefault(_cssPrefix2);

	exports.cssPrefix = _cssPrefix3['default'];

	var _js2 = __webpack_require__(54);

	var _js3 = _interopRequireDefault(_js2);

	exports.js = _js3['default'];

	var _jsPrefix2 = __webpack_require__(55);

	var _jsPrefix3 = _interopRequireDefault(_jsPrefix2);

	exports.jsPrefix = _jsPrefix3['default'];

	var _prefix2 = __webpack_require__(53);

	var _prefix3 = _interopRequireDefault(_prefix2);

	exports.prefix = _prefix3['default'];
	exports['default'] = _prefixProperty2['default'];

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _utils = __webpack_require__(45);

	var _ = __webpack_require__(42);

	exports['default'] = (0, _utils.memoize)(function (property) {
	  var kebabProp = (0, _utils.kebabCase)(property);
	  if ((0, _utils.propExists)(kebabProp)) {
	    return kebabProp;
	  }
	  var prefixed = (0, _.cssPrefix)() + kebabProp;
	  if ((0, _utils.propExists)(prefixed)) {
	    return prefixed;
	  }
	  if ((0, _.prefix)() === 'moz') {
	    var prefixedJS = (0, _.js)(property);
	    return prefixedJS.lastIndexOf((0, _.jsPrefix)(), 0) === 0 ? '-' + (0, _utils.kebabCase)(prefixedJS) : kebabProp;
	  }

	  return kebabProp;
	});
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _camelCase2 = __webpack_require__(46);

	var _camelCase3 = _interopRequireDefault(_camelCase2);

	exports.camelCase = _camelCase3['default'];

	var _capitalize2 = __webpack_require__(48);

	var _capitalize3 = _interopRequireDefault(_capitalize2);

	exports.capitalize = _capitalize3['default'];

	var _getStyles2 = __webpack_require__(49);

	var _getStyles3 = _interopRequireDefault(_getStyles2);

	exports.getStyles = _getStyles3['default'];

	var _kebabCase2 = __webpack_require__(50);

	var _kebabCase3 = _interopRequireDefault(_kebabCase2);

	exports.kebabCase = _kebabCase3['default'];

	var _memoize2 = __webpack_require__(47);

	var _memoize3 = _interopRequireDefault(_memoize2);

	exports.memoize = _memoize3['default'];

	var _propExists2 = __webpack_require__(51);

	var _propExists3 = _interopRequireDefault(_propExists2);

	exports.propExists = _propExists3['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _memoize = __webpack_require__(47);

	var _memoize2 = _interopRequireDefault(_memoize);

	exports['default'] = (0, _memoize2['default'])(function (str) {
	  return str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
	    return (/\s+/.test(match) ? '' : index === 0 ? match.toLowerCase() : match.toUpperCase()
	    );
	  });
	});
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports) {

	// only works for single string argument (or no args) -- lightweight and fast
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (fn) {
	  var memos = {};
	  return function (arg) {
	    var key = arg || '';
	    return memos[key] || (memos[key] = fn(arg));
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _memoize = __webpack_require__(47);

	var _memoize2 = _interopRequireDefault(_memoize);

	exports['default'] = (0, _memoize2['default'])(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	});
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _memoize = __webpack_require__(47);

	var _memoize2 = _interopRequireDefault(_memoize);

	exports['default'] = (0, _memoize2['default'])(function () {
	  return window.getComputedStyle(document.documentElement, '');
	});
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _memoize = __webpack_require__(47);

	var _memoize2 = _interopRequireDefault(_memoize);

	exports['default'] = (0, _memoize2['default'])(function (str) {
	  return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase().replace(/[ _]/g, '-');
	});
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _ = __webpack_require__(45);

	exports['default'] = (0, _.memoize)(function (property) {
	  return (0, _.getStyles)()[property] !== undefined;
	});
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _utils = __webpack_require__(45);

	var _prefix = __webpack_require__(53);

	var _prefix2 = _interopRequireDefault(_prefix);

	exports['default'] = (0, _utils.memoize)(function () {
	  return '-' + (0, _prefix2['default'])() + '-';
	});
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _utils = __webpack_require__(45);

	exports['default'] = (0, _utils.memoize)(function () {
	  var styles = (0, _utils.getStyles)();
	  return (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
	});
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _utils = __webpack_require__(45);

	var _jsPrefix = __webpack_require__(55);

	var _jsPrefix2 = _interopRequireDefault(_jsPrefix);

	exports['default'] = (0, _utils.memoize)(function (property) {
	  var camelProp = (0, _utils.camelCase)(property);
	  if ((0, _utils.propExists)(camelProp)) {
	    return camelProp;
	  }
	  var prefixed = (0, _jsPrefix2['default'])() + (0, _utils.capitalize)(camelProp);
	  if ((0, _utils.propExists)(prefixed)) {
	    return prefixed;
	  }

	  return camelProp;
	});
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(43)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _utils = __webpack_require__(45);

	var _prefix = __webpack_require__(53);

	var _prefix2 = _interopRequireDefault(_prefix);

	exports['default'] = (0, _utils.memoize)(function () {
	  return 'Webkit|Moz|ms|O'.match(new RegExp('(' + (0, _prefix2['default'])() + ')', 'i'))[1];
	});
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;