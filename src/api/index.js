/**
 * KekecMed: API
 *
 * This file will setup the root router and create all necessary API ENDPOINTS
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @version 0.1
 */

/**
 * IMPORTS
 */
import Router from 'koa-router';
import DB from '../db/models';
import App from './app';
import User from './user';
import Note from './note';
import Patient from './patient';
import Task from './task';
import Calendar from './calendar';
import Event from './event';
import Queue from './queue';
import ErrorMiddleware from '../middleware/error';

// Create root router
const rootRouter = new Router({
    prefix: '/v1'
});

// Setup error middleware
rootRouter.use(ErrorMiddleware);

// Apply api endpoints to the root router
App(rootRouter, DB);
User(rootRouter, DB);
Note(rootRouter, DB);
Patient(rootRouter, DB);
Task(rootRouter, DB);
Calendar(rootRouter, DB);
Event(rootRouter, DB);
Queue(rootRouter, DB);

// Export root router
export default rootRouter;



