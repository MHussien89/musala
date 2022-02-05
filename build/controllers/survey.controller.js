import surveyService from '../services/survey.service';
import logger from '../logger/logger';
class SurveyController {
    constructor() {
        this.surveyService = new surveyService();
        /**
         * get all surveys and aslo contains query params object that user can use it in search and pagination
         * @module surveyModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getSurveys = async (req, res, next) => {
            try {
                let query = null;
                if (req.query.page && req.query.limit) {
                    logger.debug(`receive get all surveys pagination params page:${req.query.page} limit:${req.query.limit} SurveyController getSurveys`);
                    const page = Number(req.query.page);
                    const limit = Number(req.query.limit);
                    query = { page, limit };
                }
                logger.debug('call findAllSurveys prompts service SurveyController getSurveys');
                const { surveys, count } = await this.surveyService.findAllSurveys(query, req.user);
                logger.debug('succesfully return from findAllSurveys SurveyController getSurveys');
                res.status(200).json({ count, data: surveys, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Fetch survey by ID
         * @module surveyModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getSurveyById = async (req, res, next) => {
            const surveyId = req.params.id;
            logger.debug(`receive survey id:${surveyId} SurveyController getSurveyById`);
            try {
                logger.debug('call findSurveyById  service SurveyController getSurveyById');
                const findOneSurvey = await this.surveyService.findSurveyByIdWrapper(surveyId, req.user);
                logger.debug('succesfully return from findSurveyById SurveyController getSurveyById');
                res.status(200).json({ data: findOneSurvey, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Create a new survey by authenticated user
         * @module surveyModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createSurvey = async (req, res, next) => {
            const surveyData = req.body;
            const userData = req.user;
            try {
                logger.debug(`receive survey Data:${JSON.stringify(surveyData)} SurveyController createSurvey`);
                logger.debug('call createSurvey service SurveyController createSurvey');
                const createSurveyData = await this.surveyService.createSurvey(surveyData, userData);
                logger.debug('succesfully return from createSurvey SurveyController createSurvey');
                res.status(201).json({ data: createSurveyData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Update existing survey by authorized user
         * @module surveyModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.updateSurvey = async (req, res, next) => {
            const surveyData = req.body;
            try {
                logger.debug(`receive survey Data:${JSON.stringify(surveyData)} SurveyController updateSurvey`);
                logger.debug('call updateSuvery service SurveyController updateSurvey');
                const updateSurveyData = await this.surveyService.updateSuvery(surveyData.id, surveyData, req.user);
                logger.debug('succesfully return from updateSurvey SurveyController updateSurvey');
                res.status(200).json({ data: updateSurveyData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Delete existing survey with authorized user
         * @module surveyModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.deleteSurvey = async (req, res, next) => {
            const surveyId = req.params.id;
            logger.debug(`receive survey id:${surveyId} SurveyController deleteSurvey`);
            try {
                logger.debug('call deleteSurveyData service SurveyController deleteSurvey');
                const deleteSurveyData = await this.surveyService.deleteSurveyData(surveyId, req.user);
                logger.debug('succesfully return from deleteSurveyData SurveyController deleteSurvey');
                res.status(200).json({ data: deleteSurveyData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
        this.uploadAssets = async (req, res, next) => {
            const userId = req.params.id;
            logger.debug(`receive user id:${userId} SurveyController uploadAssets`);
            try {
                logger.debug('call uploadAssets service SurveyController uploadAssets');
                const image = await this.surveyService.uploadAssets(req.file, userId);
                logger.debug('succesfully return from uploadAssets SurveyController uploadAssets');
                res.status(200).json({ data: image, message: 'uploaded' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default SurveyController;
//# sourceMappingURL=survey.controller.js.map