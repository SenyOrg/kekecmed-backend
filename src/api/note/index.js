import Router from 'koa-router';
import {findAll, findById, create, destroy, update} from '../../util/blueprints';
import cleanQueryString from '../../middleware/cleanQueryString';
import InvalidId from '../../exception/InvalidId';

/**
 * Endpoint: Note
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
    const model = database.Note;

    /**
     * Route path
     *
     * @type {string}
     */
    const routerPath = '/note'

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
            const modelInstance = await findById(model, ctx.params.id, ctx.query.attributes, ctx.query.relations);

            if (modelInstance) {
                const data = modelInstance.get({plain: true});

                // @todo :: Can we use virtual fields here instead of doing that manually?
                if (modelInstance.users || modelInstance.patients) {
                    data.references = [...modelInstance.users, ...modelInstance.patients]
                }

                ctx.body = data;
            } else {
                throw new InvalidId(ctx.params.id);
            }
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /:id/references
     *
     * @method GET
     */
    router.get('/:id/references', async(ctx) => {
        let note = await findById(model, ctx.params.id, null, true);
        ctx.body = [];

        note = note.get({plain: true});

        if (note.users || note.patients) {
            ctx.body = [...note.users, ...note.patients];
        }
    });

    /**
     * Route: /:id/references
     *
     * @method POST
     */
    router.post('/:id/references', async(ctx) => {
        const modelInstance = await create(database.NoteReference, {
            noteId: ctx.params.id,
            objectId: ctx.request.body.objectId,
            objectType: ctx.request.body.objectType
        });

        ctx.body = modelInstance;
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

            if (ctx.request.body.references) {
                await database.sequelize.query('DELETE FROM `NoteReferences` WHERE `noteId` = :id',
                    {
                        replacements: {id: ctx.params.id},
                        type: database.sequelize.QueryTypes.DELETE
                    });

                await ctx.request.body.references.forEach((v) => {
                    if (database[v.objectType]) {
                        database[v.objectType].findById(v.objectId).then((modelInstance) => {
                            if (modelInstance) {
                                database.NoteReference.create({
                                    noteId: ctx.params.id,
                                    objectId: v.objectId,
                                    objectType: v.objectType
                                });
                            }
                        });
                    } else {
                        // @todo Provided object type is not valid ! How should we react ?
                    }
                });
            }
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    // Inject router
    rootRouter.use(routerPath, router.routes(), router.allowedMethods());
}