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
import { useState } from "react";
import { IPost } from "../interface";

dayjs.extend(relativeTime);

interface IProps {
  post: IPost;
}

export const PostWidget = ({ post }: IProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < post.images!.length - 1
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Avatar and Author Info */}
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

      {/* Content */}
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

      {/* Interaction Buttons */}
      <div className="flex items-center mt-4">
        <IconButton>
          <FavoriteBorderOutlined />
        </IconButton>
        <IconButton>
          <CommentOutlined />
        </IconButton>
      </div>

      {/* Modal for Large Image */}
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
    </div>
  );
};
