import areaModel from '../models/area.model';
import propertyModel from '../models/property.model';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import { v4 as uuid } from 'uuid';
import AttachmentService from './attachment.service';
class AreaService {
    constructor() {
        this.areas = areaModel;
        this.properties = propertyModel;
        this.areaErrors = errorConfig.AREA_MODULE;
        this.attachmentService = new AttachmentService();
    }
    /**
     * create a new area
     * @module areaModule
     * @function createArea
     * @param  {object} areaData - the data of newly created area
     * @return {Promise<Area>}
     */
    async createArea(areaData, dataStoredInToken) {
        if (isEmptyObject(areaData)) {
            throw new HttpException(this.areaErrors.CREATE_AREA.INVAlID_DATA);
        }
        const areaID = uuid();
        logger.debug(`try to create  new area  with id: ${areaID}  AreaService createArea`);
        const createAreaData = await this.areas.create(Object.assign({ id: areaID, nameIgnoreCase: areaData.name.toLowerCase(), createdById: dataStoredInToken.userId, createdByUsername: dataStoredInToken.email }, areaData));
        logger.debug(`succesfully  create  area  with id: ${areaID} and name: ${areaData.name} AreaService createArea`);
        const areaResponseDto = {
            id: createAreaData.id,
            name: createAreaData.name
        };
        return areaResponseDto;
    }
    /**
    * get all areas from database
    * @module areaModule
    * @function findAllAreas
    * @return {Promise<Area[]>}
    */
    async findAllAreas() {
        logger.debug('try to retrive areas from db AreaService findAllAreas');
        let areas = await this.areas.find();
        logger.debug('succesfully return areaas from db AreaService findAllAreas');
        let areaDtos = [];
        areas.forEach(a => {
            areaDtos.push({
                id: a.id,
                name: a.name,
                order: a.order,
                defaultImage: a.defaultImage,
                sponsoredImage: a.sponsoredImage
            });
        });
        return areaDtos;
    }
    async findAreaByIdWrapper(areaId, showErrorMessage) {
        const findArea = await this.findAreaById(areaId, showErrorMessage);
        return findArea;
    }
    /**
     * get one area from database by id
     * @module areaModule
     * @function findAreaById
     * @param  {string} Id - id of the area
     * @return {Promise<Area>}
     */
    async findAreaById(areaId, showErrorMessage) {
        logger.debug(`try to retrive one  area id:${areaId} from db AreaService findAreaById`);
        const findArea = await this.areas.findOne({ id: areaId }).lean();
        if (!findArea && showErrorMessage)
            throw new HttpException(this.areaErrors.FIND_AREA_BY_ID.NOT_FOUND);
        else if (!findArea)
            return null;
        logger.debug(`succesfully retrive one  area id:${areaId} from db AreaService findAreaById`);
        const areaResponseDto = {
            id: findArea.id,
            name: findArea.name,
            order: findArea.order,
            defaultImage: findArea.defaultImage,
            sponsoredImage: findArea.sponsoredImage
        };
        return areaResponseDto;
    }
    /**
   * get one area from database by id
   * @module areaModule
   * @function findAreaById
   * @param  {string} Id - id of the area
   * @return {Promise<Area>}
   */
    async findAreaByName(name) {
        logger.debug(`try to retrive one  area name:${name} from db AreaService findAreaById`);
        const findArea = await this.areas.findOne({ nameIgnoreCase: name.toLowerCase() }).lean();
        if (!findArea)
            throw new HttpException(this.areaErrors.FIND_AREA_BY_NAME.NOT_FOUND);
        logger.debug(`succesfully retrive one  area name: ${name} from db AreaService findAreaById`);
        const areaResponseDto = {
            id: findArea.id,
            name: findArea.name,
            order: findArea.order
        };
        return areaResponseDto;
    }
    /**
    * update an existing area by id
    * @module areaModule
    * @function updateArea
    * @param  {string} areaId - updated area id
    * @param  {object} areaData - the data of updated area
    * @return {Promise<Area>}
    */
    async updateArea(areaId, areaData, dataStoredInToken) {
        if (isEmptyObject(areaData)) {
            throw new HttpException(this.areaErrors.UPDATE_AREA.INVAlID_DATA);
        }
        logger.debug(`try to update  area  with id: ${areaId}  AreaService updateArea`);
        await this.changeOrders(areaId, areaData, dataStoredInToken);
        let updateAreaById;
        if (areaData.name) {
            updateAreaById = await this.areas.findOneAndUpdate({ id: areaId }, Object.assign(Object.assign({}, areaData), { nameIgnoreCase: areaData.name.toLowerCase(), modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email, lastUpdatedAt: Date.now() }));
        }
        else {
            updateAreaById = await this.areas.findOneAndUpdate({ id: areaId }, Object.assign(Object.assign({}, areaData), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email, lastUpdatedAt: Date.now() }));
        }
        if (!updateAreaById)
            throw new HttpException(this.areaErrors.UPDATE_AREA.NOT_FOUND);
        logger.debug(`succesfully update  area  with id: ${areaId}  AreaService updateArea`);
        return this.findAreaById(areaId, true);
    }
    async changeOrders(areaId, areaData, dataStoredInToken) {
        const areas = await this.findAllAreas();
        let areasToBeIncreased = [];
        const currentOrder = areas.filter(a => a.id == areaId)[0].order;
        if (areaData.order) {
            if (areaData.order < currentOrder) {
                areasToBeIncreased = areas.sort(function (a, b) {
                    return a.order - b.order;
                }).filter(a => areaData.order <= a.order && a.order < currentOrder);
                for (let i = 0; i < areasToBeIncreased.length; i++) {
                    // if (areasToBeUpdated[i].order != areaData.order) {
                    areasToBeIncreased[i].order = areasToBeIncreased[i].order + 1;
                    await this.areas.findOneAndUpdate({ id: areasToBeIncreased[i].id }, {
                        order: areasToBeIncreased[i].order,
                        modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email, lastUpdatedAt: Date.now()
                    });
                    // }
                }
            }
            else if (areaData.order > currentOrder) {
                areasToBeIncreased = areas.sort(function (a, b) {
                    return a.order - b.order;
                }).filter(a => areaData.order >= a.order && a.order > currentOrder);
                for (let i = 0; i < areasToBeIncreased.length; i++) {
                    // if (areasToBeUpdated[i].order != areaData.order) {
                    areasToBeIncreased[i].order = areasToBeIncreased[i].order - 1;
                    await this.areas.findOneAndUpdate({ id: areasToBeIncreased[i].id }, {
                        order: areasToBeIncreased[i].order,
                        modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email, lastUpdatedAt: Date.now()
                    });
                    // }
                }
            }
        }
    }
    /**
    * delete one area from database by id
    * @module areaModule
    * @function deleteAreaData
    * @param  {string} areaId - id of the area
    * @return {Promise<Area>}
    */
    async deleteAreaData(areaId) {
        logger.debug(`try to delete  area  with id: ${areaId}  AreaService deleteAreaData`);
        const findArea = await this.areas.findOne({ id: areaId }).lean();
        const findProperty = await this.properties.findOne({ areaNameIgnoreCase: findArea.name.toLowerCase(), isDeleted: false }).lean();
        if (findProperty) {
            throw new HttpException(this.areaErrors.DELETE_AREA_BY_ID.AREA_ASSIGNED);
        }
        const deleteAreaById = await this.areas.findOneAndRemove({ id: areaId });
        if (!deleteAreaById) {
            throw new HttpException(this.areaErrors.DELETE_AREA_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete area with id: ${areaId}  AreaService deleteAreaData`);
        const areaResponseDto = {
            id: deleteAreaById.id,
            name: deleteAreaById.name,
            order: deleteAreaById.order
        };
        return areaResponseDto;
    }
    async uploadDefaultImage(file, areaID, dataStoredInToken) {
        const findArea = await this.areas.findOne({ id: areaID }).lean();
        if (!findArea) {
            throw new HttpException(this.areaErrors.UPDATE_AREA.NOT_FOUND);
        }
        logger.debug(`try to upload area image  with id: ${areaID}  AreaService uploadImage`);
        const image = await this.attachmentService.uploadAssets(file, `amenities/${areaID}/defaultImage`);
        logger.debug(`succesfully upload  area image with id: ${areaID}  AreaService uploadImage`);
        findArea.defaultImage = image.Location;
        await this.areas.findOneAndUpdate({ id: areaID }, Object.assign(Object.assign({}, findArea), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findAreaById(areaID, true);
    }
    async uploadSponsoredImage(file, areaID, dataStoredInToken) {
        const findArea = await this.areas.findOne({ id: areaID }).lean();
        if (!findArea) {
            throw new HttpException(this.areaErrors.UPDATE_AREA.NOT_FOUND);
        }
        logger.debug(`try to upload area image  with id: ${areaID}  AreaService uploadImage`);
        const image = await this.attachmentService.uploadAssets(file, `area/${areaID}/sponsoredImage`);
        logger.debug(`succesfully upload  area image with id: ${areaID}  AreaService uploadImage`);
        findArea.sponsoredImage = image.Location;
        await this.areas.findOneAndUpdate({ id: areaID }, Object.assign(Object.assign({}, findArea), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findAreaById(areaID, true);
    }
}
export default AreaService;
//# sourceMappingURL=area.service.js.map