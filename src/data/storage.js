import { MongoClient } from 'mongodb';
import { env } from '../core/core';

const storage = {

  db: {},

  connect: (url, next) => {
    console.log('Connecting to MongoDB...');
    MongoClient.connect(url, (error, db) => {
      if (error) return console.error('Cannot connect to MongoDB', error);

      console.log('Connected to MongoDB');

      storage.db = db;
      next();
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