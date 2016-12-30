import {findById, create} from '../../util/blueprints';
import cleanQueryString from '../../middleware/cleanQueryString';
import InvalidId from '../../exception/InvalidId';

/**
 * Blueprints: Tasks for referenced objects
 *
 * @param router
 * @param model
 * @param database
 */
export function ReferenceBlueprints(router, model, database) {
    /**
     * Route: /:id/tasks
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.get('/:id/tasks', cleanQueryString, async(ctx) => {
        if (ctx.params.id > 0) {
            ctx.body = await findById(model, ctx.params.id, ctx.query.attributes, ctx.query.relations);

            if (ctx.body) {
                ctx.body = await ctx.body.getTasks();
            }
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /:id/tasks
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.post('/:id/tasks', async(ctx) => {
        if (ctx.params.id > 0) {
            // Find patient
            const referenceInstance = await findById(model, ctx.params.id, null, true);

            // Create Task
            const task = await create(database.Task, ctx.request.body);

            // Create assignees
            if (ctx.request.body.assignees) {
                /**
                 * This will not prevent foreignKey constraint errors
                 * but is much faster
                 */
                await task.addAssignees(ctx.request.body.assignees);

                /**
                 * This will prevent foreignkey constraint errors
                 */
                //await ctx.request.body.assignees.forEach( userId => task.addAssignee(userId));
            }

            // Reference task to object
            referenceInstance.addTask(task);

            // Return created task
            ctx.body   = task;
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });
}

/**
 * Blueprints: Tasks for users
 *
 * @param router
 * @param model
 * @param database
 */
export function UserBlueprints(router, model, database) {
    /**
     * Route: /:id/tasks
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.get('/:id/tasks', cleanQueryString, async(ctx) => {
        if (ctx.params.id > 0) {
            ctx.body = await findById(model, ctx.params.id, ctx.query.attributes, ctx.query.relations);

            if (ctx.body) {
                ctx.body = {
                    created: await ctx.body.getCreatedTasks(),
                    assigned: await ctx.body.getAssignedTasks()
                };
            }
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });

    /**
     * Route: /:id/tasks
     *
     * @method GET
     * @queryParam attributes
     * @queryParam relations
     */
    router.post('/:id/tasks', async(ctx) => {
        if (ctx.params.id > 0) {
            // Find patient
            const referenceInstance = await findById(model, ctx.params.id, null, true);

            // Create Task
            const task = await referenceInstance.createCreatedTask(ctx.request.body)

            // Create assignees
            if (ctx.request.body.references) {
                await ctx.request.body.references.forEach( v => create(database.TaskReference, v));
            }

            // Return created task
            ctx.body   = task;
        } else {
            throw new InvalidId(ctx.params.id);
        }
    });
}