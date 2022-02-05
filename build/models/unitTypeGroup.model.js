import * as mongoose from 'mongoose';
const unitTypeGroupSchema = new mongoose.Schema({
    id: String,
    name: String,
    unitTypeIds: [Number],
    modifiedByUsername: String,
    modifiedById: String,
    createdByUsername: String,
    createdById: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });
const unitTypeGroupModel = mongoose.model('UnitTypeGroup', unitTypeGroupSchema);
export default unitTypeGroupModel;
//# sourceMappingURL=unitTypeGroup.model.js.map