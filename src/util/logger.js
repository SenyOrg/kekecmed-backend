import winston from 'winston';

/**
 * Logger Instance
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 */
const logger = new (winston.Logger)({
    transports: [new (winston.transports.Console)({
        level: 'silly'
    }), new (winston.transports.File)({filename: 'kekecmed.log'})]
});

logger.cli();

export default logger;