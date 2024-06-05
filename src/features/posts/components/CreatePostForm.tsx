import { showSuccessNotificationFunction } from "@/common";
import { CustomButton, Form, InputTextArea } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { postSchema } from "../schema";
import { postService } from "../services/post.service";
import { useEffect, useState } from "react";

interface Props {
  groupId: string;
  isOpenForm: boolean;
  handleClose: () => void;
  updatePostList: () => void;
}

const defaultValues = {
  content: "",
};

export const CreatePostForm = (props: Props) => {
  const { groupId, isOpenForm, handleClose, updatePostList } = props;
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...files]);

      // Generate image previews
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => {
      // Revoke the object URL
      URL.revokeObjectURL(prevPreviews[index]);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues,
  });

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleCreate = handleSubmit(async (dto: any) => {
    try {
      const response = await postService.createPost(
        groupId,
        dto.content,
        images
      );
      if (response?.success) {
        showSuccessNotificationFunction("Tạo bài viết thành công");

        // Clear form and previews after successful post creation
        reset({ content: defaultValues.content });
        setImages([]);
        previews.forEach((preview) => URL.revokeObjectURL(preview)); // Revoke previews
        setPreviews([]);
        handleClose();
        updatePostList();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  });

  return (
    <Form
      title="Tạo bài viết mới"
      width="650px"
      height="500px"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      <InputTextArea
        control={control}
        name="content"
        label="Nội dung"
        placeholder="Bạn đang nghĩ gì..."
      />

      <div>
        <label>Images (up to 4)</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          accept="image/*"
          className="mb-4"
        />
        <div className="flex flex-wrap gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <CustomButton
          text="Hủy"
          backgroundColor="grey"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleClose()}
        />
        <span className="mr-3"></span>
        <CustomButton
          text="Tạo"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleCreate()}
        />
      </div>
    </Form>
  );
};
