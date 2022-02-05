import * as mongoose from 'mongoose';
const propertySchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    location: {
        address: String,
        longitude: String,
        latitude: String,
        shortAddress: String,
        city: String,
        state: String
    },
    urlLink: String,
    createdAt: { type: Date, default: Date.now },
    areaId: String,
    gender: String,
    coverImage: {
        sm: String,
        md: String,
        lg: String
    },
    images: [],
    isFeatured: { type: Boolean, default: false },
    unitTypeIds: [Number],
    amenitiesIds: [String],
    isDeleted: Boolean,
    modifiedByUsername: String,
    modifiedById: String,
    createdByUsername: String,
    createdById: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });
const propertyModel = mongoose.model('Property', propertySchema);
export default propertyModel;
//# sourceMappingURL=property.model.js.map