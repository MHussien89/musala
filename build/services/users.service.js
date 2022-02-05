import * as bcrypt from 'bcrypt';
import HttpException from '../exceptions/HttpException';
import { UserType } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';
import { errorConfig } from '../exceptions/error-confg';
import AuthService from './auth.service';
class UserService {
    constructor() {
        this.users = userModel;
        this.usersErrors = errorConfig.userModule;
        this.authService = new AuthService();
    }
    async findAllUser() {
        const users = await this.users.find();
        return users;
    }
    async findUserById(userId) {
        const findUser = await this.users.findById(userId);
        if (!findUser)
            throw new HttpException(this.usersErrors.FIND_USER_BY_ID.NOT_FOUND);
        return findUser;
    }
    async createUser(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(this.usersErrors.CREATE_USER.INVAlID_DATA);
        const findUser = await this.users.findOne({ email: userData.email });
        if (findUser) {
            throw new HttpException(this.usersErrors.CREATE_USER.INVAlID_EMAIL(userData));
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData = await this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword, role: UserType.PROPERTY_ADMIN }));
        return createUserData;
    }
    async updateUser(userId, userData) {
        if (isEmptyObject(userData))
            throw new HttpException(this.usersErrors.UPDATE_USER.INVAlID_DATA);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const updateUserById = await this.users.findByIdAndUpdate(userId, Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        if (!updateUserById)
            throw new HttpException(this.usersErrors.UPDATE_USER.NOT_FOUND);
        return updateUserById;
    }
    async deleteUserData(userId) {
        const deleteUserById = await this.users.findByIdAndDelete(userId);
        if (!deleteUserById)
            throw new HttpException(this.usersErrors.DELETE_USER_BY_ID.NOT_FOUND);
        return deleteUserById;
    }
}
export default UserService;
//# sourceMappingURL=users.service.js.map