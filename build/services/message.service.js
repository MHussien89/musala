import messageModel from '../models/message.model';
import logger from '../logger/logger';
import { v4 as uuid } from 'uuid';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
class MessageService {
    constructor() {
        this.message = messageModel;
        this.messageErrors = errorConfig.MESSAGE_MODULE;
    }
    /**
     * create a new booking request
     * @module bookingModule
     * @function createBooking
     * @param  {string} message - The new message added by the admin
     * @return {Promise<Booking>}
     */
    async addNewMessage(message, dataStoredInToken) {
        const messageID = uuid();
        const messageCreated = await this.message.create({
            id: messageID,
            message: message,
            isDeleted: false,
            createdById: dataStoredInToken && dataStoredInToken.userId,
            createdByUsername: dataStoredInToken && dataStoredInToken.email,
        });
        logger.debug(`try to create  new booking info request  BookingService createBookingRequest`);
        logger.debug(`succesfully  create  new booking info request BookingService createBookingRequest`);
        const messageResponseDto = {
            id: messageID,
            message: message,
            createdAt: messageCreated.createdAt.getTime(),
            createdById: dataStoredInToken && dataStoredInToken.userId,
            createdByUsername: dataStoredInToken && dataStoredInToken.email
        };
        return messageResponseDto;
    }
    async findMessagesByIds(messageIds) {
        if (!messageIds)
            return;
        logger.debug(`try to populate  messages with ids:${messageIds} from db MessageService findMessagesByIds`);
        const findMessages = await this.message
            .find({ id: { $in: messageIds }, isDeleted: false })
            .lean();
        let messageDtos = [];
        for (const m of findMessages) {
            messageDtos.push({
                id: m.id,
                message: m.message,
                createdAt: m.createdAt.getTime(),
                createdById: m.createdById,
                createdByUsername: m.createdByUsername,
                modifiedById: m.modifiedById,
                modifiedByUsername: m.modifiedByUsername
            });
        }
        return messageDtos;
    }
    async deleteMessage(messageId, dataStoredInToken) {
        logger.debug(`try to delete  message  with id: ${messageId}  MessageService deleteMessage`);
        const deleteMessageById = await this.message.findOneAndUpdate({ id: String(messageId) }, {
            isDeleted: true,
            modifiedById: dataStoredInToken.userId,
            modifiedByUsername: dataStoredInToken.email
        });
        if (!deleteMessageById) {
            throw new HttpException(this.messageErrors.DELETE_MESSAGE_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete  message  with id: ${messageId}  MessageService deleteMessage`);
        const messageResponseDto = {
            id: deleteMessageById.id,
            message: deleteMessageById.message,
            modifiedById: deleteMessageById.modifiedById,
            modifiedByUsername: deleteMessageById.modifiedByUsername,
            createdAt: deleteMessageById.createdAt.getTime(),
            createdById: deleteMessageById.createdById,
            createdByUsername: deleteMessageById.createdByUsername
        };
        return messageResponseDto;
    }
}
export default MessageService;
//# sourceMappingURL=message.service.js.map