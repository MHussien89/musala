import correlator from './correlation-id';
function correlationIdMiddleware(req, res, next) {
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
//# sourceMappingURL=express-correlation-id-mw.js.map