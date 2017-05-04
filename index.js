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
  { category: 'article', label: 'Tier', translation: 'animal', answers: { right: 'das', wrong: ['der', 'die'] } },
  { category: 'article', label: 'Tisch', translation: 'table', answers: { right: 'der', wrong: ['die', 'das'] } },
  { category: 'article', label: 'Stuhl', translation: 'chair', answers: { right: 'der', wrong: ['die', 'das'] } },
  { category: 'article', label: 'Fenster', translation: 'window', answers: { right: 'das', wrong: ['der', 'die'] } },
  { category: 'article', label: 'Stimme', translation: 'voice', answers: { right: 'die', wrong: ['der', 'das'] } }
];

const PLURAL = [
  { category: 'plural', label: 'Tier', translation: 'animal', answers: { right: 'die Tiere', wrong: ['die Tier', 'die Tieren', 'die Tiern'] } },
  { category: 'plural', label: 'Tisch', translation: 'table', answers: { right: 'die Tische', wrong: ['die Tisch', 'die Tischen', 'die Tischn'] } },
  { category: 'plural', label: 'Stuhl', translation: 'chair', answers: { right: 'die Stühle', wrong: ['die Stühlen', 'die Stuhle', 'die Stuhlen'] } },
  { category: 'plural', label: 'Fenster', translation: 'window', answers: { right: 'die Fenster', wrong: ['die Fenstern', 'die Fensteren', 'die Fenstere'] } },
  { category: 'plural', label: 'Stimme', translation: 'voice', answers: { right: 'die Stimmen', wrong: ['die Stimme', 'die Stimmung', 'die Stimmüng'] } }
];

const PERFECT = [
  { category: 'perfect', label: 'machen', translation: 'to do, to make', answers: { right: 'er hat gemacht', wrong: ['er ist gemacht', 'er hat gemachen', 'er ist gemachen'] } },
  { category: 'perfect', label: 'tun', translation: 'to do', answers: { right: 'er hat getan', wrong: ['er hat getun', 'er hat tan', 'er hat tun'] } },
  { category: 'perfect', label: 'vergessen', translation: 'to forget', answers: { right: 'er hat vergessen', wrong: ['er hat vergesst', 'er hat vergegessen', 'er hat vergegesst'] } }
];

const SIMPLE_PAST = [
  { category: 'simple-past', label: 'machen', translation: 'to do, to make', answers: { right: 'er machte', wrong: ['er macht', 'er mochte', 'er möchte'] } },
  { category: 'simple-past', label: 'tun', translation: 'to do', answers: { right: 'er tut', wrong: ['er tan', 'er tute', 'er tante'] } },
  { category: 'simple-past', label: 'vergessen', translation: 'to forget', answers: { right: 'er vergaß', wrong: ['er vergiß', 'er vergesst', 'er vergesset'] } }
];

const ALL = [ ...ARTICLE, ...PLURAL, ...PERFECT, ...SIMPLE_PAST ];

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
