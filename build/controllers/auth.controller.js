import AuthService from '../services/auth.service';
class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.register = async (req, res, next) => {
            const userData = req.body;
            try {
                const { cookie, findUser, tokenData } = await this.authService.register(userData);
                res.status(201).json({
                    data: {
                        email: findUser.email,
                        userId: findUser.id,
                        accessToken: tokenData.token,
                        tokenExpiresIn: tokenData.expiresIn
                    },
                    message: 'register'
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next) => {
            const userData = req.body;
            try {
                const { cookie, findUser, tokenData } = await this.authService.login(userData);
                res.status(200).json({
                    data: {
                        email: findUser.email,
                        userId: findUser.id,
                        role: findUser.role,
                        accessToken: tokenData.token,
                        tokenExpiresIn: tokenData.expiresIn
                    },
                    message: 'login'
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.forgotPassword = async (req, res, next) => {
            const forgotPasswordDto = req.body;
            try {
                const data = await this.authService.forgotPassword(forgotPasswordDto.email);
                res.status(200).json({ data, message: 'forgotPassword' });
            }
            catch (error) {
                next(error);
            }
        };
        this.changePassword = async (req, res, next) => {
            const changePasswordDto = req.body;
            try {
                const data = await this.authService.changePassword(changePasswordDto);
                res.status(200).json({
                    data: {
                        email: data.findUser.email,
                        userId: data.findUser.id,
                        role: data.findUser.role,
                        accessToken: data.tokenData.token,
                        tokenExpiresIn: data.tokenData.expiresIn
                    },
                    message: 'changePassword'
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.verifyToken = async (req, res, next) => {
            const authHeader = req.headers['authorization'];
            const authorizationToken = authHeader && authHeader.split(' ')[1];
            if (authorizationToken) {
                const isTokenValid = this.authService.verfiyToken(authorizationToken);
                if (isTokenValid) {
                    res.status(202).send();
                }
                else {
                    res.status(401).send();
                }
            }
            else {
                res.status(401).send();
            }
        };
        this.logOut = async (req, res, next) => {
            const userData = req.user;
            try {
                const logOutUserData = await this.authService.logout(userData);
                res.status(200).json({ data: logOutUserData, message: 'logout' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default AuthController;
//# sourceMappingURL=auth.controller.js.map