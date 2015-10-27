import { memoize, getStyles } from './';

export default memoize(property => getStyles()[property] !== undefined);
