import PaymentService from '../services/payemnt.service';
import logger from '../logger/logger';
class PaymentsController {
    constructor() {
        this.paymentService = new PaymentService();
        /**
         * Create a new payment
         * @module paymentModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createPayment = async (req, res, next) => {
            const paymentData = req.body;
            try {
                logger.debug(`receive payment Data:${JSON.stringify(paymentData)} PaymentsController createPayment`);
                logger.debug('call createPayment service PaymentsController createPayment');
                const dataStoredInToken = res.locals && res.locals.user;
                const createPaymentData = await this.paymentService.createPayment(paymentData, dataStoredInToken);
                logger.debug('succesfully return from createPayment PaymentsController createPayment');
                res.status(201).json(createPaymentData);
            }
            catch (error) {
                next(error);
            }
        };
        /**
       * Create a new paymentAttempt
       * @module paymentModule
       * @function
       * @param {Object} req - Express request object
       * @param {Object} res - Express response object
       * @param {Function} next - Express next middleware function
       * @return {undefined}
       */
        this.createPaymentAttempet = async (req, res, next) => {
            const paymentAttempt = req.body;
            const paymentId = req.params.id;
            try {
                logger.debug(`receive payment Data:${JSON.stringify(paymentAttempt)} PaymentsController createPaymentAttempet`);
                logger.debug('call createPayment service PaymentsController createPayment');
                const createPaymentAttemptData = await this.paymentService.createPaymentAttempts(Number(paymentId), paymentAttempt, res.locals.user);
                logger.debug('succesfully return from createPayment PaymentsController createPaymentAttempet');
                res.status(201).json(createPaymentAttemptData);
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * get all payments
        * @module paymentModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.getPayments = async (req, res, next) => {
            try {
                logger.debug('call findAllPayments from service PaymentsController getPayments');
                const paymentsResponse = await this.paymentService.findAllPayments();
                logger.debug('succesfully return from findAllPayments PaymentsController getPayments');
                res.status(200).json({ data: paymentsResponse, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Fetch payment by ID
        * @module paymentModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.getPaymentById = async (req, res, next) => {
            const paymentId = req.params.id;
            logger.debug(`receive payment id:${paymentId} PaymentsController getPaymentById`);
            try {
                logger.debug('call findPaymentById  service PaymentsController getPaymentById');
                const findOnePayment = await this.paymentService.findPaymentByID(Number(paymentId));
                logger.debug('succesfully return from findPaymentById PaymentsController getPaymentById');
                res.status(200).json({ data: findOnePayment, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Update existing payment
        * @module paymentModule
        * @function
        * @param {Object} req - Express request object with authenticated user
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.updatePayment = async (req, res, next) => {
            const paymentData = req.body;
            const paymentId = req.params.id;
            try {
                logger.debug(`receive payment Data:${JSON.stringify(paymentData)} PaymentsController updatePayment`);
                logger.debug('call updatePayment service PaymentsController updatePayment');
                const updatePaymentData = await this.paymentService.updatePayment(Number(paymentId), paymentData, res.locals.user);
                logger.debug('succesfully return from updatePayment PaymentsController updatePayment');
                res.status(200).json({ data: updatePaymentData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
        * Delete existing payment with authorized user
        * @module paymentModule
        * @function
        * @param {Object} req - Express request object with authenticated user
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.deletePayment = async (req, res, next) => {
            const paymentId = req.params.id;
            logger.debug(`receive payment id:${paymentId} PaymentsController deletePayment`);
            try {
                logger.debug('call deletePaymentData service PaymentsController deletePayment');
                const deletePaymentData = await this.paymentService.deletePaymentData(Number(paymentId), res.locals.user);
                logger.debug('succesfully return from deletePaymentData PaymentsController deletePayment');
                res.status(200).json({ data: deletePaymentData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadReceipt = async (req, res, next) => {
            const paymentId = req.body.paymentId;
            const reservationId = req.body.reservationId;
            logger.debug(`receive receipt for paymentId: ${paymentId} PaymentsController uploadReceipt`);
            try {
                logger.debug('call uploadReceipt service PaymentsController uploadReceipt');
                const receipt = await this.paymentService.uploadReceipt(req.file, Number(paymentId), reservationId, res.locals.user);
                logger.debug('succesfully return from uploadDocument PaymentsController uploadReceipt');
                res.status(200).json({ data: receipt, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getMonthyRevenue = async (req, res, next) => {
            try {
                let revenue;
                if (req.query.months) {
                    const months = req.query.months;
                    revenue = await this.paymentService.getMonthyRevenue(Number(months));
                }
                else {
                    revenue = await this.paymentService.getMonthyRevenue(5);
                }
                logger.debug('call getMonthyRevenue service PaymentsController getMonthyRevenue');
                res.status(200).json({ data: revenue, message: 'success' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default PaymentsController;
//# sourceMappingURL=payment.controller.js.map