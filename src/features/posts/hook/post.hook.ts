import { ICommonListQuery, ROWS_PER_PAGE } from "@/common";
import { useEffect, useState } from "react";
import { postService } from "../services/post.service";
import { IComment, IPost } from "../interface";
import { IGroupProps } from "@/features/forum";

export const useFunctionPost = (props: IGroupProps) => {
  const { post, groupId } = props;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);

  const [newCommentAdd, setNewCommentAdd] = useState<IComment>();

  const [postDetail, setPostDetail] = useState<IPost>();
  // const [isCurrentPost, setIsCurrentPost] = useState<string>("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(0);
  const rowsPerPage = ROWS_PER_PAGE;

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < post!.images!.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  async function getAllPosts(query: ICommonListQuery) {
    const response = await postService.getAllPostsInGroup(
      props.groupId!,
      query
    );
    setPosts(response?.items);
    setTotalPosts(response?.totalItems);
  }

  async function getPostDetail() {
    if (groupId && post?._id) {
      const response = await postService.getPostDetail(groupId, post._id);
      if (response?.success) {
        setPostDetail(response);
      }
    } else {
      console.log("groupId or postId is undefined");
    }
  }

  async function addComment(postId: string, content: string) {
    try {
      const response = await postService.addComment(groupId!, postId, content);

      console.log("-COMMENT", response);
      if (response?.success) {
        getPostDetail();
        setNewCommentAdd(response);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  async function addReaction(postId: string, reactionType: string) {
    try {
      const response = await postService.addReaction(
        groupId!,
        postId,
        reactionType
      );
      if (response?.success) {
        getPostDetail();
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  }

  async function removeReaction(postId: string) {
    try {
      const response = await postService.removeReaction(groupId!, postId);
      if (response?.success) {
        getPostDetail();
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  }
  useEffect(() => {
    if (groupId) {
      getAllPosts({});
    }
  }, [groupId]);

  useEffect(() => {
    if (post) {
      getPostDetail();
    }
  }, [post]);

  const updatePostList = () => {
    const query: ICommonListQuery = {
      page: page + 1,
      limit: rowsPerPage,
    };
    getAllPosts(query);
  };

  return {
    posts,
    totalPosts,
    totalUsers,
    isOpenCreateForm,
    isOpenUpdateForm,
    isOpenCommentBox,
    newCommentAdd,
    setIsOpenCommentBox,
    setTotalPosts,
    setTotalUsers,
    setPosts,
    setIsOpenCreateForm,
    setIsOpenUpdateForm,
    updatePostList,
    handleImageClick,
    handleNextImage,
    handlePreviousImage,
    handleCloseModal,
    // setIsCurrentPost,
    selectedImageIndex,
    postDetail,
    addComment,
    addReaction,
    removeReaction,
  };
};
