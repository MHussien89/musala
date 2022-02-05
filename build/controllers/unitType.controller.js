import UnitTypeService from '../services/unitType.service';
import logger from '../logger/logger';
import PropertyService from '../services/property.service';
class UnitTypeController {
    constructor() {
        this.unitTypeService = new UnitTypeService();
        this.propertyService = new PropertyService();
        /**
         * Create a new unitType by authenticated user
         * @module unitTypeModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createUnitType = async (req, res, next) => {
            const unitTypeData = req.body;
            try {
                logger.debug(`receive unit type Data:${JSON.stringify(unitTypeData)} UnitTypeController createUnitType`);
                logger.debug('call createUnitType service UnitTypeController createUnitType');
                const createUnitTypeData = await this.unitTypeService.createUnitType(unitTypeData, res.locals.user);
                logger.debug('succesfully return from createUnitType UnitTypeController createUnitType');
                res.status(201).json(createUnitTypeData);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * get all unitTypes
         * @module unitTypeModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getUnitTypes = async (req, res, next) => {
            try {
                logger.debug('call findAllUnitTypes from service UnitTypeController getUnitTypes');
                const unitTypeResponse = await this.unitTypeService.findAllUnitTypes();
                logger.debug(`successfully return from findAllUnitTypes UnitTypeController getUnitTypes ${unitTypeResponse}`);
                res.status(200).json({ data: unitTypeResponse, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Fetch unit type by ID
         * @module unitTypeModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getUnitTypeById = async (req, res, next) => {
            const unitTypeId = req.params.id;
            logger.debug(`receive unit type id:${unitTypeId} UnitTypeController getUnitTypeById`);
            try {
                logger.debug('call findUnitTypeByIdWrapper  service UnitTypeController getUnitTypeById');
                const findOneUnitType = await this.unitTypeService.findUnitTypeByIdWrapper(Number(unitTypeId));
                logger.debug('succesfully return from findUnitTypeByIdWrapper UnitTypeController getUnitTypeById');
                res.status(200).json({ data: findOneUnitType, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUnitTypeByIds = async (req, res, next) => {
            const unitTypeId = req.query.ids;
            const isFeatured = req.query.isFeatured;
            logger.debug(`receive unit type id:${unitTypeId} UnitTypeController getUnitTypeById`);
            try {
                if (unitTypeId || isFeatured != '') {
                    logger.debug('call findUnitTypeByIdWrapper  service UnitTypeController getUnitTypeById');
                    const findOneUnitTypes = await this.unitTypeService.findUnitTypeByIds(unitTypeId && unitTypeId.split(','), isFeatured);
                    logger.debug('succesfully return from findUnitTypeByIdWrapper UnitTypeController getUnitTypeById');
                    res.status(200).json({ data: findOneUnitTypes, message: 'findAll' });
                }
                else {
                    logger.debug('call findAllUnitTypes from service UnitTypeController getUnitTypes');
                    const unitTypeResponse = await this.unitTypeService.findAllUnitTypes();
                    logger.debug(`successfully return from findAllUnitTypes UnitTypeController getUnitTypes ${unitTypeResponse.length}`);
                    res.status(200).json({ data: unitTypeResponse, message: 'findAll' });
                }
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Update existing unit type
         * @module unitTypeModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.updateUnitType = async (req, res, next) => {
            const unitTypeData = req.body;
            const unitTypeId = req.params.id;
            try {
                logger.debug(`receive unit type Data:${JSON.stringify(unitTypeData)} UnitTypeController updateUnitType`);
                logger.debug('call updateUnitType service UnitTypeController updateUnitType');
                const updateUnitTypeData = await this.unitTypeService.updateUnitType(Number(unitTypeId), unitTypeData, res.locals.user);
                logger.debug('succesfully return from updateUnitType UnitTypeController updateUnitType');
                res.status(200).json({ status: true, data: updateUnitTypeData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Delete existing unit type with authorized user
         * @module unitTypeModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.deleteUnitType = async (req, res, next) => {
            const unitTypeId = req.params.id;
            logger.debug(`receive unit type id:${unitTypeId} UnitTypeController deleteUnitType`);
            try {
                logger.debug('call deleteUnitType service UnitTypeController deleteUnitType');
                const deleteUnitTypeData = await this.unitTypeService.deleteUnitTypeData(unitTypeId, res.locals.user);
                logger.debug('succesfully return from deleteUnitTypeData UnitTypeController deleteUnitType');
                res.status(200).json({ data: deleteUnitTypeData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getPropertyByUnitTypeId = async (req, res, next) => {
            const unitTypeId = req.params.id;
            logger.debug(`receive property id:${unitTypeId} UnitTypeController getPropertyByUnitTypeId`);
            try {
                logger.debug('call findPropertyByIUnitTypeId  service UnitTypeController getPropertyByUnitTypeId');
                const findOneProperty = await this.propertyService.findPropertyByIUnitTypeId(unitTypeId);
                logger.debug('succesfully return from findPropertyByIUnitTypeId UnitTypeController getPropertyByUnitTypeId');
                res.status(200).json({ data: findOneProperty, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadShowRoom = async (req, res, next) => {
            const unitTypeId = req.body.unitTypeId;
            const roomName = req.body.roomName;
            logger.debug(`receive image for unitTypeId: ${unitTypeId} UnitTypeController uploadShowRoomImage`);
            try {
                logger.debug('call uploadShowRoomImage service UnitTypeController uploadShowRoomImage');
                const image = await this.unitTypeService.uploadShowRoomImage(req.file, Number(unitTypeId), roomName, res.locals.user);
                logger.debug('succesfully return from uploadShowRoomImage UnitTypeController uploadShowRoomImage');
                res.status(200).json({ data: image, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteShowRoom = async (req, res, next) => {
            const unitTypeId = req.body.unitTypeId;
            const roomId = req.body.roomId;
            const imageId = req.body.imageId;
            logger.debug(`delete image for unitTypeId: ${unitTypeId} UnitTypeController deleteShowRoom`);
            try {
                logger.debug('call deleteShowRoom service UnitTypeController deleteShowRoom');
                const image = await this.unitTypeService.deleteShowRoom(Number(unitTypeId), roomId, imageId, res.locals.user);
                logger.debug('succesfully return from deleteShowRoom UnitTypeController deleteShowRoom');
                res.status(200).json({ data: image, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadImage = async (req, res, next) => {
            const unitTypeId = req.body.unitTypeId;
            logger.debug(`receive image for unitTypeId: ${unitTypeId} UnitTypeController uploadImage`);
            try {
                logger.debug('call uploadImage service UnitTypeController uploadImage');
                const image = await this.unitTypeService.uploadImage(req.file, Number(unitTypeId), res.locals.user);
                logger.debug('succesfully return from uploadImage UnitTypeController uploadImage');
                res.status(200).json({ data: image, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteImage = async (req, res, next) => {
            const unitTypeId = req.body.unitTypeId;
            const imageId = req.body.imageId;
            logger.debug(`delete image for unitTypeId: ${unitTypeId} UnitTypeController deleteImage`);
            try {
                logger.debug('call deleteImage service UnitTypeController deleteImage');
                const image = await this.unitTypeService.deleteImage(Number(unitTypeId), imageId, res.locals.user);
                logger.debug('succesfully return from deleteImage UnitTypeController deleteImage');
                res.status(200).json({ data: image, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default UnitTypeController;
//# sourceMappingURL=unitType.controller.js.map