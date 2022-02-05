
import { Gateway } from '../interfaces/gateway.interface';
import { Device } from '../interfaces/device.interface';
import gatewayModel from '../models/gateway.mode';
import deviceModel from '../models/device.model';
import { CreateGatewayDto, UpdateGatewayDto, CreateDeviceDto, UpdateDeviceDto, GatewayResponseDto, DeviceResponseDto } from '../dtos/gateway.dto';
import { isEmptyObject } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { errorConfig } from '../exceptions/error-confg';
import logger from '../logger/logger';
import { v4 as uuid } from 'uuid';

class GatewayService {
  public gateway = gatewayModel;
  public device = deviceModel;
  public gatewayErrors = errorConfig.GATEWAY_MODULE;

  /**
   * create a new gateway
   * @module gatewayModule
   * @function addGateway
   * @param  {object} createGatewayDto - the data of newly created gateway
   * @return {Promise<GatewayResponseDto>}
   */
  public async addGateway(createGatewayDto: CreateGatewayDto): Promise<GatewayResponseDto> {

    const serialNumber = uuid();
    logger.debug(`try to create  new gateway  with serial number: ${serialNumber} ==>  GatewayService addGateway`);
    const createdGateway: Gateway = await this.gateway.create({
      serialNumber: serialNumber, isDeleted: false, ...createGatewayDto
    });

    logger.debug(`succesfully  create  gateway  with serial number: ${serialNumber} and name: ${createGatewayDto.name} GatewayService addGateway`);

    const gatewayResponseDtos: GatewayResponseDto = {
      id: createdGateway.id,
      serialNumber: serialNumber,
      ipAddress: createGatewayDto.ipAddress,
      name: createGatewayDto.name
    };
    return gatewayResponseDtos;
  }

  public async updateGateway(gatewayId: number, updateGatewayDto: UpdateGatewayDto): Promise<GatewayResponseDto> {

    logger.debug(`try to create  update gateway  with id: ${gatewayId} ==>  GatewayService updateGateway`);

    const gatewayById: Gateway = await this.gateway.findOne({ id: gatewayId, isDeleted: false });

    if (!gatewayById) {
      throw new HttpException(this.gatewayErrors.UPDATE_GATEWAY.GATEWAY_NOT_FOUND);
    }

    const updatedGateway: Gateway = await this.gateway.findOneAndUpdate(
      { id: gatewayId, isDeleted: false },
      { ...updateGatewayDto }
    );

    const gatewayResponseDtos: GatewayResponseDto = {
      id: updatedGateway.id,
      serialNumber: updatedGateway.serialNumber,
      ipAddress: updatedGateway.ipAddress,
      name: updatedGateway.name
    };
    logger.debug(`succesfully  update  gateway  id: ${gatewayId} ==>  GatewayService updateGateway`);
    return this.getGatewayById(gatewayId);
  }

  public async getAllGateways(): Promise<GatewayResponseDto[]> {

    logger.debug(`try to get all gateways ==> GatewayService getAllGateways`);
    const gateways: Gateway[] = await this.gateway.find({ isDeleted: false });

    const gatewayResponseDtos: GatewayResponseDto[] = [];
    if (gateways && gateways.length > 0) {
      for (let i = 0; i < gateways.length; i++) {
        const deviceResponseDtos: DeviceResponseDto[] = await this.getGatewayDevices(gateways[i].devices);
        gatewayResponseDtos.push({
          id: gateways[i].id,
          serialNumber: gateways[i].serialNumber,
          ipAddress: gateways[i].ipAddress,
          name: gateways[i].name,
          devices: deviceResponseDtos
        })
      }
    }

    logger.debug(`succesfully  return ${gatewayResponseDtos.length} gateways ==> GatewayService getAllGateways`);


    return gatewayResponseDtos;
  }

  public async getGatewayById(gatewayId: number): Promise<GatewayResponseDto> {

    logger.debug(`try to get gateway with id: ${gatewayId} ==> GatewayService getGatewayById`);
    const gatewayById: Gateway = await this.gateway.findOne({ id: gatewayId, isDeleted: false });

    if (!gatewayById) {
      throw new HttpException(this.gatewayErrors.GET_GATEWAY_BY_ID.GATEWAY_NOT_FOUND);
    }
    const deviceResponseDtos: DeviceResponseDto[] = await this.getGatewayDevices(gatewayById.devices);
    const gatewayResponseDto = {
      id: gatewayById.id,
      serialNumber: gatewayById.serialNumber,
      ipAddress: gatewayById.ipAddress,
      name: gatewayById.name,
      devices: deviceResponseDtos
    }

    logger.debug(`succesfully  return gateway with id: ${gatewayId} and IP Address: ${gatewayResponseDto.ipAddress} ==> GatewayService getGatewayById`);


    return gatewayResponseDto;
  }

  public async deleteGateway(gatewayId: number) {

    logger.debug(`try to delete gateway with id: ${gatewayId} ==> GatewayService deleteGateway`);

    const gatewaySaved: Gateway = await this.gateway.findOne({ id: gatewayId, isDeleted: false }).lean();

    if (!gatewaySaved) {
      throw new HttpException(this.gatewayErrors.DELETE_DEVICE.GATEWAY_NOT_FOUND);
    }

    await this.gateway.findOneAndUpdate(
      { id: gatewayId },
      {
        isDeleted: true
      });

    if (!gatewaySaved.devices
      || gatewaySaved.devices.length > 0) {
      logger.debug(`try to delete ${gatewaySaved.devices.length} devices ==> GatewayService deleteGateway`);
      for (let i = 0; i < gatewaySaved.devices.length; i++) {
        logger.debug(`try to delete device with id:  ${gatewaySaved.devices[i]} ==> GatewayService deleteGateway`);
        await this.device.findOneAndUpdate(
          { id: gatewaySaved.devices[i] },
          {
            isDeleted: true
          });
        logger.debug(`succesfully delete device with id:  ${gatewaySaved.devices[i]} ==> GatewayService deleteGateway`);

      }
    }
    logger.debug(`succesfully  delete gateway with id: ${gatewayId} and IP Address: ${gatewaySaved.ipAddress} with it's ${gatewaySaved.devices ? gatewaySaved.devices.length : 0} devices ==> GatewayService deleteGateway`);
  }

  public async getGatewayDevices(deviceIds: number[]): Promise<DeviceResponseDto[]> {

    logger.debug(`try to get gateway devices with ids: ${deviceIds} ==> GatewayService getGatewayDevices`);

    const devices: Device[] = await this.device.find({ id: { $in: deviceIds }, isDeleted: false });
    const deviceResponseDtos: DeviceResponseDto[] = [];
    if (devices && devices.length > 0) {
      devices.forEach(d => {
        deviceResponseDtos.push({
          id: d.id,
          uid: d.uid,
          status: d.status,
          date: new Date(d.date),
          vendor: d.vendor
        })
      })
    }
    logger.debug(`succesfully return ${deviceResponseDtos.length} devices with ids:  ${deviceIds} ==> GatewayService getGatewayDevices`);

    return deviceResponseDtos;
  }

  public async addDevice(gatewayId: number, createDeviceDto: CreateDeviceDto): Promise<DeviceResponseDto> {

    logger.debug(`try to add new device for gateway with id: ${gatewayId} ==> GatewayService addDevice`);


    const gatewaySaved: Gateway = await this.gateway.findOne({ id: gatewayId, isDeleted: false }).lean();

    if (!gatewaySaved) {
      throw new HttpException(this.gatewayErrors.CREATE_DEVICE.GATEWAY_NOT_FOUND);
    }
    if (gatewaySaved && gatewaySaved.devices && gatewaySaved.devices.length >= 10) {
      logger.error(`Maximum devices reached for this gateway ==> GatewayService addDevice`);
      throw new HttpException(this.gatewayErrors.CREATE_DEVICE.MAXIMUM_DEVICES);
    }

    const createdDevice: Device = await this.device.create({ isDeleted: false, ...createDeviceDto });
    if (gatewaySaved.devices)
      gatewaySaved.devices.push(createdDevice.id);
    else
      gatewaySaved.devices = [createdDevice.id];

    await this.gateway.findOneAndUpdate(
      { id: gatewayId, isDeleted: false },
      {
        devices: gatewaySaved.devices
      });


    const deviceResponseDto: DeviceResponseDto = {
      id: createdDevice.id,
      uid: createdDevice.uid,
      status: createDeviceDto.status,
      date: new Date(createDeviceDto.date),
      vendor: createDeviceDto.vendor
    };

    logger.debug(`succesfully add new device for gateway with id: ${gatewayId} ==> GatewayService addDevice`);

    return deviceResponseDto;
  }

  public async updateDevice(deviceId: number, editDeviceDto: UpdateDeviceDto): Promise<DeviceResponseDto> {

    logger.debug(`try to update device with id: ${deviceId} ==> GatewayService updateDevice`);

    const updatedDevice = await this.device.findOneAndUpdate(
      { id: deviceId, isDeleted: false },
      {
        ...editDeviceDto
      });

    if (!updatedDevice) {
      throw new HttpException(this.gatewayErrors.UPDATE_DEVICE.DEVICE_NOT_FOUND);

    }
    const deviceResponseDto: DeviceResponseDto = {
      id: updatedDevice.id,
      uid: updatedDevice.uid,
      status: updatedDevice.status,
      date: new Date(updatedDevice.date),
      vendor: updatedDevice.vendor
    };
    logger.debug(`succesfully update device with id: ${deviceId} ==> GatewayService updateDevice`);

    return this.getDeviceById(deviceId);
  }

  public async getDeviceById(deviceId: number): Promise<DeviceResponseDto> {

    logger.debug(`try to get device with id: ${deviceId} ==> GatewayService getDeviceById`);

    const deviceById = await this.device.findOne(
      { id: deviceId, isDeleted: false });

    if (!deviceById) {
      throw new HttpException(this.gatewayErrors.GET_DEVICE_BY_ID.DEVICE_NOT_FOUND);

    }
    const deviceResponseDto: DeviceResponseDto = {
      id: deviceById.id,
      uid: deviceById.uid,
      status: deviceById.status,
      date: new Date(deviceById.date),
      vendor: deviceById.vendor
    };
    logger.debug(`succesfully updagette device with id: ${deviceId} ==> GatewayService getDeviceById`);

    return deviceResponseDto;
  }

  public async deleteDevice(gatewayId: number, deviceId: number) {

    logger.debug(`try to delete device with id: ${deviceId} ==> GatewayService deleteDevice`);

    const gatewaySaved: Gateway = await this.gateway.findOne({ id: gatewayId, isDeleted: false }).lean();

    if (!gatewaySaved) {
      throw new HttpException(this.gatewayErrors.DELETE_DEVICE.GATEWAY_NOT_FOUND);
    }

    if (!gatewaySaved.devices
      || gatewaySaved.devices.length == 0
      || gatewaySaved.devices.filter(d => d == deviceId).length == 0) {
      throw new HttpException(this.gatewayErrors.DELETE_DEVICE.DEVICE_NOT_FOUND);
    }
    gatewaySaved.devices = gatewaySaved.devices.filter(d => d != deviceId);

    await this.gateway.findOneAndUpdate(
      { id: gatewayId, isDeleted: false },
      {
        devices: gatewaySaved.devices
      });

    await this.device.findOneAndUpdate(
      { id: deviceId }, { isDeleted: true });

    logger.debug(`succesfully delete device with id: ${deviceId} ==> GatewayService deleteDevice`);

  }


}


export default GatewayService;
