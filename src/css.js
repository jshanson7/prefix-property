import { memoize, kebabCase, propExists } from './utils';
import { cssPrefix, js, jsPrefix, prefix } from './';

export default memoize(property => {
  const kebabProp = kebabCase(property);
  if (propExists(kebabProp)) { return kebabProp; }
  const prefixed = cssPrefix() + kebabProp;
  if (propExists(prefixed)) { return prefixed; }
  if (prefix() === 'moz') {
    const prefixedJS = js(property);
    return (prefixedJS.lastIndexOf(jsPrefix(), 0) === 0) ?
      '-' + kebabCase(prefixedJS) :
      kebabProp;
  }

  return kebabProp;
});
