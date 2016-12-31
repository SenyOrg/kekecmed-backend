import Router from 'koa-router';
import {findAll, findById, create, destroy, update} from '../../util/blueprints';
import cleanQueryString from '../../middleware/cleanQueryString';
import InvalidId from '../../exception/InvalidId';

/**
 * Endpoint: Queue
 *
 * @author
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
    const model = database.Queue;

    /**
     * Route path
     *
     * @type {string}
     */
    const routerPath = '/queue'

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
     * Route: /
     *
     * @method POST
     */
    router.post('/', async(ctx) => {
        const modelInstance = await create(model, ctx.request.body)
        ctx.body            = modelInstance;
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