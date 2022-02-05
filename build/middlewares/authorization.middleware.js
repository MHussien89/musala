import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { UserType } from '../interfaces/users.interface';
import logger from '../logger/logger';
function authoriztionMddlewareFactory(permission) {
    return async function authMddleware(req, res, next) {
        const authHeader = req.headers['authorization'];
        const authorizationToken = authHeader && authHeader.split(' ')[1];
        if (authorizationToken) {
            const secret = process.env.JWT_SECRET || 'auth_jwt';
            try {
                logger.debug('get user token data authoriztionMddlewareFactory ');
                const verificationResponse = jwt.verify(authorizationToken, secret);
                logger.debug('successfully retrive user token data authoriztionMddlewareFactory ');
                logger.debug(`check user role ${verificationResponse.role} authoriztionMddlewareFactory `);
                if (verificationResponse.role === UserType.SUPER_ADMIN) {
                    logger.debug('user is super admin authoriztionMddlewareFactory ');
                    next();
                }
                else if (verificationResponse.permissions.some((r) => {
                    return permission.includes(r);
                })) {
                    logger.debug(`user has accsess to resoure ${permission.join(',')} admin authoriztionMddlewareFactory `);
                    next();
                }
                else {
                    logger.debug('user is not has accsess admin authoriztionMddlewareFactory ');
                    next(new HttpException({
                        message: 'Unauthorized',
                        status: 403,
                        errorCode: 'Unauthorized'
                    }));
                }
            }
            catch (error) {
                next(new HttpException({
                    message: 'Unauthorized',
                    status: 403,
                    errorCode: 'Unauthorized'
                }));
            }
        }
        else {
            next(new HttpException({
                message: 'Unauthorized',
                status: 403,
                errorCode: 'Unauthorized'
            }));
        }
    };
}
export default authoriztionMddlewareFactory;
//# sourceMappingURL=authorization.middleware.js.map