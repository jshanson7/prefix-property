import assert from 'assert';
import { kebabCase, camelCase } from 'lodash';
import mockWindow from './utils/mockWindow';
import getBrowser from './utils/getBrowser';
import isNode from './utils/isNode';

const browsersToTest = isNode ? ['chrome', 'firefox', 'safari'] : [getBrowser()];
const unprefixedPropsByBrowser = {
  chrome: require('./data/unprefixedProps/chrome.json'),
  safari: require('./data/unprefixedProps/safari.json'),
  firefox: require('./data/unprefixedProps/firefox.json')
};
const prefixesByBrowser = {
  chrome: { js: 'Webkit', css: '-webkit-', base: 'webkit' },
  safari: { js: 'Webkit', css: '-webkit-', base: 'webkit' },
  firefox: { js: 'Moz', css: '-moz-', base: 'moz' }
};

browsersToTest.forEach(browser => {
  if (isNode) { mockWindow({ browser }); }

  const prefixProperty = window.prefixProperty;
  const {
    js,
    css,
    prefix,
    jsPrefix,
    cssPrefix
  } = prefixProperty;
  const unprefixedProps = unprefixedPropsByBrowser[browser];
  const style = document.createElement('div').style;
  const testProp = (prop, method) => {
    const prefixed = method(prop);
    const modifier = prefixed !== prop ? ` => ${prefixed}` : ``;
    it(`${prop}` + modifier, () => {
      assert(style[prefixed] !== undefined);
    });
  };

  describe('prefixProperty', () => {
    describe(browser, () => {

      describe('exists', () =>
        it('should exist', () =>
          assert(prefixProperty !== undefined)
        )
      );

      describe('is a function', () =>
        it('should be a function', () =>
          assert(typeof prefixProperty === 'function')
        )
      );

      describe('#prefix()', () =>
        it('prefix() === ' + prefixesByBrowser[browser].base, () =>
          assert(prefix() === prefixesByBrowser[browser].base)
        )
      );

      describe('#jsPrefix()', () =>
        it('jsPrefix() === ' + prefixesByBrowser[browser].js, () =>
          assert(jsPrefix() === prefixesByBrowser[browser].js)
        )
      );

      describe('#cssPrefix()', () =>
        it('cssPrefix() === ' + prefixesByBrowser[browser].css, () =>
          assert(cssPrefix() === prefixesByBrowser[browser].css)
        )
      );

      describe('#js()', () => {
        it('invalidProperty => invalidProperty', () => {
          assert(js('invalidProperty') === 'invalidProperty');
          assert(js('invalid-property') === 'invalidProperty');
        });

        unprefixedProps.forEach(prop => {
          const tested = {};
          const camelProp = camelCase(prop);
          const kebabProp = kebabCase(prop);
          if (!tested[camelProp]) {
            testProp(camelProp, js);
            tested[camelProp] = true;
          }
          if (!tested[kebabProp]) {
            testProp(kebabProp, js);
            tested[kebabProp] = true;
          }
        });
      });

      describe('#css()', () => {
        it('invalid-property => invalid-property', () => {
          assert(css('invalidProperty') === 'invalid-property');
          assert(css('invalid-property') === 'invalid-property');
        });

        if (browser === 'firefox') {
          // TODO: in firefox, figure out a way test if prefixed, hyphenated props like -moz-appearance
          // are valid props since they are undefined on the style object, yet valid in CSS
          return;
        }
        unprefixedProps.forEach(prop => {
          const tested = {};
          const camelProp = camelCase(prop);
          const kebabProp = kebabCase(prop);
          if (!tested[camelProp]) {
            testProp(camelProp, css);
            tested[camelProp] = true;
          }
          if (!tested[kebabProp]) {
            testProp(kebabProp, css);
            tested[kebabProp] = true;
          }
        });
      });
    });
  });
});

