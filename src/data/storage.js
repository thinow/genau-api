import { MongoClient } from 'mongodb';

const storage = {

  db: {},

  connect: (url) => {
    return new Promise((resolve, reject) => {
      console.log('Connecting to MongoDB...');
      MongoClient.connect(url, (error, db) => {
        if (error) return reject(error);

        console.log('Connected to MongoDB');

        storage.db = db;
        resolve();
      });
    });
  },

  pick: ({ category, then : callback }) => {
    const aggregation = [
      category && { $match: { category } },
      { $sample: { size: 1 } }
    ].filter(item => !!item);

    storage.db.collection('question').aggregate(aggregation, (error, array) => {
      if (error) console.error('Error during database request', error);

      callback(array.pop());
    })
  }
};

export default storage;