import { Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import authoriztionMddlewareFactory from '../middlewares/authorization.middleware';
import PermissionsController from '../controllers/permissions.controller';
import { PermissionsDto } from '../dtos/permissions.dto';
class PermissionsRoute {
    constructor() {
        this.path = '/permissions';
        this.router = Router();
        this.permissionsController = new PermissionsController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @swagger
         *  components:
         *    schemas:
         *      permissions:
         *        type: object
         *        required:
         *          - role
         *          - permissions
         *        properties:
         *          role:
         *            type: string
         *            description: user role
         *          permissions:
         *            type: array
         *            description: permissions of the role
         *        example:
         *           role: "admin"
         *           permissions: ["surveyFullAccess", "campaignFullAccess", "promptFullAccess", "usersFullAccess", "responseFullAccess"]
         */
        /**
         * @swagger
         * tags:
         *   name: permissions
         *   description: permissions management
         */
        this.router.get(`${this.path}`, authMiddleware, authoriztionMddlewareFactory(['permissionsFullAccess']), this.permissionsController.getPermissions);
        this.router.get(`${this.path}/:id`, this.permissionsController.getPermissionsById);
        /**
         * @swagger
         * path:
         *  /permissions:
         *    post:
         *      summary: used for roles and permissions
         *      tags: [permissions]
         *      security:
         *        - bearerAuth: []
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/permissions'
         *      responses:
         *        "200":
         *          description: used for roles and permissions
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/permissions'
         */
        this.router.post(`${this.path}`, authMiddleware, authoriztionMddlewareFactory(['permissionsFullAccess']), validationMiddleware(PermissionsDto), this.permissionsController.createPermission);
        this.router.put(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['permissionsFullAccess']), validationMiddleware(PermissionsDto, true), this.permissionsController.updatePermission);
        this.router.delete(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['permissionsFullAccess']), this.permissionsController.deletePermission);
    }
}
export default PermissionsRoute;
//# sourceMappingURL=permissions.route.js.map