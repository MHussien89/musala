import UnitTypeGroupService from '../services/unitTypeGroup.service';
import logger from '../logger/logger';
class UnitTypeGroupController {
    constructor() {
        this.unitTypeGroupService = new UnitTypeGroupService();
        /**
         * Create a new unitType by authenticated user
         * @module unitTypeGroupModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createUnitTypeGroup = async (req, res, next) => {
            const unitTypeGroupData = req.body;
            try {
                logger.debug(`receive unit type Data:${JSON.stringify(unitTypeGroupData)} UnitTypeGroupController createUnitTypeGroup`);
                logger.debug('call createUnitTypeGroup service UnitTypeGroupController createUnitType');
                const createUnitTypeData = await this.unitTypeGroupService.createUnitTypeGroup(unitTypeGroupData, res.locals.user);
                logger.debug('succesfully return from createUnitTypeGroup UnitTypeGroupController createUnitTypeGroup');
                res.status(201).json(createUnitTypeData);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * get all unitTypeGroups
         * @module unitTypeGroupModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getUnitTypeGroups = async (req, res, next) => {
            try {
                logger.debug('call findAllUnitTypeGroups from service UnitTypeController getUnitTypeGroups');
                const unitTypeGroupResponse = await this.unitTypeGroupService.findAllUnitTypeGroups();
                logger.debug(`successfully return from findAllUnitTypeGroups UnitTypeController getUnitTypeGroups ${unitTypeGroupResponse}`);
                res.status(200).json({ data: unitTypeGroupResponse, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Fetch unit type Group by ID
         * @module unitTypeGroupModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getUnitTypeGroupById = async (req, res, next) => {
            const unitTypeGroupId = req.params.id;
            logger.debug(`receive unit type group id:${unitTypeGroupId} UnitTypeGroupController getUnitTypeGroupById`);
            try {
                logger.debug('call findUnitTypeGroupByIdWrapper  service UnitTypeGroupController getUnitTypeGroupById');
                const findOneUnitTypeGroup = await this.unitTypeGroupService.findUnitTypeGroupByIdWrapper(unitTypeGroupId);
                logger.debug('succesfully return from findUnitTypeByIdWrapper UnitTypeController getUnitTypeById');
                res.status(200).json({ data: findOneUnitTypeGroup, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Update existing unit type group
         * @module unitTypeGroupModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.updateUnitTypeGroup = async (req, res, next) => {
            const unitTypeGroupData = req.body;
            const unitTypeGroupId = req.params.id;
            try {
                logger.debug(`receive unit type group Data:${JSON.stringify(unitTypeGroupData)} UnitTypeGroupController updateUnitTypeGroup`);
                logger.debug('call updateUnitTypeGroup service UnitTypeGroupController updateUnitTypeGroup');
                const updateUnitTypeGroupData = await this.unitTypeGroupService.updateUnitTypeGroup(unitTypeGroupId, unitTypeGroupData, res.locals.user);
                logger.debug('succesfully return from updateUnitType UnitTypeController updateUnitType');
                res.status(200).json({ data: updateUnitTypeGroupData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Delete existing unit type group with authorized user
         * @module unitTypeGroupModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.deleteUnitTypeGroup = async (req, res, next) => {
            const unitTypeGroupId = req.params.id;
            logger.debug(`receive unit type id:${unitTypeGroupId} UnitTypeGroupController deleteUnitTypeGroup`);
            try {
                logger.debug('call deleteUnitTypeGroup service UnitTypeGroupController deleteUnitTypeGroup');
                const deleteUnitTypeGroupData = await this.unitTypeGroupService.deleteUnitTypeGroupData(unitTypeGroupId);
                logger.debug('succesfully return from deleteUnitTypeGroupData UnitTypeGroupController deleteUnitTypeGroup');
                res.status(200).json({ data: deleteUnitTypeGroupData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default UnitTypeGroupController;
//# sourceMappingURL=unitTypeGroup.controller.js.map