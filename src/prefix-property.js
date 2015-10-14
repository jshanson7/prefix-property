import memoize from 'lodash/function/memoize';
import capitalize from 'lodash/string/capitalize';
import camelCase from 'lodash/string/camelCase';
import kebabCase from 'lodash/string/kebabCase';

const styles = window.getComputedStyle(document.documentElement, '');
const prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
const jsPrefix = ('Webkit|Moz|ms|O').match(new RegExp('(' + prefix + ')', 'i'))[1];
const cssPrefix = `-${prefix}-`;

const propExists = memoize(property => styles[property] !== undefined);

const jsProp = memoize(property => {
  const camelProp = camelCase(property);
  if (propExists(camelProp)) { return camelProp; }

  const prefixed = jsPrefix + capitalize(camelProp);
  if (propExists(prefixed)) { return prefixed; }

  // none found
  return jsProp;
});

const cssProp = memoize(property => {
  const kebabProp = kebabCase(property);
  if (propExists(kebabProp)) { return kebabProp; }

  const prefixed = cssPrefix + kebabProp;
  if (propExists(prefixed)) { return prefixed; }

  // TODO: in firefox, figure out a way test if prefixed, hyphenated props like -moz-appearance
  // are valid props since they are undefined on the style object, yet valid in CSS
  if (prefix === 'moz') {
    const prefixedJS = jsProp(property);
    return prefixedJS.lastIndexOf(jsPrefix, 0) === 0 ? ('-' + kebabCase(prefixedJS)) : kebabProp;
  }

  // none found
  return kebabProp;
});

const getPrefixForProp = memoize(property => {
  return propExists(property) ? '' :
    propExists(jsPrefix + capitalize(camelCase(property))) ? jsPrefix :
    // none found
    '';
});

function prefixProperty(property) { return jsProp(property); }
prefixProperty.js = jsProp;
prefixProperty.css = cssProp;
prefixProperty.getPrefix = getPrefixForProp;

export default prefixProperty;
