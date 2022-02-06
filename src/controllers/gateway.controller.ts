import { NextFunction, Request, Response } from 'express';
import GatewayService from '../services/gateway.service';
import { CreateDeviceDto, CreateGatewayDto, GatewayResponseDto, UpdateDeviceDto, UpdateGatewayDto, DeviceResponseDto } from '../dtos/gateway.dto';
import logger from '../logger/logger';

class GatewayController {
  public gatewayService = new GatewayService();

  /**
   * Create a new gateway
   * @module gatewayModule
   * @function addGateway
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
  public addGateway = async (req: Request, res: Response, next: NextFunction) => {
    const createGatewayDto: CreateGatewayDto = req.body;

    try {
      logger.debug(
        `GatewayController ==> addGateway with data ${JSON.stringify(createGatewayDto, undefined, 2)}`
      );
      const gatewayResponseDto: GatewayResponseDto = await this.gatewayService.addGateway(createGatewayDto);
      logger.debug('succesfully return from addGateway GatewayController addGateway');
      res.status(201).json(gatewayResponseDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Existing Gateway
   * @module gatewayModule
   * @function updateGateway
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
  public updateGateway = async (req: Request, res: Response, next: NextFunction) => {
    const updateGatewayDto: UpdateGatewayDto = req.body;
    const gatewayId: string = req.params.id;

    try {
      logger.debug(
        `GatewayController ==> updateGateway with data ${JSON.stringify(updateGatewayDto, undefined, 2)}`
      );
      const gatewayResponseDto: GatewayResponseDto = await this.gatewayService.updateGateway(Number(gatewayId), updateGatewayDto);
      logger.debug('succesfully return from updateGateway GatewayController updateGateway');
      res.status(200).json(gatewayResponseDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve All Gateways
   * @module gatewayModule
   * @function getAllGateways
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
  public getAllGateways = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const gatewayResponseDtos: GatewayResponseDto[] = await this.gatewayService.getAllGateways();
      logger.debug('succesfully return from addGateway GatewayController addGateway');
      res.status(200).json(gatewayResponseDtos);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieve Gateway By ID
   * @module gatewayModule
   * @function getGatewayById
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
  public getGatewayById = async (req: Request, res: Response, next: NextFunction) => {
    const gatewayId: string = req.params.id;

    try {
      const gatewayResponseDto: GatewayResponseDto = await this.gatewayService.getGatewayById(Number(gatewayId));
      logger.debug('succesfully return from addGateway GatewayController addGateway');
      res.status(200).json(gatewayResponseDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Gateway By ID
   * @module gatewayModule
   * @function deleteGateway
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
  public deleteGateway = async (req: Request, res: Response, next: NextFunction) => {
    const gatewayId: string = req.params.id;

    try {
      await this.gatewayService.deleteGateway(Number(gatewayId));
      logger.debug('succesfully return from addGateway GatewayController addGateway');
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add Device To Gateway
   * @module gatewayModule
   * @function addDevice
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
  public addDevice = async (req: Request, res: Response, next: NextFunction) => {
    const createDeviceDto: CreateDeviceDto = req.body;
    const gatewayId: string = req.params.id;

    try {
      logger.debug(
        `GatewayController ==> addGateway with data ${JSON.stringify(createDeviceDto, undefined, 2)}`
      );
      const deviceResponseDto: DeviceResponseDto = await this.gatewayService.addDevice(Number(gatewayId), createDeviceDto);
      logger.debug('succesfully return from addGateway GatewayController addGateway');
      res.status(201).json(deviceResponseDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Existing Device
   * @module gatewayModule
   * @function updateDevice
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
  public updateDevice = async (req: Request, res: Response, next: NextFunction) => {
    const updateDeviceDto: UpdateDeviceDto = req.body;
    const deviceId: string = req.params.deviceId;

    try {
      logger.debug(
        `GatewayController ==> addGateway with data ${JSON.stringify(updateDeviceDto, undefined, 2)}`
      );
      const deviceResponseDto: DeviceResponseDto = await this.gatewayService.updateDevice(Number(deviceId), updateDeviceDto);
      logger.debug('succesfully return from addGateway GatewayController addGateway');
      res.status(200).json(deviceResponseDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Device
   * @module gatewayModule
   * @function deleteDevice
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {undefined}
   */
  public deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
    const gatewayId: string = req.params.gatewayId;
    const deviceId: string = req.params.deviceId;

    try {
      await this.gatewayService.deleteDevice(Number(gatewayId), Number(deviceId));
      logger.debug('succesfully return from addGateway GatewayController addGateway');
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }


}

export default GatewayController;
