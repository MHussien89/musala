import * as multer from 'multer';
import { Router } from 'express';
import UnitTypeController from '../controllers/unitType.controller';
import { CreateUnitTypeDto } from '../dtos/unitType.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import authoriztionMddlewareFactory from '../middlewares/authorization.middleware';
const storage = multer.memoryStorage();
const upload = multer({ storage });
class UnitTypeRoute {
    constructor() {
        this.path = '/unitType';
        this.router = Router();
        this.unitTypeController = new UnitTypeController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateUnitTypeDto), this.unitTypeController.createUnitType);
        // this.router.get(`${this.path}`, this.unitTypeController.getUnitTypes);
        this.router.get(`${this.path}`, this.unitTypeController.getUnitTypeByIds);
        this.router.get(`${this.path}/:id`, this.unitTypeController.getUnitTypeById);
        this.router.get(`${this.path}/:id/property`, this.unitTypeController.getPropertyByUnitTypeId);
        this.router.put(`${this.path}/:id`, authMiddleware, this.unitTypeController.updateUnitType);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.unitTypeController.deleteUnitType);
        this.router.post(`${this.path}/uploadShowRoom`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), upload.single('asset'), this.unitTypeController.uploadShowRoom);
        this.router.post(`${this.path}/deleteShowRoom`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), upload.single('asset'), this.unitTypeController.deleteShowRoom);
        this.router.post(`${this.path}/uploadImage`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), upload.single('asset'), this.unitTypeController.uploadImage);
        this.router.post(`${this.path}/deleteImage`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), upload.single('asset'), this.unitTypeController.deleteImage);
    }
}
export default UnitTypeRoute;
//# sourceMappingURL=unitType.route.js.map