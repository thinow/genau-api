import { MongoClient } from 'mongodb';

const storage = {

  db: {},

  connect: (url) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, (error, db) => {
        if (error) {
          reject(error);
        } else {
          storage.db = db;
          resolve();
        }
      });
    });
  },

  pick: (category) => {
    return new Promise((resolve, reject) => {
      const matchers = category ? [{ $match: { category } }] : [];
      const aggregations = [...matchers, { $sample: { size: 1 } }];
      storage.db.collection('question').aggregate(aggregations, (error, array) => {
        if (error) {
          reject(error);
        } else {
          resolve(array.pop());
        }
      })
    });
  }
};

export default storage;