import HttpException from '../exceptions/HttpException';
import { isEmptyObject } from '../utils/util';
import { errorConfig } from '../exceptions/error-confg';
import { v4 as uuid } from 'uuid';
import permissionsModel from '../models/permissions.model';
class PermissionsService {
    constructor() {
        this.permissions = permissionsModel;
        this.permissionsErrors = errorConfig.Permissions_MODULE;
    }
    /**
     * get all Permissions from database
     * @module PermissionsModule
     * @function findAllPermissions
     * @return {Promise<permissions[]>}
     */
    async findAllPermissions() {
        const permissions = await this.permissions.find();
        return permissions;
    }
    /**
     * get one Permissions by id from database
     * @module PermissionsModule
     * @function findAllPermissions
     * @param  {string} permissionId - id of the Permissions
     * @return {Promise<permissions>}
     */
    async findpermissionById(permissionId) {
        const findPermission = await this.permissions.findById(permissionId);
        if (!findPermission) {
            throw new HttpException(this.permissionsErrors.FIND_Permission_BY_ID.NOT_FOUND);
        }
        return findPermission;
    }
    /**
     * create a new Permissions by authenticated user
     * @module PermissionsModule
     * @function createCampaign
     * @param  {object} permissionData - the data of newly created Permissions
     * @return {Promise<permissions>}
     */
    async createPermission(permissionData) {
        if (isEmptyObject(permissionData)) {
            throw new HttpException(this.permissionsErrors.CREATE_Permission.INVAlID_DATA);
        }
        const findPermission = await this.permissions.findOne({
            role: permissionData.role
        });
        if (findPermission) {
            throw new HttpException(this.permissionsErrors.CREATE_Permission.INVAlID_Permissions(permissionData));
        }
        const createPermission = await this.permissions.create(Object.assign(Object.assign({}, permissionData), { id: uuid() }));
        return createPermission;
    }
    /**
     * update a exisitng Permissions by authenticated user
     * @module PermissionsModule
     * @function updatePermission
     * @param  {string} permissionsId - id of the Permissions
     * @param  {object} permissionData - the data of existing created Permissions
     * @return {Promise<permissions>}
     */
    async updatePermission(permissionsId, permissionData) {
        if (isEmptyObject(permissionData)) {
            throw new HttpException(this.permissionsErrors.UPDATE_Permission.INVAlID_DATA);
        }
        const updatePermissionsById = await this.permissions.findByIdAndUpdate(permissionsId, Object.assign({}, permissionData));
        if (!updatePermissionsById) {
            throw new HttpException(this.permissionsErrors.UPDATE_Permission.NOT_FOUND);
        }
        return updatePermissionsById;
    }
    /**
     * delete one campaign from database by id
     * @module PermissionsModule
     * @function deletePermissionsData
     * @param  {string} permissionId - id of the permission
     * @return {Promise<permission>}
     */
    async deletePermissionsData(permissionId) {
        const deletePermissionsData = await this.permissions.findByIdAndDelete(permissionId);
        if (!deletePermissionsData) {
            throw new HttpException(this.permissionsErrors.DELETE_Permission_BY_ID.NOT_FOUND);
        }
        return deletePermissionsData;
    }
}
export default PermissionsService;
//# sourceMappingURL=permissions.service.js.map