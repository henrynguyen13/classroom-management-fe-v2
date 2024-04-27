import { type AxiosInstance } from "axios";
import {
  type IBodyResponse,
  type ICommonListQuery,
  type IGetListResponse,
} from "@/common/interfaces";
import { trimData } from "@/common/helpers";
interface IServiceOption {
  baseUrl: string;
}

export class ApiService {
  client: AxiosInstance;
  baseUrl: string;

  constructor(params: IServiceOption, axios: AxiosInstance) {
    this.client = axios;
    this.baseUrl = params.baseUrl;
  }

  get detailUrl(): string {
    return this.baseUrl;
  }

  get createUrl(): string {
    return this.baseUrl;
  }

  get updateUrl(): string {
    return this.baseUrl;
  }

  get deleteUrl(): string {
    return this.baseUrl;
  }

  useClient(axios: AxiosInstance): void {
    this.client = axios;
  }

  beforeCreate<P>(params: P): P {
    trimData(params);
    return params;
  }

  beforeUpdate<P>(params: P): P {
    trimData(params);
    return params;
  }

  _getList<T>(
    queryString: ICommonListQuery
  ): Promise<IBodyResponse<IGetListResponse<T>>> {
    return this.client.get(`${this.baseUrl}`, {
      params: queryString,
    });
  }

  _getListByIds<T>(ids: string[]): Promise<IBodyResponse<IGetListResponse<T>>> {
    return this.client.post(`${this.baseUrl}/byIds`, {
      ids,
    });
  }

  _getDetail<R>(id: number | string): Promise<R> {
    return this.client.get<R, R>(this.detailUrl + "/" + id);
  }

  _create<P, R>(params: P): Promise<R> {
    params = this.beforeCreate<P>(params);
    return this.client.post(this.createUrl, params);
  }

  _update<P, R>(id: number | string, params: P): Promise<R> {
    params = this.beforeUpdate<P>(params);
    return this.client.patch(this.updateUrl + "/" + id, params);
  }

  _delete<R>(id: number | string): Promise<R> {
    return this.client.delete<R, R>(this.deleteUrl + "/" + id);
  }
}
