import * as morgan from 'morgan';
import logger from './logger';
const morganConfig = {
    stream: {
        write: (text) => logger.debug(text.trim())
    }
};
const requestLoggingMiddleware = [
    morgan(':method :url', Object.assign(Object.assign({}, morganConfig), { immediate: true })),
    morgan(':method :status :url (:res[content-length] bytes) :response-time ms', Object.assign(Object.assign({}, morganConfig), { immediate: false }))
];
export default requestLoggingMiddleware;
//# sourceMappingURL=request-logging-middleware.js.map