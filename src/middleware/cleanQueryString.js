import _ from 'lodash';
import QueryParameter from '../exception/QueryParameter';


/**
 * Cleans and defaults query parameter
 *
 * This will only consider attributes, sort and order
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @param ctx
 * @param next
 */
export default async function (ctx, next) {
    // Check method first
    if (ctx.request.method == 'GET') {
        const parameters = ctx.query;

        // Check attributes
        if (parameters.attributes) {
            if (_.isString(parameters.attributes)) {
                if (parameters.attributes.indexOf(',') != -1) {
                    // Attributes are provided as a comma seperated list -> Make a array
                    parameters.attributes = parameters.attributes.split(',');
                } else {
                    // Attributes include only one entry -> Make a array
                    parameters.attributes = [parameters.attributes];
                }
            } else if (!_.isArray(parameters.attributes)) {
                throw new QueryParameter('Parameter attributes should be a comma seperated list or an array of attributes.');
            }
        }

        // Check order
        if (parameters.order) {
            if (!_.isString(parameters.order)) {
                throw new QueryParameter('Parameter order should be a string');
            }
        }

        // Check limit
        if (parameters.limit) {
            if (_.isNaN(_.parseInt(parameters.limit))) {
                throw new QueryParameter('Parameter limit should be a integer');
            }

            parameters.limit = _.parseInt(parameters.limit);
        }

        // Check offset
        if (parameters.offset) {
            if (_.isNaN(_.parseInt(parameters.offset))) {
                throw new QueryParameter('Parameter offset should be a integer');
            }

            parameters.offset = _.parseInt(parameters.offset);
        }

        // Check relations
        if (parameters.relations) {
            if (parameters.relations === 'true') {
                parameters.relations = true;
            } else if (parameters.relations === 'false') {
                parameters.relations = false;
            } else {
                throw new QueryParameter('Parameter relations should be one of {true,false}');
            }
        } else {
            // Load relations by default
            parameters.relations = true;
        }
    } else {
        throw new Error('cleanQueryString should only used for GET Requests.');
    }

    await next();
 }