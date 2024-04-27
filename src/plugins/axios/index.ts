import { HttpStatus } from "@/common/constants";
import { IBodyResponse } from "@/common/interfaces";
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import dayjs from "../dayjs";
import authStorageService from "@/common/storages/authStorage.service";
import { logout } from "@/common/helpers";
import { sendRefreshToken } from "./middlewares/authMiddleware";

const options: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    // "api-secret-key": import.meta.env.NEXT_PUBLIC_API_SECRET_KEY,
  } as unknown as AxiosRequestHeaders,
  baseURL: import.meta.env.VITE_API,
  responseType: "json",
};

// const axiosInstance = import.meta.env.DISABLE_AXIOS_CACHE
//   ? axios.create(options)
//   : setupCache(axios.create(options));
const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use(async (config: any) => {
  if (
    config.url?.indexOf("/login")! >= 0 ||
    config.url?.indexOf("/signup")! >= 0
  ) {
    console.log("hiii");
    return config;
  }
  const tokenExpiredAt = authStorageService.getAccessTokenExpiredAt();
  if (
    !tokenExpiredAt ||
    (tokenExpiredAt && tokenExpiredAt <= new Date().getTime())
  ) {
    // token expired, check refresh token
    const refreshToken = authStorageService.getRefreshToken();
    const refreshTokenExpiredAt =
      +authStorageService.getRefreshTokenExpiredAt();
    if (
      !refreshToken ||
      !refreshTokenExpiredAt ||
      refreshTokenExpiredAt <= new Date().getTime()
    ) {
      // refresh token expired
      logout();
      console.log("---expired");
    } else {
      // check refresh token ok, call refresh token api
      await sendRefreshToken();
      console.log("---refresh");
    }
  }

  Object.assign(config, {
    headers: {
      //   "api-secret-key": import.meta.env.NEXT_PUBLIC_API_SECRET_KEY,
      "X-Timezone": dayjs().format("Z"),
      "X-Timezone-Name": dayjs.tz.guess(),
      // "accept-language": cookieService.getCurrentLanguage(),
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStorageService.getAccessToken() || ""}`,

      ...config.headers,
    },
  });
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (typeof response?.data === "string") {
      response.data = JSON.parse(response.data);
    }
    response.data = {
      ...response?.data,
      success: true,
    };
    return response.data;
  },
  async (error) => {
    if (error.code === "ERR_NETWORK") {
      error.request.data = {
        ...(error?.request?.data || {}),
        success: false,
        isRequestError: true,
        message: error.message,
        code: HttpStatus.NETWORK_ERROR,
      };
      return error.request.data;
    } else if (error.response) {
      if (typeof error?.response?.data === "string") {
        error.response.data = JSON.parse(error.response.data);
      }
      if (error?.response?.data) {
        error.response.data = {
          ...((error?.response?.data as object) || {}),
          success: false,
        };
      }

      return error.response.data as IBodyResponse<unknown>;
    } else if (error.request) {
      error.request.data = {
        ...(error?.request?.data || {}),
        success: false,
        isRequestError: true,
        message: error.message,
      };
      return error.request?.data;
    }
    return {
      ...error,
      config: error?.config as AxiosRequestConfig,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusText: "System error, please try again later",
      headers: error?.request?.headers || {},
      success: false,
      message: "System error, please try again later",
      data: null,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
);

export default axiosInstance;
