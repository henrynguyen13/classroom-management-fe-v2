import InputText from "@/components/base/InputText";
import InputPassword from "@/components/base/InputPassword";
import CustomButton from "@/components/base/Button";
import { ILogin } from "../interfaces";
import { PAGES } from "@/common/constants";
import { useForm } from "@/plugins/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authService } from "../services/auth.service";
import {
  showErrorNotificationFunction,
  showSuccessNotificationFunction,
} from "@/common/helpers";
import { loginSchema } from "../schema";
import { useDispatch } from "react-redux";
import { loggedin } from "../reducers/auth.reducer";
import authStorageService from "@/common/storages/authStorage.service";
import { Link } from "react-router-dom";

const defaultValues = {
  email: "",
  password: "",
};
export default function Login() {
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
  //   const isAuthenticated = authStorageService.checkAuthentication();
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   } else {
  //     router.push("/dashboard");
  //   }
  // }, []);

  // useEffect(() => {
  //   authStorageService.resetAll();
  // }, []);
  const handleLogin = handleSubmit(async (user: ILogin) => {
    const response = await authService.login(user);
    if (response?.success) {
      authStorageService.setLoginUser({
        _id: response?.data._id,
        username: response?.data.username,
        email: response?.data.email,
        code: response?.data.code,
        role: response?.data.role,
        // avatar?: response?.data.avatar ;
      });
      dispatch(loggedin());
      authStorageService.setAccessToken(response?.data?.token || "");
      authStorageService.setAccessTokenExpiredAt(
        response?.data?.tokenExpiredAt || 0
      );
      authStorageService.setRefreshToken(response?.data?.refreshToken || "");
      authStorageService.setRefreshTokenExpiredAt(
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
}
