import dataStorage from '../src/data/storage';

it('Integration tests', async(done) => {
  await dataStorage.connect('mongodb://localhost:27017/genau');

  dataStorage.pick({
    then: (question) => {
      expect(question).toEqual('TO CHANGE');
      done();
    }
  });

});