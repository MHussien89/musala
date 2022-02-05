import * as mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
    id: String,
    phoneNumber: String,
    name: String,
    email: String,
    socialLink: String,
    moreInfo: String,
    gender: String,
    unitTypeId: Number,
    userId: String,
    checkInDate: String,
    checkOutDate: String,
    otp: Number,
    status: String,
    rejectionReason: String,
    numberOfGuests: Number,
    bookedAt: String,
    screenedAt: String,
    reservationId: Number,
    recurringPayment: [],
    oneTimePayment: [],
    messagesIds: [],
    createdAt: { type: Date, default: Date.now },
    modifiedById: String,
    createdBy: String
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });
const bookingModel = mongoose.model('Booking', bookingSchema);
export default bookingModel;
//# sourceMappingURL=booking.model.js.map