import { ApiService } from "@/plugins/axios/api";
import axiosService from "@/plugins/axios";
import { ICommonListQuery } from "@/common";

class PostService extends ApiService {
  //   async create(dto: ICreatePost) {
  //     return this._create<ICreateGroup, IBodyResponse<IGroup>>(dto);
  //   }

  async createPost(
    groupId: string,
    content: string,
    images: File[] // Array of images, can be empty
  ) {
    const formData = new FormData();

    // Append content
    formData.append("content", content);

    // Append images if they exist
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append(`images`, image); // `images` is the key used in the FilesInterceptor
      });
    }

    return this.client.post<any, any>(
      `${this.baseUrl}/group/${groupId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  async getAllPostsInGroup(groupId: string, queryString: ICommonListQuery) {
    return this.client.get<any, any>(`${this.baseUrl}/group/${groupId}`, {
      params: queryString,
    });
  }

  async getPostDetail(groupId: string, postId: string) {
    return this.client.get<any, any>(
      `${this.baseUrl}/group/${groupId}/${postId}`
    );
  }

  async addComment(groupId: string, postId: string, content: string) {
    return this.client.put<any, any>(
      `${this.baseUrl}/group/${groupId}/${postId}/comment`,
      {
        content,
      }
    );
  }

  async addReaction(groupId: string, postId: string, reactionType: string) {
    return this.client.put<any, any>(
      `${this.baseUrl}/group/${groupId}/${postId}/reaction`,
      {
        reactionType,
      }
    );
  }

  async removeReaction(groupId: string, postId: string) {
    return this.client.delete<any, any>(
      `${this.baseUrl}/group/${groupId}/${postId}/reaction`
    );
  }
}
export const postService = new PostService(
  { baseUrl: `${import.meta.env.VITE_API}/post` },
  axiosService
);
