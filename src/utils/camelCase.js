import memoize from './memoize';

export default memoize(str =>
  str.replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
    /\s+/.test(match) ? '' :
      index === 0 ? match.toLowerCase() :
      match.toUpperCase()
  )
);
