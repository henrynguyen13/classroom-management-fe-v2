import { Avatar, IconButton, Modal } from "@mui/material";
import {
  FavoriteBorderOutlined,
  CommentOutlined,
  MoreVert,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useFunctionPost } from "../hook/post.hook";
import { IGroupProps } from "@/features/forum";
import { CommentBox } from "./CommentBox";
import { AuthStorageService } from "@/common";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

export const PostWidget = ({ post, groupId }: IGroupProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>(
    post?.reactions.map((reaction) => reaction.author._id) || []
  );
  const user = AuthStorageService.getLoginUser();
  useEffect(() => {
    setIsLiked(likedPosts?.includes(user?._id!) ?? false);
  }, [post!._id]);

  const {
    handleImageClick,
    handleNextImage,
    handlePreviousImage,
    handleCloseModal,
    selectedImageIndex,
    isOpenCommentBox,
    setIsOpenCommentBox,
    postDetail,
    addReaction,
    removeReaction,
  } = useFunctionPost({ post, groupId });

  const handleAddOrRemoveReaction = async () => {
    try {
      if (isLiked) {
        await removeReaction(post!._id);
        setLikedPosts(likedPosts.filter((id) => id !== user!._id));
        setIsLiked(false);
      } else {
        await addReaction(post!._id, "LIKE");
        setLikedPosts((prev) => [...prev, user!._id!]);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error adding or removing reaction:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <Avatar alt="avatar" src={post?.author?.avatar} />
        <div className="ml-4">
          <p className="font-bold">{post?.author?.username}</p>
          <p className="text-gray-500 text-sm">
            {dayjs(post?.createdAt).fromNow()}
          </p>
        </div>
        <div className="ml-auto">
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="mt-4">
        <p>{post?.content}</p>
        {post?.images && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.images.map((image: any, index: any) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className="w-32 h-32 object-cover rounded cursor-pointer"
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center mt-4">
        <div className="flex items-center">
          <IconButton
            onClick={handleAddOrRemoveReaction}
            style={{ color: isLiked ? "red" : "inherit" }}
          >
            <FavoriteBorderOutlined />
          </IconButton>
          <span>{postDetail?.reactions?.length || 0}</span>
        </div>
        <div className="flex items-center ml-4">
          <IconButton onClick={() => setIsOpenCommentBox(true)}>
            <CommentOutlined />
          </IconButton>
          <span>{postDetail?.comments?.length || 0}</span>
        </div>
      </div>

      {post?.images && post?.images.length > 0 && (
        <Modal open={selectedImageIndex !== null} onClose={handleCloseModal}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {selectedImageIndex !== null && (
              <div className="relative">
                <img
                  src={post.images[selectedImageIndex]}
                  alt={`Selected Image ${selectedImageIndex}`}
                  className="max-w-full max-h-full"
                />
                <IconButton
                  className="absolute top-1/2 left-2 transform -translate-y-1/2"
                  onClick={handlePreviousImage}
                  disabled={selectedImageIndex === 0}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  onClick={handleNextImage}
                  disabled={selectedImageIndex === post.images.length - 1}
                >
                  <ChevronRight />
                </IconButton>
              </div>
            )}
          </div>
        </Modal>
      )}

      <CommentBox
        post={postDetail}
        isOpenForm={isOpenCommentBox}
        handleClose={() => setIsOpenCommentBox(false)}
      />
    </div>
  );
};
