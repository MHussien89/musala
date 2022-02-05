import { PaymentStatus } from '../interfaces/payment.interface';
import paymentModel from '../models/payment.model';
import reservationActivityModel from '../models/reservationActivity.model';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import AttachmentService from './attachment.service';
import { v4 as uuid } from 'uuid';
import { ReservationActivityType } from '../interfaces/reservation.interface';
import { sendPaymentConfirmationEmail } from './email.service';
import bookingModel from '../models/booking.model';
import contactModel from '../models/contacts.model';
class PaymentService {
    constructor() {
        this.payment = paymentModel;
        this.reservationActivity = reservationActivityModel;
        this.paymentErrors = errorConfig.PAYMENT_MODULE;
        this.attachmentService = new AttachmentService();
        this.booking = bookingModel;
        this.contacts = contactModel;
    }
    /**
     * create a new payment
     * @module paymentModule
     * @function createPayment
     * @param  {object} paymentData - the data of newly created payment
     * @return {Promise<Payment>}
     */
    async createPayment(paymentData, dataStoredInToken) {
        if (isEmptyObject(paymentData)) {
            throw new HttpException(this.paymentErrors.CREATE_PAYMENT.INVAlID_DATA);
        }
        logger.debug(`try to create  new payment  PaymentService createPayment`);
        const createPaymentData = await this.payment.create(Object.assign(Object.assign({}, paymentData), { paymentItems: paymentData.document, username: (dataStoredInToken && dataStoredInToken.email) || 'guest', userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest' }));
        await this.reservationActivity.create({
            reservationId: paymentData.reservationId,
            action: ReservationActivityType.CREATE_PAYMENT,
            status: 'success',
            username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
            userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
        });
        logger.debug(`succesfully  create  payment PaymentService createPayment`);
        return createPaymentData;
    }
    /**
     * update a new payment
     * @module paymentModule
     * @function updatePayment
     * @param  {object} paymentData - the data of newly updated payment
     * @return {Promise<Payment>}
     */
    async updatePayment(paymentId, paymentData, dataStoredInToken) {
        if (isEmptyObject(paymentData)) {
            throw new HttpException(this.paymentErrors.UPDATE_PAYMENT.INVAlID_DATA);
        }
        logger.debug(`try to update  payment  with id: ${paymentId}  PaymentService updatePayment`);
        const updatePaymentById = await this.payment.findOneAndUpdate({ id: paymentId }, Object.assign(Object.assign({}, paymentData), { updatedAt: Date.now(), modifiedById: dataStoredInToken ? dataStoredInToken.userId : null, modifiedByUsername: dataStoredInToken ? dataStoredInToken.email : null }));
        if (!updatePaymentById) {
            await this.reservationActivity.create({
                reservationId: paymentData.reservationId,
                action: ReservationActivityType.UPDATE_PAYMENT,
                status: 'failed',
                username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
                userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
            });
            throw new HttpException(this.paymentErrors.UPDATE_PAYMENT.NOT_FOUND);
        }
        logger.debug(`succesfully update  payment  with id: ${paymentId}  PaymentService updatePayment`);
        await this.reservationActivity.create({
            reservationId: paymentData.reservationId,
            action: ReservationActivityType.UPDATE_PAYMENT,
            status: 'success',
            username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
            userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
        });
        return updatePaymentById;
    }
    /**
    * get all payments from database
    * @module paymentModule
    * @function findAllPayments
    * @return {Promise<payment[]>}
    */
    async findAllPayments() {
        logger.debug('try to retrive payments from db PaymentService findAllPayments');
        let payments = await this.payment.find().lean();
        payments = payments.map(p => {
            let amount = 0;
            p.paymentItems.forEach(item => {
                amount = amount + Number(item.feeValue);
            });
            return Object.assign(Object.assign({}, p), { paymentAmount: amount });
        });
        logger.debug('succesfully return areaas from db PaymentService findAllPayments');
        return payments;
    }
    /**
     * get one payment from database by id
     * @module paymentModule
     * @function findPaymentByID
     * @param  {string} Id - id of the area
     * @return {Promise<Payment>}
     */
    async findPaymentByID(paymentId) {
        logger.debug(`try to retrive one  area id:${paymentId} from db PaymentService findPaymentByID`);
        const findPayment = await this.payment.findOne({ id: paymentId }).lean();
        if (!findPayment)
            throw new HttpException(this.paymentErrors.FIND_PAYMENT_BY_ID.NOT_FOUND);
        logger.debug(`succesfully retrive one  area id:${paymentId} from db PaymentService findPaymentByID`);
        let amount = 0;
        findPayment.paymentItems.forEach(item => {
            amount = amount + Number(item.feeValue);
        });
        return Object.assign(Object.assign({}, findPayment), { paymentAmount: amount });
    }
    /**
   * get one payment from database by id
   * @module paymentModule
   * @function findPaymentsByReservationId
   * @param  {string} Id - id of the area
   * @return {Promise<Payment>}
   */
    async findPaymentsByReservationId(reservationId) {
        logger.debug(`try to retrive payments for reservationId :${reservationId} from db PaymentService findPaymentByID`);
        const findPayments = await this.payment.find({ reservationId: reservationId }).lean();
        if (!findPayments)
            throw new HttpException(this.paymentErrors.FIND_PAYMENT_BY_ID.NOT_FOUND);
        logger.debug(`succesfully retrive payments for reservationId :${reservationId} from db PaymentService findPaymentByID`);
        findPayments.map(p => {
            let amount = 0;
            p.paymentItems.forEach(item => {
                p.paymentAmount = amount + Number(item.feeValue);
                amount = amount + Number(item.feeValue);
            });
        });
        return findPayments;
    }
    /**
    * delete one payment from database by id
    * @module paymentModule
    * @function deletePaymentData
    * @param  {string} areaId - id of the area
    * @return {Promise<Area>}
    */
    async deletePaymentData(paymentId, dataStoredInToken) {
        logger.debug(`try to delete  payment  with id: ${paymentId}  PaymentService deletePaymentData`);
        const deletePaymentyId = await this.payment.findByIdAndRemove({ id: paymentId });
        if (!deletePaymentyId) {
            await this.reservationActivity.create({
                action: ReservationActivityType.DELETE_PAYMENT,
                status: 'failed',
                username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
                userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
            });
            throw new HttpException(this.paymentErrors.DELETE_PAYMENT_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete area with id: ${paymentId}  PaymentService deletePaymentData`);
        await this.reservationActivity.create({
            action: ReservationActivityType.DELETE_PAYMENT,
            status: 'success',
            username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
            userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
        });
        return deletePaymentyId;
    }
    /**
   * create a new payment attempet
   * @module paymentModule
   * @function createPaymentAttempts
   * @param  {object} paymentAttemptsData - the data of newly created payment
   * @return {Promise<Payment>}
   */
    async createPaymentAttempts(paymentId, paymentAttemptsData, dataStoredInToken) {
        if (isEmptyObject(paymentAttemptsData)) {
            throw new HttpException(this.paymentErrors.UPDATE_PAYMENT.INVAlID_DATA);
        }
        const payment = await this.payment.findByIdAndRemove({ id: paymentId });
        if (!payment) {
            throw new HttpException(this.paymentErrors.FIND_PAYMENT_BY_ID.NOT_FOUND);
        }
        logger.debug(`try to get payment  with id: ${paymentId}  PaymentService createPaymentAttempts`);
        const updatePayment = await this.payment.findByIdAndUpdate({
            id: paymentId
        }, Object.assign(Object.assign({}, payment), { attempts: payment.attempts ? [...payment.attempts, paymentAttemptsData] : [paymentAttemptsData], modifiedById: dataStoredInToken ? dataStoredInToken.userId : null, modifiedByUsername: dataStoredInToken ? dataStoredInToken.email : null }));
        logger.debug(`succesfully  get payment  with id: ${paymentId} PaymentService createPaymentAttempts`);
        return updatePayment;
    }
    /**
  * get one reservation from database by id
  * @module paymentModule
  * @function cancelExpiredReservations
  * @return {Promise<Reservation>}
  */
    async cancelExpiredPayments(reservations) {
        logger.debug(`try to cancel expired payments PaymentService cancelExpiredPayments`);
        const findPayments = await this.payment.find({ reservationId: { $in: reservations }, 'status': PaymentStatus.PENDING });
        if (findPayments && findPayments.length > 0) {
            for (let i = 0; i < findPayments.length; i++) {
                await this.payment.findOneAndUpdate({ id: findPayments[i].id }, { status: PaymentStatus.CANCELED });
            }
        }
        logger.debug(`Number of canceled payments is:${findPayments.length} from db PaymentService cancelExpiredPayments`);
    }
    /**
  * get one reservation from database by id
  * @module paymentModule
  * @function cancelExpiredReservations
  * @return {Promise<Reservation>}
  */
    async changeOverduePaymentStatus() {
        logger.debug(`try to update overdue payment status PaymentService changeOverduePaymentStatus`);
        const findPayments = await this.payment.find({ 'status': PaymentStatus.PENDING, dueDate: { $lt: new Date().getTime() } });
        if (findPayments && findPayments.length > 0) {
            for (let i = 0; i < findPayments.length; i++) {
                findPayments[i].status = PaymentStatus.OVERDUE;
                await this.payment.findOneAndUpdate({ id: findPayments[i].id }, { status: PaymentStatus.OVERDUE });
            }
        }
        logger.debug(`Number of updated payments is:${findPayments.length} from db PaymentService changeOverduePaymentStatus`);
    }
    async getMonthyRevenue(numberOfMonths) {
        logger.debug(`try to getLastFiveMonthsRevenue`);
        if (numberOfMonths && (numberOfMonths > 11 || numberOfMonths <= 0)) {
            throw new HttpException(this.paymentErrors.MONTHLY_REVENUE.BAD_REQUEST);
        }
        const months = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        };
        let revenue = [];
        let counter = 0;
        let startDate = new Date();
        let start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        let end = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
        let findPayments = await this.payment.find({ 'status': PaymentStatus.COLLECTED, dueDate: { $gte: new Date(start).getTime(), $lte: new Date(end).getTime() } });
        const sum = findPayments.map(p => {
            let amount = 0;
            p.paymentItems.forEach(item => {
                amount = amount + Number(item.feeValue);
            });
            return amount;
        }).reduce((a, b) => a + b, 0);
        revenue.push({
            month: months[startDate.getMonth() + 1],
            revenue: sum
        });
        revenue[months[startDate.getMonth() + 1]] = sum;
        for (let i = 1; i <= numberOfMonths; i++) {
            let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
            let start = new Date(current.getFullYear(), current.getMonth() - i + counter, 1);
            let end = new Date(current.getFullYear(), current.getMonth(), 0);
            let findPayments = await this.payment.find({ 'status': PaymentStatus.COLLECTED, dueDate: { $gte: new Date(start).getTime(), $lte: new Date(end).getTime() } });
            startDate = end;
            counter = counter + 1;
            const sum = findPayments.map(p => {
                let amount = 0;
                p.paymentItems.forEach(item => {
                    amount = amount + Number(item.feeValue);
                });
                return amount;
            }).reduce((a, b) => a + b, 0);
            revenue.push({
                month: months[startDate.getMonth() + 1],
                revenue: sum
            });
        }
        return revenue;
    }
    /**
   * upload receipt  to S3
   * @module paymentModule
   * @function uploadReceipt
   * @param  {file} file - receipt
   * @param  {string} paymentId - id of the payment
   * @param  {string} reservationId - id of the reservation
   * @return {Promise<Payment>}
   */
    async uploadReceipt(file, paymentId, reservationId, dataStoredInToken) {
        const findPayment = await this.payment.findOne({ id: paymentId }).lean();
        if (!findPayment) {
            throw new HttpException(this.paymentErrors.FIND_PAYMENT_BY_ID.NOT_FOUND);
        }
        logger.debug(`try to upload receipt  with payment: ${paymentId} reservationId: ${reservationId} PaymentService uploadReceipt`);
        const receiptUrl = await this.attachmentService.uploadAssets(file, `reservations/${reservationId}/payments/${paymentId}`);
        logger.debug(`succesfully upload  receipt document with id: paymentId: ${paymentId} reservationId: ${reservationId}  PaymentService uploadReceipt`);
        const updatePayment = await this.payment.findOneAndUpdate({ id: paymentId }, {
            receipt: { receiptId: uuid(), receiptUrl: receiptUrl.Location },
            status: PaymentStatus.COLLECTED,
            modifiedById: dataStoredInToken ? dataStoredInToken.userId : null,
            modifiedByUsername: dataStoredInToken ? dataStoredInToken.email : null
        });
        const findBooking = await this.booking.findOne({ reservationId: Number(reservationId) }).lean();
        const contacts = await this.contacts.find().lean();
        const phoneNumber = contacts.filter(c => c.key == 'customerService')[0].contactId;
        await sendPaymentConfirmationEmail(findBooking.email, findBooking.name, phoneNumber, updatePayment.paymentItems);
        return this.findPaymentByID(paymentId);
    }
}
export default PaymentService;
//# sourceMappingURL=payemnt.service.js.map