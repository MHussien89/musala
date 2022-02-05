import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import HttpException from '../exceptions/HttpException';
function validationMiddleware(type, skipMissingProperties = false, specificBodyProperty, dataToBeValidated) {
    return (req, res, next) => {
        return validate(plainToClass(type, dataToBeValidated
            ? dataToBeValidated
            : specificBodyProperty
                ? req.body[specificBodyProperty]
                : req.body), { skipMissingProperties }).then((errors) => {
            console.log(errors);
            if (errors.length > 0) {
                const message = errors
                    .map((error) => Object.values(error.constraints || {}))
                    .join(', ');
                console.log(message);
                return next(new HttpException({ message, status: 400, errorCode: 'Invalid Request' }));
            }
            return next();
        });
    };
}
export default validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map