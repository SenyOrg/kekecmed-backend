import {findById} from '../../util/blueprints';
import cleanQueryString from '../../middleware/cleanQueryString';
import InvalidId from '../../exception/InvalidId';

/**
 * Blueprints: Notes for references
 *
 * @param router
 * @param model
 * @param database
 */
export function ReferenceBlueprints (router, model, database) {
    /**
     * Route: /:id/notes
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.get('/:id/notes', cleanQueryString, async(ctx) => {
        if (ctx.params.id > 0) {
            ctx.body = await findById(model, ctx.params.id, ctx.query.attributes, ctx.query.relations);

            if (ctx.body) {
                ctx.body = await ctx.body.getNotes();
            }
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /:id/notes
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.post('/:id/notes', async(ctx) => {
        if (ctx.params.id > 0) {
            // Find referenced object
            const referencedObject = await findById(model, ctx.params.id, null, true);

            // Create Note and reference it
            const note = await referencedObject.createNote(ctx.request.body)

            // Return created note
            ctx.body   = note;
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });
}

/**
 * Blueprints: Notes for user
 *
 * @param router
 * @param model
 * @param database
 */
export function UserBlueprints (router, model, database) {
    /**
     * Route: /:id/notes
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.get('/:id/notes', cleanQueryString, async(ctx) => {
        if (ctx.params.id > 0) {
            ctx.body = await findById(model, ctx.params.id, ctx.query.attributes, ctx.query.relations);

            if (ctx.body) {
                ctx.body = await ctx.body.getNotes();
            }
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /:id/notes
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.post('/:id/notes', async(ctx) => {
        if (ctx.params.id > 0) {
            // Find referenced object
            const modelInstance = await findById(model, ctx.params.id, null, true);

            // Create Note and reference it
            const note = await modelInstance.createNote(ctx.request.body)

            // Return created note
            ctx.body   = note;
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });
}