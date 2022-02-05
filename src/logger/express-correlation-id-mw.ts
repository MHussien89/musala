import correlator from './correlation-id';
import { NextFunction, Request, Response } from 'express';

function correlationIdMiddleware(req: Request, res: Response, next: NextFunction) {
  correlator.bindEmitter(req);
  correlator.bindEmitter(res);
  correlator.bindEmitter(req.socket);

  correlator.withId(() => {
    const currentCorrelationId = correlator.getId();
    res.set('x-correlation-id', currentCorrelationId);
    next();
    // tslint:disable-next-line: align
  }, req.get('x-correlation-id'));
}

export default correlationIdMiddleware;
