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
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function pickFrom(array) {
  const index = getRandomIntInclusive(0, array.length);
  return array[index];
}

app.get('/api/question/article', function(request, response) {
  const data = [
    { category: 'article', label: 'Tier', options: [{ value: 'der' }, { value: 'die' }, { value: 'das', correct: true }] },
    { category: 'article', label: 'Tisch', options: [{ value: 'der', correct: true }, { value: 'die' }, { value: 'das' }] },
    { category: 'article', label: 'Stuhl', options: [{ value: 'der', correct: true }, { value: 'die' }, { value: 'das' }] },
    { category: 'article', label: 'Fenster', options: [{ value: 'der' }, { value: 'die' }, { value: 'das', correct: true }] },
    { category: 'article', label: 'Stimmung', options: [{ value: 'der' }, { value: 'die', correct: true }, { value: 'das' }] }
  ];

  response.send(pickFrom(data));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
