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
    { category: 'article', label: 'Tier', options: [{ value: 'der' }, { value: 'die' }, { value: 'das', correct: true }] },
    { category: 'article', label: 'Tisch', options: [{ value: 'der', correct: true }, { value: 'die' }, { value: 'das' }] },
    { category: 'article', label: 'Stuhl', options: [{ value: 'der', correct: true }, { value: 'die' }, { value: 'das' }] },
    { category: 'article', label: 'Fenster', options: [{ value: 'der' }, { value: 'die' }, { value: 'das', correct: true }] },
    { category: 'article', label: 'Stimmung', options: [{ value: 'der' }, { value: 'die', correct: true }, { value: 'das' }] }
  ]));
});

app.get('/api/question/perfect', function(request, response) {
  response.send(pickFrom([
    { category: 'perfect', label: 'machen', options: [{ value: 'er hat gemacht', correct: true }, { value: 'er bin gemacht' }, { value: 'er hat gemachen' }, { value: 'er bin gemachen' }] },
    { category: 'perfect', label: 'tun', options: [{ value: 'er hat getan', correct: true }, { value: 'er hat getun' }, { value: 'er hat tan' }, { value: 'er hat tun' }] },
    { category: 'perfect', label: 'vergessen', options: [{ value: 'er hat vergessen', correct: true }, { value: 'er hat vergesst' }, { value: 'er hat vergegessen' }, { value: 'er hat vergegesst' }] }
  ]));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
