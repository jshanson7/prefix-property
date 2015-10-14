'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashFunctionMemoize = require('lodash/function/memoize');

var _lodashFunctionMemoize2 = _interopRequireDefault(_lodashFunctionMemoize);

var _lodashCollectionFind = require('lodash/collection/find');

var _lodashCollectionFind2 = _interopRequireDefault(_lodashCollectionFind);

var _lodashStringCapitalize = require('lodash/string/capitalize');

var _lodashStringCapitalize2 = _interopRequireDefault(_lodashStringCapitalize);

var _lodashStringCamelCase = require('lodash/string/camelCase');

var _lodashStringCamelCase2 = _interopRequireDefault(_lodashStringCamelCase);

var _lodashStringKebabCase = require('lodash/string/kebabCase');

var _lodashStringKebabCase2 = _interopRequireDefault(_lodashStringKebabCase);

var _lodashLangIsString = require('lodash/lang/isString');

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

exports['default'] = prefixProperty;

var style = document.createElement('div').style;
var prefixes = ['Webkit', 'Moz', 'ms', 'O'];

var jsProp = (0, _lodashFunctionMemoize2['default'])(function (property) {
  var camelProp = (0, _lodashStringCamelCase2['default'])(property);
  var prefix = getPrefixForProp(camelProp);
  return prefix ? prefix + (0, _lodashStringCapitalize2['default'])(camelProp) : camelProp;
});

var cssProp = (0, _lodashFunctionMemoize2['default'])(function (property) {
  var camelProp = (0, _lodashStringCamelCase2['default'])(property);
  var isPrefixed = !!getPrefixForProp(camelProp);
  return isPrefixed ? '-' + (0, _lodashStringKebabCase2['default'])(jsProp(camelProp)) : (0, _lodashStringKebabCase2['default'])(camelProp);
});

var getPrefixForProp = (0, _lodashFunctionMemoize2['default'])(function (property) {
  var camelProp = (0, _lodashStringCamelCase2['default'])(property);
  if ((0, _lodashLangIsString2['default'])(style[camelProp])) {
    return '';
  }

  var currentPrefix = undefined;
  var capitalized = (0, _lodashStringCapitalize2['default'])(camelProp);
  return (0, _lodashCollectionFind2['default'])(prefixes, function (prefix) {
    return (0, _lodashLangIsString2['default'])(style[(currentPrefix = prefix) + capitalized]);
  }) ? currentPrefix : '';
});

function prefixProperty(property) {
  return jsProp(property);
}
prefixProperty.js = jsProp;
prefixProperty.css = cssProp;
prefixProperty.getPrefix = getPrefixForProp;
module.exports = exports['default'];
