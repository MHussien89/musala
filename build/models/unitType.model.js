import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-sequence')(mongoose);
const unitTypeSchema = new mongoose.Schema({
    id: Number,
    propertyId: String,
    name: String,
    shortName: String,
    description: String,
    onboardingMessage: String,
    maxGuests: Number,
    unitMeters: String,
    currency: String,
    bedrooms: Number,
    bathrooms: Number,
    roomTypePhotos: [{ id: String, url: String, key: String, order: Number }],
    unitTypeLink: String,
    viewLink: String,
    urlLink: String,
    reservationMode: String,
    houseRules: String,
    downPayment: Number,
    insurance: Number,
    unitPrice: Number,
    minStayDuration: Number,
    maxStayDuration: Number,
    roomTypeUnits: Number,
    availableFrom: Number,
    isFeatured: Boolean,
    isDeleted: Boolean,
    ratePlans: [
        {
            id: String,
            name: String,
            minStay: String,
            maxStay: String,
            amount: Number
        }
    ],
    fees: [
        {
            id: String,
            name: String,
            amount: Number,
            amountType: String
        }
    ],
    showRooms: [
        {
            roomId: String,
            roomName: String,
            imagesList: [
                {
                    id: String,
                    url: String,
                    key: String,
                    order: Number
                }
            ]
        }
    ],
    units: [
        {
            unitId: String,
            shortName: String,
            roomNumber: String,
            isActive: { type: Boolean, default: true }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    modifiedByUsername: String,
    modifiedById: String,
    createdByUsername: String,
    createdById: String,
    amenitiesIds: [String],
    unitTypeGroupId: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });
unitTypeSchema.plugin(autoIncrement, {
    id: 'unitTypeId_counter',
    inc_field: 'id',
    start_seq: 5000
});
const unitTypeModel = mongoose.model('UnitType', unitTypeSchema);
export default unitTypeModel;
//# sourceMappingURL=unitType.model.js.map