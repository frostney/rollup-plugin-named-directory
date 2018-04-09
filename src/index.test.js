import path from 'path';

import namedDirectory from './index';

describe('Given a namedDirectory plugin', () => {
  it('should export a function', () => {
    expect(typeof namedDirectory).toBe('function');
  });

  it('should export an id resolver', () => {
    expect(namedDirectory().resolveId).toBeTruthy();
    expect(typeof namedDirectory().resolveId).toBe('function');
  });

  describe('when the default matcher is provided', () => {
    let resolver;

    beforeEach(() => {
      resolver = namedDirectory();
    });

    it('should resolve to the file in the directory', () => {
      expect(resolver.resolveId('../files/Button', __filename)).toBe(path.resolve(__dirname, '../files/Button/Button.js'));
    });

    it('should resolve to the file itself', () => {
      expect(resolver.resolveId('../files/Dropdown', __filename)).toBe(null);
    });

    it('should provide the original module if it does not match', () => {
      expect(resolver.resolveId('react')).toBe(null);
    });
  });

  describe('when a custom matcher is provided', () => {
    let resolver;

    beforeEach(() => {
      resolver = namedDirectory({
        matchers: ['<dir>/<dir>Container.js', '<dir>/<dir>.js'],
        filter: name => name.indexOf('Other') === 0,
      });
    });

    it('should resolve to the first match', () => {
      expect(resolver.resolveId('../files/Thing', __filename)).toBe(path.resolve(__dirname, '../files/Thing/ThingContainer.js'));
    });

    it('should resolve to the second match', () => {
      expect(resolver.resolveId('../files/Button', __filename)).toBe(path.resolve(__dirname, '../files/Button/Button.js'));
    });

    it('should filter for `Other` module', () => {
      expect(resolver.resolveId('../files/Other', __filename)).toBe(null);
    });

    it('should resolve to the file itself', () => {
      expect(resolver.resolveId('../files/Dropdown', __filename)).toBe(null);
    });

    it('should provide the original module if it does not match', () => {
      expect(resolver.resolveId('react')).toBe(null);
    });
  });
});
