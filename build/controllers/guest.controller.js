import GuestService from '../services/guest.service';
import logger from '../logger/logger';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
class GuestsController {
    constructor() {
        this.guestService = new GuestService();
        this.guestErrors = errorConfig.GUEST_MODULE;
        /**
         * Create a new guest
         * @module guestModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createGuest = async (req, res, next) => {
            const guestData = req.body;
            try {
                logger.debug(`receive guest Data:${JSON.stringify(guestData)} GuestsController createGuest`);
                logger.debug('call createGuest service GuestsController createGuest');
                const dataStoredInToken = res.locals && res.locals.user;
                const createGuestData = await this.guestService.createGuest(guestData, dataStoredInToken);
                logger.debug('succesfully return from createGuest GuestsController createGuest');
                res.status(201).json(createGuestData);
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * get all guests
        * @module guestModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.getGuests = async (req, res, next) => {
            try {
                logger.debug('call findAllGuests from service GuestsController getGuests');
                const guestsResponse = await this.guestService.findAllGuests();
                logger.debug('succesfully return from findAllGuests GuestsController getGuests');
                res.status(200).json({ data: guestsResponse, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Fetch guest by ID
        * @module guestModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.getGuestById = async (req, res, next) => {
            const guestId = req.params.id;
            logger.debug(`receive guest id:${guestId} GuestsController getGuestById`);
            try {
                logger.debug('call findGuestById  service GuestsController getGuestById');
                const findOneGuest = await this.guestService.findGuestByID(guestId);
                logger.debug('succesfully return from findGuestById GuestsController getGuestById');
                res.status(200).json({ data: findOneGuest, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
      * Fetch guest by IDs
      * @module guestModule
      * @function
      * @param {Object} req - Express request object
      * @param {Object} res - Express response object
      * @param {Function} next - Express next middleware function
      * @return {undefined}
      */
        this.getGuestByIds = async (req, res, next) => {
            const guestIds = req.body.ids;
            logger.debug(`receive guest ids:${guestIds} GuestsController getGuestByIds`);
            try {
                logger.debug('call findGuestsByIds  service GuestsController getGuestByIds');
                const findGuests = await this.guestService.findGuestsByIDs(guestIds);
                logger.debug('succesfully return from findGuestById GuestsController getGuestById');
                res.status(200).json({ data: findGuests, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Update existing guest
        * @module guestModule
        * @function
        * @param {Object} req - Express request object with authenticated user
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.updateGuest = async (req, res, next) => {
            const guestData = req.body;
            const guestId = req.params.id;
            try {
                logger.debug(`receive guest Data:${JSON.stringify(guestData)} GuestsController updateGuest`);
                logger.debug('call updateGuest service GuestsController updateGuest');
                const dataStoredInToken = res.locals && res.locals.user;
                const updateGuestData = await this.guestService.updateGuest(guestId, guestData, dataStoredInToken);
                logger.debug('succesfully return from updateGuest GuestsController updateGuest');
                res.status(200).json({ data: updateGuestData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Delete existing guest with authorized user
        * @module guestModule
        * @function
        * @param {Object} req - Express request object with authenticated user
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.deleteGuest = async (req, res, next) => {
            const guestId = req.params.id;
            logger.debug(`receive guest id:${guestId} GuestsController deleteGuest`);
            try {
                logger.debug('call deleteGuestData service GuestsController deleteGuest');
                const deleteGuestData = await this.guestService.deleteGuestData(guestId);
                logger.debug('succesfully return from deleteGuestData GuestsController deleteGuest');
                res.status(200).json({ data: deleteGuestData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadDocument = async (req, res, next) => {
            const guestId = req.body.guestId;
            const token = req.body.token;
            const reservationId = req.body.reservationId;
            try {
                if (!token || !guestId || !reservationId)
                    throw new HttpException(this.guestErrors.UPLOAD_DOCUMENT.INVAlID_DATA);
                const guestDocumentType = req.body.documentType;
                logger.debug(`receive documnet for guestId: ${guestId} GuestsController uploadDocument`);
                logger.debug('call uploadDocument service GuestsController uploadDocument');
                const document = await this.guestService.uploadDocument(req.file, guestId, Number(reservationId), guestDocumentType, Number(token));
                logger.debug('succesfully return from uploadDocument GuestsController uploadDocument');
                res.status(200).json({ data: document, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default GuestsController;
//# sourceMappingURL=guest.controller.js.map