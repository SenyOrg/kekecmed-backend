import winston from 'winston';

// Create logger
const logger = new (winston.Logger)({
    transports: [new (winston.transports.Console)({
        level: 'silly'
    }), new (winston.transports.File)({filename: 'kekecmed.log'})]
});

logger.cli();

export default logger;