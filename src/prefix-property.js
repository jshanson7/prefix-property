export default prefixProperty;

const styles = window.getComputedStyle(document.documentElement, '');
const prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) ||
  (styles.OLink === '' && ['', 'o']))[1];
const jsPrefix = ('Webkit|Moz|ms|O').match(new RegExp('(' + prefix + ')', 'i'))[1];
const cssPrefix = `-${prefix}-`;
const jsMemos = {};
const cssMemos = {};

function prefixProperty(property) { return jsProp(property); }
prefixProperty.js = jsProp;
prefixProperty.css = cssProp;
prefixProperty.jsPrefix = jsPrefix;
prefixProperty.cssPrefix = cssPrefix;

function jsProp(property) {
  const memo = jsMemos[property];
  if (memo) { return memo; }
  const camelProp = camelCase(property);
  if (propExists(camelProp)) { return jsMemos[property] = camelProp; }
  const prefixed = jsPrefix + capitalize(camelProp);
  if (propExists(prefixed)) { return jsMemos[property] = prefixed; }

  return camelProp;
}

function cssProp(property) {
  const memo = cssMemos[property];
  if (memo) { return memo; }
  const kebabProp = kebabCase(property);
  if (propExists(kebabProp)) { return cssMemos[property] = kebabProp; }
  const prefixed = cssPrefix + kebabProp;
  if (propExists(prefixed)) { return cssMemos[property] = prefixed; }

  if (prefix === 'moz') {
    const prefixedJS = jsProp(property);
    const mozPrefixed = (prefixedJS.lastIndexOf(jsPrefix, 0) === 0) ?
      '-' + kebabCase(prefixedJS) :
      kebabProp;
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
  return str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
    /\s+/.test(match) ? '' :
      index === 0 ? match.toLowerCase() :
      match.toUpperCase()
  );
}

function kebabCase(str) {
  return str.replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase().replace(/[ _]/g, '-');
}
