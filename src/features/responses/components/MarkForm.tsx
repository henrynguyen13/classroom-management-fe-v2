import CustomButton from "@/components/base/Button";
import Form from "@/components/base/Form";
import InputText from "@/components/base/InputText";
import { useForm } from "react-hook-form";

import { showSuccessNotificationFunction } from "@/common/helpers";
import { assignmentService } from "@/features/assignments/services/assignment.service";

interface Props {
  classId: string;
  assignmentId: string;
  responseId: string;
  isOpenForm: boolean;
  handleClose: () => void;
  updateResponse: () => void;
}

const defaultValues = {
  mark: "",
  comment: "",
};
export default function MarkForm(props: Props) {
  const {
    isOpenForm,
    classId,
    assignmentId,
    responseId,
    handleClose,
    updateResponse,
  } = props;
  const { control, handleSubmit, reset } = useForm({
    // resolver: yupResolver(),
    defaultValues,
  });

  const handleCreate = handleSubmit(async (dto: any) => {
    const response = await assignmentService.markResponse(
      classId,
      assignmentId,
      responseId,
      dto
    );
    if (response?.success) {
      showSuccessNotificationFunction("Chấm điểm thành công");
      reset({ mark: "", comment: "" });
      handleClose();
      updateResponse();
    }
  });
  return (
    <Form title="Tạo lớp học" isOpenForm={isOpenForm} handleClose={handleClose}>
      <InputText
        control={control}
        name="mark"
        label="Điểm"
        placeholder="Nhập điểm"
        width="430"
      />
      <InputText
        control={control}
        name="comment"
        label="Nhận xét"
        placeholder="Nhập nhận xét"
        width="430"
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
}
