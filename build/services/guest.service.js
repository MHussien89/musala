import guestModel from '../models/guest.model';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import { v4 as uuid } from 'uuid';
import AttachmentService from './attachment.service';
import reservationModel from '../models/reservation.model';
import { ReservationActivityType } from '../interfaces/reservation.interface';
import reservationActivityModel from '../models/reservationActivity.model';
class GuestService {
    constructor() {
        this.attachmentService = new AttachmentService();
        this.guest = guestModel;
        this.reservations = reservationModel;
        this.guestErrors = errorConfig.GUEST_MODULE;
        this.reservationActivity = reservationActivityModel;
    }
    /**
     * create a new guest
     * @module guestModule
     * @function createGuest
     * @param  {object} guestData - the data of newly created guest
     * @return {Promise<Guest>}
     */
    async createGuest(guestData, dataStoredInToken) {
        if (isEmptyObject(guestData)) {
            throw new HttpException(this.guestErrors.CREATE_GUEST.INVAlID_DATA);
        }
        const guestID = uuid();
        logger.debug(`try to create  new guest  with id: ${guestID}  GuestService createGuest`);
        const createGuestData = await this.guest.create(Object.assign(Object.assign({}, guestData), { id: guestID }));
        await this.reservationActivity.create({
            action: ReservationActivityType.CREATE_GUEST,
            status: 'success',
            username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
            userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
        });
        logger.debug(`succesfully  create  guest  with id: ${guestID} and name: ${guestData.firstName} GuestService createGuest`);
        createGuestData.id = guestID;
        return createGuestData;
    }
    /**
     * update a new guest
     * @module guestModule
     * @function updateGuest
     * @param  {object} guestData - the data of newly updated guest
     * @return {Promise<Guest>}
     */
    async updateGuest(guestId, guestData, dataStoredInToken) {
        if (isEmptyObject(guestData)) {
            throw new HttpException(this.guestErrors.UPDATE_GUEST.INVAlID_DATA);
        }
        logger.debug(`try to update  guest  with id: ${guestId}  GuestService updateGuest`);
        const updateSurveyById = await this.guest.findOneAndUpdate({ id: guestId }, Object.assign(Object.assign({}, guestData), { updatedAt: Date.now() }));
        if (!updateSurveyById) {
            await this.reservationActivity.create({
                action: ReservationActivityType.UPDATE_GUEST,
                status: 'failed',
                username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
                userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
            });
            throw new HttpException(this.guestErrors.UPDATE_GUEST.NOT_FOUND);
        }
        await this.reservationActivity.create({
            action: ReservationActivityType.UPDATE_GUEST,
            status: 'success',
            username: (dataStoredInToken && dataStoredInToken.email) || 'guest',
            userId: (dataStoredInToken && dataStoredInToken.userId) || 'guest'
        });
        logger.debug(`succesfully update  survey  with id: ${guestId}  GuestService updateGuest`);
        return updateSurveyById;
    }
    /**
    * get all guests from database
    * @module guestModule
    * @function findAllGuests
    * @return {Promise<guest[]>}
    */
    async findAllGuests() {
        logger.debug('try to retrive guests from db GuestService findAllGuests');
        let guests = await this.guest.find();
        logger.debug('succesfully return areaas from db GuestService findAllGuests');
        return guests;
    }
    /**
     * get one guest from database by id
     * @module guestModule
     * @function findGuestByID
     * @param  {string} Id - id of the area
     * @return {Promise<Guest>}
     */
    async findGuestByID(guestId) {
        logger.debug(`try to retrive one  area id:${guestId} from db GuestService findGuestByID`);
        const findGuest = await this.guest.findOne({ id: guestId });
        if (!findGuest)
            throw new HttpException(this.guestErrors.FIND_GUEST_BY_ID.NOT_FOUND);
        logger.debug(`succesfully retrive one  area id:${guestId} from db GuestService findGuestByID`);
        return findGuest;
    }
    /**
   * get one guest from database by id
   * @module guestModule
   * @function findGuestByID
   * @param  {string} Id - id of the area
   * @return {Promise<Guest>}
   */
    async findGuestsByIDs(guestIds) {
        logger.debug(`try to retrive one  area id:${guestIds} from db GuestService findGuestByID`);
        const findGuests = await this.guest.find({ id: { $in: guestIds } });
        if (!findGuests)
            throw new HttpException(this.guestErrors.FIND_GUEST_BY_ID.NOT_FOUND);
        logger.debug(`succesfully retrive one  area id:${guestIds} from db GuestService findGuestByID`);
        return findGuests;
    }
    /**
    * delete one guest from database by id
    * @module guestModule
    * @function deleteGuestData
    * @param  {string} areaId - id of the area
    * @return {Promise<Area>}
    */
    async deleteGuestData(guestId) {
        logger.debug(`try to delete  guest  with id: ${guestId}  GuestService deleteGuestData`);
        const deleteGuestyId = await this.guest.findByIdAndRemove({ id: guestId });
        if (!deleteGuestyId) {
            throw new HttpException(this.guestErrors.DELETE_GUEST_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete area with id: ${guestId}  GuestService deleteGuestData`);
        return deleteGuestyId;
    }
    /**
     * upload property image to S3
     * @module guestModule
     * @function uploadDocument
     * @param  {file} file - guest document
     * @param  {string} guestId - id of the guest
     * @param  {string} reservationId - id of the reservation
     * @return {Promise<Property>}
     */
    async uploadDocument(file, guestId, reservationId, guestDocumentType, token) {
        const findReservationById = await this.reservations.findOne({
            id: reservationId
        });
        if (findReservationById.checkinToken != token) {
            throw new HttpException(this.guestErrors.START_CHECK_IN.INVAlID_TOKEN);
        }
        else if (findReservationById.checkinExpiresAt < new Date().getTime()) {
            throw new HttpException(this.guestErrors.START_CHECK_IN.TOKEN_EXPIRED);
        }
        const findGuest = await this.guest.findOne({ id: guestId }).lean();
        if (!findGuest) {
            throw new HttpException(this.guestErrors.FIND_GUEST_BY_ID.NOT_FOUND);
        }
        logger.debug(`try to upload guest document image  with guestId: ${guestId} reservationId: ${reservationId} GuestService uploadDocument`);
        const document = await this.attachmentService.uploadAssets(file, `reservations/${reservationId}/guests/${guestId}`);
        logger.debug(`succesfully upload  guest document with id: guestId: ${guestId} reservationId: ${reservationId}  GuestService uploadDocument`);
        const documentObject = {
            documentId: uuid(),
            documentUrl: document.Location,
            type: guestDocumentType
        };
        if (findGuest.document) {
            findGuest.document.push(documentObject);
        }
        else {
            findGuest.document = [documentObject];
        }
        const updateGuestId = await this.guest.findOneAndUpdate({ id: guestId }, {
            document: findGuest.document
        });
        return this.findGuestByID(guestId);
    }
}
export default GuestService;
//# sourceMappingURL=guest.service.js.map