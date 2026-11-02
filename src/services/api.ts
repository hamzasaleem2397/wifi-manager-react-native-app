import { config } from "@/config";
import type {
    ApiResponse,
    Device,
    DevicesResponse
} from "@/types";
import axios, { AxiosInstance } from "axios";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.API_BASE_URL,
      timeout: config.API_TIMEOUT,
      withCredentials: true, // Important for session cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Update the base URL if needed
  setBaseUrl(url: string) {
    this.client.defaults.baseURL = url;
  }

  async login(ip: string, username: string, password: string): Promise<void> {
    const response = await this.client.post<ApiResponse>("/api/auth/login", {
      ip,
      username,
      password,
    });

    if (!response.data.ok) {
      throw new Error("Login failed");
    }
  }

  async logout(): Promise<void> {
    await this.client.post<ApiResponse>("/api/auth/logout");
  }

  async getDevices(): Promise<Device[]> {
    const response = await this.client.get<DevicesResponse>("/api/devices");
    return response.data.devices;
  }

  async blockDevice(mac: string, action: "block" | "unblock"): Promise<void> {
    const response = await this.client.post<ApiResponse>("/api/block", {
      mac,
      action,
    });

    if (!response.data.ok) {
      throw new Error(`Failed to ${action} device`);
    }
  }

  async setAlias(mac: string, alias: string): Promise<void> {
    const response = await this.client.post<ApiResponse>("/api/alias", {
      mac,
      alias,
    });

    if (!response.data.ok) {
      throw new Error("Failed to set alias");
    }
  }
}

export const api = new ApiService();
