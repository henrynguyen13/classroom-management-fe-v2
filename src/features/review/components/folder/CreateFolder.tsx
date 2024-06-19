import { showSuccessNotificationFunction } from "@/common";
import { CustomButton, Form, InputText } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { reviewSchema } from "../../schema";
import { reviewService } from "../../services/review.service";
import { useParams } from "react-router-dom";

interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  update: () => void;
}

const defaultValues = {
  name: "",
};

export const CreateFolder = (props: Props) => {
  const { isOpenForm, handleClose, update } = props;

  const { id } = useParams();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues,
  });

  const handleCreate = handleSubmit(async (dto: any) => {
    console.log("dto", dto);

    const updatedDto = {
      name: dto?.name,
      classId: id!,
    };
    const response = await reviewService.createReview(id!, updatedDto);
    if (response?.success) {
      showSuccessNotificationFunction("Tạo thành công");
      reset({
        name: defaultValues.name,
      });
      handleClose();
      update();
    }
  });
  return (
    <Form
      title="Tạo mới"
      width="650px"
      height="350px"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      <InputText
        control={control}
        name="name"
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
