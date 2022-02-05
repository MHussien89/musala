import { RequestStatus, CreatedBy } from '../interfaces/booking.interface';
import ReservationService from './reservation.service';
import UnitTypeService from './unitType.service';
import bookingModel from '../models/booking.model';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import { v4 as uuid } from 'uuid';
import MessageService from '../services/message.service';
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
class BookingService {
    constructor() {
        this.booking = bookingModel;
        this.bookingErrors = errorConfig.BOOKING_MODULE;
        this.reservationService = new ReservationService();
        this.unitTypeService = new UnitTypeService();
        this.messageService = new MessageService();
    }
    /**
     * create a new booking request
     * @module bookingModule
     * @function createBooking
     * @param  {object} bookingData - the data of newly created booking onfo
     * @return {Promise<Booking>}
     */
    async createBookingRequest(bookingData) {
        if (isEmptyObject(bookingData)) {
            throw new HttpException(this.bookingErrors.CREATE_BOOKING.INVAlID_DATA);
        }
        const requestID = uuid();
        logger.debug(`try to create  new booking info request  BookingService createBookingRequest`);
        let createBookingData;
        if (bookingData.userId) {
            createBookingData = await this.booking.create(Object.assign({ id: requestID, status: RequestStatus.VERIFIED, createdBy: bookingData.createdBy || CreatedBy.GUEST }, bookingData));
        }
        else {
            createBookingData = await this.booking.create(Object.assign({ id: requestID, status: bookingData.status || RequestStatus.NOT_VERIFIED, otp: Math.floor(Math.random() * (999 - 100 + 1) + 100), createdBy: bookingData.createdBy || CreatedBy.GUEST }, bookingData));
        }
        logger.debug(`succesfully  create  new booking info request BookingService createBookingRequest`);
        const bookingResponseDto = {
            id: createBookingData.id,
            name: createBookingData.name,
            email: createBookingData.email,
            phoneNumber: createBookingData.phoneNumber,
            messagesIds: createBookingData.messagesIds,
            gender: createBookingData.gender,
            moreInfo: createBookingData.moreInfo,
            rejectionReason: createBookingData.rejectionReason,
            userId: createBookingData.userId,
            socialLink: createBookingData.socialLink,
            checkInDate: createBookingData.checkInDate,
            checkOutDate: createBookingData.checkOutDate,
            numberOfGuests: createBookingData.numberOfGuests,
            unitTypeId: createBookingData.unitTypeId,
            otp: createBookingData.otp,
            status: createBookingData.status
        };
        return bookingResponseDto;
    }
    /**
   * create a new booking request
   * @module bookingModule
   * @function verifyOTP
   * @param  {object} bookingData - the verification data
   * @return {Promise<Booking>}
   */
    async verifyOTP(verifyData) {
        if (isEmptyObject(verifyData)) {
            throw new HttpException(this.bookingErrors.VERIFY_MOBILE.INVAlID_DATA);
        }
        const findBooking = await this.booking.findOneAndUpdate({ id: verifyData.requestId, otp: verifyData.otp }, {
            status: RequestStatus.VERIFIED
        });
        if (!findBooking)
            throw new HttpException(this.bookingErrors.VERIFY_MOBILE.INVAlID_REQUEST_ID);
        logger.debug(`succesfully  verify phone number BookingService verifyOTP`);
        const bookingResponseDto = {
            id: findBooking.id,
            name: findBooking.name,
            email: findBooking.email,
            phoneNumber: findBooking.phoneNumber,
            messagesIds: findBooking.messagesIds,
            gender: findBooking.gender,
            moreInfo: findBooking.moreInfo,
            userId: findBooking.userId,
            socialLink: findBooking.socialLink,
            rejectionReason: findBooking.rejectionReason,
            unitTypeId: findBooking.unitTypeId,
            checkInDate: findBooking.checkInDate,
            checkOutDate: findBooking.checkOutDate,
            numberOfGuests: findBooking.numberOfGuests,
            otp: findBooking.otp,
            status: RequestStatus.VERIFIED
        };
        return bookingResponseDto;
    }
    async addPaymentDetails(paymentDetails) {
        const findBooking = await this.booking.findOneAndUpdate({ id: paymentDetails.requestId }, {
            oneTimePayment: paymentDetails.oneTimePayment,
            recurringPayment: paymentDetails.recurringPayment
        });
        if (!findBooking)
            throw new HttpException(this.bookingErrors.VERIFY_MOBILE.INVAlID_REQUEST_ID);
        logger.debug(`succesfully  updated status BookingService updateRequestStatus`);
        const bookingResponseDto = {
            id: findBooking.id,
            name: findBooking.name,
            email: findBooking.email,
            phoneNumber: findBooking.phoneNumber,
            messagesIds: findBooking.messagesIds,
            gender: findBooking.gender,
            moreInfo: findBooking.moreInfo,
            userId: findBooking.userId,
            socialLink: findBooking.socialLink,
            unitTypeId: findBooking.unitTypeId,
            rejectionReason: findBooking.rejectionReason,
            checkInDate: findBooking.checkInDate,
            checkOutDate: findBooking.checkOutDate,
            numberOfGuests: findBooking.numberOfGuests,
            otp: findBooking.otp,
            status: findBooking.status,
            oneTimePayment: paymentDetails.oneTimePayment,
            recurringPayment: paymentDetails.recurringPayment
        };
        return bookingResponseDto;
    }
    async finalizeBookingRequest(finalizeBookingDto) {
        // const exisitngStatus = finalizeBookingDto.status == RequestStatus.IN_PROGRESS ? RequestStatus.VERIFIED : null;
        if (finalizeBookingDto.status == RequestStatus.IN_PROGRESS) {
            finalizeBookingDto.bookedAt = new Date().getTime();
        }
        if (finalizeBookingDto.status == RequestStatus.CONFIRMED || finalizeBookingDto.status == RequestStatus.REJECTED) {
            finalizeBookingDto.screenedAt = new Date().getTime();
        }
        if (finalizeBookingDto.status == RequestStatus.REJECTED && !finalizeBookingDto.rejectionReason) {
            throw new HttpException(this.bookingErrors.VERIFY_MOBILE.MISSING_REJECTION_REASON);
        }
        // if (!exisitngStatus)
        //   throw new HttpException(this.bookingErrors.VERIFY_MOBILE.INVAlID_STATUS);
        let findBooking = await this.booking.findOneAndUpdate({ id: finalizeBookingDto.requestId }, Object.assign({}, finalizeBookingDto));
        if (!findBooking)
            throw new HttpException(this.bookingErrors.VERIFY_MOBILE.INVAlID_REQUEST_ID);
        logger.debug(`succesfully  updated status BookingService updateRequestStatus`);
        const bookingResponseDto = {
            id: findBooking.id,
            name: findBooking.name,
            email: findBooking.email,
            phoneNumber: findBooking.phoneNumber,
            gender: findBooking.gender,
            userId: findBooking.userId,
            messagesIds: findBooking.messagesIds,
            moreInfo: findBooking.moreInfo,
            socialLink: findBooking.socialLink,
            unitTypeId: findBooking.unitTypeId,
            rejectionReason: findBooking.rejectionReason,
            checkInDate: findBooking.checkInDate,
            checkOutDate: findBooking.checkOutDate,
            numberOfGuests: findBooking.numberOfGuests,
            otp: findBooking.otp,
            status: finalizeBookingDto.status,
            oneTimePayment: findBooking.oneTimePayment,
            recurringPayment: findBooking.recurringPayment,
            reservationId: findBooking.reservationId,
            bookedAt: findBooking.bookedAt,
            screenedAt: findBooking.screenedAt
        };
        return bookingResponseDto;
    }
    async updateBookingRequest(updateBookingDto) {
        let findBooking = await this.booking.findOneAndUpdate({ id: updateBookingDto.requestId }, Object.assign({}, updateBookingDto));
        if (!findBooking)
            throw new HttpException(this.bookingErrors.VERIFY_MOBILE.INVAlID_REQUEST_ID);
        logger.debug(`succesfully  updated status BookingService updateBookingRequest`);
        const bookingResponseDto = {
            id: findBooking.id,
            name: findBooking.name,
            email: findBooking.email,
            phoneNumber: findBooking.phoneNumber,
            gender: findBooking.gender,
            userId: findBooking.userId,
            moreInfo: findBooking.moreInfo,
            socialLink: findBooking.socialLink,
            unitTypeId: findBooking.unitTypeId,
            messagesIds: findBooking.messagesIds,
            rejectionReason: findBooking.rejectionReason,
            checkInDate: findBooking.checkInDate,
            checkOutDate: findBooking.checkOutDate,
            numberOfGuests: findBooking.numberOfGuests,
            otp: findBooking.otp,
            status: findBooking.status,
            oneTimePayment: findBooking.oneTimePayment,
            recurringPayment: findBooking.recurringPayment,
            reservationId: findBooking.reservationId,
            bookedAt: findBooking.bookedAt,
            screenedAt: findBooking.screenedAt
        };
        return bookingResponseDto;
    }
    async getReservationRequest(requestId) {
        const findBooking = await this.booking.findOne({ id: requestId }).lean();
        if (!findBooking)
            throw new HttpException(this.bookingErrors.VERIFY_MOBILE.INVAlID_REQUEST_ID);
        logger.debug(`succesfully return booking request  BookingService getReservationRequest`);
        const messages = await this.messageService.findMessagesByIds(findBooking.messagesIds);
        const bookingResponseDto = {
            id: findBooking.id,
            name: findBooking.name,
            email: findBooking.email,
            phoneNumber: findBooking.phoneNumber,
            messagesIds: findBooking.messagesIds,
            messagesList: messages,
            gender: findBooking.gender,
            moreInfo: findBooking.moreInfo,
            socialLink: findBooking.socialLink,
            unitTypeId: findBooking.unitTypeId,
            rejectionReason: findBooking.rejectionReason,
            checkInDate: findBooking.checkInDate,
            checkOutDate: findBooking.checkOutDate,
            numberOfGuests: findBooking.numberOfGuests,
            oneTimePayment: findBooking.oneTimePayment,
            recurringPayment: findBooking.recurringPayment,
            otp: findBooking.otp,
            reservationId: findBooking.reservationId,
            status: findBooking.status,
            bookedAt: findBooking.bookedAt,
            screenedAt: findBooking.screenedAt,
            userId: findBooking.userId
        };
        return bookingResponseDto;
    }
    /**
   * get all properties from database
   * @module propertyModule
   * @function findAllProperties
   * @param  {Object} query - contains query parm like page number and size and it's an optional
   * @return {Promise<{properties:Property[], totalCount:number}>}
   */
    async getAllReservations() {
        const findBooking = await this.booking.find();
        let bookingResponseDtos = [];
        for (let i = 0; i < findBooking.length; i++) {
            const messages = await this.messageService.findMessagesByIds(findBooking[i].messagesIds);
            bookingResponseDtos.push({
                id: findBooking[i].id,
                name: findBooking[i].name,
                email: findBooking[i].email,
                phoneNumber: findBooking[i].phoneNumber,
                gender: findBooking[i].gender,
                userId: findBooking[i].userId,
                moreInfo: findBooking[i].moreInfo,
                socialLink: findBooking[i].socialLink,
                unitTypeId: findBooking[i].unitTypeId,
                messagesIds: findBooking[i].messagesIds,
                rejectionReason: findBooking[i].rejectionReason,
                messagesList: messages,
                checkInDate: findBooking[i].checkInDate,
                checkOutDate: findBooking[i].checkOutDate,
                numberOfGuests: findBooking[i].numberOfGuests,
                otp: findBooking[i].otp,
                status: findBooking[i].status,
                oneTimePayment: findBooking[i].oneTimePayment,
                recurringPayment: findBooking[i].recurringPayment,
                bookedAt: findBooking[i].bookedAt,
                reservationId: findBooking[i].reservationId,
                screenedAt: findBooking[i].screenedAt
            });
        }
        logger.debug('succesfully return reservations from db BookingService getAllReservations');
        return bookingResponseDtos;
    }
    /**
  * get all reservations from database
  * @module bookingModule
  * @function findAllProperties
  * @param  {Object} query - contains query parm like page number and size and it's an optional
  * @return {Promise<{properties:Property[], totalCount:number}>}
  */
    async getReservation(requestId) {
        const findBooking = await this.booking.findOne({
            id: requestId
        });
        let bookingResponseDto = {
            id: findBooking.id,
            name: findBooking.name,
            email: findBooking.email,
            phoneNumber: findBooking.phoneNumber,
            messagesIds: findBooking.messagesIds,
            gender: findBooking.gender,
            userId: findBooking.userId,
            moreInfo: findBooking.moreInfo,
            rejectionReason: findBooking.rejectionReason,
            socialLink: findBooking.socialLink,
            unitTypeId: findBooking.unitTypeId,
            checkInDate: findBooking.checkInDate,
            checkOutDate: findBooking.checkOutDate,
            numberOfGuests: findBooking.numberOfGuests,
            otp: findBooking.otp,
            status: findBooking.status,
            reservationId: findBooking.reservationId,
            oneTimePayment: findBooking.oneTimePayment,
            recurringPayment: findBooking.recurringPayment,
            bookedAt: findBooking.bookedAt,
            screenedAt: findBooking.screenedAt
        };
        logger.debug('succesfully return reservation from db BookingService getAllReservations');
        return bookingResponseDto;
    }
}
export default BookingService;
//# sourceMappingURL=booking.service.js.map