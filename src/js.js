import { memoize, camelCase, capitalize, propExists } from './utils';
import jsPrefix from './jsPrefix';

export default memoize(property => {
  const camelProp = camelCase(property);
  if (propExists(camelProp)) { return camelProp; }
  const prefixed = jsPrefix() + capitalize(camelProp);
  if (propExists(prefixed)) { return prefixed; }

  return camelProp;
});
