import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const authorizationToken = authHeader && authHeader.split(' ')[1];
    if (authorizationToken) {
        const secret = process.env.JWT_SECRET || 'auth_jwt';
        try {
            const verificationResponse = jwt.verify(authorizationToken, secret);
            res.locals.user = verificationResponse;
            const userId = verificationResponse.userId;
            if (userId) {
                next();
            }
            else {
                next(new HttpException({
                    message: 'Wrong authentication token',
                    status: 401,
                    errorCode: 'Unauthorized'
                }));
            }
        }
        catch (error) {
            next(new HttpException({
                message: 'Wrong authentication token',
                status: 401,
                errorCode: 'Unauthorized'
            }));
        }
    }
    else {
        next(new HttpException({
            message: 'Authentication token missing',
            status: 401,
            errorCode: 'Unauthorized'
        }));
    }
}
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map