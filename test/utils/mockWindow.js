import MockCSSStyleDeclaration from './MockCSSStyleDeclaration';

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

  delete require.cache[require.resolve('../../dist/prefix-property')];
  window.prefixProperty = require('../../dist/prefix-property');

  return window;
};
