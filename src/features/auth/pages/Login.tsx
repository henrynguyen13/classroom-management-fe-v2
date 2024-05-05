import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
  AuthStorageService,
  PAGES,
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
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  // useEffect(() => {
  //   if (authUser !== null) {
  //     setTimeout(() => {
  //       router.push("/dashboard");
  //     }, 1000);
  //   }
  // }, [authUser]);

  // useEffect(() => {
  //   const isAuthenticated = AuthStorageService.checkAuthentication();
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   } else {
  //     router.push("/dashboard");
  //   }
  // }, []);

  // useEffect(() => {
  //   AuthStorageService.resetAll();
  // }, []);
  const handleLogin = handleSubmit(async (user: ILogin) => {
    const response = await authService.login(user);
    if (response?.success) {
      AuthStorageService.setLoginUser({
        _id: response?.data._id,
        username: response?.data.username,
        email: response?.data.email,
        code: response?.data.code,
        role: response?.data.role,
        // avatar?: response?.data.avatar ;
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
      <div className="text-neutral-1 text-[40px] font-semibold text-center">
        Đăng nhập
      </div>

      <InputText
        label="email"
        placeholder="Nhập email"
        control={control}
        name="email"
        width="500"
      />

      <InputPassword
        label="password"
        placeholder="Nhập password"
        control={control}
        name="password"
      />

      <div className="text-primary-1 mb-8 text-right">Quên mật khẩu ?</div>

      <CustomButton
        color="white"
        width="500"
        size="large"
        text="Đăng nhập"
        onClick={() => handleLogin()}
      />

      <div className="mt-6 mb-8 text-center">
        Bạn chưa có tài khoản ?
        <Link to="/register" className="text-primary-1 ml-1 hover:opacity-80">
          Đăng ký
        </Link>
      </div>
    </>
  );
};
