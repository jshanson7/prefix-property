import assert from 'assert';
import prefixProperty from '../';

const mockedBrowser = global.mockedBrowser;
const isMocked = !!mockedBrowser;
const modifier = isMocked ? ` -- mocked browser: ${mockedBrowser}` : ``;

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

  describe('prefix', () => {
    it('should prefix fontFeatureSettings', () => {
      const prop = 'fontFeatureSettings';
      const prefixed = prefixProperty(prop);
      assert(prefixed !== prop);
      assert(prefixed.length > prop.length);
    });
  });
});
