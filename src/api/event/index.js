import Router from 'koa-router';
import {findAll, findById, create, destroy, update} from '../../util/blueprints';
import cleanQueryString from '../../middleware/cleanQueryString';
import InvalidId from '../../exception/InvalidId';

/**
 * Endpoint: Event
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @param rootRouter
 * @param database
 */
export default (rootRouter, database) => {
    /**
     * Router
     *
     * @type {Router}
     */
    const router = new Router();

    /**
     * Model
     *
     * @type sequelize.model
     */
    const model = database.Event;

    /**
     * Route path
     *
     * @type {string}
     */
    const routerPath = '/event'

    /**
     * Route: /
     *
     * @method GET
     * @queryParam attributes
     * @queryParam order
     * @queryParam limit
     * @queryParam offset
     * @queryParam relations
     */
    router.get('/', cleanQueryString, async(ctx) => {
        ctx.body = await findAll(model,
            ctx.query.attributes,
            ctx.query.order,
            ctx.query.limit,
            ctx.query.offset,
            ctx.query.relations)
    });

    /**
     * Route: /:id
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.get('/:id', cleanQueryString, async(ctx) => {
        if (ctx.params.id > 0) {
            ctx.body = await findById(model, ctx.params.id, ctx.query.attributes, ctx.query.relations);
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /:id/events
     *
     * @method GET
     */
    router.get('/:id/participants', async(ctx) => {
        ctx.body = (await findById(model, ctx.params.id, null, true)).participants;
    });

    /**
     * Route: /:id/events
     *
     * @description Append new participants to the event
     * @method POST
     */
    router.post('/:id/participants', async(ctx) => {
        if (ctx.params.id > 0) {
            // Find calendar
            const modelInstance = await findById(model, ctx.params.id);

            // Add participants
            await modelInstance.addParticipants(ctx.request.body);

            // Fetch event again to include all relational data in response
            ctx.body = await findById(model, modelInstance.id, null, true);
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /:id/participants/
     *
     * @description Replace event participants
     * @method put
     */
    router.put('/:id/participants', async(ctx) => {
        if (ctx.params.id > 0) {
            // Find calendar
            const modelInstance = await findById(model, ctx.params.id);

            // Add participants
            await modelInstance.setParticipants(ctx.request.body);

            // Fetch event again to include all relational data in response
            ctx.body = await findById(model, modelInstance.id, null, true);
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /
     *
     * @method POST
     */
    router.post('/', async(ctx) => {
        // Create Event
        ctx.body = await create(model, ctx.request.body);

        // Create participant references
        if (ctx.request.body.participants) {
            await ctx.body.setParticipants(ctx.request.body.participants);
        }

        ctx.body = await findById(model, ctx.body.id, null, true);
    });

    /**
     * Route: /:id
     *
     * @method DELETE
     */
    router.del('/:id', async(ctx) => {
        if (ctx.params.id > 0) {
            ctx.body = await destroy(model, ctx.params.id);
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /:id
     *
     * @method PUT
     */
    router.put('/:id', async(ctx) => {
        if (ctx.params.id > 0) {
            ctx.body = await update(model, ctx.params.id, ctx.request.body);
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    // Inject router
    rootRouter.use(routerPath, router.routes(), router.allowedMethods());
}