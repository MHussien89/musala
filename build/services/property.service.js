import unitTypeModel from '../models/unitType.model';
import { CoverSize } from '../interfaces/image-size.interface';
import propertyModel from '../models/property.model';
import AreaService from './area.service';
import AmenityService from './amenity.service';
import AttachmentService from './attachment.service';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import { v4 as uuid } from 'uuid';
class PropertyService {
    constructor() {
        this.properties = propertyModel;
        this.unitTypeModel = unitTypeModel;
        this.propertyErrors = errorConfig.PROPERTY_MODULE;
        this.areaService = new AreaService();
        this.amenityService = new AmenityService();
        this.attachmentService = new AttachmentService();
    }
    /**
     * create a new property
     * @module propertyModule
     * @function createProperty
     * @param  {object} propertyData - the data of newly created property
     * @return {Promise<Property>}
     */
    async createProperty(propertyData, dataStoredInToken) {
        if (isEmptyObject(propertyData)) {
            throw new HttpException(this.propertyErrors.CREATE_PROPERTY.INVAlID_DATA);
        }
        const propertyID = uuid();
        logger.debug(`try to create  new property  with id: ${propertyID}  PropertyService createProperty`);
        let createPropertyData = await this.properties.create(Object.assign(Object.assign({}, propertyData), { isDeleted: false, urlLink: `${process.env.baseURlWebsite}property/${propertyID}`, id: propertyID, createdById: dataStoredInToken.userId, createdByUsername: dataStoredInToken.email }));
        logger.debug(`succesfully  create  property  with name: ${propertyData.name}  PropertyService createProperty`);
        return this.findPropertyById(propertyID);
    }
    /**
     * get all properties from database
     * @module propertyModule
     * @function findAllProperties
     * @param  {Object} query - contains query parm like page number and size and it's an optional
     * @return {Promise<{properties:Property[], totalCount:number}>}
     */
    async findAllProperties(getPropertiesData) {
        logger.debug('try to retrive properties counts from db PropertyService findAllProperties');
        const propertiesCount = await this.properties.countDocuments();
        logger.debug(`successfully retrive properties count from db ${propertiesCount} PropertyService findAllProperties`);
        const propertyQuery = { skip: 0, limit: 0 };
        if (typeof getPropertiesData.offset === 'number' &&
            typeof getPropertiesData.limit === 'number') {
            propertyQuery.skip = getPropertiesData.limit * (getPropertiesData.offset - 1);
            propertyQuery.limit = getPropertiesData.limit;
        }
        else {
            propertyQuery.skip = undefined;
            propertyQuery.limit = undefined;
        }
        const areaNameQuery = getPropertiesData.query && getPropertiesData.query.areaName;
        const areaIdQuery = getPropertiesData.query && getPropertiesData.query.areaId;
        let properties;
        logger.debug('try to retrive properties from db PropertyService findAllProperties');
        let savedArea;
        if (areaNameQuery) {
            properties = await this.properties
                .find({ areaNameIgnoreCase: areaNameQuery.toLowerCase() }, {}, propertyQuery)
                .lean();
        }
        else if (areaIdQuery) {
            properties = await this.properties
                .find({ areaId: getPropertiesData.query.areaId }, {}, propertyQuery)
                .lean();
        }
        else {
            properties = await this.properties.find().lean();
        }
        let propertyResponseDtos = [];
        for (const p of properties) {
            savedArea = await this.areaService.findAreaByIdWrapper(p.areaId, false);
            propertyResponseDtos.push({
                id: p.id,
                name: p.name,
                description: p.description,
                areaId: savedArea && savedArea.id,
                areaName: savedArea && savedArea.name,
                gender: p.gender,
                images: p.images,
                urlLink: p.urlLink,
                isFeatured: p.isFeatured || false,
                coverImage: p.coverImage,
                unitTypeIds: p.unitTypeIds,
                amenities: await this.getAmenityDetails(p.amenitiesIds),
                location: p.location,
                createdById: p.createdById,
                createdByUsername: p.createdByUsername,
                modifiedById: p.modifiedById,
                modifiedByUsername: p.modifiedByUsername,
                lastModifiedDate: p.modifiedAt
            });
        }
        logger.debug('succesfully return properties from db PropertyService findAllProperties');
        return { properties: propertyResponseDtos, count: propertiesCount };
    }
    async findPropertiesByAreaId(areaId) {
        logger.debug('try to retrive properties counts from db PropertyService findAllProperties');
        console.log(areaId);
        let properties = await this.properties
            .find({ areaId: areaId })
            .lean();
        console.log(properties);
        let savedArea;
        let propertyResponseDtos = [];
        for (const p of properties) {
            savedArea = await this.areaService.findAreaByIdWrapper(p.areaId, false);
            propertyResponseDtos.push({
                id: p.id,
                name: p.name,
                description: p.description,
                areaId: savedArea && savedArea.id,
                areaName: savedArea && savedArea.name,
                gender: p.gender,
                images: p.images,
                urlLink: p.urlLink,
                isFeatured: p.isFeatured || false,
                coverImage: p.coverImage,
                unitTypeIds: p.unitTypeIds,
                amenities: await this.getAmenityDetails(p.amenitiesIds),
                location: p.location,
                createdById: p.createdById,
                createdByUsername: p.createdByUsername,
                modifiedById: p.modifiedById,
                modifiedByUsername: p.modifiedByUsername,
                lastModifiedDate: p.modifiedAt
            });
        }
        logger.debug('succesfully return properties from db PropertyService findAllProperties');
        return { properties: propertyResponseDtos };
    }
    async getAmenityDetails(amenityIds) {
        const amenities = await this.amenityService.findAmenityByIds(amenityIds);
        return amenities.map((a) => {
            return { id: a.id, name: a.name, image: a.image };
        });
    }
    async findPropertyByIdWrapper(propertyId) {
        const findProperty = await this.findPropertyById(propertyId);
        return findProperty;
    }
    /**
     * get one property from database by id
     * @module propertyModule
     * @function findPropertyById
     * @param  {string} Id - id of the property
     * @return {Promise<Property>}
     */
    async findPropertyById(propertyId) {
        logger.debug(`try to retrive one  property id:${propertyId} from db PropertyService findPropertyById`);
        const findProperty = await this.properties.findOne({ id: propertyId }).lean();
        if (!findProperty)
            throw new HttpException(this.propertyErrors.FIND_PROPERTY_BY_ID.NOT_FOUND);
        logger.debug(`succesfully retrive one  property id:${propertyId} from db PropertyService findPropertyById`);
        let savedArea;
        if (findProperty.areaId) {
            savedArea = await this.areaService.findAreaByIdWrapper(findProperty.areaId, false);
        }
        const propertyResponseDto = {
            id: findProperty.id,
            name: findProperty.name,
            description: findProperty.description,
            areaId: savedArea && savedArea.id,
            areaName: savedArea && savedArea.name,
            gender: findProperty.gender,
            urlLink: findProperty.urlLink,
            images: findProperty.images,
            coverImage: findProperty.coverImage,
            unitTypeIds: findProperty.unitTypeIds,
            isFeatured: findProperty.isFeatured || false,
            amenities: await this.getAmenityDetails(findProperty.amenitiesIds),
            location: findProperty.location,
            createdById: findProperty.createdById,
            createdByUsername: findProperty.createdByUsername,
            modifiedById: findProperty.modifiedById,
            modifiedByUsername: findProperty.modifiedByUsername,
            lastModifiedDate: findProperty.modifiedAt
        };
        return propertyResponseDto;
    }
    async findPropertyByIUnitTypeId(unitTypeId) {
        logger.debug(`try to retrive one  property id:${unitTypeId} from db PropertyService findPropertyByIUnitTypeId`);
        const findProperty = await this.properties
            .findOne({ unitTypeIds: Number(unitTypeId) })
            .lean();
        if (!findProperty)
            throw new HttpException(this.propertyErrors.FIND_PROPERTY_BY_UNITTYPE_ID.NOT_FOUND);
        logger.debug(`succesfully retrive one  property id:${unitTypeId} from db PropertyService findPropertyByIUnitTypeId`);
        let savedArea = await this.areaService.findAreaByIdWrapper(findProperty.areaId, false);
        const propertyResponseDto = {
            id: findProperty.id,
            name: findProperty.name,
            description: findProperty.description,
            areaId: savedArea && savedArea.id,
            areaName: savedArea && savedArea.name,
            gender: findProperty.gender,
            urlLink: findProperty.urlLink,
            images: findProperty.images,
            isFeatured: findProperty.isFeatured || false,
            coverImage: findProperty.coverImage,
            unitTypeIds: findProperty.unitTypeIds,
            amenities: await this.getAmenityDetails(findProperty.amenitiesIds),
            location: findProperty.location,
            createdById: findProperty.createdById,
            createdByUsername: findProperty.createdByUsername,
            modifiedById: findProperty.modifiedById,
            modifiedByUsername: findProperty.modifiedByUsername,
            lastModifiedDate: findProperty.modifiedAt
        };
        return propertyResponseDto;
    }
    /**
     * update an existing property by id
     * @module propertyModule
     * @function updateProperty
     * @param  {string} propertyId - updated property id
     * @param  {object} propertyData - the data of updated property
     * @return {Promise<Property>}
     */
    async updateProperty(propertyId, propertyData, dataStoredInToken) {
        if (isEmptyObject(propertyData)) {
            throw new HttpException(this.propertyErrors.UPDATE_PROPERTY.INVAlID_DATA);
        }
        logger.debug(`try to update  property  with id: ${propertyId}  PropertyService updateProperty`);
        let updatePropertyById = await this.properties.findOneAndUpdate({ id: propertyId }, Object.assign(Object.assign({}, propertyData), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        let unitTypes = await this.unitTypeModel.find({ propertyId: propertyId });
        unitTypes = unitTypes && propertyData.unitTypeIds && unitTypes.filter(u => !propertyData.unitTypeIds.includes(u.id));
        if (unitTypes && unitTypes.length > 0) {
            for (let i = 0; i < unitTypes.length; i++) {
                await this.unitTypeModel.findOneAndUpdate({ id: unitTypes[i].id }, {
                    propertyId: undefined,
                    modifiedById: dataStoredInToken.userId,
                    modifiedByUsername: dataStoredInToken.email,
                    lastUpdatedAt: Date.now()
                }, { upsert: true, new: true });
            }
        }
        if (propertyData.unitTypeIds && propertyData.unitTypeIds.length > 0) {
            for (let x = 0; x < propertyData.unitTypeIds.length; x++) {
                await this.unitTypeModel.findOneAndUpdate({ id: propertyData.unitTypeIds[x] }, {
                    propertyId: propertyId,
                    modifiedById: dataStoredInToken.userId,
                    modifiedByUsername: dataStoredInToken.email,
                    lastUpdatedAt: Date.now()
                }, { upsert: true, new: true });
            }
        }
        if (!updatePropertyById)
            throw new HttpException(this.propertyErrors.UPDATE_PROPERTY.NOT_FOUND);
        logger.debug(`succesfully update  property  with id: ${propertyId}  PropertyService updateProperty`);
        return this.findPropertyById(propertyId);
    }
    /**
     * delete one property from database by id
     * @module propertyModule
     * @function deletePropertyData
     * @param  {string} propertyId - id of the property
     * @return {Promise<Property>}
     */
    async deletePropertyData(propertyId, dataStoredInToken) {
        logger.debug(`try to delete  property  with id: ${propertyId}  PropertyService deletePropertyData`);
        const deletePropertyById = await this.properties.findOneAndUpdate({ id: propertyId }, {
            isDeleted: true,
            modifiedById: dataStoredInToken.userId,
            modifiedByUsername: dataStoredInToken.email
        });
        if (!deletePropertyById) {
            throw new HttpException(this.propertyErrors.DELETE_PROPERTY_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete  property  with id: ${propertyId}  PropertyService deletePropertyData`);
        let savedArea = await this.areaService.findAreaByIdWrapper(deletePropertyById.areaId, false);
        const propertyResponseDto = {
            id: deletePropertyById.id,
            name: deletePropertyById.name,
            description: deletePropertyById.description,
            areaName: savedArea && savedArea.name,
            areaId: savedArea && savedArea.id,
            urlLink: deletePropertyById.urlLink,
            gender: deletePropertyById.gender,
            images: deletePropertyById.images,
            isFeatured: deletePropertyById.isFeatured || false,
            coverImage: deletePropertyById.coverImage,
            unitTypeIds: deletePropertyById.unitTypeIds,
            amenities: await this.getAmenityDetails(deletePropertyById.amenitiesIds),
            location: deletePropertyById.location,
            createdById: deletePropertyById.createdById,
            createdByUsername: deletePropertyById.createdByUsername,
            modifiedById: deletePropertyById.modifiedById,
            modifiedByUsername: deletePropertyById.modifiedByUsername,
            lastModifiedDate: deletePropertyById.modifiedAt
        };
        return propertyResponseDto;
    }
    /**
     * upload property image to S3
     * @module propertyModule
     * @function uploadImage
     * @param  {file} file - property image
     * @param  {string} propertyId - id of the property
     * @return {Promise<Property>}
     */
    async uploadImage(file, propertyId, dataStoredInToken) {
        const findProperty = await this.properties.findOne({ id: propertyId }).lean();
        if (!findProperty) {
            throw new HttpException(this.propertyErrors.UPLOAD_PROPERTY.NOT_FOUND);
        }
        logger.debug(`try to upload property image  with id: ${propertyId}  PropertyService uploadImage`);
        const image = await this.attachmentService.uploadAssets(file, `properties/${propertyId}/image`);
        logger.debug(`succesfully upload  property image with id: ${propertyId}  PropertyService uploadImage`);
        findProperty.images.push(image.Location);
        const updatePropertyById = await this.properties.findOneAndUpdate({ id: propertyId }, Object.assign(Object.assign({}, findProperty), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findPropertyById(propertyId);
    }
    /**
     * upload property cover to S3
     * @module propertyModule
     * @function uploadCover
     * @param  {file} file - property cover
     * @param  {string} propertyId - id of the property
     * @return {Promise<Property>}
     */
    async uploadCover(file, propertyId, size, dataStoredInToken) {
        const findProperty = await this.properties.findOne({ id: propertyId }).lean();
        if (!findProperty) {
            throw new HttpException(this.propertyErrors.UPLOAD_PROPERTY.NOT_FOUND);
        }
        logger.debug(`try to upload property cover  with id: ${propertyId}  PropertyService uploadCover`);
        const cover = await this.attachmentService.uploadAssets(file, `properties/${propertyId}/cover/${size}`);
        logger.debug(`succesfully upload  property cover with id: ${propertyId}  PropertyService uploadCover`);
        switch (size) {
            case CoverSize.SMALL: {
                findProperty.coverImage = Object.assign(Object.assign({}, findProperty.coverImage), { sm: cover.Location });
                break;
            }
            case CoverSize.MEDIUM: {
                findProperty.coverImage = Object.assign(Object.assign({}, findProperty.coverImage), { md: cover.Location });
                break;
            }
            case CoverSize.LARGE: {
                findProperty.coverImage = Object.assign(Object.assign({}, findProperty.coverImage), { lg: cover.Location });
                break;
            }
        }
        const updatePropertyById = await this.properties.findOneAndUpdate({ id: propertyId }, Object.assign(Object.assign({}, findProperty), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findPropertyById(propertyId);
    }
}
export default PropertyService;
//# sourceMappingURL=property.service.js.map