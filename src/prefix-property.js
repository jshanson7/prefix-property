import camelCase from 'lodash/string/camelCase';
import kebabCase from 'lodash/string/kebabCase';

const styles = window.getComputedStyle(document.documentElement, '');
const prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
const jsPrefix = ('Webkit|Moz|ms|O').match(new RegExp('(' + prefix + ')', 'i'))[1];
const cssPrefix = `-${prefix}-`;
const jsProps = {};
const cssProps = {};

export default prefixProperty;

function prefixProperty(property) { return jsProp(property); }
prefixProperty.js = jsProp;
prefixProperty.css = cssProp;
prefixProperty.jsPrefix = jsPrefix;
prefixProperty.cssPrefix = cssPrefix;

function jsProp(property) {
  var memo = jsProps[property];
  if (memo) { return memo; }
  const camelProp = camelCase(property);
  if (propExists(camelProp)) { return jsProps[property] = camelProp; }

  const prefixed = jsPrefix + capitalize(camelProp);
  if (propExists(prefixed)) { return jsProps[property] = prefixed; }

  return jsProp;
}

function cssProp(property) {
  var memo = cssProps[property];
  if (memo) { return memo; }
  const kebabProp = kebabCase(property);
  if (propExists(kebabProp)) { return cssProps[property] = kebabProp; }

  const prefixed = cssPrefix + kebabProp;
  if (propExists(prefixed)) { return cssProps[property] = prefixed; }

  // TODO: in firefox, figure out a way test if prefixed, hyphenated props like -moz-appearance
  // are valid props since they are undefined on the style object, yet valid in CSS
  if (prefix === 'moz') {
    const prefixedJS = jsProp(property);
    const mozPrefixed = (prefixedJS.lastIndexOf(jsPrefix, 0) === 0) ?
      '-' + kebabCase(prefixedJS) :
      kebabProp;
    return cssProps[property] = mozPrefixed;
  }

  return kebabProp;
}

function propExists(property) {
  return styles[property] !== undefined;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
