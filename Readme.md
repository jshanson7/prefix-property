# Prefix Property

Vendor-prefix any property.

Simple usage:

```javascript
import prefixProperty from 'prefix-property';
// or 
const prefixProperty = window.prefixProperty;

// in chrome:
prefixProperty('fontFeatureSettings') === 'WebkitFontFeatureSettings';
prefixProperty.css('fontFeatureSettings') === '-webkit-font-feature-settings';

```

Advanced usage:

```javascript
import { js, css, jsPrefix, cssPrefix } from 'prefix-property';

// in chrome:
js('fontFeatureSettings') === 'WebkitFontFeatureSettings';
js('font-feature-settings') === 'WebkitFontFeatureSettings';
css('fontFeatureSettings') === '-webkit-font-feature-settings';
css('font-feature-settings') === '-webkit-font-feature-settings';

// browser's prefix:
jsPrefix === 'Webkit';
cssPrefix === '-webkit-';

// non-prefixed properties:
js('color') === 'color';
js('backgroundColor') === 'backgroundColor';

```

The default output of `prefixProperty()` is a JS-friendly prop (ex: `WebkitTransformOriginX`).  To get a CSS-friendly prop, use `prefixProperty.css()` (ex: `-webkit-transform-origin-x`).

## Testing
[Run the tests on your browser here.](https://cdn.rawgit.com/jshanson7/prefix-property/master/test/test.inline.html)
