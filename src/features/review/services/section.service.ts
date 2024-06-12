import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import { ICreateSection, ISection, IUpdateSection } from "../interface";
import { IBodyResponse, IGetListResponse } from "@/common";

class SectionService extends ApiService {
  async createSection(
    reviewId: string,
    dto: any,
    file?: File | any,
    content?: any
  ) {
    const formData = new FormData();
    formData.append("name", dto?.name);
    formData.append("type", dto?.type);
    formData.append("content", content);
    formData.append("file", file);

    return this.client.post<ICreateSection, IBodyResponse<ISection>>(
      `${this.baseUrl}/${reviewId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async findAllByReviewId(reviewId: string) {
    return this.client.get<IBodyResponse<IGetListResponse<ISection>>>(
      `${this.baseUrl}/${reviewId}`
    );
  }
  async findSectionById(id: string) {
    return this.client.get<any, IBodyResponse<ISection>>(
      `${this.baseUrl}/${id}`
    );
  }

  async updateSection(id: string, dto: IUpdateSection) {
    return this.client.put<IUpdateSection, IBodyResponse<ISection>>(
      `${this.baseUrl}/${id}`,
      dto
    );
  }

  async deleteSection(id: string) {
    return this.client.delete<IBodyResponse<ISection>>(`${this.baseUrl}/${id}`);
  }
}

export const sectionService = new SectionService(
  { baseUrl: `${import.meta.env.VITE_API}/sections` },
  axiosService
);
