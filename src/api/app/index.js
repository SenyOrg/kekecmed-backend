/**
 * IMPORTS
 */
import Router from 'koa-router';
import packageJSON from '../../../package.json';

/**
 * Endpoint: App
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
     * Route path
     *
     * @type {string}
     */
    const routerPath = '/info';

    /**
     * Route: /
     *
     * @method GET
     */
    router.get('/', async(ctx) => {
        ctx.body = {
            name: packageJSON.name,
            version: packageJSON.version,
            description: packageJSON.description,
            status: 'online'
        };
    });

    /**
     * Route: /
     *
     * @method GET
     */
    router.get('/status', async(ctx) => {
        ctx.body = {
            status: 'online',
        }
    });

    // Inject router
    rootRouter.use(routerPath, router.routes(), router.allowedMethods());
}