import axios, { type AxiosRequestConfig } from "axios";
// import { HttpMiddleware } from "./httpMiddleware";
import { logout } from "@/common/helpers";
import { IBodyResponse, ILoginResponse } from "@/common/interfaces";
import authStorageService from "@/common/storages/authStorage.service";
export const sendRefreshToken = async () => {
  try {
    const response = (
      await axios.get(`${import.meta.env.VITE_API}/auth/refresh-token`, {
        headers: {
          Authorization: `Bearer ${authStorageService.getRefreshToken()}`,
        },
      })
    )?.data as IBodyResponse<ILoginResponse>;
    authStorageService.setLoginUser(response?.data?.user);
    authStorageService.setAccessToken(response?.data?.accessToken?.token);
    authStorageService.setAccessTokenExpiredAt(
      response?.data?.accessToken?.expiresIn
    );
    authStorageService.setRefreshToken(response?.data?.refreshToken?.token);
    authStorageService.setRefreshTokenExpiredAt(
      response?.data?.refreshToken?.expiresIn
    );
    return response?.data;
  } catch (error) {
    logout();
  }
};

// export default class AuthMiddleware extends HttpMiddleware {
//   async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
//     if (
//       config.url?.indexOf("/login")! >= 0 ||
//       config.url?.indexOf("refresh-token")! >= 0
//     ) {
//       return config;
//     }

//     const tokenExpiredAt = authStorageService.getAccessTokenExpiredAt();
//     console.log("tokenexpire", tokenExpiredAt);
//     if (
//       !tokenExpiredAt ||
//       (tokenExpiredAt && tokenExpiredAt <= new Date().getTime())
//     ) {
//       // token expired, check refresh token
//       const refreshToken = authStorageService.getRefreshToken();
//       const refreshTokenExpiredAt =
//         +authStorageService.getRefreshTokenExpiredAt();
//       if (
//         !refreshToken ||
//         !refreshTokenExpiredAt ||
//         refreshTokenExpiredAt <= new Date().getTime()
//       ) {
//         // refresh token expired
//         logout();
//       } else {
//         // check refresh token ok, call refresh token api
//         await sendRefreshToken();
//       }
//     }

//     // set authorization

//     config.headers = {
//       ...config.headers,
//       Authorization: `Bearer ${authStorageService.getAccessToken()}`,
//     };
//     return config;
//   }
// }
