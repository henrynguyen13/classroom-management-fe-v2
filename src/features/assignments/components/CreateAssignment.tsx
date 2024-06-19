import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  CustomButton,
  CustomDatePicker,
  InputTextArea,
  Dropdown,
  Form,
} from "@/components";
import { ASSIGNMENT_TYPE, showSuccessNotificationFunction } from "@/common";
import { assignmentService } from "../index";
interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  updateList: () => void;
}
const defaultValues = {
  name: "",
  //   description: "",
  type: "",
  expiredAt: new Date(),
};

export const CreateAssignment = ({
  isOpenForm,
  handleClose,
  updateList,
}: Props) => {
  const { id } = useParams();

  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(assignmentSchema),
    defaultValues,
  });

  const handleCreate = handleSubmit(async (dto: any) => {
    const response = await assignmentService.create(dto, id as string);

    if (response?.success) {
      showSuccessNotificationFunction("Tạo bài tập thành công");
      updateList();
      handleClose();
    }
  });
  return (
    <Form
      title="Tạo bài tập"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
      width="650px"
    >
      <InputTextArea
        control={control}
        name="name"
        label="Tên bài tập"
        placeholder="Nhập tên bài tập"
      />
      <div className="mb-2">
        <label>
          <span className="text-base font-medium">Hạn bài tập</span>
          <span className="text-red">*</span>
        </label>
      </div>
      <div className="flex justify-between items-center mb-6 ">
        <CustomDatePicker control={control} name="expiredAt" width="580px" />
      </div>

      <Dropdown
        control={control}
        label="Loại bài tập"
        placeholder="Chọn loại bài tập"
        options={ASSIGNMENT_TYPE}
        name="type"
        width="580px"
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
