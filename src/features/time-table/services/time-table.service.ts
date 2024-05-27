import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";

class TimeTableService extends ApiService {
  async findAll() {
    return this.client.get<any, any>(`${this.baseUrl}`);
  }
}
export const timeTableService = new TimeTableService(
  { baseUrl: `${import.meta.env.VITE_API}/time-table` },
  axiosService
);
