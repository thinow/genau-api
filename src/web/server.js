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

app.get('/api/question/all', (request, response) => {
  dataStorage.pick({ then: question => response.send(question) })
});

app.get('/api/question/:category', (request, response) => {
  const { category } = request.params;

  dataStorage.pick({ category, then: question => response.send(question) })
});

export default app;