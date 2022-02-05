import { ReservationMode } from '../interfaces/unitType.interface';
import unitTypeModel from '../models/unitType.model';
import { isEmptyObject } from '../utils/util';
import AmenityService from './amenity.service';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import AttachmentService from './attachment.service';
import { v4 as uuid } from 'uuid';
class UnitTypeService {
    constructor() {
        this.unitTypeModel = unitTypeModel;
        this.amenityService = new AmenityService();
        this.unitTypeErrors = errorConfig.UNIT_TYPE_MODULE;
        this.attachmentService = new AttachmentService();
    }
    /**
     * create a new unit type
     * @module unitTypeModule
     * @function createUnitType
     * @param  {object} unitTypeData - the data of newly created unit type
     * @return {Promise<UnitTypeResponseDto>}
     */
    async createUnitType(unitTypeData, dataStoredInToken) {
        if (isEmptyObject(unitTypeData)) {
            throw new HttpException(this.unitTypeErrors.CREATE_UNIT_TYPE.INVAlID_DATA);
        }
        logger.debug(`try to create  new unit type  with id: ${unitTypeData.id}  UnitTypeService createUnitType`);
        if (unitTypeData.ratePlans && unitTypeData.ratePlans.length > 0) {
            unitTypeData.ratePlans = unitTypeData.ratePlans.map((r) => {
                return Object.assign(Object.assign({}, r), { id: uuid() });
            });
        }
        if (unitTypeData.fees && unitTypeData.fees.length > 0) {
            unitTypeData.fees = unitTypeData.fees.map((r) => {
                return Object.assign(Object.assign({}, r), { id: uuid() });
            });
        }
        const createdUnitType = await this.unitTypeModel.create(Object.assign({ createdById: dataStoredInToken.userId, isDeleted: false, createdByUsername: dataStoredInToken.email }, unitTypeData));
        if (!unitTypeData.units) {
            createdUnitType.units = [
                {
                    unitId: `${createdUnitType.id}-0`,
                    shortName: `${createdUnitType.id}-defaultRoom`,
                    isActive: true
                }
            ];
            await this.unitTypeModel.findOneAndUpdate({ id: createdUnitType.id }, {
                units: [
                    {
                        unitId: `${createdUnitType.id}-0`,
                        shortName: `${createdUnitType.id}-defaultRoom`,
                        isActive: true
                    }
                ],
                urlLink: `${process.env.baseURlWebsite}unit/${createdUnitType.id}`,
                modifiedById: dataStoredInToken.userId,
                modifiedByUsername: dataStoredInToken.email
            });
        }
        else {
            await this.unitTypeModel.findOneAndUpdate({ id: createdUnitType.id }, {
                urlLink: `${process.env.baseURlWebsite}unit/${createdUnitType.id}`,
                modifiedById: dataStoredInToken.userId,
                modifiedByUsername: dataStoredInToken.email
            });
        }
        return this.findUnitTypeById(createdUnitType.id);
    }
    /**
     * get all unitTypes from database
     * @module unitTypeModule
     * @function findAllUnitTypes
     * @return {Promise<UnitTypeDto[]>}
     */
    async findAllUnitTypes() {
        logger.debug('try to retrive unit types from db UnitTypeService findAllUnitTypes');
        let unitTypes = await this.unitTypeModel.find({ isDeleted: false });
        logger.debug(`succesfully return unit types from db UnitTypeService findAllUnitTypes with length ${unitTypes.length}`);
        let unitTypeDtos = [];
        for (const a of unitTypes) {
            unitTypeDtos.push({
                unitTypeId: a.id,
                name: a.name,
                propertyId: a.propertyId,
                shortName: a.shortName,
                description: a.description,
                onboardingMessage: a.onboardingMessage,
                maxGuests: a.maxGuests,
                urlLink: a.urlLink,
                unitMeters: a.unitMeters,
                unitTypeGroupId: a.unitTypeGroupId,
                minStayDuration: a.minStayDuration,
                maxStayDuration: a.maxStayDuration,
                availableFrom: a.availableFrom,
                isFeatured: a.isFeatured,
                isDeleted: a.isDeleted,
                roomTypeUnits: a.roomTypeUnits,
                roomTypePhotos: a.roomTypePhotos,
                currency: a.currency,
                bedrooms: a.bedrooms,
                bathrooms: a.bathrooms,
                unitTypeLink: a.unitTypeLink,
                viewLink: a.viewLink,
                reservationMode: a.reservationMode,
                houseRules: a.houseRules,
                amenitiesIds: a.amenitiesIds,
                amenities: await this.getAmenityDetails(a.amenitiesIds),
                downPayment: a.downPayment,
                insurance: a.insurance,
                showRooms: a.showRooms,
                unitPrice: a.unitPrice,
                ratePlans: a.ratePlans,
                fees: a.fees,
                units: a.units && a.units.filter((u) => u.isActive)
            });
        }
        return unitTypeDtos;
    }
    async findUnitTypeByIdWrapper(unitTypeId) {
        const findUnitType = await this.findUnitTypeById(unitTypeId);
        return findUnitType;
    }
    /**
     * get one unit type from database by id
     * @module unitTypeModule
     * @function findUnitTypeById
     * @param  {string} Id - id of the unit type
     * @return {Promise<UnitTypeResponseDto>}
     */
    async findUnitTypeById(unitTypeId) {
        logger.debug(`try to retrive one  unit type id:${unitTypeId} from db UnitTypeService findUnitTypeById`);
        const findUnitType = await this.unitTypeModel.findOne({ id: unitTypeId }).lean();
        if (!findUnitType)
            throw new HttpException(this.unitTypeErrors.FIND_UNIT_TYPE_BY_ID.NOT_FOUND);
        logger.debug(`succesfully retrive unit type with id:${unitTypeId} from db UnitTypeService findUnitTypeById`);
        const unitTypeResponseDto = {
            unitTypeId: findUnitType.id,
            name: findUnitType.name,
            propertyId: findUnitType.propertyId,
            shortName: findUnitType.shortName,
            description: findUnitType.description,
            onboardingMessage: findUnitType.onboardingMessage,
            maxGuests: findUnitType.maxGuests,
            urlLink: findUnitType.urlLink,
            unitMeters: findUnitType.unitMeters,
            unitTypeGroupId: findUnitType.unitTypeGroupId,
            minStayDuration: findUnitType.minStayDuration,
            maxStayDuration: findUnitType.maxStayDuration,
            availableFrom: findUnitType.availableFrom,
            isFeatured: findUnitType.isFeatured,
            isDeleted: findUnitType.isDeleted,
            roomTypeUnits: findUnitType.roomTypeUnits,
            roomTypePhotos: findUnitType.roomTypePhotos,
            currency: findUnitType.currency,
            bedrooms: findUnitType.bedrooms,
            bathrooms: findUnitType.bathrooms,
            unitTypeLink: findUnitType.unitTypeLink,
            viewLink: findUnitType.viewLink,
            reservationMode: findUnitType.reservationMode || ReservationMode.MONTHLY,
            amenitiesIds: findUnitType.amenitiesIds,
            amenities: await this.getAmenityDetails(findUnitType.amenitiesIds),
            houseRules: findUnitType.houseRules,
            downPayment: findUnitType.downPayment,
            insurance: findUnitType.insurance,
            showRooms: findUnitType.showRooms,
            unitPrice: findUnitType.unitPrice,
            ratePlans: findUnitType.ratePlans,
            fees: findUnitType.fees,
            units: findUnitType.units && findUnitType.units.filter((u) => u.isActive)
        };
        return unitTypeResponseDto;
    }
    async findUnitTypeByIds(unitTypeIds, isFeatured) {
        logger.debug(`try to populate  unit types with ids:${unitTypeIds} from db UnitTypeService findUnitTypeByIds`);
        let findUnitTypes;
        if (unitTypeIds && isFeatured) {
            findUnitTypes = await this.unitTypeModel
                .find({ id: { $in: unitTypeIds }, isFeatured: true, isDeleted: false })
                .lean();
        }
        else if (unitTypeIds) {
            findUnitTypes = await this.unitTypeModel
                .find({ id: { $in: unitTypeIds.map((u) => Number(u)) }, isDeleted: false })
                .lean();
        }
        else if (isFeatured) {
            findUnitTypes = await this.unitTypeModel.find({ isFeatured: true, isDeleted: false }).lean();
        }
        else {
            findUnitTypes = await this.unitTypeModel.find({ isDeleted: false }).lean();
        }
        if (!findUnitTypes || findUnitTypes.length == 0)
            throw new HttpException(this.unitTypeErrors.FIND_UNIT_TYPE_BY_ID.NOT_FOUND);
        logger.debug(`succesfully populate unit types with ids:${unitTypeIds} from db UnitTypeService findUnitTypeByIds`);
        let unitTypeDtos = [];
        for (const u of findUnitTypes) {
            unitTypeDtos.push({
                unitTypeId: u.id,
                name: u.name,
                shortName: u.shortName,
                propertyId: u.propertyId,
                description: u.description,
                urlLink: u.urlLink,
                onboardingMessage: u.onboardingMessage,
                maxGuests: u.maxGuests,
                unitMeters: u.unitMeters,
                unitTypeGroupId: u.unitTypeGroupId,
                minStayDuration: u.minStayDuration,
                maxStayDuration: u.maxStayDuration,
                availableFrom: u.availableFrom,
                isFeatured: u.isFeatured,
                isDeleted: u.isDeleted,
                roomTypeUnits: u.roomTypeUnits,
                roomTypePhotos: u.roomTypePhotos,
                currency: u.currency,
                bedrooms: u.bedrooms,
                bathrooms: u.bathrooms,
                unitTypeLink: u.unitTypeLink,
                viewLink: u.viewLink,
                reservationMode: u.reservationMode || ReservationMode.MONTHLY,
                houseRules: u.houseRules,
                amenitiesIds: u.amenitiesIds,
                amenities: await this.getAmenityDetails(u.amenitiesIds),
                downPayment: u.downPayment,
                insurance: u.insurance,
                showRooms: u.showRooms,
                unitPrice: u.unitPrice,
                ratePlans: u.ratePlans,
                fees: u.fees,
                units: u.units && u.units.filter((unit) => unit.isActive)
            });
        }
        return unitTypeDtos;
    }
    /**
     * update an existing unit type by id
     * @module unitTypeModule
     * @function updateUnitType
     * @param  {string} unitTypeId - updated unit type id
     * @param  {object} unitTypeData - the data of updated unit type
     * @return {Promise<UnitTypeResponseDto>}
     */
    async updateUnitType(unitTypeId, unitTypeData, dataStoredInToken) {
        if (isEmptyObject(unitTypeData)) {
            throw new HttpException(this.unitTypeErrors.UPDATE_UNIT_TYPE.INVAlID_DATA);
        }
        logger.debug(`try to update  unit type  with id: ${unitTypeId}  UnitTypeService updateUnitType`);
        const updateUnitTypeById = await this.unitTypeModel.findOneAndUpdate({ id: unitTypeId }, Object.assign(Object.assign({}, unitTypeData), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email, lastUpdatedAt: Date.now() }), { upsert: true, new: true });
        if (!updateUnitTypeById)
            throw new HttpException(this.unitTypeErrors.UPDATE_UNIT_TYPE.NOT_FOUND);
        logger.debug(`succesfully update  unit type  with id: ${unitTypeId}  UnitTypeService updateUnitType`);
        return this.findUnitTypeById(unitTypeId);
    }
    /**
     * update an existing unit type by id
     * @module unitTypeModule
     * @function updateUnitType
     * @param  {string} unitTypeId - updated unit type id
     * @param  {object} unitTypeData - the data of updated unit type
     * @return {Promise<UnitTypeResponseDto>}
     */
    async updateAvailableFromDate(unitTypeId, availableFrom) {
        logger.debug(`try to update  unit type  with id: ${unitTypeId}  UnitTypeService updateUnitType`);
        const updateUnitTypeById = await this.unitTypeModel.findOneAndUpdate({ id: unitTypeId, isDeleted: false }, {
            availableFrom: availableFrom,
            lastUpdatedAt: Date.now()
        }, { upsert: true, new: true });
        if (!updateUnitTypeById)
            throw new HttpException(this.unitTypeErrors.UPDATE_UNIT_TYPE.NOT_FOUND);
        logger.debug(`succesfully update  unit type  with id: ${unitTypeId}  UnitTypeService updateUnitType`);
        return this.findUnitTypeById(unitTypeId);
    }
    /**
     * delete one unit type from database by id
     * @module unitTypeModule
     * @function deleteUnitTypeData
     * @param  {string} unitTypeId - id of the unit type
     * @return {Promise<UnitTypeResponseDto>}
     */
    async deleteUnitTypeData(unitTypeId, dataStoredInToken) {
        logger.debug(`try to delete  unit type  with id: ${unitTypeId}  UnitTypeService deleteUnitTypeData`);
        const deleteUnitTypeById = await this.unitTypeModel.findOneAndUpdate({ id: unitTypeId }, {
            isDeleted: true,
            modifiedById: dataStoredInToken.userId,
            modifiedByUsername: dataStoredInToken.email,
            lastUpdatedAt: Date.now()
        });
        if (!deleteUnitTypeById) {
            throw new HttpException(this.unitTypeErrors.DELETE_UNIT_TYPE_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete unit type with id: ${unitTypeId}  UnitTypeService deleteUnitTypeData`);
        return {
            unitTypeId: deleteUnitTypeById.id,
            name: deleteUnitTypeById.name,
            propertyId: deleteUnitTypeById.propertyId,
            shortName: deleteUnitTypeById.shortName,
            description: deleteUnitTypeById.description,
            urlLink: deleteUnitTypeById.urlLink,
            onboardingMessage: deleteUnitTypeById.onboardingMessage,
            maxGuests: deleteUnitTypeById.maxGuests,
            unitMeters: deleteUnitTypeById.unitMeters,
            unitTypeGroupId: deleteUnitTypeById.unitTypeGroupId,
            minStayDuration: deleteUnitTypeById.minStayDuration,
            maxStayDuration: deleteUnitTypeById.maxStayDuration,
            availableFrom: deleteUnitTypeById.availableFrom,
            isFeatured: deleteUnitTypeById.isFeatured,
            isDeleted: deleteUnitTypeById.isDeleted,
            roomTypeUnits: deleteUnitTypeById.roomTypeUnits,
            roomTypePhotos: deleteUnitTypeById.roomTypePhotos,
            currency: deleteUnitTypeById.currency,
            bedrooms: deleteUnitTypeById.bedrooms,
            bathrooms: deleteUnitTypeById.bathrooms,
            unitTypeLink: deleteUnitTypeById.unitTypeLink,
            reservationMode: deleteUnitTypeById.reservationMode,
            viewLink: deleteUnitTypeById.viewLink,
            houseRules: deleteUnitTypeById.houseRules,
            amenitiesIds: deleteUnitTypeById.amenitiesIds,
            downPayment: deleteUnitTypeById.downPayment,
            insurance: deleteUnitTypeById.insurance,
            showRooms: deleteUnitTypeById.showRooms,
            unitPrice: deleteUnitTypeById.unitPrice,
            ratePlans: deleteUnitTypeById.ratePlans,
            fees: deleteUnitTypeById.fees,
            units: deleteUnitTypeById.units && deleteUnitTypeById.units.filter((u) => u.isActive)
        };
    }
    async getAmenityDetails(amenityIds) {
        const amenities = await this.amenityService.findAmenityByIds(amenityIds);
        return amenities.map((a) => {
            return { id: a.id, name: a.name, image: a.image };
        });
    }
    /**
     * upload unit type showroom images to S3
     * @module unitTypeModule
     * @function uploadImage
     * @param  {file} file - show room image
     * @param  {string} unitTypeId - id of the unitType
     * @param  {string} roomName - name of the room
     * @return {Promise<UnitTypeResponseDto>}
     */
    async uploadShowRoomImage(file, unitTypeId, roomName, dataStoredInToken) {
        const findUnitType = await this.unitTypeModel
            .findOne({ id: unitTypeId, isDeleted: false })
            .lean();
        if (!findUnitType) {
            throw new HttpException(this.unitTypeErrors.UPLOAD_SHOW_ROOM.NOT_FOUND);
        }
        logger.debug(`try to upload show room image  with id: ${unitTypeId}  UnitTypeService uploadShowRoomImage`);
        const image = await this.attachmentService.uploadAssets(file, `unitTypes/${unitTypeId}/showrooms/${roomName}`);
        logger.debug(`succesfully upload  unitType image with id: ${unitTypeId}  UnitTypeService uploadShowRoomImage`);
        if (!findUnitType.showRooms)
            findUnitType.showRooms = [];
        const changedRooms = findUnitType.showRooms.filter((r) => r.roomName.toLowerCase() == roomName.toLowerCase());
        if (changedRooms.length == 0) {
            findUnitType.showRooms.push({
                roomId: uuid(),
                roomName: roomName,
                imagesList: [{ id: uuid(), url: image.Location, key: image.Key, order: 1 }]
            });
        }
        else {
            findUnitType.showRooms = findUnitType.showRooms.map((r) => {
                if (r.roomName.toLowerCase() == roomName.toLowerCase()) {
                    if (!r.imagesList)
                        r.imagesList = [{ id: uuid(), url: image.Location, key: image.Key, order: 1 }];
                    else
                        r.imagesList.push({
                            id: uuid(),
                            url: image.Location,
                            key: image.Key,
                            order: r.imagesList.length + 1
                        });
                }
                return r;
            });
        }
        const updateUnitType = await this.unitTypeModel.findOneAndUpdate({ id: unitTypeId, isDeleted: false }, Object.assign(Object.assign({}, findUnitType), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findUnitTypeById(unitTypeId);
    }
    /**
     * delete unitType image from S3
     * @module unitTypeModule
     * @function deleteShowRoom
     * @param  {string} unitTypeId - id of the unitType
     * @param  {string} imageId - id of the room
     * @param  {string} imageId - id of the image
     * @return {Promise<UnitType>}
     */
    async deleteShowRoom(unitTypeId, roomId, imageId, dataStoredInToken) {
        const findUnitType = await this.unitTypeModel
            .findOne({ id: unitTypeId, isDeleted: false })
            .lean();
        if (!findUnitType) {
            throw new HttpException(this.unitTypeErrors.UPDATE_UNIT_TYPE.NOT_FOUND);
        }
        const roomObjectObject = findUnitType.showRooms.filter((room) => room.roomId == roomId)[0];
        const imageObject = roomObjectObject.imagesList.filter((image) => image.id == imageId)[0];
        roomObjectObject.imagesList = roomObjectObject.imagesList.filter((i) => i.id != imageId);
        for (var i = imageObject.order - 1; i < roomObjectObject.imagesList.length; i++) {
            roomObjectObject.imagesList[i].order = i + 1;
        }
        findUnitType.showRooms = findUnitType.showRooms.map((room) => {
            if (room.roomId == roomId) {
                return roomObjectObject;
            }
            else {
                return room;
            }
        });
        logger.debug(`try to delete unitType showroom image  with id: ${imageId}  UnitTypeService deleteShowRoom`);
        await this.attachmentService.deleteAssets(imageObject.key);
        logger.debug(`succesfully delete  unitType showroom image with id: ${imageId}  UnitTypeService deleteShowRoom`);
        await this.unitTypeModel.findOneAndUpdate({ id: unitTypeId, isDeleted: false }, Object.assign(Object.assign({}, findUnitType), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findUnitTypeById(unitTypeId);
    }
    /**
     * upload unitType image to S3
     * @module unitTypeModule
     * @function uploadImage
     * @param  {file} file - unitType image
     * @param  {string} unitTypeId - id of the unitType
     * @return {Promise<UnitType>}
     */
    async uploadImage(file, unitTypeId, dataStoredInToken) {
        const findUnitType = await this.unitTypeModel
            .findOne({ id: unitTypeId, isDeleted: false })
            .lean();
        if (!findUnitType) {
            throw new HttpException(this.unitTypeErrors.UPDATE_UNIT_TYPE.NOT_FOUND);
        }
        logger.debug(`try to upload unitType image  with id: ${unitTypeId}  UnitTypeService uploadImage`);
        const image = await this.attachmentService.uploadAssets(file, `unitTypes/${unitTypeId}/images`);
        logger.debug(`succesfully upload  unitType image with id: ${unitTypeId}  UnitTypeService uploadImage`);
        const imageId = uuid();
        if (findUnitType.roomTypePhotos)
            findUnitType.roomTypePhotos.push({
                id: imageId,
                url: image.Location,
                key: image.Key,
                order: findUnitType.roomTypePhotos.length + 1
            });
        else
            findUnitType.roomTypePhotos = [
                { id: imageId, url: image.Location, key: image.Key, order: 1 }
            ];
        await this.unitTypeModel.findOneAndUpdate({ id: unitTypeId, isDeleted: false }, Object.assign(Object.assign({}, findUnitType), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findUnitTypeById(unitTypeId);
    }
    /**
     * delete unitType image from S3
     * @module unitTypeModule
     * @function deleteImage
     * @param  {string} unitTypeId - id of the unitType
     * @param  {string} imageId - id of the image
     * @return {Promise<UnitType>}
     */
    async deleteImage(unitTypeId, imageId, dataStoredInToken) {
        const findUnitType = await this.unitTypeModel
            .findOne({ id: unitTypeId, isDeleted: false })
            .lean();
        if (!findUnitType) {
            throw new HttpException(this.unitTypeErrors.UPDATE_UNIT_TYPE.NOT_FOUND);
        }
        const imageObject = findUnitType.roomTypePhotos.filter((image) => image.id == imageId)[0];
        findUnitType.roomTypePhotos = findUnitType.roomTypePhotos.filter((i) => i.id != imageId);
        for (var i = imageObject.order - 1; i < findUnitType.roomTypePhotos.length; i++) {
            findUnitType.roomTypePhotos[i].order = i + 1;
        }
        logger.debug(`try to delete unitType image  with id: ${imageId}  UnitTypeService deleteImage`);
        await this.attachmentService.deleteAssets(imageObject.key);
        logger.debug(`succesfully delete  unitType image with id: ${imageId}  UnitTypeService deleteImage`);
        await this.unitTypeModel.findOneAndUpdate({ id: unitTypeId, isDeleted: false }, Object.assign(Object.assign({}, findUnitType), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email }));
        return this.findUnitTypeById(unitTypeId);
    }
}
export default UnitTypeService;
//# sourceMappingURL=unitType.service.js.map