import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import {
  IAssignment,
  ICreateAssignment,
  IUpdateAssignment,
} from "../interfaces";
import {
  IBodyResponse,
  ICommonListQuery,
  IGetListResponse,
} from "@/common/interfaces";
import {
  ICreateQuestion,
  IQuestion,
  IUpdateQuestion,
} from "@/features/questions/interfaces";
import {
  ICreateResponse,
  IMarkResponse,
  IResponseList,
} from "@/features/responses/interfaces";

class AssignmentService extends ApiService {
  async create(dto: any, classId: string) {
    return this.client.post<any, IAssignment>(
      `${this.baseUrl}/${classId}/assignment`,
      dto
    );
  }
  async getAllAssignments(classId: string, queryString: ICommonListQuery) {
    return this.client.get<
      IAssignment,
      IBodyResponse<IGetListResponse<IAssignment>>
    >(`${this.baseUrl}/${classId}/assignment`, { params: queryString });
  }
  async getAssignmentById(classId: string, assignmentId: string) {
    return this.client.get<any, any>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}`
    );
  }

  async update(classId: string, assignmentId: string, dto: any) {
    return this.client.patch<any, IAssignment>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}`,
      dto
    );
  }

  async delete(classId: string, assignmentId: string) {
    return this.client.delete<IAssignment, IAssignment>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}`
    );
  }

  async createAQuestion(
    classId: string,
    assignmentId: string,
    dto: ICreateQuestion
  ) {
    return this.client.post<ICreateQuestion, IQuestion>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}/question`,
      dto
    );
  }

  async updateAQuestion(
    classId: string,
    assignmentId: string,
    questionId: string,
    dto: IUpdateQuestion
  ) {
    return this.client.patch<IUpdateQuestion, IQuestion>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}/question/${questionId}`,
      dto
    );
  }

  async getAQuestionDetail(
    classId: string,
    assignmentId: string,
    questionId: string
  ) {
    return this.client.patch<IQuestion, IQuestion>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}/question/${questionId}`
    );
  }

  async getAllAQuestions(classId: string, assignmentId: string) {
    return this.client.get<
      IQuestion,
      IBodyResponse<IGetListResponse<IQuestion>>
    >(`${this.baseUrl}/${classId}/assignment/${assignmentId}/question`);
  }
  async deleteAQuestion(
    classId: string,
    assignmentId: string,
    questionId: string
  ) {
    return this.client.delete<IQuestion, IQuestion>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}/question/${questionId}`
    );
  }

  async createATestResponse(
    classId: string,
    assignmentId: string,
    dto: ICreateResponse[]
  ) {
    return this.client.post<ICreateResponse[], IResponseList>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}/response/test`,
      dto
    );
  }

  async createAUploadAResponse(
    classId: string,
    assignmentId: string,
    dto: File
  ) {
    const formData = new FormData();
    formData.append("file", dto);

    return this.client.post<any, IResponseList>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}/response/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async getMyAResponses(classId: string, assignmentId: string) {
    return this.client.get<
      IResponseList,
      IBodyResponse<IGetListResponse<IResponseList>>
    >(`${this.baseUrl}/${classId}/assignment/${assignmentId}/response`);
  }

  async getAllAResponses(classId: string, assignmentId: string) {
    return this.client.get<
      IResponseList,
      IBodyResponse<IGetListResponse<IResponseList>>
    >(`${this.baseUrl}/${classId}/assignment/${assignmentId}/responses`);
  }

  async getAResponseById(
    classId: string,
    assignmentId: string,
    responseId: string
  ) {
    return this.client.get<IResponseList, IResponseList>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}/responses/${responseId}`
    );
  }

  async markResponse(
    classId: string,
    assignmentId: string,
    responseId: string,
    dto: IMarkResponse
  ) {
    return this.client.post<IMarkResponse, IResponseList>(
      `${this.baseUrl}/${classId}/assignment/${assignmentId}/responses/${responseId}/mark`,
      dto
    );
  }
}

export const assignmentService = new AssignmentService(
  { baseUrl: `${import.meta.env.VITE_API}/classes` },
  axiosService
);
