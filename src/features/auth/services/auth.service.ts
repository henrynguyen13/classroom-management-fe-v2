import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import { ICreateUser, ILogin, IUser } from "../interfaces";
import { IBodyResponse } from "@/common/interfaces";
import { IChangePassword } from "@/features/profile/interfaces";
class AuthService extends ApiService {
  async register(dto: ICreateUser) {
    return this.client.post<ICreateUser, IBodyResponse<IUser>>(
      `${this.baseUrl}/signup`,
      dto
    );
  }

  async login(dto: ILogin) {
    return this.client.post<ILogin, IBodyResponse<IUser>>(
      `${this.baseUrl}/login`,
      dto
    );
  }
  async logout(userId: string) {
    return this.client.post<any, any>(`${this.baseUrl}/logout/${userId}`);
  }

  async changePassword(userId: string, dto: IChangePassword) {
    return this.client.post<IChangePassword, any>(
      `${this.baseUrl}/changePassword/${userId}`,
      dto
    );
  }
}

export const authService = new AuthService(
  { baseUrl: `${import.meta.env.VITE_API}/auth` },
  axiosService
);
