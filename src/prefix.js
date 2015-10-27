import { memoize, getStyles } from './utils';

export default memoize(() => {
  const styles = getStyles();
  return (
    Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) ||
    (styles.OLink === '' && ['', 'o'])
  )[1];
});
