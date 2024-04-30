import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";

import { IUpdateUser, IUser } from "@/features/auth/interfaces";
import { IBodyResponse, ICommonListQuery } from "@/common/interfaces";

class UserService extends ApiService {
  async getUserById(userId: string) {
    return this._getDetail<IUser>(userId);
  }

  async uploadAvatar(userId: string, dto: any) {
    return this.client.post<any, any>(`${this.baseUrl}/${userId}/avatar`, dto, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async updateProfile(userId: string, dto: IUpdateUser) {
    return this.client.patch<IUpdateUser, IUser>(
      `${this.baseUrl}/${userId}`,
      dto
    );
  }

  async getAllUser(queryString: ICommonListQuery) {
    return this.client.get<IUser, any>(`${this.baseUrl}`, {
      params: queryString,
    });
  }

  async deleteUserById(id: string): Promise<IBodyResponse<any>> {
    return this._delete(id);
  }
}
export const userService = new UserService(
  { baseUrl: `${import.meta.env.VITE_API}/users` },
  axiosService
);
