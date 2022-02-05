import * as mongoose from 'mongoose';
const reservationActivitySchema = new mongoose.Schema({
    reservationId: Number,
    action: String,
    status: String,
    comment: String,
    date: { type: Date, default: Date.now },
    username: String,
    userId: String
});
const reservationActivityModel = mongoose.model('ReservationActivity', reservationActivitySchema);
export default reservationActivityModel;
//# sourceMappingURL=reservationActivity.model.js.map