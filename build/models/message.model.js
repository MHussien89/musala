import * as mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    id: String,
    message: String,
    isDeleted: Boolean,
    createdAt: { type: Date, default: Date.now },
    modifiedById: String,
    modifiedByUsername: String,
    createdById: String,
    createdByUsername: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });
const messageModel = mongoose.model('Message', messageSchema);
export default messageModel;
//# sourceMappingURL=message.model.js.map