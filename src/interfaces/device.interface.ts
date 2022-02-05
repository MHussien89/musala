
export interface Device {
  id: number,
  uid: number,
  vendor: string,
  date: number,
  status: DeviceStatus
}

export enum DeviceStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}