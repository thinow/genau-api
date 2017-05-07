import start from './start';
import { env } from './core/core';

start({
  port: env('PORT'),
  dbConnectionUrl: env('MONGODB_URI')
});