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
import { Gender } from '../interfaces/property.interface';
import 'reflect-metadata';
let CreatePropertyDto = /** @class */ (() => {
    class CreatePropertyDto {
    }
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreatePropertyDto.prototype, "name", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreatePropertyDto.prototype, "description", void 0);
    __decorate([
        IsOptional(),
        __metadata("design:type", Object)
    ], CreatePropertyDto.prototype, "location", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreatePropertyDto.prototype, "areaId", void 0);
    __decorate([
        IsOptional(),
        IsString(),
        IsEnum(Gender),
        __metadata("design:type", String)
    ], CreatePropertyDto.prototype, "gender", void 0);
    __decorate([
        IsOptional(),
        IsArray(),
        __metadata("design:type", Array)
    ], CreatePropertyDto.prototype, "unitTypeIds", void 0);
    __decorate([
        IsOptional(),
        IsString({ each: true }),
        IsArray(),
        __metadata("design:type", Array)
    ], CreatePropertyDto.prototype, "amenitiesIds", void 0);
    __decorate([
        IsOptional(),
        IsBoolean(),
        __metadata("design:type", Boolean)
    ], CreatePropertyDto.prototype, "isFeatured", void 0);
    return CreatePropertyDto;
})();
export { CreatePropertyDto };
let GetPropertyDto = /** @class */ (() => {
    class GetPropertyDto {
    }
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], GetPropertyDto.prototype, "offset", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], GetPropertyDto.prototype, "limit", void 0);
    return GetPropertyDto;
})();
export { GetPropertyDto };
//# sourceMappingURL=property.dto.js.map