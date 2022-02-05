import PermissionsService from '../services/permissions.service';
class PermissionsController {
    constructor() {
        this.permissionsService = new PermissionsService();
        /**
         * Get all permissions
         * @module permissionsModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getPermissions = async (req, res, next) => {
            try {
                const findAllPermissionsData = await this.permissionsService.findAllPermissions();
                res.status(200).json({ data: findAllPermissionsData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Get one permission by id
         * @module permissionsModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.getPermissionsById = async (req, res, next) => {
            const permissionId = req.params.id;
            try {
                const findOnePermissionData = await this.permissionsService.findpermissionById(permissionId);
                res.status(200).json({ data: findOnePermissionData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * create one permission
         * @module permissionsModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.createPermission = async (req, res, next) => {
            const permissionsDto = req.body;
            try {
                const createPermissionData = await this.permissionsService.createPermission(permissionsDto);
                res.status(201).json({ data: createPermissionData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * update one permission
         * @module permissionsModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.updatePermission = async (req, res, next) => {
            const permissionId = req.params.id;
            const permissionsDto = req.body;
            try {
                const updatePermissionData = await this.permissionsService.updatePermission(permissionId, permissionsDto);
                res.status(200).json({ data: updatePermissionData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * delete one permission
         * @module permissionsModule
         * @function
         * @param {Object} req - Express request object
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.deletePermission = async (req, res, next) => {
            const permissionId = req.params.id;
            try {
                const deletePermissionData = await this.permissionsService.deletePermissionsData(permissionId);
                res.status(200).json({ data: deletePermissionData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
export default PermissionsController;
//# sourceMappingURL=permissions.controller.js.map