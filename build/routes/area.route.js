import * as multer from 'multer';
import { Router } from 'express';
import AreasController from '../controllers/areas.controller';
import PropertyController from '../controllers/property.controller';
import { CreateAreaDto } from '../dtos/area.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import authoriztionMddlewareFactory from '../middlewares/authorization.middleware';
const storage = multer.memoryStorage();
const upload = multer({ storage });
class AreaRoute {
    constructor() {
        this.path = '/area';
        this.router = Router();
        this.areasController = new AreasController();
        this.propertyController = new PropertyController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, authoriztionMddlewareFactory(['areasFullAccess']), validationMiddleware(CreateAreaDto), this.areasController.createArea);
        this.router.get(`${this.path}`, this.areasController.getAreas);
        this.router.get(`${this.path}/:id`, this.areasController.getAreaById);
        this.router.get(`${this.path}/:id/properties`, this.propertyController.getAreaProperties);
        this.router.put(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['areasFullAccess']), validationMiddleware(CreateAreaDto, true), this.areasController.updateArea);
        this.router.delete(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['areasFullAccess']), this.areasController.deleteArea);
        this.router.post(`${this.path}/uploadDefaultImage`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), upload.single('asset'), this.areasController.uploadDefaultImage);
        this.router.post(`${this.path}/uploadSponsoredImage`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), upload.single('asset'), this.areasController.uploadSponsoredImage);
    }
}
export default AreaRoute;
//# sourceMappingURL=area.route.js.map