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
import { GuestDocumentType } from '../interfaces/guest.interface';
let guestDocument = /** @class */ (() => {
    class guestDocument {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], guestDocument.prototype, "documentId", void 0);
    __decorate([
        IsString(),
        IsEnum(GuestDocumentType),
        __metadata("design:type", String)
    ], guestDocument.prototype, "type", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], guestDocument.prototype, "documentNumber", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], guestDocument.prototype, "documentIssueDate", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], guestDocument.prototype, "expirationDate", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], guestDocument.prototype, "issueCountry", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], guestDocument.prototype, "documentUrl", void 0);
    return guestDocument;
})();
let CreateGuestDto = /** @class */ (() => {
    class CreateGuestDto {
    }
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreateGuestDto.prototype, "id", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateGuestDto.prototype, "firstName", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateGuestDto.prototype, "lastName", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateGuestDto.prototype, "email", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateGuestDto.prototype, "phoneNumber", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateGuestDto.prototype, "dob", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateGuestDto.prototype, "gender", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreateGuestDto.prototype, "address", void 0);
    return CreateGuestDto;
})();
export { CreateGuestDto };
//# sourceMappingURL=guest.dto.js.map