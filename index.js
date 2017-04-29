const express = require('express');
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
  response.send(pickFrom([
    { category: 'article', label: 'Tier', translation: 'animal', options: [{ value: 'der' }, { value: 'die' }, { value: 'das', correct: true }] },
    { category: 'article', label: 'Tisch', translation: 'table', options: [{ value: 'der', correct: true }, { value: 'die' }, { value: 'das' }] },
    { category: 'article', label: 'Stuhl', translation: 'chair', options: [{ value: 'der', correct: true }, { value: 'die' }, { value: 'das' }] },
    { category: 'article', label: 'Fenster', translation: 'window', options: [{ value: 'der' }, { value: 'die' }, { value: 'das', correct: true }] },
    { category: 'article', label: 'Stimmung', translation: 'atmosphere', options: [{ value: 'der' }, { value: 'die', correct: true }, { value: 'das' }] }
  ]));
});

app.get('/api/question/plural', function(request, response) {
  response.send(pickFrom([
    { category: 'plural', label: 'Tier', translation: 'animal', options: [{ value: 'die Tiere', correct: true }, { value: 'die Tier' }, { value: 'die Tieren' }, { value: 'die Tiern' }] },
    { category: 'plural', label: 'Tisch', translation: 'table', options: [{ value: 'die Tische', correct: true }, { value: 'die Tisch' }, { value: 'die Tischen' }, { value: 'die Tischn' }] },
    { category: 'plural', label: 'Stuhl', translation: 'chair', options: [{ value: 'die Stühle', correct: true }, { value: 'die Stühlen' }, { value: 'die Stuhle' }, { value: 'die Stuhlen' }] },
    { category: 'plural', label: 'Fenster', translation: 'window', options: [{ value: 'die Fenster', correct: true }, { value: 'die Fenstern' }, { value: 'die Fensteren' }, { value: 'die Fenstere' }] },
    { category: 'plural', label: 'Stimmung', translation: 'atmosphere', options: [{ value: 'die Stimmungen', correct: true }, { value: 'die Stimmung' }, { value: 'die Stimümnge' }, { value: 'die Stimümngen' }] }
  ]));
});

app.get('/api/question/perfect', function(request, response) {
  response.send(pickFrom([
    { category: 'perfect', label: 'machen', translation: 'to do, to make', options: [{ value: 'er hat gemacht', correct: true }, { value: 'er ist gemacht' }, { value: 'er hat gemachen' }, { value: 'er ist gemachen' }] },
    { category: 'perfect', label: 'tun', translation: 'to do', options: [{ value: 'er hat getan', correct: true }, { value: 'er hat getun' }, { value: 'er hat tan' }, { value: 'er hat tun' }] },
    { category: 'perfect', label: 'vergessen', translation: 'to forget', options: [{ value: 'er hat vergessen', correct: true }, { value: 'er hat vergesst' }, { value: 'er hat vergegessen' }, { value: 'er hat vergegesst' }] }
  ]));
});

app.get('/api/question/preterit', function(request, response) {
  response.send(pickFrom([
    { category: 'preterit', label: 'machen', translation: 'to do, to make', options: [{ value: 'er machte', correct: true }, { value: 'er macht' }, { value: 'er mochte' }, { value: 'er möchte' }] },
    { category: 'preterit', label: 'tun', translation: 'to do', options: [{ value: 'er tut', correct: true }, { value: 'er tan' }, { value: 'er tute' }, { value: 'er tante' }] },
    { category: 'preterit', label: 'vergessen', translation: 'to forget', options: [{ value: 'er vergaß', correct: true }, { value: 'er vergiß' }, { value: 'er vergesst' }, { value: 'er vergesset' }] }
  ]));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
