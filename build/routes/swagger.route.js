import { Router } from 'express';
// import swaggerDocument from '../swagger';
import * as specs from '../swagger';
import { serve, setup } from 'swagger-ui-express';
class SwaggerRoute {
    constructor() {
        this.path = '/api-docs';
        this.router = Router();
        // console.log("swaggerUi", swaggerUi);
        this.initializeRoutes();
    }
    initializeRoutes() {
        const options = {
        // explorer: true
        // customCss: '.swagger-ui .topbar { display: none }'
        };
        this.router.use(`${this.path}`, serve);
        this.router.get(`${this.path}`, setup(specs.default, options));
    }
}
export default SwaggerRoute;
//# sourceMappingURL=swagger.route.js.map