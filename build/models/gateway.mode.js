import * as mongoose from 'mongoose';
const gatewaySchema = new mongoose.Schema({
    serialNumber: String,
    name: String,
    ipAddress: String,
    devices: [{
            uid: Number,
            vendor: String,
            date: Date,
            status: String
        }]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });
const gatewayModel = mongoose.model('ArGatewayea', gatewaySchema);
export default gatewayModel;
//# sourceMappingURL=gateway.mode.js.map