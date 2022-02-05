import contactModel from '../models/contacts.model';
class ContactService {
    constructor() {
        this.contacts = contactModel;
    }
    async findAllContacts() {
        const contacts = await this.contacts.find().lean();
        let contactDtos = [];
        for (const c of contacts) {
            contactDtos.push({
                id: c.id,
                key: c.key,
                contactId: c.contactId
            });
        }
        return contactDtos;
    }
}
export default ContactService;
//# sourceMappingURL=contacts.service.js.map