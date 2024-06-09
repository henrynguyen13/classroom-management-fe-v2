import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import { IBodyResponse, ICommonListQuery, IGetListResponse } from "@/common";
import { IUpdateGroup, IGroup, ICreateGroup } from "../interface";
class GroupService extends ApiService {
  async create(dto: ICreateGroup) {
    return this._create<ICreateGroup, IBodyResponse<IGroup>>(dto);
  }
  async getAllGroups(queryString: ICommonListQuery) {
    return this.client.get<any, IBodyResponse<IGetListResponse<any>>>(
      `${this.baseUrl}`,
      { params: queryString }
    );
  }
  async getAllMyGroups(userId: string, queryString: ICommonListQuery) {
    return this.client.get<any, IBodyResponse<IGetListResponse<any>>>(
      `${this.baseUrl}/my/${userId}`,
      { params: queryString }
    );
  }
  async getGroupById(id: string) {
    return this.client.get<any, IBodyResponse<any>>(`${this.baseUrl}/${id}`);
  }

  async updateGroup(id: string, dto: IUpdateGroup) {
    return this._update<IUpdateGroup, IBodyResponse<IGroup>>(id, dto);
  }

  async delete(id: string) {
    return this._delete<IBodyResponse<IGroup>>(id);
  }

  async addUsersToGroup(id: string, dto: string[]) {
    return this.client.post<string[], IBodyResponse<IGroup>>(
      `${this.baseUrl}/${id}/users`,
      dto
    );
  }

  async deleteUserFromGroup(groupId: string, userId: string) {
    return this.client.delete<IBodyResponse<IGroup>, IBodyResponse<IGroup>>(
      `${this.baseUrl}/${groupId}/students/${userId}`
    );
  }
}
export const groupService = new GroupService(
  { baseUrl: `${import.meta.env.VITE_API}/groups` },
  axiosService
);
