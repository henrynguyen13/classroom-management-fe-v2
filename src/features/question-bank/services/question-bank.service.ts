import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import {
  IAddStudent,
  IBodyResponse,
  ICommonListQuery,
  IGetListResponse,
} from "@/common";
import { ICreateQuestion, IQuestion, IUpdateQuestion } from "@/features";
import { ICreateQuestionBank, IQuestionBank, IUpdateQuestionBank } from "..";

class QuestionBankService extends ApiService {
  async create(dto: ICreateQuestionBank) {
    return this._create<ICreateQuestionBank, IBodyResponse<IQuestionBank>>(dto);
  }
  async getAllQuestionBanks(queryString: ICommonListQuery) {
    return this.client.get<
      IQuestionBank,
      IBodyResponse<IGetListResponse<IQuestionBank>>
    >(`${this.baseUrl}`, { params: queryString });
  }

  async getQuestionBankById(id: string) {
    return this.client.get<any, any>(`${this.baseUrl}/${id}`);
  }
  async getClassDetailWithoutPagination(id: string) {
    return this.client.get<any, any>(`${this.baseUrl}/${id}/all`);
  }

  async updateQuestionBank(id: string, dto: IUpdateQuestionBank) {
    return this._update<IUpdateQuestionBank, IBodyResponse<IQuestionBank>>(
      id,
      dto
    );
  }

  async delete(id: string) {
    return this._delete<IBodyResponse<IQuestionBank>>(id);
  }

  async createQuestion(id: string, dto: ICreateQuestion) {
    return this.client.post<ICreateQuestion, IQuestion>(
      `${this.baseUrl}/${id}/question`,
      dto
    );
  }

  async getQuestionDetail(id: string, questionId: string) {
    return this.client.get<IQuestion, IQuestion>(
      `${this.baseUrl}/${id}/question/${questionId}`
    );
  }
  async updateQuestion(id: string, questionId: string, dto: IUpdateQuestion) {
    return this.client.patch<IUpdateQuestion, IQuestion>(
      `${this.baseUrl}/${id}/question/${questionId}`,
      dto
    );
  }
  async deleteQuestion(id: string, questionId: string) {
    return this.client.delete<any, any>(
      `${this.baseUrl}/${id}/question/${questionId}`
    );
  }
}
export const questionBankService = new QuestionBankService(
  { baseUrl: `${import.meta.env.VITE_API}/question-bank` },
  axiosService
);
