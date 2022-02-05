import { PaymentCollector, PaymentStatus, PaymentType } from '../interfaces/payment.interface';
import * as mongoose from 'mongoose';
const autoIncrement = require('mongoose-sequence')(mongoose);
const paymentSchema = new mongoose.Schema({
    id: Number,
    reservationId: String,
    unitTypeId: Number,
    dueDate: Number,
    paymentItems: [{ feeName: String, feeType: String, feeValue: String, originalPrice: String, percentValue: String }],
    status: { type: String, default: PaymentStatus.PENDING },
    collector: { type: String, default: PaymentCollector.BIRDNEST },
    paymentType: { type: String, default: PaymentType.CASH },
    receipt: {
        receiptId: String,
        receiptUrl: String
    },
    attempts: [
        {
            invoiceId: String,
            attemptDate: Number,
            paymentType: String,
            attemptStatus: String,
            collectedBy: String
        }
    ],
    modifiedByUsername: String,
    modifiedById: String,
    createdByUsername: String,
    createdById: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
paymentSchema.plugin(autoIncrement, { id: 'paymentId_counter', inc_field: 'id', start_seq: 1 });
const paymentModel = mongoose.model('Payment', paymentSchema);
export default paymentModel;
//# sourceMappingURL=payment.model.js.map