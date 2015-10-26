# Prefix Property [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]

An in-browser vendor prefixer that doesn't suck.

Simple usage:

```javascript
import prefix from 'prefix-property';
// or 
const prefix = window.prefixProperty;

// in chrome:
prefix('fontFeatureSettings');      // => 'WebkitFontFeatureSettings'
prefix.css('fontFeatureSettings');  // => '-webkit-font-feature-settings'

```

Advanced usage:

```javascript
import { js, css, jsPrefix, cssPrefix } from 'prefix-property';

// in chrome:
js('fontFeatureSettings');      // => 'WebkitFontFeatureSettings'
js('font-feature-settings');    // => 'WebkitFontFeatureSettings'
css('fontFeatureSettings');     // => '-webkit-font-feature-settings'
css('font-feature-settings');   // => '-webkit-font-feature-settings'

// browser's prefix:
jsPrefix();    // => 'Webkit'
cssPrefix();   // => '-webkit-'

// non-prefixed properties:
js('color');              // => 'color'
js('background-color');   // => 'backgroundColor'

```

The default output of `prefixProperty()` is a JS-friendly prop (ex: `WebkitTransformOriginX`).

To get a CSS-friendly prop, use `prefixProperty.css()` (ex: `-webkit-transform-origin-x`).

## Installation

```
npm i prefix-property --save
```
or add `/dist/prefix-property.min.js` to your html.

## Contributing

Clone repo, cd into it, then
```
npm install && npm run build && npm test
```

## Building

```
npm run build
```

## Testing

[Run the tests on your browser here.](https://rawgit.com/jshanson7/prefix-property/master/test/test.html)

```
npm test
```

For live retesting:
```
npm run test-watch
```

Browser:
```
npm run build && open test/test.html
```

Node:
```
npm run test-node
```

## Linting

```
npm run lint
```

## License

MIT

[npm-image]: https://badge.fury.io/js/prefix-property.svg
[npm-url]: https://npmjs.org/package/prefix-property
[travis-image]: https://travis-ci.org/jshanson7/prefix-property.svg
[travis-url]: https://travis-ci.org/jshanson7/prefix-property