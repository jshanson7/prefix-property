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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = prefixProperty;

	var styles = window.getComputedStyle(document.documentElement, '');
	var prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
	var jsPrefix = 'Webkit|Moz|ms|O'.match(new RegExp('(' + prefix + ')', 'i'))[1];
	var cssPrefix = '-' + prefix + '-';
	var jsMemos = {};
	var cssMemos = {};

	function prefixProperty(property) {
	  return jsProp(property);
	}
	prefixProperty.js = jsProp;
	prefixProperty.css = cssProp;
	prefixProperty.jsPrefix = jsPrefix;
	prefixProperty.cssPrefix = cssPrefix;

	function jsProp(property) {
	  var memo = jsMemos[property];
	  if (memo) {
	    return memo;
	  }
	  var camelProp = camelCase(property);
	  if (propExists(camelProp)) {
	    return jsMemos[property] = camelProp;
	  }
	  var prefixed = jsPrefix + capitalize(camelProp);
	  if (propExists(prefixed)) {
	    return jsMemos[property] = prefixed;
	  }

	  return camelProp;
	}

	function cssProp(property) {
	  var memo = cssMemos[property];
	  if (memo) {
	    return memo;
	  }
	  var kebabProp = kebabCase(property);
	  if (propExists(kebabProp)) {
	    return cssMemos[property] = kebabProp;
	  }
	  var prefixed = cssPrefix + kebabProp;
	  if (propExists(prefixed)) {
	    return cssMemos[property] = prefixed;
	  }

	  if (prefix === 'moz') {
	    var prefixedJS = jsProp(property);
	    var mozPrefixed = prefixedJS.lastIndexOf(jsPrefix, 0) === 0 ? '-' + kebabCase(prefixedJS) : kebabProp;
	    return cssMemos[property] = mozPrefixed;
	  }

	  return kebabProp;
	}

	function propExists(property) {
	  return styles[property] !== undefined;
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
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;