import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

function validationMiddleware(
  type: any,
  skipMissingProperties = false,
  specificBodyProperty?: string,
  dataToBeValidated?: any
): RequestHandler {
  return (req, res, next) => {
    return validate(
      plainToClass(
        type,
        dataToBeValidated
          ? dataToBeValidated
          : specificBodyProperty
          ? req.body[specificBodyProperty]
          : req.body
      ),
      { skipMissingProperties }
    ).then((errors: ValidationError[]) => {
      console.log(errors);
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints || {}))
          .join(', ');
        console.log(message);
        return next(new HttpException({ message, status: 400, errorCode: 'Invalid Request' }));
      }
      return next();
    });
  };
}

export default validationMiddleware;
