import AmenityService from '../services/amenity.service';
import logger from '../logger/logger';
class AmenityController {
    constructor() {
        this.amenityService = new AmenityService();
        /**
         * Create a new amenity by authenticated user
         * @module amenityModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createAmenity = async (req, res, next) => {
            const amenityData = req.body;
            try {
                logger.debug(`receive amenity Data:${JSON.stringify(amenityData)} AmenityController createAmenity`);
                logger.debug('call createAmenity service AmenityController createAmenity');
                const createAmenityData = await this.amenityService.createAmenity(amenityData, res.locals.user);
                logger.debug('succesfully return from createAmenity AmenityController createAmenity');
                res.status(201).json(createAmenityData);
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * get all amenities
        * @module amenityModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.getAmenities = async (req, res, next) => {
            try {
                logger.debug('call findAllAmenities from service AmenityController getAmenities');
                const amenitiesResponse = await this.amenityService.findAllAmenities();
                logger.debug('succesfully return from findAllAmenities AmenitiesController getAmenities');
                res.status(200).json({ status: true, data: amenitiesResponse, count: amenitiesResponse.length, total: amenitiesResponse.length });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Fetch amenity by ID
        * @module amenityModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.getAmenityById = async (req, res, next) => {
            const amenityId = req.params.id;
            logger.debug(`receive amenity id:${amenityId} AmenityController getAmenityById`);
            try {
                logger.debug('call findAmenityById  service AmenityController getAmenityById');
                const findOneAmenity = await this.amenityService.findAmenityByIdWrapper(amenityId);
                logger.debug('succesfully return from findAmenityById AmenityController getAmenityById');
                res.status(200).json({ data: findOneAmenity, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Update existing amenity
        * @module amenityModule
        * @function
        * @param {Object} req - Express request object with authenticated user
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.updateAmenity = async (req, res, next) => {
            const amenityData = req.body;
            const amenityId = req.params.id;
            try {
                logger.debug(`receive amenity Data:${JSON.stringify(amenityData)} AmenityController updateAmenity`);
                logger.debug('call updateAmenity service AmenityController updateAmenity');
                const updateAmenityData = await this.amenityService.updateAmenity(amenityId, amenityData, res.locals.user);
                logger.debug('succesfully return from updateAmenity AmenityController updateAmenity');
                res.status(200).json({ data: updateAmenityData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Delete existing amenity with authorized user
        * @module amenityModule
        * @function
        * @param {Object} req - Express request object with authenticated user
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.deleteAmenity = async (req, res, next) => {
            const amenityId = req.params.id;
            logger.debug(`receive amenity id:${amenityId} AmenityController deleteAmenity`);
            try {
                logger.debug('call deleteAmenityData service AmenityController deleteAmenity');
                const deleteAmenityData = await this.amenityService.deleteAmenityData(amenityId);
                logger.debug('succesfully return from deleteAmenityData AmenityController deleteAmenity');
                res.status(200).json({ data: deleteAmenityData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadImage = async (req, res, next) => {
            const amenityId = req.body.amenityId;
            logger.debug(`receive image for propertyId: ${amenityId} AmenityController uploadImage`);
            try {
                logger.debug('call uploadImage service AmenityController uploadImage');
                const image = await this.amenityService.uploadImage(req.file, amenityId, res.locals.user);
                logger.debug('succesfully return from uploadImage AmenityController uploadImage');
                res.status(200).json({ data: image, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default AmenityController;
//# sourceMappingURL=amenity.controller.js.map