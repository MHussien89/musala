import * as morgan from 'morgan';
import logger from './logger';

const morganConfig = {
  stream: {
    write: (text: string) => logger.debug(text.trim())
  }
};

const requestLoggingMiddleware = [
  morgan(':method :url', { ...morganConfig, immediate: true }),
  morgan(':method :status :url (:res[content-length] bytes) :response-time ms', {
    ...morganConfig,
    immediate: false
  })
];

export default requestLoggingMiddleware;
