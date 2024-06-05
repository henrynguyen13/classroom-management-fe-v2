import { ICommonListQuery, ROWS_PER_PAGE } from "@/common";
import { useEffect, useState } from "react";
import { postService } from "../services/post.service";
import { IPost } from "../interface";

interface IProps {
  groupId?: string;
}
export const useFunctionPost = ({ groupId }: IProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const rowsPerPage = ROWS_PER_PAGE;

  async function getAllPosts(query: ICommonListQuery) {
    const response = await postService.getAllPostsInGroup(groupId!, query);
    console.log("--responsePost", response);
    setPosts(response?.items);
    setTotal(response?.totalItems);
  }

  useEffect(() => {
    getAllPosts({});
  }, []);

  const updatePostList = () => {
    const query: ICommonListQuery = {
      page: page + 1,
      limit: rowsPerPage,
    };
    getAllPosts(query);
  };

  return {
    posts,
    total,
    isOpenCreateForm,
    isOpenUpdateForm,
    setTotal,
    setPosts,
    setIsOpenCreateForm,
    setIsOpenUpdateForm,
    updatePostList,
  };
};
