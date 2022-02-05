import BookingService from '../services/booking.service';
import MessageService from '../services/message.service';
import logger from '../logger/logger';
class BookingController {
    constructor() {
        this.bookingService = new BookingService();
        this.messageService = new MessageService();
        /**
         * Create a new booking request
         * @module bookingModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createBookingRequest = async (req, res, next) => {
            const bookingData = req.body;
            try {
                logger.debug(`receive booking Data:${JSON.stringify(bookingData)} BookingController createBookingRequest`);
                logger.debug('call createBookingRequest service BookingController createBookingRequest');
                const createBookingData = await this.bookingService.createBookingRequest(bookingData);
                logger.debug('succesfully return from createBookingRequest BookingController createBookingRequest');
                res.status(200).json({ data: createBookingData });
            }
            catch (error) {
                next(error);
            }
        };
        /**
       * Verify phone number
       * @module bookingModule
       * @function
       * @param {Object} req - Express request object with authenticated user
       * @param {Object} res - Express response object
       * @param {Function} next - Express next middleware function
       * @return {undefined}
       */
        this.verifyOTP = async (req, res, next) => {
            const verifyData = req.body;
            try {
                logger.debug(`receive booking Data:${JSON.stringify(verifyData)} BookingController verifyOTP`);
                logger.debug('call verifyOTP service BookingController verifyOTP');
                const createBookingData = await this.bookingService.verifyOTP(verifyData);
                logger.debug('succesfully return from verifyOTP BookingController verifyOTP');
                res.status(200).json({ data: createBookingData });
            }
            catch (error) {
                next(error);
            }
        };
        /**
      * Confirm Booking Request
      * @module bookingModule
      * @function
      * @param {Object} req - Express request object with authenticated user
      * @param {Object} res - Express response object
      * @param {Function} next - Express next middleware function
      * @return {undefined}
      */
        this.addPaymentDetailsToRequest = async (req, res, next) => {
            const confirmBookingDto = req.body;
            try {
                logger.debug(`receive booking Data:${JSON.stringify(confirmBookingDto)} BookingController addPaymentDetailsToRequest`);
                logger.debug('call addPaymentDetails service BookingController addPaymentDetailsToRequest');
                const createBookingData = await this.bookingService.addPaymentDetails(confirmBookingDto);
                logger.debug('succesfully return from addPaymentDetails BookingController addPaymentDetailsToRequest');
                res.status(200).json({ data: createBookingData });
            }
            catch (error) {
                next(error);
            }
        };
        /**
      * Finalize Booking Request
      * @module bookingModule
      * @function
      * @param {Object} req - Express request object with authenticated user
      * @param {Object} res - Express response object
      * @param {Function} next - Express next middleware function
      * @return {undefined}
      */
        this.finalizeBookingRequest = async (req, res, next) => {
            const finalizeBookingDto = req.body;
            try {
                logger.debug('call finalizeBookingRequest service BookingController finalizeBookingRequest');
                const createBookingData = await this.bookingService.finalizeBookingRequest(finalizeBookingDto);
                logger.debug('succesfully return from finalizeBookingRequest BookingController finalizeBookingRequest');
                res.status(200).json({ data: createBookingData });
            }
            catch (error) {
                next(error);
            }
        };
        this.getBookingRequest = async (req, res, next) => {
            const requestId = req.params.requestId;
            try {
                logger.debug(`receive booking Data:${JSON.stringify(requestId)} BookingController getBookingRequest`);
                logger.debug('call createBookingRequest service BookingController getBookingRequest');
                const createBookingData = await this.bookingService.getReservationRequest(requestId);
                logger.debug('succesfully return from getReservationRequest BookingController getBookingRequest');
                res.status(200).json({ data: createBookingData });
            }
            catch (error) {
                next(error);
            }
        };
        this.addMessageToBookingRequest = async (req, res, next) => {
            const requestId = req.params.requestId;
            const message = req.body.message;
            try {
                logger.debug(`receive booking Data:${JSON.stringify(requestId)} BookingController getBookingRequest`);
                const messageResponseDto = await this.messageService.addNewMessage(message, res.locals.user);
                let createBookingData = await this.bookingService.getReservationRequest(requestId);
                if (createBookingData.messagesIds)
                    createBookingData.messagesIds.push(messageResponseDto.id);
                else
                    createBookingData.messagesIds = [messageResponseDto.id];
                this.bookingService.updateBookingRequest({
                    messagesIds: createBookingData.messagesIds,
                    requestId: requestId
                });
                createBookingData = await this.bookingService.getReservationRequest(requestId);
                logger.debug('call createBookingRequest service BookingController getBookingRequest');
                logger.debug('succesfully return from getReservationRequest BookingController getBookingRequest');
                res.status(200).json({ data: createBookingData });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteMessageFromBookingRequest = async (req, res, next) => {
            const requestId = req.params.requestId;
            const messageId = req.params.messageId;
            try {
                logger.debug(`receive booking Data:${JSON.stringify(requestId)} BookingController getBookingRequest`);
                const messageResponseDto = await this.messageService.deleteMessage(messageId, res.locals.user);
                const createBookingData = await this.bookingService.getReservationRequest(requestId);
                createBookingData.messagesIds = createBookingData.messagesIds.filter(m => m != messageId);
                this.bookingService.updateBookingRequest({
                    messagesIds: createBookingData.messagesIds,
                    requestId: requestId
                });
                logger.debug('call createBookingRequest service BookingController getBookingRequest');
                logger.debug('succesfully return from getReservationRequest BookingController getBookingRequest');
                res.status(200).json({ data: createBookingData });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllBookingRequests = async (req, res, next) => {
            try {
                logger.debug('call getAllReservations service BookingController getAllBookingRequests');
                const bookingRequests = await this.bookingService.getAllReservations();
                logger.debug('succesfully return from getAllReservations BookingController getAllBookingRequests');
                res.status(200).json({ data: bookingRequests });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default BookingController;
//# sourceMappingURL=booking.controller.js.map