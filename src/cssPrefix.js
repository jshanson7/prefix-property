import { memoize } from './utils';
import prefix from './prefix';

export default memoize(() => `-${prefix()}-`);
