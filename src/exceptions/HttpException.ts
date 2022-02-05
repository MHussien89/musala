class HttpException extends Error {
  public status: number;
  public message: string;
  public errorCode?: string;

  constructor(httpException: { status: number; message: string; errorCode: string }) {
    super(httpException.message);
    this.status = httpException.status;
    this.message = httpException.message;
    this.errorCode = httpException.errorCode;
  }
}

export default HttpException;
