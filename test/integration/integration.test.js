import http from 'http';
import start from '../../src/start';
import webServer from '../../src/web/server';
import { port, dbConnectionUrl } from './constants';

const startServer = ({ port, dbConnectionUrl }) => (
  new Promise((resolve) => start({ port, dbConnectionUrl, next: resolve }))
);

const request = ({ path, port }) => (
  new Promise((resolve) => {
    http.get(`http://localhost:${port}${path}`, response => resolve(response));
  })
);

describe('Integration Tests', async() => {

  beforeAll(async() => {
    await startServer({ port, dbConnectionUrl });
  });

  afterAll((done) => {
    webServer.close(done);
  });

  it('API Status', async() => {
    // when
    const response = await request({ port, path: '/api/status' });

    // then
    expect(response.statusCode).toEqual(200);
  });

  it('Question (all)', async() => {
    // when
    const response = await request({ port, path: '/api/question/all' });

    // then
    expect(response.statusCode).toEqual(200);
  });

  it('Question (article)', async() => {
    // when
    const response = await request({ port, path: '/api/question/article' });

    // then
    expect(response.statusCode).toEqual(200);
  });

});