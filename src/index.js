import dataStorage from './data/storage';
import webServer from './web/server';
import { env } from './core/core';

const PORT = env('PORT');
const MONGODB_URI = env('MONGODB_URI');

const connectToDataStorage = ({ next }) => {

  console.log('[GENAU] Connecting to MongoDB...');
  dataStorage.connect(MONGODB_URI)
    .then(() => console.log('[GENAU] Connected to MongoDB') & next())
    .catch(error => console.error('[GENAU] Error during MongoDB connection', error));
};

const startWebServer = ({ next }) => {
  console.log(`[GENAU] Starting web server on port ${PORT}...`);

  webServer.start(PORT)
    .then(() => console.log(`[GENAU] Web server is running on port ${PORT}`) & next());
};

connectToDataStorage({
  next: () => startWebServer({
    next: () => console.log('[GENAU] Ready to use !')
  })
});
