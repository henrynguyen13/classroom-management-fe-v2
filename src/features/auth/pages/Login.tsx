import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  AuthStorageService,
  PAGES,
  ScreenType,
  useBreakpoint,
} from "@/common";
import { useForm } from "@/plugins";
import { InputText, InputPassword, CustomButton } from "@/components";
import { authService, loginSchema, loggedin, ILogin } from "../index";

const defaultValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useDispatch();
  const { isSm } = useBreakpoint(ScreenType.SM);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const handleLogin = handleSubmit(async (user: ILogin) => {
    const response = await authService.login(user);
    if (response?.success) {
      AuthStorageService.setLoginUser({
        _id: response?.data._id,
        username: response?.data.username,
        email: response?.data.email,
        code: response?.data.code,
        role: response?.data.role,
      });
      dispatch(loggedin());
      AuthStorageService.setAccessToken(response?.data?.token || "");
      AuthStorageService.setAccessTokenExpiredAt(
        response?.data?.tokenExpiredAt || 0
      );
      AuthStorageService.setRefreshToken(response?.data?.refreshToken || "");
      AuthStorageService.setRefreshTokenExpiredAt(
        response?.data?.refreshTokenExpiredAt || 0
      );
      await showSuccessNotificationFunction("Đăng nhập thành công");
      setTimeout(() => {
        window.location.href = PAGES.DASHBOARD;
      }, 1000);
    } else {
      showErrorNotificationFunction("Email hoặc mật khẩu không đúng");
    }
  });

  return (
    <>
      <div className="text-neutral-1 text-2xl mb-3 sm:text-[40px] font-semibold text-center">
        Đăng nhập
      </div>

      <InputText
        label="Email"
        placeholder="Nhập email"
        control={control}
        name="email"
        width={`${isSm ? 500 : 300}`}
      />

      <InputPassword
        label="Mật khẩu"
        placeholder="Nhập password"
        control={control}
        name="password"
        width={`${isSm ? "500px" : "300px"}`}
      />

      <div className="text-primary-1 mb-8 text-right">Quên mật khẩu ?</div>

      <CustomButton
        color="white"
        width={`${isSm ? 500 : 300}`}
        size="large"
        text="Đăng nhập"
        onClick={() => handleLogin()}
      />
    </>
  );
};
