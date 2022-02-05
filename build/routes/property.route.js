import * as multer from 'multer';
import { Router } from 'express';
import PropertController from '../controllers/property.controller';
import { CreatePropertyDto } from '../dtos/property.dto';
import validationMiddleware from '../middlewares/validation.middleware';
import authoriztionMddlewareFactory from '../middlewares/authorization.middleware';
import authMiddleware from '../middlewares/auth.middleware';
const storage = multer.memoryStorage();
const upload = multer({ storage });
class PropertyRoute {
    constructor() {
        this.path = '/property';
        this.router = Router();
        this.propertyController = new PropertController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        /**
         * @swagger
         *  components:
         *    schemas:
         *      createProperty:
         *        type: object
         *        required:
         *          - name
         *          - description
         *          - location
         *          - areaName
         *          - coverImage
         *          - images
         *          - unitTypeIds
         *        properties:
         *          name:
         *            type: string
         *            description: Name of the property.
         *          description:
         *            type: string
         *            description: Description of the property
         *          location:
         *            $ref: '#/components/schemas/location'
         *            description: Location of the property
         *          areaName:
         *            type: string
         *            description: Area name of the property.
         *          coverImage:
         *            type: string
         *            description: Cover image of the property.
         *          images:
         *            type: array
         *            description: list of images
         *          unitTypeIds:
         *            type: array
         *            description: list of unit type ids
         *        example:
         *           name: VIP Property
         *           description: VIP property for VIP visitors
         *           location:
         *             address: AUC district area
         *             longitude: 31.477898
         *             latitude: 30.005493
         *             shortAddress: AUC - New Cairo
         *             city: New Cairo
         *             state: Cairo
         *           areaName: New Cairo
         *           coverImage: image URL
         *           images: [image1,image2,image2]
         *           unitTypeIds: [unitTypeId1,unitTypeId2,unitTypeId3,unitTypeId4]
         *      property:
         *        type: object
         *        required:
         *          - id
         *          - name
         *          - description
         *          - location
         *          - areaName
         *          - coverImage
         *          - images
         *          - unitTypeIds
         *        properties:
         *          id:
         *            type: string
         *            description: Id of the property.
         *          name:
         *            type: string
         *            description: Name of the property.
         *          description:
         *            type: string
         *            description: Description of the property
         *          location:
         *            $ref: '#/components/schemas/location'
         *            description: Location of the property
         *          areaName:
         *            type: string
         *            description: Area name of the property.
         *          coverImage:
         *            type: string
         *            description: Cover image of the property.
         *          images:
         *            type: array
         *            description: list of images
         *          unitTypeIds:
         *            type: array
         *            description: list of unit type ids
         *        example:
         *           name: VIP Property
         *           description: VIP property for VIP visitors
         *           location:
         *             address: AUC district area
         *             longitude: 31.477898
         *             latitude: 30.005493
         *             shortAddress: AUC - New Cairo
         *             city: New Cairo
         *             state: Cairo
         *           areaName: New Cairo
         *           coverImage: image URL
         *           images: [image1,image2,image2]
         *           unitTypeIds: [unitTypeId1,unitTypeId2,unitTypeId3,unitTypeId4]
         *      location:
         *        type: object
         *        required:
         *          - address
         *          - longitude
         *          - latitude
         *          - shortAddress
         *          - city
         *          - state
         *        properties:
         *          address:
         *            type: string
         *            description: Location address
         *          longitude:
         *            type: string
         *            description: Address longitude
         *          latitude:
         *            type: string
         *            description: Address latitude
         *          shortAddress:
         *            type: string
         *            description: Address Short description
         *          city:
         *            type: string
         *            description: Address city
         *          state:
         *            type: string
         *            description: Address state
         *        example:
         *           address: AUC district area
         *           longitude: 31.477898
         *           latitude: 30.005493
         *           shortAddress: AUC - New Cairo
         *           city: New Cairo
         *           state: Cairo
         *      searchProperty:
         *        type: object
         *        properties:
         *          offset:
         *            type: string
         *            description: The number of items to skip before starting to collect the result set
         *          limit:
         *            type: string
         *            description: The numbers of items to return
         *          query:
         *            $ref: '#/components/schemas/query'
         *            description: Search query
         *        example:
         *           offset: 1
         *           limit: 5
         *           query:
         *             areaName: New Cairo
         *      query:
         *        type: object
         *        properties:
         *          areaName:
         *            type: string
         *            description: Area name of the property
         *        example:
         *          areaName: New Cairo
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
         *           message: property name is required
         *           errorCode: Invalid-Request
        */
        /**
         * @swagger
         * path:
         *  /property:
         *    post:
         *      summary: Create a new property
         *      tags: [property]
         *      security:
         *        - bearerAuth: []
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/createProperty'
         *      responses:
         *        "200":
         *          description: A property schema
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/property'
         *        "400":
         *          description: error
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/errorSchema'
         */
        this.router.post(`${this.path}`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), validationMiddleware(CreatePropertyDto), this.propertyController.createProperty);
        /**
         * @swagger
         * /property/search:
         *   post:
         *     summary: This should retreive all properties.
         *     tags: [property]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/searchProperty'
         *     description: This api to retrive all the properties.
         *     consumes:
         *       — application/json
         *     responses:
         *       200:
         *         description: receive all properties with their id, name, description, location, areaName, coverImage, images and unitTypeIds.
         *         type: array
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/property'
         */
        this.router.post(`${this.path}/search`, this.propertyController.getProperties);
        /**
         * @swagger
         * /property/{id}:
         *   paths:
         *     /property/{id}:
         *   get:
         *     summary: This should retreive one property by Id.
         *     tags: [property]
         *     security:
         *      - bearerAuth: []
         *     description: This api to retrive one property by id.
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
         *         description: receive one property with its id, name, description, location, areaName, coverImage, images and unitTypeIds.
         */
        this.router.get(`${this.path}/:id`, this.propertyController.getPropertyById);
        /**
         * @swagger
         * path:
         *  /property:
         *    put:
         *      summary: update a existing property
         *      tags: [property]
         *      security:
         *        - bearerAuth: []
         *      requestBody:
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/property'
         *      responses:
         *        "200":
         *          description: A property schema
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/property'
         *        "400":
         *          description: error
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/errorSchema'
         */
        this.router.put(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), validationMiddleware(CreatePropertyDto, true), this.propertyController.updateProperty);
        /**
         * @swagger
         * /property/{id}:
         *   paths:
         *     /property/{id}:
         *   delete:
         *     summary: This should delete one property by Id.
         *     tags: [property]
         *     description: This api to delete one property by id .
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
         *         description: delete one property.
         */
        this.router.delete(`${this.path}/:id`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess']), this.propertyController.deleteProperty);
        this.router.post(`${this.path}/uploadImage`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), upload.single('asset'), this.propertyController.uploadImage);
        this.router.post(`${this.path}/uploadCover`, authMiddleware, authoriztionMddlewareFactory(['propertiesFullAccess', 'propertiesModifyAccess']), upload.single('asset'), this.propertyController.uploadCover);
    }
}
export default PropertyRoute;
//# sourceMappingURL=property.route.js.map