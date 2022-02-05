import * as mongoose from 'mongoose';
import { Gateway } from '../interfaces/gateway.interface';
const autoIncrement = require('mongoose-sequence')(mongoose);

const gatewaySchema = new mongoose.Schema({
  serialNumber: String,
  name: String,
  ipAddress: String,
  devices: [String],
  isDeleted: Boolean
},
  { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });

  gatewaySchema.plugin(autoIncrement, {
    id: 'gatewayId_counter',
    inc_field: 'id',
    start_seq: 5000
  });

const gatewayModel = mongoose.model<Gateway & mongoose.Document>('Gateway', gatewaySchema);

export default gatewayModel;
