import unitTypeGroupModel from '../models/unitTypeGroup.model';
import unitTypeModel from '../models/unitType.model';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import logger from '../logger/logger';
import { v4 as uuid } from 'uuid';
import { errorConfig } from '../exceptions/error-confg';
class UnitTypeGroupService {
    constructor() {
        this.unitTypeGroupModel = unitTypeGroupModel;
        this.unitTypeModel = unitTypeModel;
        this.unitTypeGroupErrors = errorConfig.UNIT_TYPE_GROUP_MODULE;
    }
    /**
     * create a new unit type
     * @module unitTypeGroupModule
     * @function createUnitTypeGroup
     * @param  {object} unitTypeGroupData - the data of newly created unit type group
     * @return {Promise<UnitTypeGroupResponseDto>}
     */
    async createUnitTypeGroup(unitTypeGroupData, dataStoredInToken) {
        if (isEmptyObject(unitTypeGroupData)) {
            throw new HttpException(this.unitTypeGroupErrors.CREATE_UNIT_TYPE.INVAlID_DATA);
        }
        const unitTypeGroupId = uuid();
        logger.debug(`try to create  new unit type group  with id: ${unitTypeGroupId}  UnitTypeGroupService createUnitTypeGroup`);
        if (unitTypeGroupData.unitTypeIds) {
            const isValid = await this.isValidUniTypes(unitTypeGroupData.unitTypeIds);
            if (!isValid)
                throw new HttpException(this.unitTypeGroupErrors.CREATE_UNIT_TYPE.INVAlID_TYPES);
        }
        await this.unitTypeGroupModel.create(Object.assign(Object.assign({}, unitTypeGroupData), { id: unitTypeGroupId, createdById: dataStoredInToken.userId, createdByUsername: dataStoredInToken.email }));
        logger.debug(`succesfully  create  property  with name: ${unitTypeGroupData.name}  UnitTypeGroupService createUnitTypeGroup`);
        const unitTypeGroupResponseDto = {
            id: unitTypeGroupId,
            name: unitTypeGroupData.name,
            unitTypeIds: unitTypeGroupData.unitTypeIds,
            createdById: dataStoredInToken.userId,
            createdByUsername: dataStoredInToken.email,
            modifiedById: dataStoredInToken.userId,
            modifiedByUsername: dataStoredInToken.email
        };
        return unitTypeGroupResponseDto;
    }
    async isValidUniTypes(unitTypeIds) {
        let unitTypes = await this.unitTypeModel.find({ isDeleted: false });
        const existingIds = unitTypes.map(u => u.id);
        if (unitTypeIds.filter(u => existingIds.indexOf(u) == -1).length > 0) {
            return false;
        }
        else
            return true;
    }
    /**
     * get all unitTypeGroups from database
     * @module unitTypeGroupModule
     * @function findAllUnitTypeGroups
     * @return {Promise<UnitTypeGroupResponseDto[]>}
     */
    async findAllUnitTypeGroups() {
        logger.debug('try to retrive unit type groups from db UnitTypeGroupService findAllUnitTypeGroups');
        let unitTypeGroups = await this.unitTypeGroupModel.find();
        logger.debug(`succesfully return unit type groups from db UnitTypeGroupService findAllUnitTypeGroups with length ${unitTypeGroups.length}`);
        let unitTypeGroupsDtos = [];
        for (const u of unitTypeGroups) {
            unitTypeGroupsDtos.push({
                id: u.id,
                name: u.name,
                unitTypeIds: u.unitTypeIds,
                createdById: u.createdById,
                createdByUsername: u.createdByUsername,
                modifiedById: u.modifiedById,
                modifiedByUsername: u.modifiedByUsername
            });
        }
        return unitTypeGroupsDtos;
    }
    async findUnitTypeGroupByIdWrapper(unitTypeGroupId) {
        const findUnitTypeGroup = await this.findUnitTypeGroupById(unitTypeGroupId);
        return findUnitTypeGroup;
    }
    /**
     * get one unit type from database by id
     * @module unitTypeGroupModule
     * @function findUnitTypeGroupById
     * @param  {string} Id - id of the unit type group
     * @return {Promise<UnitTypeGroupResponseDto>}
     */
    async findUnitTypeGroupById(unitTypeGroupId) {
        logger.debug(`try to retrive one  unit type group id:${unitTypeGroupId} from db UnitTypeGroupService findUnitTypeGroupById`);
        const findUnitTypeGroup = await this.unitTypeGroupModel.findOne({ id: unitTypeGroupId }).lean();
        if (!findUnitTypeGroup)
            throw new HttpException(this.unitTypeGroupErrors.FIND_UNIT_TYPE_BY_ID.NOT_FOUND);
        logger.debug(`succesfully retrive unit type group with id:${unitTypeGroupId} from db UnitTypeGroupService findUnitTypeGroupById`);
        const unitTypeGroupResponseDto = {
            id: findUnitTypeGroup.id,
            name: findUnitTypeGroup.name,
            unitTypeIds: findUnitTypeGroup.unitTypeIds,
            createdById: findUnitTypeGroup.createdById,
            createdByUsername: findUnitTypeGroup.createdByUsername,
            modifiedById: findUnitTypeGroup.modifiedById,
            modifiedByUsername: findUnitTypeGroup.modifiedByUsername
        };
        return unitTypeGroupResponseDto;
    }
    /**
     * update an existing unit type by id
     * @module unitTypeGroupModule
     * @function updateUnitTypeGroup
     * @param  {string} unitTypeGroupId - updated unit type group id
     * @param  {object} unitTypeGroupData - the data of updated unit type group
     * @return {Promise<UnitTypeGroupResponseDto>}
     */
    async updateUnitTypeGroup(unitTypeGroupId, unitTypeGroupData, dataStoredInToken) {
        if (isEmptyObject(unitTypeGroupData)) {
            throw new HttpException(this.unitTypeGroupErrors.UPDATE_UNIT_TYPE.INVAlID_DATA);
        }
        logger.debug(`try to update  unit type group  with id: ${unitTypeGroupId}  UnitTypeGroupService updateUnitTypeGroup`);
        if (unitTypeGroupData.unitTypeIds) {
            const isValid = await this.isValidUniTypes(unitTypeGroupData.unitTypeIds);
            if (!isValid)
                throw new HttpException(this.unitTypeGroupErrors.CREATE_UNIT_TYPE.INVAlID_TYPES);
        }
        const updateUnitTypeGroupById = await this.unitTypeGroupModel.findOneAndUpdate({ id: unitTypeGroupId }, Object.assign(Object.assign({}, unitTypeGroupData), { modifiedById: dataStoredInToken.userId, modifiedByUsername: dataStoredInToken.email, lastUpdatedAt: Date.now() }), { upsert: true, new: true });
        if (!updateUnitTypeGroupById)
            throw new HttpException(this.unitTypeGroupErrors.UPDATE_UNIT_TYPE.NOT_FOUND);
        logger.debug(`succesfully update  unit type group  with id: ${unitTypeGroupId}  UnitTypeGroupService updateUnitTypeGroup`);
        return this.findUnitTypeGroupById(unitTypeGroupId);
    }
    /**
     * delete one unit type group from database by id
     * @module unitTypeGroupModule
     * @function deleteUnitTypeGroupData
     * @param  {string} unitTypeGroupId - id of the unit type group
     * @return {Promise<UnitTypeGroupResponseDto>}
     */
    async deleteUnitTypeGroupData(unitTypeGroupId) {
        logger.debug(`try to delete  unit type group  with id: ${unitTypeGroupId}  UnitTypeGroupService deleteUnitTypeGroupData`);
        const deleteUnitTypeGroupById = await this.unitTypeGroupModel.findOneAndRemove({
            id: unitTypeGroupId
        });
        if (!deleteUnitTypeGroupById) {
            throw new HttpException(this.unitTypeGroupErrors.DELETE_UNIT_TYPE_GROUP_BY_ID.NOT_FOUND);
        }
        logger.debug(`succesfully delete unit type group with id: ${unitTypeGroupId}  UnitTypeGroupService deleteUnitTypeGroupData`);
        return deleteUnitTypeGroupById;
    }
}
export default UnitTypeGroupService;
//# sourceMappingURL=unitTypeGroup.service.js.map