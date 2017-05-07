import dataStorage from './data/storage';
import webServer from './web/server';
import { env } from './core/core';

const PORT = env('PORT');
const MONGODB_URI = env('MONGODB_URI');

dataStorage.connect(MONGODB_URI).then(() => {
  webServer.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT}`);
  });
});