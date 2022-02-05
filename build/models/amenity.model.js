import * as mongoose from 'mongoose';
const areaSchema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    modifiedByUsername: String,
    modifiedById: String,
    createdByUsername: String,
    createdById: String,
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });
const amenitiesModel = mongoose.model('Amenity', areaSchema);
export default amenitiesModel;
//# sourceMappingURL=amenity.model.js.map