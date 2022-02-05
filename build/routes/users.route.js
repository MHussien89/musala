import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import authoriztionMddlewareFactory from '../middlewares/authorization.middleware';
class UsersRoute {
    constructor() {
        this.path = '/users';
        this.router = Router();
        this.usersController = new UsersController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @swagger
         * /users:
         *   get:
         *     summary: This should retreive all users.
         *     description: This is where you can give some background as to why this route is being created or perhaps reference a ticket number.
         *     consumes:
         *       — application/json
         *     parameters:
         *       — name: body
         *       in: body
         *       schema:
         *         type: object
         *         properties:
         *           flavor:
         *           type: string
         *     responses:
         *       200:
         *         description: Receive back flavor and flavor Id.
         */
        this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:id`, this.usersController.getUserById);
        this.router.post(`${this.path}`, authMiddleware, authoriztionMddlewareFactory(['usersFullAccess']), this.usersController.createUser);
        this.router.put(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['usersFullAccess']), validationMiddleware(CreateUserDto, true), this.usersController.updateUser);
        this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
    }
}
export default UsersRoute;
//# sourceMappingURL=users.route.js.map