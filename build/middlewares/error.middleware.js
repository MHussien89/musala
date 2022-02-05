function errorMiddleware(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const errorCode = error.errorCode || '';
    res.status(status).json({ message, errorCode });
}
export default errorMiddleware;
//# sourceMappingURL=error.middleware.js.map