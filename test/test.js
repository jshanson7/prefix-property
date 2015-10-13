import mockWindow from './utils/mockWindow';
const isNode = typeof window === 'undefined';
const browsers = ['chrome', 'firefox', 'safari'];

export default isNode ?
  browsers.forEach(browser => {
    delete require.cache[require.resolve('../')];
    delete require.cache[require.resolve('./prefix-property.test')];
    mockWindow({ browser });
    require('./prefix-property.test');
  }) :
  require('./prefix-property.test');
