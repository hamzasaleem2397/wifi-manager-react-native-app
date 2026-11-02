export interface Device {
  mac: string;
  ip: string;
  hostname: string;
  status: 'Online' | 'Offline';
  port: string;
  leaseTime?: string;
  alias: string | null;
  blocked: boolean;
}

export interface LoginRequest {
  ip: string;
  username: string;
  password: string;
}

export interface ApiResponse {
  ok: boolean;
}

export interface DevicesResponse {
  devices: Device[];
}

export interface BlockRequest {
  mac: string;
  action: 'block' | 'unblock';
}

export interface AliasRequest {
  mac: string;
  alias: string;
}

export interface ApiError {
  error: string;
}
