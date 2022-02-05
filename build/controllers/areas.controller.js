import AreaService from '../services/area.service';
import logger from '../logger/logger';
class AreasController {
    constructor() {
        this.areaService = new AreaService();
        /**
         * Create a new area by authenticated user
         * @module areaModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createArea = async (req, res, next) => {
            const areaData = req.body;
            try {
                logger.debug(`AreasController ==> createArea with data ${JSON.stringify(areaData, undefined, 2)}`);
                const createAreaData = await this.areaService.createArea(areaData, res.locals.user);
                logger.debug('succesfully return from createArea AreasController createArea');
                res.status(201).json(createAreaData);
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * get all areas
        * @module areaModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.getAreas = async (req, res, next) => {
            try {
                logger.info(`AreasController ==> getAreas`);
                const areasResponse = await this.areaService.findAllAreas();
                logger.error(`AreasController ==> getAreas done successfully with response ${JSON.stringify(areasResponse, undefined, 2)}`);
                res.status(200).json({ data: areasResponse, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Fetch area by ID
        * @module areaModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.getAreaById = async (req, res, next) => {
            const areaId = req.params.id;
            try {
                logger.debug(`AreasController ==> getAreaById for Id: ${areaId}`);
                const findOneArea = await this.areaService.findAreaByIdWrapper(areaId, true);
                logger.debug(`AreasController ==> getAreaById done successfully with response ${JSON.stringify(findOneArea, undefined, 2)}`);
                res.status(200).json({ data: findOneArea, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Update existing area
        * @module areaModule
        * @function
        * @param {Object} req - Express request object with authenticated user
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.updateArea = async (req, res, next) => {
            const areaData = req.body;
            const areaId = req.params.id;
            try {
                logger.debug(`AreasController ==> updateArea with Id: ${areaId} and body ${JSON.stringify(areaData, undefined, 2)}`);
                logger.debug('call updateArea service AreasController updateArea');
                const updateAreaData = await this.areaService.updateArea(areaId, areaData, res.locals.user);
                logger.debug(`AreasController ==> updateArea done successfully with response ${JSON.stringify(updateAreaData, undefined, 2)}`);
                res.status(200).json({ data: updateAreaData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Delete existing area with authorized user
        * @module areaModule
        * @function
        * @param {Object} req - Express request object with authenticated user
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.deleteArea = async (req, res, next) => {
            const areaId = req.params.id;
            try {
                logger.debug(`AreasController ==> deleteArea for Id: ${areaId}`);
                const deleteAreaData = await this.areaService.deleteAreaData(areaId);
                logger.debug(`AreasController ==> deleteArea done successfully with response ${JSON.stringify(deleteAreaData, undefined, 2)}`);
                res.status(200).json({ data: deleteAreaData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadDefaultImage = async (req, res, next) => {
            const areaId = req.body.areaId;
            try {
                logger.debug(`AreasController ==> uploadDefaultImage for Id: ${areaId}`);
                const image = await this.areaService.uploadDefaultImage(req.file, areaId, res.locals.user);
                logger.debug(`AreasController ==> uploadDefaultImage done successfully with response ${JSON.stringify(image, undefined, 2)}`);
                res.status(200).json({ data: image, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadSponsoredImage = async (req, res, next) => {
            const areaId = req.body.areaId;
            try {
                logger.debug(`AreasController ==> uploadSponsoredImage for Id: ${areaId}`);
                const image = await this.areaService.uploadSponsoredImage(req.file, areaId, res.locals.user);
                logger.debug(`AreasController ==> uploadSponsoredImage done successfully with response ${JSON.stringify(image, undefined, 2)}`);
                res.status(200).json({ data: image, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default AreasController;
//# sourceMappingURL=areas.controller.js.map