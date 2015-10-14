# Prefix Property

Vendor-prefix any property.

```javascript
import prefixProperty from 'prefix-property';
// or 
const prefixProperty = window.prefixProperty;

// in chrome:
prefixProperty('fontFeatureSettings') === 'WebkitFontFeatureSettings';
prefixProperty('font-feature-settings') === 'WebkitFontFeatureSettings';
prefixProperty.css('fontFeatureSettings') === '-webkit-font-feature-settings';
prefixProperty.getPrefix('fontFeatureSettings') === 'Webkit';

```