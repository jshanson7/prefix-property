'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashFunctionMemoize = require('lodash/function/memoize');

var _lodashFunctionMemoize2 = _interopRequireDefault(_lodashFunctionMemoize);

var _lodashStringCapitalize = require('lodash/string/capitalize');

var _lodashStringCapitalize2 = _interopRequireDefault(_lodashStringCapitalize);

var _lodashStringCamelCase = require('lodash/string/camelCase');

var _lodashStringCamelCase2 = _interopRequireDefault(_lodashStringCamelCase);

var _lodashStringKebabCase = require('lodash/string/kebabCase');

var _lodashStringKebabCase2 = _interopRequireDefault(_lodashStringKebabCase);

var styles = window.getComputedStyle(document.documentElement, '');
var prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
var jsPrefix = 'Webkit|Moz|ms|O'.match(new RegExp('(' + prefix + ')', 'i'))[1];
var cssPrefix = '-' + prefix + '-';

var propExists = (0, _lodashFunctionMemoize2['default'])(function (property) {
  return styles[property] !== undefined;
});

var jsProp = (0, _lodashFunctionMemoize2['default'])(function (property) {
  var camelProp = (0, _lodashStringCamelCase2['default'])(property);
  if (propExists(camelProp)) {
    return camelProp;
  }

  var prefixed = jsPrefix + (0, _lodashStringCapitalize2['default'])(camelProp);
  if (propExists(prefixed)) {
    return prefixed;
  }

  // none found
  return jsProp;
});

var cssProp = (0, _lodashFunctionMemoize2['default'])(function (property) {
  var kebabProp = (0, _lodashStringKebabCase2['default'])(property);
  if (propExists(kebabProp)) {
    return kebabProp;
  }

  var prefixed = cssPrefix + kebabProp;
  if (propExists(prefixed)) {
    return prefixed;
  }

  // TODO: in firefox, figure out a way test if prefixed, hyphenated props like -moz-appearance
  // are valid props since they are undefined on the style object, yet valid in CSS
  if (prefix === 'moz') {
    var prefixedJS = jsProp(property);
    return prefixedJS.lastIndexOf(jsPrefix, 0) === 0 ? '-' + (0, _lodashStringKebabCase2['default'])(prefixedJS) : kebabProp;
  }

  // none found
  return kebabProp;
});

var getPrefixForProp = (0, _lodashFunctionMemoize2['default'])(function (property) {
  return propExists(property) ? '' : propExists(jsPrefix + (0, _lodashStringCapitalize2['default'])((0, _lodashStringCamelCase2['default'])(property))) ? jsPrefix :
  // none found
  '';
});

function prefixProperty(property) {
  return jsProp(property);
}
prefixProperty.js = jsProp;
prefixProperty.css = cssProp;
prefixProperty.getPrefix = getPrefixForProp;

exports['default'] = prefixProperty;
module.exports = exports['default'];
