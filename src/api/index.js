/**
 * KekecMed: API
 *
 * This file will setup the root router and create all necessary API ENDPOINTS
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @version 0.1
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

// Create root router
const rootRouter = new Router({
    prefix: '/v1'
});

// Setup error middleware
rootRouter.use(async(ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.log.error(err);
        if (err.name == 'SequelizeValidationError') {
            ctx.body = {
                error: 'ValidationError',
                message: 'Unable to create / update model.',
                code: 2000,
                validation: err.errors.map((v) => {
                    let error = null;
                    if (v.value) {
                        error = {
                            message: v.value.errorMessage,
                            type: v.value.type
                        };

                        if (v.value.type === 'ValidationError') {
                            error.property = v.path;
                        } else {
                            error.path       = v.path;
                            error.properties = v.value.properties;
                        }
                    } else {
                        error = v;
                    }

                    return error;
                })
            };

            ctx.status = 400;
        } else if (err.name === 'SequelizeDatabaseError' || err.name === 'SequelizeForeignKeyConstraintError') {
            ctx.body = {
                error: 'DatabaseError',
                message: err.parent.toString(),
                detailed: err.parent,
                code: 5000
            }

            ctx.status = 400;
        } else {
            ctx.body = {
                error: err.name,
                message: err.toString(),
                code: err.code,
            };

            ctx.status = err.status;
        }
    }
});

// Apply api endpoints to the root router
App(rootRouter, DB);
User(rootRouter, DB);
Note(rootRouter, DB);
Patient(rootRouter, DB);
Task(rootRouter, DB);
Calendar(rootRouter, DB);
Event(rootRouter, DB);
Queue(rootRouter, DB);

export default rootRouter;



