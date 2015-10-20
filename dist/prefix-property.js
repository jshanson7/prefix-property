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

/***/ }
/******/ ])
});
;