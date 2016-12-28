/**
 * KekecMed Backend
 *
 * This file will create the whole
 * application instance and register all needed middleware and routes
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @version 0.1
 */
import 'babel-polyfill';
import Koa from 'koa';
import RT from 'koa-response-time';
import Logger from 'koa-logger';
import Parser from 'koa-bodyparser';
import Log from './util/logger';
import Api from './api';
import JSON from 'koa-json';
import Compress from 'koa-compress';

// Create Koa instance
const app = new Koa();

// Prepare app context
Log.info("KekecMed - Booting...");
app.context.log = Log;

// Register middleware
app.use(RT());
app.use(Logger());
app.use(Parser());
app.use(JSON());

/**
 * @todo: Compression should be enabled in production only - Implement a valid configuration management first
 */
//app.use(Compress());

// Register routes
app.use(Api.routes());
app.use(Api.allowedMethods());

// Export the app
export default app;
