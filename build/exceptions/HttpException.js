class HttpException extends Error {
    constructor(httpException) {
        super(httpException.message);
        this.status = httpException.status;
        this.message = httpException.message;
        this.errorCode = httpException.errorCode;
    }
}
export default HttpException;
//# sourceMappingURL=HttpException.js.map