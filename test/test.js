import assert from 'assert';
import { kebabCase, camelCase } from 'lodash';
import mockWindow from './utils/mockWindow';
import getBrowser from './utils/getBrowser';

const isNode = typeof process.browser === 'undefined';
const browsersToTest = isNode ? ['chrome', 'firefox', 'safari'] : [getBrowser()];
const unprefixedPropsByBrowser = {
  chrome: require('./data/unprefixedProps/chrome.json'),
  safari: require('./data/unprefixedProps/safari.json'),
  firefox: require('./data/unprefixedProps/firefox.json')
};
const prefixesByBrowser = {
  chrome: { js: 'Webkit', css: '-webkit-' },
  safari: { js: 'Webkit', css: '-webkit-' },
  firefox: { js: 'Moz', css: '-moz-' }
};

browsersToTest.forEach(browser => {
  if (isNode) {
    mockWindow({ browser });
  }

  const prefixProperty = window.prefixProperty;
  const {
    js,
    css,
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

      describe('#jsPrefix', () =>
        it('jsPrefix === ' + prefixesByBrowser[browser].js, () =>
          assert(jsPrefix === prefixesByBrowser[browser].js)
        )
      );

      describe('#cssPrefix', () =>
        it('cssPrefix === ' + prefixesByBrowser[browser].css, () =>
          assert(cssPrefix === prefixesByBrowser[browser].css)
        )
      );

      describe('#js()', () =>
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
        })
      );

      describe('#css()', () => {
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

