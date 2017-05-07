import { env } from '../../../src/core/core';

describe('Core', () => {

  describe('Environment variables', () => {
    it('Exists', () => {
      // given
      process.env.VARIABLE_FOR_TEST = 'value';

      // when / then
      expect(env('VARIABLE_FOR_TEST')).toEqual('value');
    });

    it('Does not exist', () => {
      // when / then
      expect(() => env('UNKNOWN')).toThrow();
    });
  });

});