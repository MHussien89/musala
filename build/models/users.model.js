import * as mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,
    name: String,
    created_at: Number,
    role: String,
    createdAt: { type: Date, default: Date.now }
});
const userModel = mongoose.model('User', userSchema);
export default userModel;
//# sourceMappingURL=users.model.js.map