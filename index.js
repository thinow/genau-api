const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/status', function(request, response) {
  response.send({ status: 'OK' });
});

const ARTICLE = [
  { category: 'article', label: 'Tier', translation: 'animal', options: [{ value: 'der' }, { value: 'die' }, { value: 'das', correct: true }] },
  { category: 'article', label: 'Tisch', translation: 'table', options: [{ value: 'der', correct: true }, { value: 'die' }, { value: 'das' }] },
  { category: 'article', label: 'Stuhl', translation: 'chair', options: [{ value: 'der', correct: true }, { value: 'die' }, { value: 'das' }] },
  { category: 'article', label: 'Fenster', translation: 'window', options: [{ value: 'der' }, { value: 'die' }, { value: 'das', correct: true }] },
  { category: 'article', label: 'Stimmung', translation: 'atmosphere', options: [{ value: 'der' }, { value: 'die', correct: true }, { value: 'das' }] }
];

const PLURAL = [
  { category: 'plural', label: 'Tier', translation: 'animal', options: [{ value: 'die Tiere', correct: true }, { value: 'die Tier' }, { value: 'die Tieren' }, { value: 'die Tiern' }] },
  { category: 'plural', label: 'Tisch', translation: 'table', options: [{ value: 'die Tische', correct: true }, { value: 'die Tisch' }, { value: 'die Tischen' }, { value: 'die Tischn' }] },
  { category: 'plural', label: 'Stuhl', translation: 'chair', options: [{ value: 'die Stühle', correct: true }, { value: 'die Stühlen' }, { value: 'die Stuhle' }, { value: 'die Stuhlen' }] },
  { category: 'plural', label: 'Fenster', translation: 'window', options: [{ value: 'die Fenster', correct: true }, { value: 'die Fenstern' }, { value: 'die Fensteren' }, { value: 'die Fenstere' }] },
  { category: 'plural', label: 'Stimmung', translation: 'atmosphere', options: [{ value: 'die Stimmungen', correct: true }, { value: 'die Stimmung' }, { value: 'die Stimümnge' }, { value: 'die Stimümngen' }] }
];

const PERFECT = [
  { category: 'perfect', label: 'machen', translation: 'to do, to make', options: [{ value: 'er hat gemacht', correct: true }, { value: 'er ist gemacht' }, { value: 'er hat gemachen' }, { value: 'er ist gemachen' }] },
  { category: 'perfect', label: 'tun', translation: 'to do', options: [{ value: 'er hat getan', correct: true }, { value: 'er hat getun' }, { value: 'er hat tan' }, { value: 'er hat tun' }] },
  { category: 'perfect', label: 'vergessen', translation: 'to forget', options: [{ value: 'er hat vergessen', correct: true }, { value: 'er hat vergesst' }, { value: 'er hat vergegessen' }, { value: 'er hat vergegesst' }] }
];

const SIMPLE_PAST = [
  { category: 'simple-past', label: 'machen', translation: 'to do, to make', options: [{ value: 'er machte', correct: true }, { value: 'er macht' }, { value: 'er mochte' }, { value: 'er möchte' }] },
  { category: 'simple-past', label: 'tun', translation: 'to do', options: [{ value: 'er tut', correct: true }, { value: 'er tan' }, { value: 'er tute' }, { value: 'er tante' }] },
  { category: 'simple-past', label: 'vergessen', translation: 'to forget', options: [{ value: 'er vergaß', correct: true }, { value: 'er vergiß' }, { value: 'er vergesst' }, { value: 'er vergesset' }] }
];

const ALL = [].concat(ARTICLE, PLURAL, PERFECT, SIMPLE_PAST);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickFrom(array) {
  const index = getRandomIntInclusive(0, array.length - 1);
  return array[index];
}

app.get('/api/question/article', function(request, response) {
  database.collection('test').insertOne({ category: 'article', date: new Date() });
  response.send(pickFrom(ARTICLE));
});

app.get('/api/question/plural', function(request, response) {
  database.collection('test').insertOne({ category: 'plural', date: new Date() });
  response.send(pickFrom(PLURAL));
});

app.get('/api/question/perfect', function(request, response) {
  database.collection('test').insertOne({ category: 'perfect', date: new Date() });
  response.send(pickFrom(PERFECT));
});

app.get('/api/question/simple-past', function(request, response) {
  database.collection('test').insertOne({ category: 'simple-past', date: new Date() });
  response.send(pickFrom(SIMPLE_PAST));
});

app.get('/api/question/all', function(request, response) {
  database.collection('test').insertOne({ category: 'all', date: new Date() });
  response.send(pickFrom(ALL));
});

let database;

const mongodb_uri = process.env.MONGODB_URI;

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
