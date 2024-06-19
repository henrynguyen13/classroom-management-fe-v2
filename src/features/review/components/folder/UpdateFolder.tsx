import { GroupStatus, showSuccessNotificationFunction } from "@/common";
import { CustomButton, Dropdown, Form, InputText } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { reviewSchema } from "../../schema";
import { reviewService } from "../../services/review.service";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  update: () => void;
  reviewId: string;
}

const defaultValues = {
  name: "",
};

export const UpdateFolder = (props: Props) => {
  const { isOpenForm, handleClose, update, reviewId } = props;

  const { id } = useParams();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues,
  });

  const getReviewDetail = async () => {
    const response = await reviewService.findReviewById(id!, reviewId);
    console.log("----response", response);
    reset({
      name: response?.name ?? "",
    });
  };

  useEffect(() => {
    getReviewDetail();
  }, [reviewId]);

  const handleUpdate = handleSubmit(async (dto: any) => {
    console.log("dto", dto);

    const updatedDto = {
      name: dto?.name,
    };
    const response = await reviewService.updateReview(
      id!,
      reviewId,
      updatedDto
    );
    if (response?.success) {
      showSuccessNotificationFunction("Cập nhật thành công");
      reset({
        name: defaultValues.name,
      });
      handleClose();
      update();
    }
  });
  return (
    <Form
      title="Sửa nội dung"
      width="650px"
      height="350px"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      <InputText
        control={control}
        name="name"
        value="name"
        label="Tên mục"
        placeholder="Nhập tên mục"
        width="578"
      />

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
          text="Sửa"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleUpdate()}
        />
      </div>
    </Form>
  );
};
