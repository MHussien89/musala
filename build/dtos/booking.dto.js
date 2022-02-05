var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import 'reflect-metadata';
import { RequestStatus, CreatedBy } from '../interfaces/booking.interface';
let CreateBookingDto = /** @class */ (() => {
    class CreateBookingDto {
    }
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "phoneNumber", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "name", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "email", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "socialLink", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "moreInfo", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "gender", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateBookingDto.prototype, "unitTypeId", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "userId", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateBookingDto.prototype, "checkInDate", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateBookingDto.prototype, "checkOutDate", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "numberOfGuests", void 0);
    __decorate([
        IsEnum(CreatedBy),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "createdBy", void 0);
    __decorate([
        IsEnum(RequestStatus),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateBookingDto.prototype, "status", void 0);
    return CreateBookingDto;
})();
export { CreateBookingDto };
let VerifyOTPDto = /** @class */ (() => {
    class VerifyOTPDto {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], VerifyOTPDto.prototype, "requestId", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], VerifyOTPDto.prototype, "otp", void 0);
    return VerifyOTPDto;
})();
export { VerifyOTPDto };
let UpdateBookingDto = /** @class */ (() => {
    class UpdateBookingDto {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], UpdateBookingDto.prototype, "requestId", void 0);
    return UpdateBookingDto;
})();
export { UpdateBookingDto };
let PaymentDetailsDto = /** @class */ (() => {
    class PaymentDetailsDto {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PaymentDetailsDto.prototype, "requestId", void 0);
    return PaymentDetailsDto;
})();
export { PaymentDetailsDto };
let FinalizeBookingDto = /** @class */ (() => {
    class FinalizeBookingDto {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], FinalizeBookingDto.prototype, "requestId", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], FinalizeBookingDto.prototype, "status", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], FinalizeBookingDto.prototype, "rejectionReason", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], FinalizeBookingDto.prototype, "reservationId", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], FinalizeBookingDto.prototype, "token", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], FinalizeBookingDto.prototype, "bookedAt", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], FinalizeBookingDto.prototype, "screenedAt", void 0);
    return FinalizeBookingDto;
})();
export { FinalizeBookingDto };
//# sourceMappingURL=booking.dto.js.map