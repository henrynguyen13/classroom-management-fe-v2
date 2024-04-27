import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IOption,
  ROLES,
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common";
import {
  Form,
  InputText,
  CustomButton,
  InputPassword,
} from "@/components/base";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { userService } from "@/features/profile/services/profile.service";
import { IUser } from "@/features/auth/interfaces";
import { registerSchema } from "@/features/auth/schema";
import { Controller } from "@/plugins/hook-form";
import { authService } from "@/features/auth/services/auth.service";
interface Props {
  isOpenForm: boolean;
  handleClose: () => void;
  updateUserList: () => void;
}

const defaultValues = {
  username: "",
  email: "",
  password: "",
  role: ROLES.STUDENT,
};
export default function CreateUser(props: Props) {
  const { isOpenForm, handleClose, updateUserList } = props;

  const [teachers, setTeachers] = useState<IOption[]>([]);
  useEffect(() => {
    const getAllTeachers = async () => {
      try {
        const response = await userService.getAllUser({});
        if (response?.success) {
          console.log("-----", response.users);
          setTeachers(
            response.users
              .filter((user: IUser) => user.role === ROLES.TEACHER)
              .map((user: IUser) => ({ id: user._id, label: user.username }))
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
      }
    };

    getAllTeachers();
  }, []);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const handleCreate = handleSubmit(async (dto: any) => {
    console.log("---------", dto);
    console.log("iii");

    try {
      const response = await authService.register(dto);
      console.log("----res", response);
      if (response?.success) {
        showSuccessNotificationFunction("Tạo người dùng thành công");
        reset({
          username: defaultValues.username,
          email: defaultValues.email,
          password: defaultValues.password,
          role: defaultValues.role,
        });
        handleClose();
        updateUserList();
      } else {
        showErrorNotificationFunction("Email đã tồn tại");
      }
    } catch (e) {
      showErrorNotificationFunction(e as string);
    } finally {
    }
  });

  return (
    <Form title="Tạo lớp học" isOpenForm={isOpenForm} handleClose={handleClose}>
      <InputText
        control={control}
        name="username"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        width="430"
      />
      <InputText
        control={control}
        name="email"
        label="Email"
        placeholder="Nhập email"
        width="430"
      />
      <InputPassword
        label="Password"
        placeholder="Nhập password"
        control={control}
        name="password"
        width="430px"
      />

      <div>
        <label>
          <span className="text-base font-medium">Vai trò</span>
          <span className="text-red">*</span>
        </label>
      </div>

      <Controller
        control={control}
        name="role"
        render={({ field }) => (
          <RadioGroup
            row
            {...field}
            defaultValue="student"
            className="mb-[20px]"
          >
            <FormControlLabel
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  marginRight: "20px",
                },
              }}
              value="student"
              control={<Radio />}
              label="Học sinh"
            />
            <FormControlLabel
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                },
              }}
              value="teacher"
              control={<Radio />}
              label="Giáo viên"
            />
          </RadioGroup>
        )}
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
