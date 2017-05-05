import express from 'express';
import { env } from './core/core';
import datastorage from './data/storage';

const PORT = env('PORT');

const app = express();

app.set('port', PORT);

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/status', (request, response) => {
  response.send({ status: 'OK' });
});

app.get('/api/question/all', (request, response) => {
  response.send(datastorage.pick());
});

app.get('/api/question/:category', (request, response) => {
  const { category } = request.params;

  response.send(datastorage.pick(category));
});

datastorage.connect(() => {
  app.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT}`);
  });
});
