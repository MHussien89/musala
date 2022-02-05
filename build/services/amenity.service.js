import amenitiesModel from '../models/amenity.model';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import { v4 as uuid } from 'uuid';
import AttachmentService from './attachment.service';
class AmenityService {
    constructor() {
        this.amenities = amenitiesModel;
        this.amenitiesErrors = errorConfig.AMENITIES_MODULE;
        this.attachmentService = new AttachmentService();
    }
    /**
     * create a new amenity
     * @module amenityModule
     * @function createAMenity
     * @param  {object} amenityData - the data of newly created amenity
     * @return {Promise<Amenity>}
     */
    async createAmenity(amenityData, dataStoredInToken) {
        if (isEmptyObject(amenityData)) {
            throw new HttpException(this.amenitiesErrors.CREATE_AMENITIES.INVAlID_DATA);
        }
        const amenityID = uuid();
        logger.debug(`try to create  new amenity  with id: ${amenityID}  AmenityService createAmenity`);
        const createAmenityData = await this.amenities.create(Object.assign({ id: amenityID, nameIgnoreCase: amenityData.name.toLowerCase(), createdById: dataStoredInToken.userId, createdByUsername: dataStoredInToken.email }, amenityData));
        logger.debug(`succesfully  create  amenity  with id: ${amenityID} and name: ${amenityData.name} AmenityService createAmenity`);
        const AmenityResponseDto = {
            id: createAmenityData.id,
            name: createAmenityData.name,
            createdAt: createAmenityData.createdAt,
            createdById: createAmenityData.createdById,
            createdByUsername: createAmenityData.createdByUsername
        };
        return AmenityResponseDto;
    }
    /**
    * get all amenities from database
    * @module amenityModule
    * @function findAllAmenities
    * @return {Promise<Amenity[]>}
    */
    async findAllAmenities() {
        logger.debug('try to retrive Amenities from db AmenityService findAllAmenities');
        let amenities = await this.amenities.find();
        logger.debug('succesfully return Amenities from db AmenityService findAllAmenities');
        const amenitiesDtos = [];
        amenities.forEach(a => {
            amenitiesDtos.push({
                id: a.id,
                name: a.name,
                image: a.image,
                createdAt: a.createdAt,
                createdById: a.createdById,
                createdByUsername: a.createdByUsername,
                modifiedAt: a.modifiedAt,
                modifiedById: a.modifiedById,
                modifiedByUsername: a.modifiedByUsername
            });
        });
        return amenitiesDtos;
    }
    async findAmenityByIdWrapper(amenityId) {
        const findAmenity = await this.findAmenityById(amenityId);
        return findAmenity;
    }
    /**
     * get one amenity from database by id
     * @module amenityModule
     * @function findAmenityById
     * @param  {string} Id - id of the amenity
     * @return {Promise<Amenity>}
     */
    async findAmenityById(amenityId) {
        logger.debug(`try to populate  amenity with amenity id:${amenityId} from db AmenityService findAmenityById`);
        const findAmenity = await this.amenities.findOne({ id: amenityId }).lean();
        if (!findAmenity)
            throw new HttpException(this.amenitiesErrors.FIND_AMENITIES_BY_ID.NOT_FOUND);
        logger.debug(`succesfully populate amenity with amenity id:${amenityId} from db AmenityService findAmenityById`);
        const amenityDto = {
            id: findAmenity.id,
            name: findAmenity.name,
            image: findAmenity.image,
            createdAt: findAmenity.createdAt,
            createdById: findAmenity.createdById,
            createdByUsername: findAmenity.createdByUsername,
            modifiedAt: findAmenity.modifiedAt,
            modifiedById: findAmenity.modifiedById,
            modifiedByUsername: findAmenity.modifiedByUsername
        };
        return amenityDto;
    }
    async findAmenityByIds(amenityIds) {
        logger.debug(`try to populate  amenities with ids:${amenityIds} from db AmenityService findAmenityById`);
        const findAmenities = await this.amenities.find({ id: { $in: amenityIds } }).lean();
        if (!findAmenities)
            throw new HttpException(this.amenitiesErrors.FIND_AMENITIES_BY_ID.NOT_FOUND);
        logger.debug(`succesfully populate amenities with ids:${amenityIds} from db AmenityService findAmenityById`);
        return findAmenities;
    }
    /**
    * update an existing amenity by id
    * @module amenityModule
    * @function updateAmenity
    * @param  {string} amenityId - updated amenity id
    * @param  {object} amenityData - the data of updated amenity
    * @return {Promise<Amenity>}
    */
    async updateAmenity(amenityId, amenityData, dataStoredInToken) {
        if (isEmptyObject(amenityData)) {
            throw new HttpException(this.amenitiesErrors.UPDATE_AMENITIES.INVAlID_DATA);
        }
        logger.debug(`try to update  amenity  with id: ${amenityId}  AmenityService updateAmenity`);
        const updateAmenityById = await this.amenities.findOneAndUpdate({ id: amenityId }, Object.assign(Object.assign({}, amenityData), { nameIgnoreCase: amenityData.name.toLowerCase(), modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email, lastUpdatedAt: Date.now() }));
        if (!updateAmenityById)
            throw new HttpException(this.amenitiesErrors.UPDATE_AMENITIES.NOT_FOUND);
        logger.debug(`succesfully update  amenity  with id: ${amenityId}  AmenityService updateAmenity`);
        return this.findAmenityById(amenityId);
    }
    /**
    * delete one amenity from database by id
    * @module amenityModule
    * @function deleteAmenityData
    * @param  {string} amenityId - id of the amenity
    * @return {Promise<Amenity>}
    */
    async deleteAmenityData(amenityId) {
        logger.debug(`try to delete  amenity  with id: ${amenityId}  AmenityService deleteAmenityData`);
        const deleteAmenityById = await this.amenities.findOneAndRemove({ id: amenityId });
        if (!deleteAmenityById) {
            throw new HttpException(this.amenitiesErrors.DELETE_AMENITIES_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete amenity with id: ${amenityId}  AmenityService deleteAmenityData`);
        const amenityResponseDto = {
            id: deleteAmenityById.id,
            name: deleteAmenityById.name,
            image: deleteAmenityById.image,
            createdAt: deleteAmenityById.createdAt,
            createdById: deleteAmenityById.createdById,
            createdByUsername: deleteAmenityById.createdByUsername,
            modifiedAt: deleteAmenityById.modifiedAt,
            modifiedById: deleteAmenityById.modifiedById,
            modifiedByUsername: deleteAmenityById.modifiedByUsername
        };
        return amenityResponseDto;
    }
    /**
   * upload amenity image to S3
   * @module amenityModule
   * @function uploadImage
   * @param  {file} file - amenity image
   * @param  {string} amenityId - id of the amenity
   * @return {Promise<amenity>}
   */
    async uploadImage(file, amenityId, dataStoredInToken) {
        const findAmenity = await this.amenities.findOne({ id: amenityId }).lean();
        if (!findAmenity) {
            throw new HttpException(this.amenitiesErrors.UPLOAD_AMENITY.NOT_FOUND);
        }
        logger.debug(`try to upload amenity image  with id: ${amenityId}  AmenityService uploadImage`);
        const image = await this.attachmentService.uploadAssets(file, `amenities/${amenityId}/image`);
        logger.debug(`succesfully upload  amenity image with id: ${amenityId}  AmenityService uploadImage`);
        findAmenity.image = image.Location;
        await this.amenities.findOneAndUpdate({ id: amenityId }, Object.assign(Object.assign({}, findAmenity), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findAmenityById(amenityId);
    }
}
export default AmenityService;
//# sourceMappingURL=amenity.service.js.map