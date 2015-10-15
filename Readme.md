# Prefix Property [![Build Status](https://travis-ci.org/jshanson7/prefix-property.svg)](https://travis-ci.org/jshanson7/prefix-property) [![npm version](https://badge.fury.io/js/prefix-property.svg)](http://badge.fury.io/js/prefix-property)

An in-browser vendor prefixer that doesn't suck.

Simple usage:

```javascript
import prefixProperty from 'prefix-property';
// or 
const prefixProperty = window.prefixProperty;

// in chrome:
prefixProperty('fontFeatureSettings');      // => 'WebkitFontFeatureSettings'
prefixProperty.css('fontFeatureSettings');  // => '-webkit-font-feature-settings'

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
console.log(jsPrefix);    // => 'Webkit'
console.log(cssPrefix);   // => '-webkit-'

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

[Run the tests on your browser here.](https://rawgit.com/jshanson7/prefix-property/master/test/test.inline.html)

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