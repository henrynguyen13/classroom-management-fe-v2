import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";

class DashboardService extends ApiService {
  async getVisits(startDate: any, endDate: any) {
    return this.client.get<any, any>(`${this.baseUrl}/visit`, {
      params: {
        weekStart: startDate,
        weekEnd: endDate,
      },
    });
  }

  async getUsersStats(startDate: any, endDate: any) {
    return this.client.get<any, any>(`${this.baseUrl}/users/stats`, {
      params: {
        weekStart: startDate,
        weekEnd: endDate,
      },
    });
  }
}

export const dashboardService = new DashboardService(
  { baseUrl: `${import.meta.env.VITE_API}` },
  axiosService
);
