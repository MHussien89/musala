import * as mongoose from 'mongoose';
const guestSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    dob: String,
    gender: String,
    address: String,
    document: [{
            documentId: String,
            documentUrl: String,
            type: { type: String },
            documentNumber: { type: String },
            documentIssueDate: { type: Number },
            expirationDate: { type: Number },
            issueCountry: { type: String },
        }],
    modifiedByUsername: String,
    modifiedById: String,
    createdByUsername: String,
    createdById: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
const guestModel = mongoose.model('Guest', guestSchema);
export default guestModel;
//# sourceMappingURL=guest.model.js.map