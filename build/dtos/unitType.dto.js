var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsArray, IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ReservationMode } from '../interfaces/unitType.interface';
let CreateUnitTypeDto = /** @class */ (() => {
    class CreateUnitTypeDto {
    }
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "id", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "name", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "propertyId", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "shortName", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "description", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "onboardingMessage", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "maxGuests", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "unitMeters", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "minStayDuration", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "maxStayDuration", void 0);
    __decorate([
        IsOptional(),
        IsBoolean(),
        __metadata("design:type", Boolean)
    ], CreateUnitTypeDto.prototype, "isFeatured", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "roomTypeUnits", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "currency", void 0);
    __decorate([
        IsOptional(),
        IsNumber(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "bedrooms", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "bathrooms", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "unitTypeLink", void 0);
    __decorate([
        IsEnum(ReservationMode),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "reservationMode", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "viewLink", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "unitPrice", void 0);
    __decorate([
        IsOptional(),
        __metadata("design:type", Array)
    ], CreateUnitTypeDto.prototype, "ratePlans", void 0);
    __decorate([
        IsOptional(),
        __metadata("design:type", Array)
    ], CreateUnitTypeDto.prototype, "units", void 0);
    __decorate([
        IsOptional(),
        __metadata("design:type", Array)
    ], CreateUnitTypeDto.prototype, "fees", void 0);
    __decorate([
        IsOptional(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "houseRules", void 0);
    __decorate([
        IsOptional(),
        IsString({ each: true }),
        IsArray(),
        __metadata("design:type", Array)
    ], CreateUnitTypeDto.prototype, "amenitiesIds", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "downPayment", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateUnitTypeDto.prototype, "insurance", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateUnitTypeDto.prototype, "unitTypeGroupId", void 0);
    return CreateUnitTypeDto;
})();
export { CreateUnitTypeDto };
//# sourceMappingURL=unitType.dto.js.map