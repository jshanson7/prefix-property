import assert from 'assert';
import { intersection } from 'lodash';
import prefixProperty from '../';

const mockedBrowser = global.mockedBrowser;
const isMocked = !!mockedBrowser;
const modifier = isMocked ? ` -- mocked browser: ${mockedBrowser}` : ``;
const style = document.createElement('div').style;
const unprefixedProps = isMocked ?
  require(`./data/unprefixedProps/${mockedBrowser}.json`) :
  intersection(
    require(`./data/unprefixedProps/chrome.json`),
    require(`./data/unprefixedProps/safari.json`),
    require(`./data/unprefixedProps/firefox.json`)
  );

describe('prefixProperty' + modifier, () => {
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

  describe('prefixes', () =>
    unprefixedProps.forEach(prop =>
      it(`should correctly prefix ${prop}`, () => {
        if (prefixProperty(prop) !== prop) {console.log('prefixing', prefixProperty(prop));}
        assert(style[prefixProperty(prop)] !== undefined)
      })
    )
  );
});
