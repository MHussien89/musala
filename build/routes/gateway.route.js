import * as multer from 'multer';
import { Router } from 'express';
import GatewayController from '../controllers/gateway.controller';
import PropertyController from '../controllers/property.controller';
import { CreateGatewayDto } from '../dtos/gateway.dto';
import validationMiddleware from '../middlewares/validation.middleware';
const storage = multer.memoryStorage();
const upload = multer({ storage });
class AreaRoute {
    constructor() {
        this.path = '/gateway';
        this.router = Router();
        this.gatewayController = new GatewayController();
        this.propertyController = new PropertyController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreateGatewayDto), this.gatewayController.addGateway);
        // this.router.get(`${this.path}`, this.areasController.getAreas);
        // this.router.get(`${this.path}/:id`, this.areasController.getAreaById);
        // this.router.get(`${this.path}/:id/properties`, this.propertyController.getAreaProperties);
        // this.router.put(
        //   `${this.path}/:id`,
        //   authMiddleware,
        //   authoriztionMddlewareFactory(['areasFullAccess']),
        //   validationMiddleware(CreateAreaDto, true),
        //   this.areasController.updateArea
        // );
        // this.router.delete(
        //   `${this.path}/:id`,
        //   authMiddleware,
        //   authoriztionMddlewareFactory(['areasFullAccess']),
        //   this.areasController.deleteArea
        // );
        // this.router.post(
        //   `${this.path}/uploadDefaultImage`,
        //   authMiddleware,
        //   authoriztionMddlewareFactory(['propertiesFullAccess','propertiesModifyAccess']),
        //   upload.single('asset'),
        //   this.areasController.uploadDefaultImage
        // );
        // this.router.post(
        //   `${this.path}/uploadSponsoredImage`,
        //   authMiddleware,
        //   authoriztionMddlewareFactory(['propertiesFullAccess','propertiesModifyAccess']),
        //   upload.single('asset'),
        //   this.areasController.uploadSponsoredImage
        // );
    }
}
export default AreaRoute;
//# sourceMappingURL=gateway.route.js.map