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

  pick: (category) => storage.db.collection('question').find({ category })
};

export default storage;