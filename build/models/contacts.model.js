import * as mongoose from 'mongoose';
const contactsSchema = new mongoose.Schema({
    id: Number,
    key: String,
    contactId: String
});
const contactModel = mongoose.model('Contact', contactsSchema);
export default contactModel;
//# sourceMappingURL=contacts.model.js.map