import * as mongoose from 'mongoose';
import { Device } from '../interfaces/device.interface';
const autoIncrement = require('mongoose-sequence')(mongoose);

const deviceSchema = new mongoose.Schema({
  id: Number,
  uid: Number,
  vendor: String,
  date: Number,
  status: String,
  isDeleted: Boolean
},
  { timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' } });

  deviceSchema.plugin(autoIncrement, {
    id: 'deviceId_counter',
    inc_field: 'id',
    start_seq: 5000
  });

const deviceModel = mongoose.model<Device & mongoose.Document>('Device', deviceSchema);

export default deviceModel;
