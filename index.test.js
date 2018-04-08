import namedDirectory from './index';

describe('Given a namedDirectory plugin', () => {
  it('should export a function', () => {
    expect(typeof namedDirectory).toBe('function');
  });

  it('should export an id resolver', () => {
    expect(namedDirectory().resolveId).toBeTruthy();
    expect(typeof namedDirectory().resolveId).toBe('function');
  });
});
