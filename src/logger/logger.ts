import correlationId from './correlation-id';
import createLogger from './create-logger';

const logger = createLogger({
  getCorrelationId: correlationId.getId
});

export default logger;
