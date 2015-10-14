import { isNaN, parseInt, forEach } from 'lodash';

const styleMocksByBrowser = {
  chrome: require('../data/styleMocks/chrome.json'),
  safari: require('../data/styleMocks/safari.json'),
  firefox: require('../data/styleMocks/firefox.json')
};

export default ({ browser }) => {
  const style = new MockCSSStyleDeclaration(styleMocksByBrowser[browser]);
  const document = {
    body: { style },
    createElement: () => ({ style })
  };
  global.window = {
    document,
    getComputedStyle: () => style
  };
  global.document = document;
  global.mockedBrowser = window.mockedBrowser = browser;

  delete require.cache[require.resolve('../../src/prefix-property')];
  window.prefixProperty = require('../../src/prefix-property');

  return window;
};


function MockCSSStyleDeclaration(styleObj) {
  forEach(styleObj, (value, key) => {
    if (isNaN(parseInt(key))) {
      this[key] = value;
    } else {
      this.push(value);
    }
  });
}
MockCSSStyleDeclaration.prototype = Object.create(Array.prototype);
