import PropertyService from '../services/property.service';
import logger from '../logger/logger';
class PropertyController {
    constructor() {
        this.propertyService = new PropertyService();
        /**
         * Create a new property by authenticated user
         * @module propertyModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createProperty = async (req, res, next) => {
            const propertyData = req.body;
            try {
                logger.debug(`receive property Data:${JSON.stringify(propertyData)} PropertyController createProperty`);
                logger.debug('call createProperty service PropertyController createProperty');
                const createPropertyData = await this.propertyService.createProperty(propertyData, res.locals.user);
                logger.debug('succesfully return from createProperty PropertyController createProperty');
                res.status(201).json({ data: createPropertyData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
       * get all properties and aslo contains query params object that user can use it in search and pagination
       * @module propertyModule
       * @function
       * @param {Object} req - Express request object
       * @param {Object} res - Express response object
       * @param {Function} next - Express next middleware function
       * @return {undefined}
       */
        this.getProperties = async (req, res, next) => {
            try {
                const getPropertiesData = req.body;
                if (req.body.offset && req.body.limit) {
                    logger.debug(`receive get all properties pagination params page:${getPropertiesData.offset} limit:${getPropertiesData.limit} PropertyController getProperties`);
                }
                if (getPropertiesData.query && getPropertiesData.query.areaName) {
                    logger.debug(`receive properties of area name :${getPropertiesData.query.areaName} PropertyController getProperties`);
                }
                logger.debug('call findAllProperties from service PropertyController getProperties');
                const { properties, count } = await this.propertyService.findAllProperties(getPropertiesData);
                logger.debug('succesfully return from findAllProperties PropertyController getProperties');
                res.status(200).json({ count, data: properties, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAreaProperties = async (req, res, next) => {
            try {
                const areaId = req.params.id;
                logger.debug('call findAllProperties from service PropertyController getProperties');
                const { properties } = await this.propertyService.findPropertiesByAreaId(areaId);
                logger.debug('succesfully return from findAllProperties PropertyController getProperties');
                res.status(200).json({ data: properties, message: 'findAreaProperties' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Fetch property by ID
         * @module propertyModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getPropertyById = async (req, res, next) => {
            const propertyId = req.params.id;
            logger.debug(`receive property id:${propertyId} PropertyController getPropertyById`);
            try {
                logger.debug('call findPropertyById  service PropertyController getPropertyById');
                const findOneProperty = await this.propertyService.findPropertyByIdWrapper(propertyId);
                logger.debug('succesfully return from findPropertyById PropertyController getPropertyById');
                res.status(200).json({ data: findOneProperty, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Update existing property
         * @module propertyModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.updateProperty = async (req, res, next) => {
            const propertyData = req.body;
            const propertyId = req.params.id;
            try {
                logger.debug(`receive property Data:${JSON.stringify(propertyData)} PropertyController updateProperty`);
                logger.debug('call updateProperty service PropertyController updateProperty');
                const updatePropertyData = await this.propertyService.updateProperty(propertyId, propertyData, res.locals.user);
                logger.debug('succesfully return from updateProperty PropertyController updateProperty');
                res.status(200).json({ data: updatePropertyData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Delete existing property with authorized user
         * @module propertyModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.deleteProperty = async (req, res, next) => {
            const propertyId = req.params.id;
            logger.debug(`receive property id:${propertyId} PropertyController deleteProperty`);
            try {
                logger.debug('call deletePropertyData service PropertyController deleteProperty');
                const deletePropertyData = await this.propertyService.deletePropertyData(propertyId, res.locals.user);
                logger.debug('succesfully return from deletePropertyData PropertyController deleteProperty');
                res.status(200).json({ data: deletePropertyData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadImage = async (req, res, next) => {
            const propertyId = req.body.propertyId;
            logger.debug(`receive image for propertyId: ${propertyId} PropertyController uploadImage`);
            try {
                logger.debug('call uploadImage service PropertyController uploadImage');
                const image = await this.propertyService.uploadImage(req.file, propertyId, res.locals.user);
                logger.debug('succesfully return from uploadImage PropertyController uploadImage');
                res.status(200).json({ data: image, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadCover = async (req, res, next) => {
            const propertyId = req.body.propertyId;
            const coverSize = req.body.size;
            logger.debug(`receive image for propertyId: ${propertyId} PropertyController uploadCover`);
            try {
                logger.debug('call uploadCover service PropertyController uploadCover');
                const image = await this.propertyService.uploadCover(req.file, propertyId, coverSize, res.locals.user);
                logger.debug('succesfully return from uploadCover PropertyController uploadCover');
                res.status(200).json({ data: image, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default PropertyController;
//# sourceMappingURL=property.controller.js.map