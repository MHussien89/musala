import { Router } from 'express';
import GatewayController from '../controllers/gateway.controller';
import { CreateDeviceDto, CreateGatewayDto, UpdateDeviceDto, UpdateGatewayDto } from '../dtos/gateway.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class GatewayRoute implements Route {
  public path = '/gateway';
  public router = Router();
  public gatewayController = new GatewayController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateGatewayDto),
      this.gatewayController.addGateway
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(UpdateGatewayDto),
      this.gatewayController.updateGateway
    );
    this.router.get(
      `${this.path}`,
      this.gatewayController.getAllGateways
    );
    this.router.get(
      `${this.path}/:id`,
      this.gatewayController.getGatewayById
    );
    this.router.delete(
      `${this.path}/:id`,
      this.gatewayController.deleteGateway
    );
    this.router.post(
      `${this.path}/:id/device`,
      validationMiddleware(CreateDeviceDto),
      this.gatewayController.addDevice
    );

    this.router.put(
      `${this.path}/:gatewayId/device/:deviceId`,
      validationMiddleware(UpdateDeviceDto),
      this.gatewayController.updateDevice
    );

    this.router.delete(
      `${this.path}/:gatewayId/device/:deviceId`,
      this.gatewayController.deleteDevice
    );
  }
}

export default GatewayRoute;
