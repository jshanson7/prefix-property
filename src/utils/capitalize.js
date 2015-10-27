import memoize from './memoize';

export default memoize(str => str.charAt(0).toUpperCase() + str.slice(1));
