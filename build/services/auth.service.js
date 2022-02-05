import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';
import { UserType } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';
import { errorConfig } from '../exceptions/error-confg';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import { awsConfig } from '../config/aws-config';
AWS.config.accessKeyId = awsConfig.accessKeyId;
AWS.config.secretAccessKey = awsConfig.secretAccessKey;
AWS.config.region = 'us-east-2';
class AuthService {
    constructor() {
        this.users = userModel;
        this.authErrors = errorConfig.authModule;
    }
    async register(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(this.authErrors.REGISTER.INVALID_DATA);
        const findUser = await this.users.findOne({ email: userData.email.toLowerCase() });
        if (findUser) {
            throw new HttpException(this.authErrors.REGISTER.INVALID_EMAIL(userData));
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData = await this.users.create({
            id: uuid(),
            email: userData.email.toLowerCase(),
            password: hashedPassword,
            role: UserType.PROPERTY_ADMIN
        });
        await sendWelcomeMail(userData.email);
        return this.login(userData);
    }
    async login(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(this.authErrors.LOGIN.INVAlID_DATA);
        const findUser = await this.users.findOne({ email: userData.email.toLowerCase() });
        if (!findUser)
            throw new HttpException(this.authErrors.LOGIN.INVAlID_EMAIL(userData));
        const isPasswordMatching = await bcrypt.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException(this.authErrors.LOGIN.INVAlID_PASSWORD);
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser, tokenData };
    }
    /**
     * send forgot password request
     * @module authModule
     * @function forgotPassword
     * @param  {string} email - email that user want to reset the password for
     * @return {Promise<any>}
     */
    async forgotPassword(email) {
        if (!email)
            throw new HttpException(this.authErrors.FORGOT_PASSWORD.INVALID_DATA);
        const findUser = await this.users.findOne({ email });
        if (!findUser)
            throw new HttpException(this.authErrors.LOGOUT.NOT_FOUND);
        const tempToken = this.createTempToken(email);
        return sendForgotPasswordEmail(email, tempToken.token);
    }
    /**
     * change old password with new password
     * @module authModule
     * @function changePassword
     * @param  {Object} ChangePasswordDto - token and new password that will be used to change old passwrod
     * @return {Promise<any>}
     */
    async changePassword(changePasswordDto) {
        // tslint:disable-next-line: prettier
        if (isEmptyObject(changePasswordDto)) {
            throw new HttpException(this.authErrors.CHANGE_PASSWPRD.INVAlID_DATA);
        }
        const verfiyToken = await this.verfiyTempToken(changePasswordDto.token);
        if (!verfiyToken)
            throw new HttpException(this.authErrors.CHANGE_PASSWPRD.WRONG_TOKEN);
        try {
            const verificationResponse = jwt.verify(changePasswordDto.token, process.env.JWT_TEMP_SECRET || 'property_manager_temp_jwt');
            const hashedPassword = await bcrypt.hash(changePasswordDto.password, 10);
            const findUser = await this.users.findOneAndUpdate({ email: verificationResponse.email }, { password: hashedPassword });
            if (!findUser)
                throw new HttpException(this.authErrors.CHANGE_PASSWPRD.NOT_FOUND);
            return this.login({ email: findUser.email, password: changePasswordDto.password });
        }
        catch (ex) {
            throw new HttpException(this.authErrors.CHANGE_PASSWPRD.WRONG_TOKEN);
        }
    }
    async logout(userData) {
        if (isEmptyObject(userData))
            throw new HttpException(this.authErrors.LOGOUT.INVAlID_DATA);
        const findUser = await this.users.findOne({ password: userData.password });
        if (!findUser)
            throw new HttpException(this.authErrors.LOGOUT.NOT_FOUND);
        return findUser;
    }
    createTempToken(email) {
        const dataStoredInToken = {
            email
        };
        const secret = process.env.JWT_TEMP_SECRET || 'athena_temp_jwt';
        const expiresIn = 10000;
        return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
    }
    async verfiyTempToken(token) {
        const secret = process.env.JWT_TEMP_SECRET || 'athena_temp_jwt';
        try {
            const verificationResponse = jwt.verify(token, secret);
            const userEmail = verificationResponse.email;
            const findUser = await userModel.findOne({ email: userEmail });
            if (findUser) {
                return true;
            }
            return false;
        }
        catch (ex) {
            return false;
        }
    }
    createToken(user) {
        const dataStoredInToken = {
            _id: user._id,
            role: user.role,
            email: user.email,
            userId: user.id
        };
        const secret = process.env.JWT_SECRET || 'athena_jwt';
        const expiresIn = 60 * 60;
        return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn: '365d' }) };
    }
    async verfiyToken(token) {
        const secret = process.env.JWT_SECRET || 'athena_jwt';
        try {
            const verificationResponse = jwt.verify(token, secret);
            const userId = verificationResponse._id;
            const findUser = await userModel.findById(userId);
            if (findUser) {
                return true;
            }
            return false;
        }
        catch (ex) {
            return false;
        }
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
/**
 * send forgot pasword link to user
 * @function changePassword
 * @param  {string} email - email that user want to reset the password for
 * @param  {string} token - toke that user will use to change his password
 * @return {Promise<any>}
 */
function sendForgotPasswordEmail(email, token) {
    const params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `forgot your password? No worries! Just click on the link below to reset your password:\t\n${process.env.baseURlWebsite}auth/reset-password?token=${token}`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Reset password request'
            }
        },
        Source: 'support@birdnestlife.com'
    };
    const sendPromise = new AWS.SES({ apiVersion: '2010-12-01', region: 'us-east-1' })
        .sendEmail(params)
        .promise();
    return sendPromise
        .then((data) => {
        return data;
    })
        .catch((err) => {
        return err;
    });
}
async function sendWelcomeMail(email) {
    const params = {
        Destination: {
            ToAddresses: [email]
        },
        Template: 'welcomeemail-1611877918052',
        TemplateData: '{ "subject":"Welcome to BirdNest" }',
        Source: 'support@birdnestlife.com'
    };
    const sendPromise = new AWS.SES({ apiVersion: '2010-12-01', region: 'us-east-1' })
        .sendTemplatedEmail(params)
        .promise();
    return sendPromise
        .then((data) => {
        return data;
    })
        .catch((err) => {
        return err;
    });
}
export default AuthService;
//# sourceMappingURL=auth.service.js.map