import * as mongoose from 'mongoose';
const areaSchema = new mongoose.Schema({
    id: String,
    name: String,
    nameIgnoreCase: String,
    order: Number,
    modifiedByUsername: String,
    modifiedById: String,
    createdByUsername: String,
    createdById: String,
    defaultImage: String,
    sponsoredImage: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });
const areaModel = mongoose.model('Area', areaSchema);
export default areaModel;
//# sourceMappingURL=area.model.js.map