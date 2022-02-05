import * as multer from 'multer';
import { Router } from 'express';
import SurveysController from '../controllers/survey.controller';
import { CreateSurveyDto } from '../dtos/survey.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import authoriztionMddlewareFactory from '../middlewares/authorization.middleware';
const storage = multer.memoryStorage();
const upload = multer({ storage });
class SurveysRoute {
    constructor() {
        this.path = '/survey';
        this.router = Router();
        this.surveyController = new SurveysController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @swagger
         *  components:
         *    schemas:
         *      newSurvey:
         *        type: object
         *        required:
         *          - name
         *          - email
         *        properties:
         *          type:
         *            type: string
         *            description: survey type support sequential or smart.
         *          name:
         *            type: string
         *            description: name of survey.
         *          image:
         *            type: string
         *            description: image of survey.
         *          description:
         *            type: string
         *            description: description of survey.
         *          timeLimit:
         *            type: integer
         *            description: how many time each user can take this survey.
         *          promptsIDs:
         *            type: array
         *            description: list of prompts ids
         *        example:
         *           type: smart
         *           name: football survey
         *           image: imageUrl
         *           description: football survey ....
         *           timeLimit: 0
         *           promptsIDs: [{promptId: "fb3593d8-8354-4af1-97a2-cdd14cc767b9" , order: 1}]
         *      survey:
         *        type: object
         *        required:
         *          - name
         *          - email
         *        properties:
         *          type:
         *            type: string
         *            description: survey type support sequential or smart.
         *          name:
         *            type: string
         *            description: name of survey.
         *          image:
         *            type: string
         *            description: image of survey.
         *          description:
         *            type: string
         *            description: description of survey.
         *          timeLimit:
         *            type: integer
         *            description: how many time each user can take this survey.
         *          id:
         *            type: string
         *            description: survey id.
         *          promptsIDs:
         *            type: array
         *            description: list of prompts ids
         *        example:
         *           id: fb3593d8-8354-4af1-97a2-cdd14cc767b9
         *           type: smart
         *           name: football survey
         *           image: imageUrl
         *           description: football survey ....
         *           timeLimit: 0
         *           promptsIDs: [{promptId: "fb3593d8-8354-4af1-97a2-cdd14cc767b9" , order: 1}]
         *      nextSmartSurvey:
         *        type: object
         *        required:
         *          - sessionId
         *          - userId
         *          - promptId
         *          - surveyId
         *          - campaignId
         *        properties:
         *          sessionId:
         *            type: string
         *            description: id of the user session.
         *          userId:
         *            type: string
         *            description: user id.
         *          promptId:
         *            type: string
         *            description: current prompt id.
         *          surveyId:
         *            type: string
         *            description: survey id.
         *          campaignId:
         *            type: string
         *            description: campaign id.
         *        example:
         *           sessionId: fb3593d8-8354-4af1-97a2-cdd14cc767b9
         *           userId: mb3593d8-8354-4af1-97a2-cdd14cc767b9art
         *           promptId: fb3593d8-8354-4af1-97a2-cdd14cc767b9
         *           surveyId: ib3593d8-8354-4af1-97a2-cdd14cc767b9
         *           campaignId: b3593d8-8354-4af1-97a2-cdd14cc767b9
         *      errorSchema:
         *        type: object
         *        properties:
         *          message:
         *            type: string
         *            description: message of the error
         *          errorCode:
         *            type: string
         *            description: error code of the returned error
         *        example:
         *           message: survey name is required
         *           errorCode: Invalid-Request
         */
        /**
         * @swagger
         * tags:
         *   name: survey
         *   description: survey management
         */
        /**
         * @swagger
         * /survey:
         *   get:
         *     summary: This should retreive all surveys.
         *     tags: [survey]
         *     security:
         *      - bearerAuth: []
         *     description: This api to retrive all the surveys.
         *     parameters:
         *       - in: query
         *         name: page
         *         schema:
         *           type: integer
         *         description: The number of items to skip before starting to collect the result set
         *       - in: query
         *         name: limit
         *         schema:
         *           type: integer
         *         description: The numbers of items to return
         *     consumes:
         *       — application/json
         *     responses:
         *       200:
         *         description: receive all surveys with their id, name, description, image, type, promptsIDs and limit number.
         */
        this.router.get(`${this.path}`, authMiddleware, this.surveyController.getSurveys);
        /**
         * @swagger
         * /survey/{id}:
         *   paths:
         *     /survey/{id}:
         *   get:
         *     summary: This should retreive one survey by Id.
         *     tags: [survey]
         *     security:
         *      - bearerAuth: []
         *     description: This api to retrive one servey by id as .
         *     parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: string
         *        required: true
         *     consumes:
         *       — application/json
         *     responses:
         *       200:
         *         description: receive one survey with its id, name, description, image, type, promptsIDs, promptRecords and limit number.
         */
        this.router.get(`${this.path}/:id`, authMiddleware, this.surveyController.getSurveyById);
        /**
         * @swagger
         * path:
         *  /survey/:
         *    post:
         *      summary: Create a new survey
         *      tags: [survey]
         *      security:
         *        - bearerAuth: []
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/newSurvey'
         *      responses:
         *        "200":
         *          description: A survey schema
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/newSurvey'
         *        "400":
         *          description: error
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/errorSchema'
         */
        this.router.post(`${this.path}`, authMiddleware, authoriztionMddlewareFactory(['surveyFullAccess', 'surveyModifyAccess']), validationMiddleware(CreateSurveyDto), this.surveyController.createSurvey);
        /**
         * @swagger
         * path:
         *  /survey/:
         *    put:
         *      summary: update a existing survey
         *      tags: [survey]
         *      security:
         *        - bearerAuth: []
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/survey'
         *      responses:
         *        "200":
         *          description: A survey schema
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/survey'
         *        "400":
         *          description: error
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/errorSchema'
         */
        this.router.put(`${this.path}`, authMiddleware, authoriztionMddlewareFactory(['surveyFullAccess', 'surveyModifyAccess']), validationMiddleware(CreateSurveyDto, true), this.surveyController.updateSurvey);
        /**
         * @swagger
         * /survey/{id}:
         *   paths:
         *     /survey/{id}:
         *   delete:
         *     summary: This should delete one survey by Id.
         *     tags: [survey]
         *     description: This api to delete one servey by id .
         *     security:
         *      - bearerAuth: []
         *     parameters:
         *      - in: path
         *        name: id
         *        schema:
         *          type: string
         *        required: true
         *     consumes:
         *       — application/json
         *     responses:
         *       200:
         *         description: delete one servey.
         */
        this.router.delete(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['surveyFullAccess', 'surveyModifyAccess']), this.surveyController.deleteSurvey);
        this.router.post(`${this.path}/uploadAsset/:id`, upload.single('asset'), this.surveyController.uploadAssets);
    }
}
export default SurveysRoute;
//# sourceMappingURL=survey.route.js.map