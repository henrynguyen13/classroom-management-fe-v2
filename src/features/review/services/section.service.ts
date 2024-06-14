import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import { ICreateSection, ISection, IUpdateSection } from "../interface";
import { IBodyResponse, IGetListResponse } from "@/common";
import { IResponseList } from "@/features/responses";

class SectionService extends ApiService {
  async createSection(
    reviewId: string,
    dto: any,
    file?: File | any,
    content?: any | any[]
  ) {
    const formData = new FormData();
    formData.append("name", dto?.name);
    formData.append("type", dto?.type);
    formData.append("file", file);
    if (dto?.duration) {
      formData.append("duration", dto.duration);
    }

    if (typeof content === "object") {
      console.log("---object");
      formData.append("content", JSON.stringify(content));
    } else {
      formData.append("content", content);
    }

    console.log("typeof content", typeof content);

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
    return this.client.delete<IBodyResponse<ISection>, IBodyResponse<ISection>>(
      `${this.baseUrl}/${id}`
    );
  }

  async createResponse(sectionId: string, dto: any[]) {
    return this.client.post<any, any>(`${this.baseUrl}/${sectionId}/test`, dto);
  }

  async getSectionResponseById(sectionId: string, responseId: string) {
    return this.client.get<any, any>(
      `${this.baseUrl}/${sectionId}/responses/${responseId}`
    );
  }

  async getMySectionResponses(sectionId: string) {
    return this.client.get<
      IResponseList,
      IBodyResponse<IGetListResponse<IResponseList>>
    >(`${this.baseUrl}/${sectionId}/response`);
  }
}

export const sectionService = new SectionService(
  { baseUrl: `${import.meta.env.VITE_API}/sections` },
  axiosService
);
