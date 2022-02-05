import * as winston from 'winston';

function createLogger(opts: any = {}) {
  const { level = 'debug', getCorrelationId, noCorrelationIdValue = 'nocorrelation' } = opts;

  return winston.createLogger({
    level,
    format: winston.format.combine(
      winston.format((info) => {
        info.correlationId = getCorrelationId() || noCorrelationIdValue;
        return info;
      })(),
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, correlationId, level, message }) => {
        return `${timestamp} (${correlationId}) - ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console({
        handleExceptions: true
      }),
      new winston.transports.File({
        filename: './logs/musala.log',
        format: winston.format.combine(
          winston.format.errors({ stack: true }),
          winston.format.metadata()
        )
      })
    ],
    exitOnError: false
  });
}

export default createLogger;
