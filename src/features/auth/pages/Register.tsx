import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";

import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common";
import { Controller, useForm } from "@/plugins";
import { InputText, CustomButton, InputPassword } from "@/components";
import { authService, registerSchema } from "../index";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  role: "student",
};

export const Register = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const handleRegister = handleSubmit(async (user: any) => {
    console.log("---user", user);
    const response = await authService.register(user);
    if (response?.success) {
      await showSuccessNotificationFunction("Đăng ký thành công");
      reset(user);
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else {
      showErrorNotificationFunction("Có lỗi xảy ra, vui lòng kiểm tra lại");
    }
  });
  return (
    <>
      <div className="text-neutral-1 text-[40px] font-semibold text-center">
        Đăng ký
      </div>

      <InputText
        control={control}
        name="username"
        label="Họ và tên"
        placeholder="Nhập họ và tên"
        width="500"
      />
      <InputText
        control={control}
        name="email"
        label="email"
        placeholder="Nhập email"
      />
      <InputPassword
        label="password"
        placeholder="Nhập mật khẩu"
        control={control}
        name="password"
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

      <CustomButton
        onClick={() => handleRegister()}
        color="white"
        width="500"
        size="large"
        text="Đăng ký"
      />

      <div className="mt-6 mb-8 text-center">
        Đã có tài khoản ?
        <Link to="/login" className="text-primary-1 ml-1 hover:opacity-80">
          Đăng nhập
        </Link>
      </div>
    </>
  );
};
