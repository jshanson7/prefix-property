import memoize from './memoize';

export default memoize(str =>
  str.replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase().replace(/[ _]/g, '-')
);
