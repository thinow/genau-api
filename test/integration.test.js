import http from 'http';
import start from '../src/start';

const startServer = (port, dbConnectionUrl) => {
  return new Promise((resolve) => start({ port, dbConnectionUrl, next: resolve }));
};

it('Integration Tests', async() => {

  const port = 5001;
  const dbConnectionUrl = 'mongodb://localhost:27017/genau';
  
  await startServer(port, dbConnectionUrl);

  const promise = new Promise((resolve) => {
    http.get(`http://localhost:${port}/api/status`, response => {
      console.log('REQUEST');
      resolve(response);
    });
  });
  
  const response = await promise;

  expect(response.statusCode).toEqual(200);
});