import GatewayService from '../services/gateway.service';
import logger from '../logger/logger';
class GatewayController {
    constructor() {
        this.gatewayService = new GatewayService();
        /**
         * Create a new gateway
         * @module gatewayModule
         * @function
         * @param {Object} req - Express request object with authenticated user
         * @param {Object} res - Express response object
         * @param {Function} next - Express next middleware function
         * @return {undefined}
         */
        this.addGateway = async (req, res, next) => {
            const createGatewayDto = req.body;
            try {
                logger.debug(`GatewayController ==> addGateway with data ${JSON.stringify(createGatewayDto, undefined, 2)}`);
                const gatewayResponseDto = await this.gatewayService.addGateway(createGatewayDto);
                logger.debug('succesfully return from addGateway GatewayController addGateway');
                res.status(201).json(gatewayResponseDto);
            }
            catch (error) {
                next(error);
            }
        };
        // /**
        // * get all areas
        // * @module areaModule
        // * @function
        // * @param {Object} req - Express request object
        // * @param {Object} res - Express response object
        // * @param {Function} next - Express next middleware function
        // * @return {undefined}
        // */
        // public getAreas = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        //   try {
        //     logger.info(
        //       `AreasController ==> getAreas`
        //     );
        //     const areasResponse: AreaResponseDto[] = await this.areaService.findAllAreas();
        //     logger.error(
        //       `AreasController ==> getAreas done successfully with response ${JSON.stringify(areasResponse, undefined, 2)}`
        //     );
        //     res.status(200).json({ data: areasResponse, message: 'findAll' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // /**
        // * Fetch area by ID
        // * @module areaModule
        // * @function
        // * @param {Object} req - Express request object
        // * @param {Object} res - Express response object
        // * @param {Function} next - Express next middleware function
        // * @return {undefined}
        // */
        // public getAreaById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        //   const areaId: string = req.params.id;
        //   try {
        //     logger.debug(
        //       `AreasController ==> getAreaById for Id: ${areaId}`
        //     );
        //     const findOneArea: AreaResponseDto = await this.areaService.findAreaByIdWrapper(areaId, true);
        //     logger.debug(
        //       `AreasController ==> getAreaById done successfully with response ${JSON.stringify(findOneArea, undefined, 2)}`
        //     );
        //     res.status(200).json({ data: findOneArea, message: 'findOne' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // /**
        // * Update existing area
        // * @module areaModule
        // * @function
        // * @param {Object} req - Express request object with authenticated user
        // * @param {Object} res - Express response object
        // * @param {Function} next - Express next middleware function
        // * @return {undefined}
        // */
        // public updateArea = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        //   const areaData: Area = req.body;
        //   const areaId: string = req.params.id;
        //   try {
        //     logger.debug(
        //       `AreasController ==> updateArea with Id: ${areaId} and body ${JSON.stringify(areaData, undefined, 2)}`
        //     );
        //     logger.debug('call updateArea service AreasController updateArea');
        //     const updateAreaData: AreaResponseDto = await this.areaService.updateArea(
        //       areaId,
        //       areaData, res.locals.user
        //     );
        //     logger.debug(
        //       `AreasController ==> updateArea done successfully with response ${JSON.stringify(updateAreaData, undefined, 2)}`
        //     );
        //     res.status(200).json({ data: updateAreaData, message: 'updated' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // /**
        // * Delete existing area with authorized user
        // * @module areaModule
        // * @function
        // * @param {Object} req - Express request object with authenticated user
        // * @param {Object} res - Express response object
        // * @param {Function} next - Express next middleware function
        // * @return {undefined}
        // */
        // public deleteArea = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        //   const areaId: string = req.params.id;
        //   try {
        //     logger.debug(
        //       `AreasController ==> deleteArea for Id: ${areaId}`
        //     );
        //     const deleteAreaData: AreaResponseDto = await this.areaService.deleteAreaData(
        //       areaId
        //     );
        //     logger.debug(
        //       `AreasController ==> deleteArea done successfully with response ${JSON.stringify(deleteAreaData, undefined, 2)}`
        //     );
        //     res.status(200).json({ data: deleteAreaData, message: 'deleted' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public uploadDefaultImage = async (req: Request, res: Response, next: NextFunction) => {
        //   const areaId: string = req.body.areaId;
        //   try {
        //     logger.debug(
        //       `AreasController ==> uploadDefaultImage for Id: ${areaId}`
        //     );
        //     const image = await this.areaService.uploadDefaultImage(req.file, areaId, res.locals.user);
        //     logger.debug(
        //       `AreasController ==> uploadDefaultImage done successfully with response ${JSON.stringify(image, undefined, 2)}`
        //     );
        //     res.status(200).json({ data: image, message: 'uploaded' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public uploadSponsoredImage = async (req: Request, res: Response, next: NextFunction) => {
        //   const areaId: string = req.body.areaId;
        //   try {
        //     logger.debug(
        //       `AreasController ==> uploadSponsoredImage for Id: ${areaId}`
        //     );
        //     const image = await this.areaService.uploadSponsoredImage(req.file, areaId, res.locals.user);
        //     logger.debug(
        //       `AreasController ==> uploadSponsoredImage done successfully with response ${JSON.stringify(image, undefined, 2)}`
        //     );
        //     res.status(200).json({ data: image, message: 'uploaded' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
    }
}
export default GatewayController;
//# sourceMappingURL=gateway.controller.js.map