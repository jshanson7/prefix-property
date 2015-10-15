(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.prefixProperty = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});