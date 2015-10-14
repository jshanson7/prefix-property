import memoize from 'lodash/function/memoize';
import find from 'lodash/collection/find';
import capitalize from 'lodash/string/capitalize';
import camelCase from 'lodash/string/camelCase';
import kebabCase from 'lodash/string/kebabCase';
import isString from 'lodash/lang/isString';

export default prefixProperty;

const style = document.createElement('div').style;
const prefixes = ['Webkit', 'Moz', 'ms', 'O'];

const jsProp = memoize(property => {
  const camelProp = camelCase(property);
  const prefix = getPrefixForProp(camelProp);
  return prefix ?
    prefix + capitalize(camelProp) :
    camelProp;
});

const cssProp = memoize(property => {
  const camelProp = camelCase(property);
  const isPrefixed = !!getPrefixForProp(camelProp);
  return isPrefixed ? `-${kebabCase(jsProp(camelProp))}` : kebabCase(camelProp);
});

const getPrefixForProp = memoize(property => {
  const camelProp = camelCase(property);
  if (isString(style[camelProp])) { return ''; }

  let currentPrefix;
  const capitalized = capitalize(camelProp);
  return find(prefixes, prefix =>
      isString(style[(currentPrefix = prefix) + capitalized])) ?
    currentPrefix :
    '';
});

function prefixProperty(property) { return jsProp(property); }
prefixProperty.js = jsProp;
prefixProperty.css = cssProp;
prefixProperty.getPrefix = getPrefixForProp;
