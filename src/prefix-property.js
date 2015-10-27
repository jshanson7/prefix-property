import { js, css, prefix, jsPrefix, cssPrefix } from './';

export default Object.assign(
  function prefixProperty(property) { return js(property); },
  { js, css, prefix, jsPrefix, cssPrefix }
);
