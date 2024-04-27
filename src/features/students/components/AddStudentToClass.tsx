import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common/helpers";
import { IAddStudent } from "@/common/interfaces";
import CustomButton from "@/components/base/Button";
import Form from "@/components/base/Form";
import InputText from "@/components/base/InputText";
import { classService } from "@/features/classes/services/class.service";
import { useForm } from "@/plugins/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentSchema } from "../schema";
interface Props {
  isOpenForm: boolean;
  id: string;
  handleClose: () => void;
  updateStudentList?: () => void;
}
export default function AddStudentToClass(props: Props) {
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
}
