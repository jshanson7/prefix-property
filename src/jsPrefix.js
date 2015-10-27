import { memoize } from './utils';
import prefix from './prefix';

export default memoize(() =>
  'Webkit|Moz|ms|O'.match(new RegExp(`(${prefix()})`, 'i'))[1]
);
