import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  showSuccessNotificationFunction,
  showErrorNotificationFunction,
} from "@/common";
import { CustomButton, Form, InputPassword } from "@/components";
import { authService, auth } from "@/features";
import { IChangePassword } from "../index";

interface Props {
  userId: string;
  isOpenForm: boolean;
  handleClose: () => void;
}

const defaultValues = {
  currentPassword: "",
  newPassword: "",
};
export const ChangePassword = (props: Props) => {
  const { userId, isOpenForm, handleClose } = props;
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const handleChange = handleSubmit(async (dto: IChangePassword) => {
    const response = await authService.changePassword(userId as string, dto);
    if (response?.success) {
      handleClose();
      await showSuccessNotificationFunction("Đổi mật khẩu thành công");
      dispatch(auth.actions.loggedout());
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      await showErrorNotificationFunction(
        "Có lỗi xảy ra, vui lòng kiểm tra lại"
      );
    }
  });

  return (
    <Form
      title="Đổi mật khẩu"
      width="500px"
      isOpenForm={isOpenForm}
      handleClose={handleClose}
    >
      <InputPassword
        control={control}
        name="currentPassword"
        label="Mật khẩu hiện tại"
        isRequired
        placeholder="Nhập mật khẩu hiện tại"
        width="430"
      />

      <InputPassword
        control={control}
        name="newPassword"
        label="Mật khẩu mới"
        isRequired
        placeholder="Nhập mật khẩu mới"
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
          text="Sửa"
          size="large"
          width="100"
          borderRadius="20"
          onClick={() => handleChange()}
        />
      </div>
    </Form>
  );
};
