import * as mongoose from 'mongoose';
var AutoIncrement = require('mongoose-sequence')(mongoose);
const reservationSchema = new mongoose.Schema({
    id: Number,
    unitTypeId: Number,
    roomId: String,
    checkInDate: Number,
    checkOutDate: Number,
    bookingRequestId: String,
    userId: String,
    checkinToken: Number,
    passKeyToken: Number,
    checkinExpiresAt: Number,
    passKey: String,
    reservationUrl: String,
    status: String,
    paymentIds: [Number],
    guestIds: [String],
    guestsList: [String],
    primaryGuestName: String,
    propertyId: String,
    propertyName: String,
    unitName: String,
    area: String,
    areaId: String,
    modifiedByUsername: String,
    modifiedById: String,
    createdByUsername: String,
    createdById: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
reservationSchema.plugin(AutoIncrement, { id: 'reservationId_counter', inc_field: 'id' });
const reservationModel = mongoose.model('Reservation', reservationSchema);
export default reservationModel;
//# sourceMappingURL=reservation.model.js.map