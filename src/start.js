import dataStorage from './data/storage';
import webServer from './web/server';

const connectToDataStorage = ({ dbConnectionUrl, next }) => {

  console.log('[GENAU] Connecting to MongoDB...');
  dataStorage.connect(dbConnectionUrl)
    .then(() => console.log('[GENAU] Connected to MongoDB') & next())
    .catch(error => console.error('[GENAU] Error during MongoDB connection', error));
};

const startWebServer = ({ next, port }) => {
  console.log(`[GENAU] Starting web server on port ${port}...`);

  webServer.start(port)
    .then(() => console.log(`[GENAU] Web server is running on port ${port}`) & next());
};

export default ({ port, dbConnectionUrl, next = () => ({}) }) => {
  connectToDataStorage({
    dbConnectionUrl,
    next: () => startWebServer({
      port,
      next: () => console.log('[GENAU] Ready to use !') & next()
    })
  });
};
