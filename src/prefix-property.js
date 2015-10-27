import { js, css, jsPrefix, cssPrefix } from './';

export default Object.assign(
  function prefixProperty(property) { return js(property); },
  { js, css, jsPrefix, cssPrefix }
);
