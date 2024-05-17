import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import {
  IAddStudent,
  IBodyResponse,
  ICommonListQuery,
  IGetListResponse,
} from "@/common";
import { IClass, IClassDetail, ICreateClass, IUpdateClass } from "../index";
class ClassService extends ApiService {
  async create(dto: ICreateClass) {
    return this._create<ICreateClass, IBodyResponse<IClass>>(dto);
  }
  async getAllClasses(queryString: ICommonListQuery) {
    return this.client.get<IClass, IBodyResponse<IGetListResponse<IClass>>>(
      `${this.baseUrl}`,
      { params: queryString }
    );
  }
  async getAllMyClasses(userId: string, queryString: ICommonListQuery) {
    return this.client.get<IClass, IBodyResponse<IGetListResponse<IClass>>>(
      `${this.baseUrl}/my/${userId}`,
      { params: queryString }
    );
  }
  async getClassDetail(id: string, query: ICommonListQuery) {
    return this.client.get<any, any>(`${this.baseUrl}/${id}`, {
      params: query,
    });
  }
  async getClassDetailWithoutPagination(id: string) {
    return this.client.get<any, any>(`${this.baseUrl}/${id}/all`);
  }

  async update(id: string, dto: IUpdateClass) {
    return this._update<IUpdateClass, IBodyResponse<IClass>>(id, dto);
  }

  async delete(id: string) {
    return this._delete<IBodyResponse<IClass>>(id);
  }

  async addToClass(id: string, dto: string[]) {
    return this.client.post<string[], IBodyResponse<IClass>>(
      `${this.baseUrl}/${id}/students`,
      dto
    );
  }

  async deleteFromClass(classId: string, studentId: string) {
    return this.client.delete<IBodyResponse<IClass>, IBodyResponse<IClass>>(
      `${this.baseUrl}/${classId}/students/${studentId}`
    );
  }

  async openClass(classId: string) {
    return this.client.patch<any, IBodyResponse<IClass>>(
      `${this.baseUrl}/${classId}/open`
    );
  }

  async closeClass(classId: string) {
    return this.client.patch<any, IBodyResponse<IClass>>(
      `${this.baseUrl}/${classId}/close`
    );
  }
}
export const classService = new ClassService(
  { baseUrl: `${import.meta.env.VITE_API}/classes` },
  axiosService
);
