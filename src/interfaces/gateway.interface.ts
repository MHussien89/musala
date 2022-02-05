
export interface Gateway {
  id: number,
  serialNumber: string,
  name: string,
  ipAddress?: string,
  devices?: number[]
}

export interface Device {
  uid: number,
  vendor: string,
  date: Date,
  status: DeviceStatus
}

export enum DeviceStatus {
  ONLINE= 'online',
  OFFLINE= 'offline'
}