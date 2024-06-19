import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import { ICreateReview, IReview, IUpdateReview } from "../interface";
import { IBodyResponse, IGetListResponse } from "@/common";

class ReviewService extends ApiService {
  async createReview(classId: string, dto: ICreateReview) {
    return this.client.post<ICreateReview, IBodyResponse<IReview>>(
      `${this.baseUrl}/${classId}`,
      dto
    );
  }

  async findAllByClassId(classId: string) {
    return this.client.get<any, IBodyResponse<IGetListResponse<IReview>>>(
      `${this.baseUrl}/${classId}`
    );
  }
  async findReviewById(classId: string, id: string) {
    return this.client.get<any, IReview>(`${this.baseUrl}/${classId}/${id}`);
  }

  async updateReview(classId: string, id: string, dto: IUpdateReview) {
    return this.client.put<IUpdateReview, IBodyResponse<IReview>>(
      `${this.baseUrl}/${classId}/${id}`,
      dto
    );
  }

  async deleteReview(classId: string, id: string) {
    return this.client.delete<IBodyResponse<IReview>>(
      `${this.baseUrl}/${classId}/${id}`
    );
  }
}
export const reviewService = new ReviewService(
  { baseUrl: `${import.meta.env.VITE_API}/reviews` },
  axiosService
);
