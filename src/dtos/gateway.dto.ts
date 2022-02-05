import {
  IsString,
  IsEnum,
  Matches,
  ValidateNested,
  IsNumber,
  IsOptional
} from 'class-validator';
import {
  Type
} from 'class-transformer';
import 'reflect-metadata';
import { DeviceStatus, Device } from '../interfaces/gateway.interface';


export class CreateDeviceDto {

  @IsNumber()
  public uid: number;

  @IsString()
  public vendor: string;

  @IsNumber()
  public date: number;

  @IsEnum(DeviceStatus)
  public status: DeviceStatus

}

export class UpdateDeviceDto {

  @IsNumber()
  @IsOptional()
  public uid: number;

  @IsString()
  @IsOptional()
  public vendor: string;

  @IsNumber()
  @IsOptional()
  public date: number;

}

export class CreateGatewayDto {

  @IsString()
  public name: string;

  @IsString()
  @Matches(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)
  public ipAddress: string;

}

export class UpdateGatewayDto {

  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  @Matches(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)
  public ipAddress: string;

}



export interface GatewayResponseDto {
  id: number;
  serialNumber: string;
  name: string;
  ipAddress: string;
  devices?: DeviceResponseDto[];
}

export interface DeviceResponseDto {
  id: number,
  uid: number,
  vendor: string,
  date: Date,
  status: DeviceStatus
}
