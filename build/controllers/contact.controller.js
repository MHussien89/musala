import ContactService from '../services/contacts.service';
import logger from '../logger/logger';
class ContactController {
    constructor() {
        this.contactService = new ContactService();
        /**
        * get all areas
        * @module areaModule
        * @function
        * @param {Object} req - Express request object
        * @param {Object} res - Express response object
        * @param {Function} next - Express next middleware function
        * @return {undefined}
        */
        this.findAllContacts = async (req, res, next) => {
            try {
                logger.debug('call findAllContacts from service ContactController findAllContacts');
                const contactResponseDto = await this.contactService.findAllContacts();
                logger.debug('succesfully return from findAllContacts ContactController findAllContacts');
                res.status(200).json({ data: contactResponseDto, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default ContactController;
//# sourceMappingURL=contact.controller.js.map