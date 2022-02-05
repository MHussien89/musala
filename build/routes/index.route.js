import { Router } from 'express';
import IndexController from '../controllers/index.controller';
class IndexRoute {
    constructor() {
        this.path = '/';
        this.router = Router();
        this.indexController = new IndexController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @swagger
         * /:
         *   get:
         *     summary: This should verify that app is loaded successfully
         *     description: This Api verifies that server is loaded with all modules successfully.
         *     consumes:
         *       — application/json
         *     parameters:
         *     responses:
         *       200:
         *         description: Recieve OK.
         */
        this.router.get(`${this.path}`, this.indexController.index);
    }
}
export default IndexRoute;
//# sourceMappingURL=index.route.js.map