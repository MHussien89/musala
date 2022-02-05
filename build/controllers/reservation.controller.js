import ReservationService from '../services/reservation.service';
import PaymentService from '../services/payemnt.service';
import logger from '../logger/logger';
import { ReservationStatus } from '../interfaces/reservation.interface';
class ReservationController {
    constructor() {
        this.reservationService = new ReservationService();
        this.paymentService = new PaymentService();
        /**
       * filter all reservation and sort and pagination
       * @module reservationModule
       * @function
       * @param {Object} req - Express request object
       * @param {Object} res - Express response object
       * @param {Function} next - Express next middleware function
       * @return {undefined}
       */
        this.filterReservation = async (req, res, next) => {
            const filterReservationSearchDto = req.body;
            try {
                logger.debug('call filterReservation  service ReservationController filterReservation');
                const { reservations, count } = await this.reservationService.filterReservation(filterReservationSearchDto);
                logger.debug('succesfully return from filterReservation ReservationController filterReservation');
                res.status(200).json({ count, data: reservations, message: 'filterReservation' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Create a new property by authenticated user
         * @module propertyModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createReservation = async (req, res, next) => {
            const reservationData = req.body;
            try {
                logger.error(`receive property Data:${JSON.stringify(reservationData)} ReservationController createReservation`);
                logger.debug('call createReservation service ReservationController createReservation');
                const createReservationData = await this.reservationService.createReservation(reservationData, res.locals.user);
                logger.debug('succesfully return from createReservation ReservationController createReservation');
                res.status(201).json({ data: createReservationData, message: 'created' });
            }
            catch (error) {
                logger.debug(JSON.stringify(error, undefined, 2));
                next(error);
            }
        };
        /**
         * update a new Reservation by authenticated user
         * @module reservationModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.updateReservation = async (req, res, next) => {
            const reservationData = req.body;
            const reservationId = req.params.id;
            try {
                logger.debug(`receive Reservation Data:${JSON.stringify(reservationData)} ReservationController updateReservation`);
                logger.debug('call updateReservation service ReservationController updateReservation');
                const updateReservationData = await this.reservationService.updateReservation(reservationId, reservationData, res.locals.user);
                if (reservationData.status == ReservationStatus.CANCELED || reservationData.status == ReservationStatus.CHECKED_OUT) {
                    await this.paymentService.cancelExpiredPayments([reservationId]);
                    await this.reservationService.handleChecInLogic(reservationData.bookingRequestId);
                }
                logger.debug('succesfully return from updateReservation ReservationController updateReservation');
                res.status(200).json({ data: updateReservationData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.checkInGuest = async (req, res, next) => {
            const reservationData = req.body;
            const reservationId = req.params.id;
            try {
                logger.debug(`receive Reservation Data:${JSON.stringify(reservationData)} ReservationController updateReservation`);
                logger.debug('call updateReservation service ReservationController updateReservation');
                const updateReservationData = await this.reservationService.checkInGuest(reservationId, reservationData, res.locals.user);
                if (reservationData.status == ReservationStatus.CANCELED || reservationData.status == ReservationStatus.CHECKED_OUT) {
                    this.paymentService.cancelExpiredPayments([reservationId]);
                }
                logger.debug('succesfully return from updateReservation ReservationController updateReservation');
                res.status(200).json({ data: updateReservationData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * retrive on existing Reservation with authorized user
         * @module reservationModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getOneReservation = async (req, res, next) => {
            const reservationId = req.params.id;
            logger.debug(`receive reservation id:${reservationId} ReservationController getOneReservation`);
            try {
                logger.debug('call findReservationByID service ReservationController getOneReservation');
                const findReservationByID = await this.reservationService.findReservationByID(reservationId);
                logger.debug('succesfully return from findReservationByID ReservationController getOneReservation');
                res.status(200).json({ data: findReservationByID, message: 'getOneReservation' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getReservationPayments = async (req, res, next) => {
            const reservationId = req.params.id;
            logger.debug(`receive reservation id:${reservationId} ReservationController getReservationPayments`);
            try {
                logger.debug('call findReservationByID service ReservationController getReservationPayments');
                const payments = await this.paymentService.findPaymentsByReservationId(reservationId);
                logger.debug('succesfully return from findReservationByID ReservationController getReservationPayments');
                res.status(200).json({ data: payments, message: 'getPayments' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Delete existing Reservation with authorized user
         * @module reservationModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.deleteReservation = async (req, res, next) => {
            const reservationId = req.params.id;
            logger.debug(`receive reservation id:${reservationId} ReservationController deleteReservation`);
            try {
                logger.debug('call deleteReservationData service ReservationController deleteReservation');
                const deleteReservationData = await this.reservationService.deleteReservationData(reservationId);
                logger.debug('succesfully return from deleteReservationData ReservationController deleteReservation');
                res.status(200).json({ data: deleteReservationData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default ReservationController;
//# sourceMappingURL=reservation.controller.js.map