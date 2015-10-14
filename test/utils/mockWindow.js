export default ({ browser }) => {
  const style = require(`../data/styleMocks/${browser}.json`);
  const document = {
    body: { style },
    createElement: () => ({ style })
  };
  global.window = { document };
  global.document = document;
  global.mockedBrowser = window.mockedBrowser = browser;
  return window;
};
