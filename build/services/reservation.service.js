import reservationModel from '../models/reservation.model';
import AreaService from './area.service';
import UnitTypeService from './unitType.service';
import reservationActivityModel from '../models/reservationActivity.model';
import bookingModel from '../models/booking.model';
import PropertyService from './property.service';
import AmenityService from './amenity.service';
import AttachmentService from './attachment.service';
import { isEmptyObject, getNextDays, getPastDays } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import { ReservationStatus, ReservationActivityType } from '../interfaces/reservation.interface';
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
class ReservationService {
    constructor() {
        this.reservations = reservationModel;
        this.reservationActivity = reservationActivityModel;
        this.reservationErrors = errorConfig.RESERVATION_MODULE;
        this.bookingErrors = errorConfig.BOOKING_MODULE;
        this.areaService = new AreaService();
        this.amenityService = new AmenityService();
        this.attachmentService = new AttachmentService();
        this.unitTypeService = new UnitTypeService();
        this.propertyService = new PropertyService();
        this.booking = bookingModel;
    }
    async filterReservation(reservationSearchDto) {
        var _a, _b;
        const reservationPage = { skip: 0, limit: 0, sort: { createdAt: -1 } };
        const reservationQuery = (reservationSearchDto.query
            ? Object.assign({}, reservationSearchDto.query) : {});
        delete reservationQuery.range;
        if ((_a = reservationSearchDto.query) === null || _a === void 0 ? void 0 : _a.range) {
            const range = reservationSearchDto.query.range;
            const today = new Date();
            if (range === 'upcomingCheckIns') {
                reservationQuery.checkInDate = {
                    $gte: today,
                    $lt: getNextDays(3)
                };
            }
            else if (range === 'upcomingDepatures') {
                reservationQuery.checkOutDate = {
                    $gte: today,
                    $lt: getNextDays(3)
                };
            }
            else if (range === 'createdRecently') {
                reservationQuery.createdAt = {
                    $gte: getPastDays(3),
                    $lte: today
                };
            }
            else if (range === 'currentCheckedIn') {
                reservationQuery.checkInDate = { $lte: new Date().getTime() };
                reservationQuery.checkOutDate = { $gte: new Date().getTime() };
            }
            ;
        }
        if ((_b = reservationSearchDto.query) === null || _b === void 0 ? void 0 : _b.upcomingOnly) {
            reservationQuery.checkOutDate = {
                $gte: new Date()
            };
        }
        delete reservationQuery.upcomingOnly;
        logger.debug('try to retrive reservations counts from db ReservationService filterReservation');
        const reservationCount = await this.reservations.countDocuments(reservationQuery);
        logger.debug(`successfully retrive reservations count from db ${reservationCount} ReservationService filterReservation`);
        if (reservationSearchDto) {
            if (typeof reservationSearchDto.offset === 'number' &&
                typeof reservationSearchDto.limit === 'number') {
                reservationPage.skip = reservationSearchDto.limit * (reservationSearchDto.offset - 1);
                reservationPage.limit = reservationSearchDto.limit;
            }
        }
        logger.debug('try to retrive reservations from db ReservationService filterReservation');
        const reservations = await this.reservations.find(reservationQuery, {}, Object.assign({}, reservationPage));
        return { reservations: reservations, count: reservationCount };
    }
    /**
     * create a new property
     * @module reservationModule
     * @function createReservation
     * @param  {object} reservationData - the data of newly created property
     * @return {Promise<Property>}
     */
    async createReservation(reservationData, dataStoredInToken) {
        console.error(reservationData);
        if (isEmptyObject(reservationData)) {
            throw new HttpException(this.reservationErrors.CREATE_RESERVATION.INVAlID_DATA);
        }
        logger.debug(`try to create  new property   ReservationService createReservation`);
        let createReservationData;
        const unitTypeResponseDto = await this.unitTypeService.findUnitTypeByIdWrapper(Number(reservationData.unitTypeId));
        const propertyResponseDto = await this.propertyService.findPropertyByIUnitTypeId(String(reservationData.unitTypeId));
        this.handleChecInLogic(reservationData.bookingRequestId);
        createReservationData = await this.reservations.create(Object.assign(Object.assign({}, reservationData), { status: ReservationStatus.CONFIRMATION_PENDING, createdById: dataStoredInToken.userId, createdByUsername: dataStoredInToken.email, propertyId: propertyResponseDto.id, propertyName: propertyResponseDto.name, area: propertyResponseDto.areaName, areaId: propertyResponseDto.areaId, unitName: `${unitTypeResponseDto.name} ( ${unitTypeResponseDto.units.filter((u) => u.unitId == reservationData.roomId)[0].shortName} )` }));
        await this.reservationActivity.create({
            reservationId: createReservationData.id,
            action: ReservationActivityType.CREATE_RESERVATION,
            status: 'success',
            username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
            userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
        });
        logger.debug(`succesfully  create  property ReservationService createReservation`);
        return this.findReservationByID(String(createReservationData.id));
    }
    /**
     * update a new reservation
     * @module reservationModule
     * @function updateReservation
     * @param  {object} reservationData - the data of newly update property
     * @return {Promise<Reservation>}
     */
    async updateReservation(reservationId, reservationData, dataStoredInToken) {
        if (isEmptyObject(reservationData)) {
            throw new HttpException(this.reservationErrors.UPDATE_RESERVATION.INVAlID_DATA);
        }
        logger.debug(`try to update  new property  with id: ${reservationId}  ReservationService updateReservation`);
        const updateReservationData = await this.reservations.findOneAndUpdate({
            id: reservationId
        }, Object.assign(Object.assign({}, reservationData), { modifiedById: dataStoredInToken && dataStoredInToken.userId, modifiedByUsername: dataStoredInToken && dataStoredInToken.email, updatedAt: Date.now() }));
        await this.reservationActivity.create({
            reservationId: reservationId,
            action: ReservationActivityType.UPDATE_RESERVATION,
            status: 'success',
            comment: reservationData.comment,
            username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
            userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
        });
        logger.debug(`succesfully  update  property  with name: ${reservationId}  ReservationService updateReservation`);
        return this.findReservationByID(reservationId);
    }
    /**
     * update a new reservation
     * @module reservationModule
     * @function updateReservation
     * @param  {object} reservationData - the data of newly update property
     * @return {Promise<Reservation>}
     */
    async checkInGuest(reservationId, reservationData, dataStoredInToken) {
        if (isEmptyObject(reservationData)) {
            throw new HttpException(this.reservationErrors.UPDATE_RESERVATION.INVAlID_DATA);
        }
        logger.debug(`try to update  new property  with id: ${reservationId}  ReservationService updateReservation`);
        const reservation = await this.findReservationByID(reservationId);
        if (reservation.guestIds && reservation.guestIds.filter(g => g == reservationData.guestId).length != 0) {
            if (reservation.guestIds[0] == reservationData.guestId) {
                reservation.primaryGuestName = reservationData.primaryGuestName;
            }
        }
        else if (reservation.guestIds) {
            reservation.guestIds.push(reservationData.guestId);
        }
        else {
            reservation.guestIds = [reservationData.guestId];
            reservation.primaryGuestName = reservationData.primaryGuestName;
        }
        reservation.status = ReservationStatus.CHECK_IN_STARTED;
        const updateReservationData = await this.reservations.findOneAndUpdate({
            id: reservationId
        }, {
            guestIds: reservation.guestIds,
            primaryGuestName: reservation.primaryGuestName,
            status: ReservationStatus.CHECK_IN_STARTED,
            modifiedById: dataStoredInToken && dataStoredInToken.userId,
            modifiedByUsername: dataStoredInToken && dataStoredInToken.email,
            updatedAt: Date.now()
        });
        logger.debug(`succesfully  update  property  with name: ${reservationId}  ReservationService updateReservation`);
        return this.findReservationByID(reservationId);
    }
    /**
     * get one reservation from database by id
     * @module reservationModule
     * @function findReservationByID
     * @param  {string} reservationId - id of the reservation
     * @return {Promise<Reservation>}
     */
    async findReservationByID(reservationId) {
        logger.debug(`try to retrive one  Reservation id:${reservationId} from db ReservationService findReservationByID`);
        const findReservation = await this.reservations
            .findOne({ id: reservationId })
            .lean();
        if (!findReservation)
            throw new HttpException(this.reservationErrors.FIND_RESERVATION_BY_ID.NOT_FOUND);
        logger.debug(`succesfully retrive one  area id:${reservationId} from db ReservationService findReservationByID`);
        return findReservation;
    }
    /**
     * get one reservation from database by id
     * @module reservationModule
     * @function findReservationByID
     * @param  {string} reservationId - id of the reservation
     * @return {Promise<Reservation>}
     */
    async findReservationByUnitTypeId(unitTypeId, upcomingOnly) {
        logger.debug(`try to retrive reservations for unit type id:${unitTypeId} from db ReservationService findReservationByUnitTypeId`);
        let findReservation;
        if (upcomingOnly) {
            findReservation = await this.reservations.find({
                unitTypeId: unitTypeId,
                checkOutDate: { $gte: new Date().getTime() }
            });
        }
        else {
            findReservation = await this.reservations.find({ unitTypeId: unitTypeId });
        }
        if (!findReservation)
            throw new HttpException(this.reservationErrors.FIND_RESERVATION_BY_UNIT_TYPE_ID.NOT_FOUND);
        logger.debug(`succesfully retrive one  area id:${unitTypeId} from db ReservationService findReservationByUnitTypeId`);
        return findReservation;
    }
    /**
     * get one reservation from database by id
     * @module reservationModule
     * @function cancelExpiredReservations
     * @return {Promise<Reservation>}
     */
    async cancelExpiredReservations() {
        logger.debug(`try to cancel expired reservations ReservationService cancelExpiredReservations`);
        const findReservation = await this.reservations.find({
            status: ReservationStatus.CONFIRMATION_PENDING,
            checkinExpiresAt: { $lt: new Date().getTime() }
        });
        const expiredReservations = [];
        if (findReservation && findReservation.length > 0) {
            for (let i = 0; i < findReservation.length; i++) {
                await this.reservations.findOneAndUpdate({
                    id: String(findReservation[i].id)
                }, {
                    status: ReservationStatus.EXPIRED
                });
                await this.handleChecInLogic(String(findReservation[i].bookingRequestId));
                expiredReservations.push(findReservation[i].id);
            }
        }
        logger.debug(`Number of expired reservations is:${findReservation.length} from db ReservationService cancelExpiredReservations`);
        return expiredReservations;
    }
    /**
     * delete one reservation from database by id
     * @module reservationModule
     * @function deleteReservationData
     * @param  {string} reservationId - id of the reservation
     * @return {Promise<Reservation>}
     */
    async deleteReservationData(reservationId) {
        logger.debug(`try to delete  reservation  with id: ${reservationId}  ReservationService deleteReservationData`);
        const deleteReservationId = await this.reservations.findByIdAndRemove({
            id: reservationId
        });
        if (!deleteReservationId) {
            throw new HttpException(this.reservationErrors.DELETE_RESERVATION_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete reservation with id: ${reservationId}  ReservationService deleteReservationData`);
        return deleteReservationId;
    }
    async handleChecInLogic(bookingRequestId) {
        let findBooking = await this.booking.findOne({ id: bookingRequestId }).lean();
        if (!findBooking)
            throw new HttpException(this.bookingErrors.VERIFY_MOBILE.INVAlID_REQUEST_ID);
        const unitType = await this.unitTypeService.findUnitTypeById(Number(findBooking.unitTypeId));
        const firstAvailableDate = await this.getFirstAvailableDate(unitType);
        await this.unitTypeService.updateAvailableFromDate(Number(findBooking.unitTypeId), firstAvailableDate);
    }
    async getFirstAvailableDate(unitType) {
        let allUnitsRanges = [];
        // const units: Unit[] = await this.unitService.getRoomTypeRooms(unitTypeId);
        let notBlockedUnits = false;
        if (unitType.units) {
            let reservations = await this.findReservationByUnitTypeId(unitType.unitTypeId, true);
            if (!reservations || reservations.length == 0)
                return new Date().getTime();
            reservations = reservations.filter((r) => r.status == ReservationStatus.CONFIRMATION_PENDING ||
                r.status == ReservationStatus.CHECKED_IN ||
                r.status == ReservationStatus.CHECK_IN_STARTED);
            if (!reservations || reservations.length == 0)
                return new Date().getTime();
            for (let i = 0; i < unitType.units.length; i++) {
                if (reservations.filter((r) => r.roomId == unitType.units[i].unitId).length == 0) {
                    notBlockedUnits = true;
                    break;
                }
            }
            if (notBlockedUnits) {
                return new Date().getTime();
            }
            let unitRanges = [];
            reservations.forEach((r) => {
                unitRanges.push({ startDate: r.checkInDate, endDate: r.checkOutDate });
            });
            allUnitsRanges.push(unitRanges);
        }
        let allOverlaps = [];
        for (let i = 0; i < allUnitsRanges[0].length; i++) {
            let currentOverlap = [
                {
                    startDate: moment(allUnitsRanges[0][i].startDate).valueOf(),
                    endDate: moment(allUnitsRanges[0][i].endDate).valueOf()
                }
            ];
            for (let x = 1; x < allUnitsRanges.length; x++) {
                currentOverlap = await this.checkOverlap(currentOverlap, allUnitsRanges[x]);
            }
            if (currentOverlap) {
                currentOverlap.forEach((o) => allOverlaps.push({ startDate: o.startDate, endDate: o.endDate }));
            }
        }
        let moments = allOverlaps.map((d) => moment(d.endDate));
        const availableFrom = moment.min(moments);
        const startDate = allOverlaps.filter((o) => o.endDate == availableFrom)[0].startDate;
        if (startDate > new Date().getTime())
            return new Date().getTime();
        else
            return availableFrom;
    }
    async checkOverlap(dateRangeArray, listOfRanges) {
        let currentIntersactions = [];
        dateRangeArray.forEach((dateRange) => {
            for (let i = 0; i < listOfRanges.length; i++) {
                const currentMoment = moment
                    .range(moment(dateRange.startDate), moment(dateRange.endDate))
                    .intersect(moment.range(moment(listOfRanges[i].startDate), moment(listOfRanges[i].endDate)));
                if (currentMoment) {
                    currentIntersactions.push({
                        startDate: currentMoment.start.valueOf(),
                        endDate: currentMoment.end.valueOf()
                    });
                }
            }
        });
        return currentIntersactions;
    }
}
export default ReservationService;
//# sourceMappingURL=reservation.service.js.map