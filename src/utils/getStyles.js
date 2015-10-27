import memoize from './memoize';

export default memoize(() => window.getComputedStyle(document.documentElement, ''));
