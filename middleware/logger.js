const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const config = require('../config');

const transportsDRF = new DailyRotateFile({
    filename: config.winston.file.filename,
    dirname: config.winston.file.dirname,
    datePattern: config.winston.file.datepattern,
    maxSize: config.winston.file.maxsize,
    maxFiles: config.winston.file.maxFiles
  });

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        transportsDRF,
        new transports.Console(config.winston.console)
    ]
});


logger.stream = {
    write: (info) => {
        logger.info(info)
    }
}

module.exports = logger;