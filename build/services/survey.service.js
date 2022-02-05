var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import HttpException from '../exceptions/HttpException';
import surveyModel from '../models/survey.model';
import { isEmptyObject } from '../utils/util';
import { v4 as uuid } from 'uuid';
import { errorConfig } from '../exceptions/error-confg';
import { UserType } from '../interfaces/users.interface';
import * as AWS from 'aws-sdk';
import * as stream from 'stream';
import { awsConfig } from '../config/aws-config';
import logger from '../logger/logger';
import { authDecorator } from '../decorators/authorization.decorator';
const s3 = new AWS.S3({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey
});
let SurveyService = /** @class */ (() => {
    class SurveyService {
        constructor() {
            this.surveys = surveyModel;
            this.campingErrors = errorConfig.CAMPAIGN_MODULE;
            this.surveysErrors = errorConfig.SURVEY_MODULE;
            this.responseErrors = errorConfig.RESPONSE_MODULE;
            this.promptErrors = errorConfig.promptModule;
        }
        /**
         * get all survey from database
         * @module surveyModule
         * @function findAllSurveys
         * @param  {Object} query - contains query parm like page number and size and it's an optional
         * @return {Promise<{surveys:Survey[], totalCount:number}>}
         */
        async findAllSurveys(query, userData) {
            logger.debug('try to retrive survyes counts from db SurveyService findAllSurveys');
            const surveysCount = await this.surveys.countDocuments(userData.role === UserType.PROPERTY_ADMIN ? { createdByID: userData._id } : {});
            logger.debug(`successfully retrive survyes count from db ${surveysCount} SurveyService findAllSurveys`);
            const surveyQuery = { skip: 0, limit: 0 };
            if (query) {
                if (query.page && query.limit) {
                    surveyQuery.skip = query.limit * (query.page - 1);
                    surveyQuery.limit = query.limit;
                }
            }
            logger.debug('try to retrive survyes from db SurveyService findAllSurveys');
            const surveys = await this.surveys.find(userData.role === UserType.PROPERTY_ADMIN ? { createdByID: userData._id } : {}, {}, surveyQuery);
            logger.debug('succesfully return survyes from db SurveyService findAllSurveys');
            return { surveys, count: surveysCount };
        }
        async findSurveyByIdWrapper(surveyId, userData) {
            const findSurvey = await this.findSurveyById(surveyId);
            return findSurvey;
        }
        /**
         * get one survey from database by id
         * @module surveyModule
         * @function findSurveyById
         * @param  {string} surveyId - id of the survey
         * @return {Promise<Survey>}
         */
        async findSurveyById(surveyId) {
            logger.debug(`try to retrive one  survey id:${surveyId} from db SurveyService findSurveyById`);
            const findSurvey = await this.surveys.findOne({ id: surveyId }).lean();
            if (!findSurvey)
                throw new HttpException(this.surveysErrors.FIND_SURVEY_BY_ID.NOT_FOUND);
            logger.debug(`succesfully retrive one  survey id:${surveyId} from db SurveyService findSurveyById`);
            logger.debug(`try to populate all survey prompts survey id:${surveyId} from db SurveyService findSurveyById`);
            logger.debug(`succesfully populate all survey prompts survey id:${surveyId} from db SurveyService findSurveyById`);
            return findSurvey;
        }
        /**
         * create a new survey by authenticated user
         * @module surveyModule
         * @function createSurvey
         * @param  {object} surveyData - the data of newly created survey
         * @param  {object} userData - the user that create survey
         * @return {Promise<Survey>}
         */
        async createSurvey(surveyData, userData) {
            if (isEmptyObject(surveyData)) {
                throw new HttpException(this.surveysErrors.CREATE_SURVEY.INVAlID_DATA);
            }
            const surveyID = uuid();
            logger.debug(`try to create  survey  with id: ${surveyID}  SurveyService createSurvey`);
            const createSurveyData = await this.surveys.create(Object.assign(Object.assign({}, surveyData), { id: surveyID, createdBy: userData.email, createdByID: userData._id }));
            logger.debug(`succesfully  create  survey  with id: ${surveyID}  SurveyService createSurvey`);
            return createSurveyData;
        }
        /**
         * update an existing survey by id and authenticated user
         * @module surveyModule
         * @function updateSuvery
         * @param  {string} surveyId - updated survey id
         * @param  {object} surveyData - the data of newly created survey
         * @return {Promise<Survey>}
         */
        async updateSuvery(surveyId, surveyData, userData) {
            if (isEmptyObject(surveyData)) {
                throw new HttpException(this.surveysErrors.UPDATE_SURVEY.INVAlID_DATA);
            }
            logger.debug(`try to update  survey  with id: ${surveyId}  SurveyService updateSuvery`);
            const updateSurveyById = await this.surveys.findOneAndUpdate({ id: surveyId }, Object.assign(Object.assign({}, surveyData), { lastUpdatedAt: Date.now() }));
            if (!updateSurveyById)
                throw new HttpException(this.surveysErrors.UPDATE_SURVEY.NOT_FOUND);
            logger.debug(`succesfully update  survey  with id: ${surveyId}  SurveyService updateSuvery`);
            return updateSurveyById;
        }
        /**
         * delete one survey from database by id
         * @module surveyModule
         * @function deleteSurveyData
         * @param  {string} surveyId - id of the survey
         * @return {Promise<Survey>}
         */
        async deleteSurveyData(surveyId, userData) {
            logger.debug(`try to delete  survey  with id: ${surveyId}  SurveyService deleteSurveyData`);
            const deleteSurveyById = await this.surveys.findOneAndRemove({ id: surveyId });
            if (!deleteSurveyById) {
                throw new HttpException(this.surveysErrors.DELETE_SURVEY_BY_ID.NOT_FOUND);
            }
            logger.debug(`succesfully delete  survey  with id: ${surveyId}  SurveyService deleteSurveyData`);
            return deleteSurveyById;
        }
        /**
         * upload one file
         * @module surveyModule
         * @function uploadAssets
         * @param  {string} file - file to be saved
         * @return {Promise<Survey>}
         */
        async uploadAssets(file, userId) {
            if (file && file.buffer) {
                const fileName = file.originalname || '';
                const splitedName = fileName.split('.').filter((el) => {
                    return el;
                });
                if (splitedName.length <= 1) {
                    splitedName.push(new Date().getTime().toString());
                }
                else {
                    splitedName.splice(splitedName.length - 1, 0, new Date().getTime().toString());
                }
                let assestsName;
                if (splitedName.length === 1) {
                    assestsName = splitedName.join('');
                }
                else {
                    assestsName = splitedName.join('.');
                }
                logger.debug(`format assets name for survey ${assestsName} SurveyService uploadAssets`);
                const bufferStream = new stream.PassThrough();
                bufferStream.end(file.buffer);
                const params = {
                    Bucket: awsConfig.assetsBucket,
                    Key: `${userId}/${assestsName}`,
                    ACL: 'public-read',
                    Body: bufferStream
                };
                return new Promise((resolve, reject) => {
                    logger.debug(`try to upload assets to aws bucket ${params.Bucket} key ${params.Key} SurveyService uploadAssets`);
                    s3.upload(params, (err, data) => {
                        if (err) {
                            logger.debug(`failed to upload assets to aws bucket ${params.Bucket} key ${params.Key} SurveyService uploadAssets`);
                            reject(err);
                        }
                        else {
                            logger.debug(`succesfully  upload image to aws bucket ${params.Bucket} key ${params.Key} SurveyService uploadAssets`);
                            resolve(data);
                        }
                    });
                });
            }
            throw new HttpException(this.surveysErrors.UPLOAD_SURVEY_IMAGE.INVALID_DATA);
        }
    }
    __decorate([
        authDecorator('findSurveyById', { userPath: { index: 1 }, findOnePath: { index: 0 } }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], SurveyService.prototype, "findSurveyByIdWrapper", null);
    __decorate([
        authDecorator('findSurveyById', { userPath: { index: 2 }, findOnePath: { index: 0 } }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Object]),
        __metadata("design:returntype", Promise)
    ], SurveyService.prototype, "updateSuvery", null);
    __decorate([
        authDecorator('findSurveyById', { userPath: { index: 1 }, findOnePath: { index: 0 } }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], SurveyService.prototype, "deleteSurveyData", null);
    return SurveyService;
})();
export default SurveyService;
//# sourceMappingURL=survey.service.js.map