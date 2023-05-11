const validator = require('../libs/validator');

describe('validator', () => {
  test('Should be exists', () => {
    expect(validator).not.toBe(undefined);
  });

  test('Should validate email', () => {
    expect(validator).not.toBe(undefined);
  });
});
