import * as mongoose from 'mongoose';
const permissionsSchema = new mongoose.Schema({
    id: String,
    role: String,
    permissions: [String]
});
const permissionsModel = mongoose.model('permissions', permissionsSchema);
export default permissionsModel;
//# sourceMappingURL=permissions.model.js.map