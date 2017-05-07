import express from 'express';
import dataStorage from '../data/storage';

const app = express();

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/status', (request, response) => {
  response.send({ status: 'OK' });
});

const handle = ({ promise, response }) => {
  promise
    .then(result => response.send(result))
    .catch(error => response.status(500).send({ error }));
};

app.get('/api/question/all', (request, response) => {
  handle({ response, promise: dataStorage.pick() });
});

app.get('/api/question/:category', (request, response) => {
  const { category } = request.params;
  handle({ response, promise: dataStorage.pick(category) });
});

app.start = (port) => {
  return new Promise((resolve) => app.listen(port, resolve));
};

export default app;