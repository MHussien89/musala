import * as multer from 'multer';
import { Router } from 'express';
import UnitTypeGroupController from '../controllers/unitTypeGroup.controller';
import { CreateUnitTypeGroupDto } from '../dtos/unitTypeGroup.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
const storage = multer.memoryStorage();
const upload = multer({ storage });
class UnitTypeGroupRoute {
    constructor() {
        this.path = '/UnitTypeGroup';
        this.router = Router();
        this.unitTypeGroupController = new UnitTypeGroupController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateUnitTypeGroupDto), this.unitTypeGroupController.createUnitTypeGroup);
        this.router.get(`${this.path}`, this.unitTypeGroupController.getUnitTypeGroups);
        this.router.get(`${this.path}/:id`, this.unitTypeGroupController.getUnitTypeGroupById);
        this.router.put(`${this.path}/:id`, authMiddleware, this.unitTypeGroupController.updateUnitTypeGroup);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.unitTypeGroupController.deleteUnitTypeGroup);
    }
}
export default UnitTypeGroupRoute;
//# sourceMappingURL=unitTypeGroup.route.js.map