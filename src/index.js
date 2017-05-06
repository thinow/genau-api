import { start } from './web/server';
import { env } from './core/core';

start({
  port: env('PORT'),
  dbConnectionUrl: env('MONGODB_URI'),
  next: () => console.log(`Web server is running on port ${env('PORT')}`)
});
