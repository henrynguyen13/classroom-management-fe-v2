import { yupResolver } from "@hookform/resolvers/yup";
import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  IAddStudent,
} from "@/common";
import { InputText, Form, CustomButton } from "@/components";
import { classService } from "@/features";
import { useForm } from "@/plugins";
import { studentSchema } from "../index";
interface Props {
  isOpenForm: boolean;
  id: string;
  handleClose: () => void;
  updateStudentList?: () => void;
}
export const AddStudentToClass = (props: Props) => {
  const { isOpenForm, handleClose, id, updateStudentList } = props;
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: { email: "" },
  });

  const handleCreate = handleSubmit(async (dto: IAddStudent) => {
    const response = await classService.addToClass(id, dto);
    if (response?.success) {
      showSuccessNotificationFunction("Thêm học sinh thành công");
      reset({ email: "" });
      if (updateStudentList) {
        updateStudentList();
      }
      handleClose();
    } else {
      showErrorNotificationFunction(
        "Email này đã có trong lớp học hoặc chưa đăng ký tài khoản"
      );
    }
  });

  const handleCancel = () => {
    handleClose();
    reset({ email: "" });
  };
  return (
    <Form
      title="Thêm học sinh"
      isOpenForm={isOpenForm}
      handleClose={handleCancel}
    >
      <InputText
        control={control}
        name="email"
        label="Email học sinh"
        placeholder="Nhập email học sinh"
        width="430"
      />

      <div className="flex justify-end mt-10">
        <CustomButton
          text="Hủy"
          size="large"
          width="100"
          borderRadius="20"
          backgroundColor="grey"
          onClick={() => handleCancel()}
        />
        <span className="mr-3"></span>
        <CustomButton
          text="Thêm"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleCreate()}
        />
      </div>
    </Form>
  );
};
