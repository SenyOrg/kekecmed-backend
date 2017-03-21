/**
 * Error Middleware
 *
 * Error Middleware to catch exceptions which are
 * not catched correctly and would cause a crash otherwise.
 *
 * -----------------------------------------------------------
 * !!! IMPORTANT !!!
 * ___________________________________________________________
 *
 * It is not desirable to handle errors like this. Exceptions
 * should be catched immediatly where they appear and should
 * be handled there.
 *
 * Therefor this Middleware will log each occured and uncaught
 * exception into the log file to inform you about this
 * problems.
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @param ctx
 * @param next
 */
export default async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        // Log error
        ctx.log.error(err);

        // SequelizeValidationError
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
            // SequelizeDatabaseError
            ctx.body = {
                error: 'DatabaseError',
                message: err.parent.toString(),
                detailed: err.parent,
                code: 5000
            }

            ctx.status = 400;
        } else {
            // Other exceptions
            ctx.body = {
                error: err.name,
                message: err.toString(),
                code: err.code,
            };

            ctx.status = err.status;
        }
    }
}