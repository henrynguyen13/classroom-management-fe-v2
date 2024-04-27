import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import { IAttendance, ICreateAttendance } from "../interfaces";
import { IBodyResponse, IGetListResponse } from "@/common/interfaces";

class AttendanceService extends ApiService {
  async create(dto: ICreateAttendance, classId: string) {
    return this.client.post<ICreateAttendance, IBodyResponse<IAttendance>>(
      `${this.baseUrl}/${classId}`,
      dto
    );
  }

  async getAttendanceByClassId(classId: string) {
    return this.client.get<
      IAttendance,
      IBodyResponse<IGetListResponse<IAttendance>>
    >(`${this.baseUrl}/${classId}`);
  }

  async getStudentAbsencesInClass(classId: string, studentCode: string) {
    return this.client.get<any, any>(
      `${this.baseUrl}/${classId}/absent/${studentCode}`
    );
  }
}

export const attendanceService = new AttendanceService(
  { baseUrl: `${import.meta.env.VITE_API}/attendance` },
  axiosService
);
