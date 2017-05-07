import dataStorage from '../src/data/storage';

it('Data Storage Tests', async() => {
  // given
  await dataStorage.connect('mongodb://localhost:27017/genau');

  // when
  const question = await dataStorage.pick();

  // then
  expect(question).toBeDefined();

  const keys = Object.keys(question);
  expect(keys).toContain('category');
  expect(keys).toContain('label');
  expect(keys).toContain('answers');
});