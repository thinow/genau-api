import http from 'http';
import start from '../src/start';
import webServer from '../src/web/server';
import enableDestroy from 'server-destroy';

const startServer = (port, dbConnectionUrl) => {
  return new Promise((resolve) => start({ port, dbConnectionUrl, next: resolve }));
};

describe('Integration Tests', async() => {

  afterEach((done) => {
    webServer.close(done);
  });

  it('Integration Tests', async() => {

    const port = 5001;
    const dbConnectionUrl = 'mongodb://localhost:27017/genau';

    await startServer(port, dbConnectionUrl);
    enableDestroy(webServer);

    const promise = new Promise((resolve) => {
      http.get(`http://localhost:${port}/api/status`, response => {
        console.log('REQUEST');
        resolve(response);
      });
    });

    const response = await promise;

    expect(response.statusCode).toEqual(200);
  });

});