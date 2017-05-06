import express from 'express';
import datastorage from '../data/storage';

export const start = ({ port, dbConnectionUrl, next = () => ({}) }) => {
  const app = express();

  app.set('port', port);

  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/api/status', (request, response) => {
    response.send({ status: 'OK' });
  });

  app.get('/api/question/all', (request, response) => {
    datastorage.pick({ then: question => response.send(question) })
  });

  app.get('/api/question/:category', (request, response) => {
    const { category } = request.params;

    datastorage.pick({ category, then: question => response.send(question) })
  });

  datastorage.connect(dbConnectionUrl, () => {
    app.listen(port, next);
  });
};