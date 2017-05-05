import { MongoClient } from 'mongodb';
import { env } from '../core/core';

const storage = {

  db: {},

  connect: (next) => {
    console.log('Connecting to MongoDB...');
    MongoClient.connect(env('MONGODB_URI'), (error, db) => {
      if (error) return console.error('Cannot connect to MongoDB', error);

      console.log('Connected to MongoDB');

      storage.db = db;
      next();
    });
  },

  pick: ({category, then : callback}) => {
    storage.db.collection('question').findOne({ category }, (error, found) => {
      if (error) console.error('Error during database request', error);
      
      callback(found);
    })
  }
};

export default storage;