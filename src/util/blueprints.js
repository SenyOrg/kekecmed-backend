/**
 * KekecMed: Blueprints
 *
 * This file includes some blueprint actions for routes.
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @version 0.1
 */

import InvalidId from '../exception/InvalidId';

/**
 * Find all entities
 *
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @param model
 * @param attributes
 * @param sort
 * @param order
 */
export async function findAll(model, attributes, order, limit, offset, relations) {
    return await model.findAll({
        attributes: attributes,
        order: order,
        limit: limit,
        offset: offset,
        include: (relations) ? [{ all: true }] : null
    });
}

/**
 * Find entity by id
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @param model
 * @param id
 * @param attributes
 * @param relations
 * @returns {*}
 */
export async function findById(model, id, attributes, relations) {
    const modelInstance =  await model.findById(id, {
       attributes: attributes,
       include: (relations) ? [{ all: true }] : null
    });

    console.log(modelInstance);
    if (!modelInstance) {
        throw new InvalidId(id);
    }

    return modelInstance;
}

/**
 * Create new entity
 *
 * @param model
 * @param attributes
 * @returns {attributes}
 */
export async function create(model, attributes) {
    return await model.create(attributes, {
        fields: (model.getSaveableFields) ? model.getSaveableFields() : null
    });
}

/**
 * Destroy an entity
 *
 * @param model
 * @param id
 * @returns {*|Promise.<undefined>|Promise.<Integer>}
 */
export async function destroy(model, id) {
    // Get instance by id
    const modelInstance = await findById(model, id);

    if (!modelInstance) {
        throw new InvalidId(id);
    }

    // Destroy entity
    return await modelInstance.destroy();
}

/**
 * Update an entity
 *
 * @param model
 * @param id
 * @param attributes
 * @returns {Object|*|Promise.<Array.<affectedCount, affectedRows>>}
 */
export async function update(model, id, attributes) {
    // Get instance by id
    const modelInstance = await findById(model, id);

    if (!modelInstance) {
        throw new InvalidId(id);
    }

    // Update instance
    return await modelInstance.update(attributes, {
        fields: (model.getSaveableFields) ? model.getSaveableFields() : null
    });
}