const jsMemos = {};
const cssMemos = {};

function jsProp(property) {
  const memo = jsMemos[property];
  if (memo) { return memo; }
  const camelProp = camelCase(property);
  if (propExists(camelProp)) { return jsMemos[property] = camelProp; }
  const prefixed = getJSPrefix() + capitalize(camelProp);
  if (propExists(prefixed)) { return jsMemos[property] = prefixed; }

  return camelProp;
}

function cssProp(property) {
  const memo = cssMemos[property];
  if (memo) { return memo; }
  const kebabProp = kebabCase(property);
  if (propExists(kebabProp)) { return cssMemos[property] = kebabProp; }
  const prefixed = getCSSPrefix() + kebabProp;
  if (propExists(prefixed)) { return cssMemos[property] = prefixed; }

  if (getPrefix() === 'moz') {
    const prefixedJS = jsProp(property);
    const mozPrefixed = (prefixedJS.lastIndexOf(getJSPrefix(), 0) === 0) ?
      '-' + kebabCase(prefixedJS) :
      kebabProp;
    return cssMemos[property] = mozPrefixed;
  }

  return kebabProp;
}

const getStyles = (() => {
  let styles = null;
  return () =>
    styles || (styles = window.getComputedStyle(document.documentElement, ''));
})();

const getPrefix = (() => {
  let prefix = null;
  return () =>
    prefix || (prefix = (() => {
      const styles = getStyles();
      return (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) ||
        (styles.OLink === '' && ['', 'o']))[1];
    })());
})();

const getJSPrefix = (() => {
  let jsPrefix = null;
  return () =>
    jsPrefix || (jsPrefix = ('Webkit|Moz|ms|O').match(new RegExp('(' + getPrefix() + ')', 'i'))[1]);
})();

const getCSSPrefix = (() => {
  let cssPrefix = null;
  return () =>
    cssPrefix || (cssPrefix = `-${getPrefix()}-`);
})();

function propExists(property) {
  return getStyles()[property] !== undefined;
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

function prefixProperty(property) { return jsProp(property); }
prefixProperty.js = jsProp;
prefixProperty.css = cssProp;
prefixProperty.jsPrefix = getJSPrefix;
prefixProperty.cssPrefix = getCSSPrefix;

export default prefixProperty;
