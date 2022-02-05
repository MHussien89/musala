var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNumber, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentType, PaymentAttemptStatus, PaymentCollector } from '../interfaces/payment.interface';
let PaymentItems = /** @class */ (() => {
    class PaymentItems {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PaymentItems.prototype, "feeName", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PaymentItems.prototype, "feeType", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], PaymentItems.prototype, "feeValue", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], PaymentItems.prototype, "originalPrice", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], PaymentItems.prototype, "percentValue", void 0);
    return PaymentItems;
})();
let PaymentAttempt = /** @class */ (() => {
    class PaymentAttempt {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PaymentAttempt.prototype, "attemptId", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PaymentAttempt.prototype, "invoiceId", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], PaymentAttempt.prototype, "attemptDate", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PaymentAttempt.prototype, "paymentType", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PaymentAttempt.prototype, "attemptStatus", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PaymentAttempt.prototype, "collectedBy", void 0);
    return PaymentAttempt;
})();
export { PaymentAttempt };
let CreatePaymentDto = /** @class */ (() => {
    class CreatePaymentDto {
    }
    __decorate([
        IsOptional(),
        IsString(),
        __metadata("design:type", String)
    ], CreatePaymentDto.prototype, "id", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], CreatePaymentDto.prototype, "reservationId", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], CreatePaymentDto.prototype, "unitTypeId", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", Number)
    ], CreatePaymentDto.prototype, "dueDate", void 0);
    __decorate([
        IsArray(),
        ValidateNested({ each: true }),
        Type(() => PaymentItems),
        __metadata("design:type", Array)
    ], CreatePaymentDto.prototype, "document", void 0);
    __decorate([
        IsArray(),
        IsOptional(),
        ValidateNested({ each: true }),
        Type(() => PaymentAttempt),
        __metadata("design:type", Array)
    ], CreatePaymentDto.prototype, "attempts", void 0);
    return CreatePaymentDto;
})();
export { CreatePaymentDto };
//# sourceMappingURL=payment.dto.js.map