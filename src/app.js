/**
 * KekecMed Backend
 *
 * This file will create the whole
 * application instance and register all needed middleware and routes
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @version 0.1
 */

/**
 * IMPORTS
 */
import 'babel-polyfill';
import Koa from 'koa';
import ResponsTimeMiddleware from 'koa-response-time';
import LoggerMiddleware from 'koa-logger';
import BodyParserMiddleware from 'koa-bodyparser';
import CorsMiddleware from 'kcors';
import JsonMiddleware from 'koa-json';
import CompressMiddleware from 'koa-compress';
import Logger from './util/logger';
import Api from './api';

// Create Koa instance
const app = new Koa();

// Prepare app context
Logger.info("KekecMed - Booting...");
app.context.log = Logger;

// Register middleware
app.use(ResponsTimeMiddleware());
app.use(LoggerMiddleware());
app.use(BodyParserMiddleware());
app.use(JsonMiddleware());
app.use(CorsMiddleware());

/**
 * @todo: Compression should be enabled in production only - Implement a valid configuration management first
 */
//app.use(Compress());

// Register routes
app.use(Api.routes());
app.use(Api.allowedMethods());

// Export the app
export default app;
