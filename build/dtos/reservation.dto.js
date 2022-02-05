var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNumber, IsObject, IsOptional, IsArray, IsEnum } from 'class-validator';
import 'reflect-metadata';
import { ReservationStatus } from '../interfaces/reservation.interface';
let CreateReservationDto = /** @class */ (() => {
    class CreateReservationDto {
    }
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateReservationDto.prototype, "unitTypeId", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateReservationDto.prototype, "roomId", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateReservationDto.prototype, "primaryGuestName", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateReservationDto.prototype, "passKey", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateReservationDto.prototype, "passKeyToken", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateReservationDto.prototype, "checkInDate", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateReservationDto.prototype, "checkOutDate", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateReservationDto.prototype, "bookingRequestId", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateReservationDto.prototype, "userId", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateReservationDto.prototype, "checkinToken", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateReservationDto.prototype, "checkinExpiresAt", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateReservationDto.prototype, "reservationUrl", void 0);
    __decorate([
        IsOptional(),
        IsString({ each: true }),
        IsArray(),
        __metadata("design:type", Array)
    ], CreateReservationDto.prototype, "guestIds", void 0);
    __decorate([
        IsOptional(),
        IsEnum(ReservationStatus),
        __metadata("design:type", String)
    ], CreateReservationDto.prototype, "status", void 0);
    return CreateReservationDto;
})();
export { CreateReservationDto };
export class ResrvationQuery {
}
let UpdateReservationDto = /** @class */ (() => {
    class UpdateReservationDto {
    }
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], UpdateReservationDto.prototype, "unitTypeId", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], UpdateReservationDto.prototype, "roomId", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], UpdateReservationDto.prototype, "checkInDate", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], UpdateReservationDto.prototype, "checkOutDate", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], UpdateReservationDto.prototype, "bookingRequestId", void 0);
    __decorate([
        IsOptional(),
        IsEnum(ReservationStatus),
        __metadata("design:type", String)
    ], UpdateReservationDto.prototype, "status", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], UpdateReservationDto.prototype, "token", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], UpdateReservationDto.prototype, "passKeyToken", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], UpdateReservationDto.prototype, "guestId", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], UpdateReservationDto.prototype, "comment", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], UpdateReservationDto.prototype, "primaryGuestName", void 0);
    return UpdateReservationDto;
})();
export { UpdateReservationDto };
let ReservationSearchDto = /** @class */ (() => {
    class ReservationSearchDto {
    }
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], ReservationSearchDto.prototype, "limit", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], ReservationSearchDto.prototype, "offset", void 0);
    __decorate([
        IsObject(),
        IsOptional(),
        __metadata("design:type", ResrvationQuery)
    ], ReservationSearchDto.prototype, "query", void 0);
    return ReservationSearchDto;
})();
export { ReservationSearchDto };
//# sourceMappingURL=reservation.dto.js.map