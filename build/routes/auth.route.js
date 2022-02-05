import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { LoginUserDto, RegisterUserDto, ForgotPasswordDto, ChangePasswordDto } from '../dtos/users.dto';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
class AuthRoute {
    constructor() {
        this.path = '/auth';
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @swagger
         *  components:
         *    schemas:
         *      user:
         *        type: object
         *        required:
         *          - password
         *          - email
         *        properties:
         *          email:
         *            type: string
         *            description: email of the user
         *          password:
         *            type: string
         *            description: password of the user
         *        example:
         *           email: "user@birdnestlife.com"
         *           passsword: "*******"
         */
        /**
         * @swagger
         * tags:
         *   name: auth
         *   description: auth management
         */
        this.router.post(`${this.path}/register`, validationMiddleware(RegisterUserDto), this.authController.register);
        /**
         * @swagger
         * path:
         *  /auth/login:
         *    post:
         *      summary: used for login
         *      tags: [auth]
         *      security:
         *        - bearerAuth: []
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/user'
         *      responses:
         *        "200":
         *          description: A auth user schema
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/user'
         */
        this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto), this.authController.logIn);
        this.router.post(`${this.path}/forgotPassword`, validationMiddleware(ForgotPasswordDto), this.authController.forgotPassword);
        this.router.post(`${this.path}/changePassword`, validationMiddleware(ChangePasswordDto), this.authController.changePassword);
        this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
        this.router.get(`${this.path}/verifyToken`, this.authController.verifyToken);
    }
}
export default AuthRoute;
//# sourceMappingURL=auth.route.js.map