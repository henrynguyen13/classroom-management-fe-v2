import { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, TextField, Avatar } from "@mui/material";
import { useFunctionPost } from "../hook/post.hook";
import { IGroupProps } from "@/features/forum";
import { CustomButton } from "@/components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const CommentBox = (props: IGroupProps) => {
  const { post, isOpenForm, handleClose } = props;
  const [newComment, setNewComment] = useState("");
  const { addComment, newCommentAdd } = useFunctionPost({ post });

  const [comments, setComments] = useState(post?.comments || []);
  const handleAddComment = () => {
    addComment(post?._id!, newComment);
    setNewComment("");
  };

  useEffect(() => {
    if (newCommentAdd) {
      setComments((prevComments) => [...prevComments, newCommentAdd]);
    }
  }, [newCommentAdd]);
  useEffect(() => {
    setComments(post?.comments || []);
  }, [post]);

  return (
    <Modal open={isOpenForm!} onClose={handleClose}>
      <Down className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-1/2">
        <h2 className="text-lg font-semibold mb-4">Bình luận</h2>
        <div className="max-h-96 overflow-y-auto mb-4 custom-scroll">
          {comments!.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="flex shadow-forumBox p-3 mr-3 rounded-xl my-2 items-start justify-between mb-3"
              >
                <div className="flex">
                  <Avatar alt="avatar" src={comment.author.avatar} />
                  <div className="ml-3">
                    <p className="font-bold">{comment.author.username}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>

                <div className="ml-3">
                  {dayjs(comment?.createdAt).fromNow()}
                </div>
              </div>
            ))
          ) : (
            <div>Hiện chưa có bình luận nào</div>
          )}
        </div>
        <div className="flex items-center">
          <TextField
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Thêm bình luận..."
          />
          <div className="mr-2"></div>
          <CustomButton onClick={handleAddComment} text="Gửi" width="80" />
          {/* <Button onClick={handleAddComment} className="ml-2">
            Gửi
          </Button> */}
        </div>
      </Down>
    </Modal>
  );
};

const Down = styled.div`
  .custom-scroll {
    overflow-y: auto;
    max-height: 384px;
  }

  .custom-scroll::-webkit-scrollbar {
    width: 10px;
  }

  .custom-scroll::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }

  .custom-scroll::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
`;
