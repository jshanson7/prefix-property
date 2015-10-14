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

browsersToTest.forEach(browser => {
  if (isNode) {
    mockWindow({ browser });
  }

  const prefixProperty = window.prefixProperty;
  const unprefixedProps = unprefixedPropsByBrowser[browser];
  const style = document.createElement('div').style;
  const testProp = (prop, type) => {
    const prefixed = prefixProperty[type](prop);
    const modifier = prefixed !== prop ? ` ==> ${prefixed}` : ``;
    it(`${prop}` + modifier, () => {
      assert(style[prefixed] !== undefined);
    });
  };

  describe('prefixProperty', () => {
    describe(browser, () => {

      describe('exists', () => {
        it('should exist', () => {
          assert(prefixProperty !== undefined);
        });
      });

      describe('is a function', () => {
        it('should be a function', () => {
          assert(typeof prefixProperty === 'function');
        });
      });

      describe('JS prefixes', () =>
        unprefixedProps.forEach(prop => {
          const tested = {};
          const camelProp = camelCase(prop);
          const kebabProp = kebabCase(prop);
          if (!tested[camelProp]) {
            testProp(camelProp, 'js');
            tested[camelProp] = true;
          }
          if (!tested[kebabProp]) {
            testProp(kebabProp, 'js');
            tested[kebabProp] = true;
          }
        })
      );

      describe('CSS prefixes', () => {
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
            testProp(camelProp, 'css');
            tested[camelProp] = true;
          }
          if (!tested[kebabProp]) {
            testProp(kebabProp, 'css');
            tested[kebabProp] = true;
          }
        });
      });
    });
  });
});

