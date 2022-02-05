var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNumber, IsString, IsOptional, IsEnum, IsArray, ValidateNested, IsBoolean, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { SurveyType } from '../interfaces/survey.interface';
import 'reflect-metadata';
let CreateSurveyDto = /** @class */ (() => {
    class CreateSurveyDto {
    }
    __decorate([
        Matches(/^[a-zA-Z0-9 _-]*$/, {
            message: 'survey name must not contain specail characters'
        }),
        IsString(),
        __metadata("design:type", String)
    ], CreateSurveyDto.prototype, "name", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateSurveyDto.prototype, "description", void 0);
    __decorate([
        IsString(),
        IsOptional(),
        __metadata("design:type", String)
    ], CreateSurveyDto.prototype, "image", void 0);
    __decorate([
        IsBoolean(),
        IsOptional(),
        __metadata("design:type", Boolean)
    ], CreateSurveyDto.prototype, "skipIntro", void 0);
    __decorate([
        IsNumber(),
        IsOptional(),
        __metadata("design:type", Number)
    ], CreateSurveyDto.prototype, "timeLimit", void 0);
    __decorate([
        IsString(),
        IsEnum(SurveyType),
        __metadata("design:type", String)
    ], CreateSurveyDto.prototype, "type", void 0);
    __decorate([
        IsOptional(),
        IsArray(),
        ValidateNested({ each: true }),
        Type(() => PromptsId),
        __metadata("design:type", Array)
    ], CreateSurveyDto.prototype, "promptsIds", void 0);
    return CreateSurveyDto;
})();
export { CreateSurveyDto };
let PromptsId = /** @class */ (() => {
    class PromptsId {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], PromptsId.prototype, "promptId", void 0);
    __decorate([
        IsNumber(),
        __metadata("design:type", String)
    ], PromptsId.prototype, "order", void 0);
    return PromptsId;
})();
let NextSmartSurveyPromptsDto = /** @class */ (() => {
    class NextSmartSurveyPromptsDto {
    }
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], NextSmartSurveyPromptsDto.prototype, "sessionId", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], NextSmartSurveyPromptsDto.prototype, "userId", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], NextSmartSurveyPromptsDto.prototype, "promptId", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], NextSmartSurveyPromptsDto.prototype, "surveyId", void 0);
    __decorate([
        IsString(),
        __metadata("design:type", String)
    ], NextSmartSurveyPromptsDto.prototype, "campaignId", void 0);
    return NextSmartSurveyPromptsDto;
})();
export { NextSmartSurveyPromptsDto };
//# sourceMappingURL=survey.dto.js.map