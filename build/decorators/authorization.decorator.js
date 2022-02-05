import HttpException from '../exceptions/HttpException';
import { UserType } from '../interfaces/users.interface';
import logger from '../logger/logger';
const authDecorator = (findOneFun, params) => {
    // tslint:disable-next-line: ban-types
    return (target, key, descriptor) => {
        return {
            async value(...args) {
                logger.debug(`findOneFun ${findOneFun} used to retrive one resource authDecorator`);
                const user = args[params.userPath.index];
                logger.debug(` ${user.role} role of the user that try to accsess resource authDecorator`);
                let result;
                if (user.role === UserType.ADMIN || user.role === UserType.SUPER_ADMIN) {
                    logger.debug('role is admin or superadmin  authDecorator');
                    result = descriptor.value.apply(this, args);
                }
                else {
                    logger.debug('check if ther resource belong to the user authDecorator');
                    const findOne = await target[findOneFun].bind(this)(args[params.findOnePath.index]);
                    // tslint:disable-next-line: triple-equals
                    if (findOne.createdByID == user._id) {
                        logger.debug('resource belong to the user authDecorator');
                        result = descriptor.value.apply(this, args);
                    }
                    else {
                        logger.debug('resource dont belong to the user authDecorator');
                        throw new HttpException({
                            message: 'Unauthorized',
                            status: 403,
                            errorCode: 'Unauthorized'
                        });
                    }
                }
                return result;
            }
        };
    };
};
export { authDecorator };
//# sourceMappingURL=authorization.decorator.js.map