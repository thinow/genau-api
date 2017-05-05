import express from 'express';
import { MongoClient } from 'mongodb';
import { env } from './core/core';
import data, { pickFrom } from './data/hardcoded';

const app = express();

app.set('port', env('PORT'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/status', (request, response) => {
  response.send({ status: 'OK' });
});

app.get('/api/question/:category', (request, response) => {
  const { category } = request.params;

  database.collection('test').insertOne({ category, date: new Date() });
  response.send(pickFrom(data[category]));
});

let database;

const mongodb_uri = env('MONGODB_URI');

console.log('Connection to MongoDB', mongodb_uri);
MongoClient.connect(mongodb_uri, function(error, db) {
  if (error) {
    return console.error('Cannot connect to MongoDB', error);
  }

  database = db;

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  })

});
