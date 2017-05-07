import dataStorage from '../../src/data/storage';
import { dbConnectionUrl } from './constants';

const expectToBeQuestion = (question) => {
  expect(question).toBeDefined();

  const keys = Object.keys(question);
  expect(keys).toContain('category');
  expect(keys).toContain('label');
  expect(keys).toContain('translation');
  expect(keys).toContain('answers');

  const answersKeys = Object.keys(question.answers);
  expect(answersKeys).toContain('right');
  expect(answersKeys).toContain('wrong');
};

describe('Data Storage Tests', async() => {

  beforeAll(async() => {
    await dataStorage.connect(dbConnectionUrl);
  });

  it('Pick data (no category)', async() => {
    // when
    const question = await dataStorage.pick();

    // then
    expectToBeQuestion(question);
  });

  it('Pick data (category = perfect)', async() => {
    // when
    const question = await dataStorage.pick('perfect');

    // then
    expectToBeQuestion(question);
    expect(question.category).toEqual('perfect');
  });

  it('Pick data when the category is inknown', async() => {
    // when
    const question = await dataStorage.pick('unknown');

    // then
    expect(question).toBeUndefined();
  });

});