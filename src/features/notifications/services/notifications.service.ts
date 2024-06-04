import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import { ICommonListQuery } from "@/common";
class NotificationService extends ApiService {
  async getAllNotifications(queryString: ICommonListQuery, userId: string) {
    return this.client.get<any, any>(`${this.baseUrl}/all/${userId}`, {
      params: queryString,
    });
  }

  async updateReadStatus(id: string, isRead: boolean) {
    return this.client.put<any, any>(
      `${this.baseUrl}/update-read-status/${id}`,
      isRead
    );
  }

  async markAllAsRead() {
    return this.client.post<any, any>(`${this.baseUrl}/mark-all-as-read`);
  }
}
export const notificationService = new NotificationService(
  { baseUrl: `${import.meta.env.VITE_API}/notifications` },
  axiosService
);
