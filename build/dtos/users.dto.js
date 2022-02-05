var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsString, IsEnum } from 'class-validator';
import { UserType } from '../interfaces/users.interface';
let CreateUserDto = /** @class */ (() => {
    class CreateUserDto {
    }
    __decorate([
        IsEmail(),
        __metadata("design:type", String)
    ], CreateUserDto.prototype, "email", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateUserDto.prototype, "password", void 0);
    __decorate([
        IsString(),
        IsEnum(UserType),
        __metadata("design:type", String)
    ], CreateUserDto.prototype, "role", void 0);
    return CreateUserDto;
})();
export { CreateUserDto };
let RegisterUserDto = /** @class */ (() => {
    class RegisterUserDto {
    }
    __decorate([
        IsEmail(),
        __metadata("design:type", String)
    ], RegisterUserDto.prototype, "email", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], RegisterUserDto.prototype, "password", void 0);
    return RegisterUserDto;
})();
export { RegisterUserDto };
let LoginUserDto = /** @class */ (() => {
    class LoginUserDto {
    }
    __decorate([
        IsEmail(),
        __metadata("design:type", String)
    ], LoginUserDto.prototype, "email", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], LoginUserDto.prototype, "password", void 0);
    return LoginUserDto;
})();
export { LoginUserDto };
let ForgotPasswordDto = /** @class */ (() => {
    class ForgotPasswordDto {
    }
    __decorate([
        IsEmail(),
        __metadata("design:type", String)
    ], ForgotPasswordDto.prototype, "email", void 0);
    return ForgotPasswordDto;
})();
export { ForgotPasswordDto };
let ChangePasswordDto = /** @class */ (() => {
    class ChangePasswordDto {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], ChangePasswordDto.prototype, "token", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], ChangePasswordDto.prototype, "password", void 0);
    return ChangePasswordDto;
})();
export { ChangePasswordDto };
//# sourceMappingURL=users.dto.js.map