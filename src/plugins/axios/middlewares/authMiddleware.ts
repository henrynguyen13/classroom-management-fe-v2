import axios, { type AxiosRequestConfig } from "axios";
// import { HttpMiddleware } from "./httpMiddleware";
import { logout } from "@/common/helpers";
import { IBodyResponse, ILoginResponse } from "@/common/interfaces";
import { AuthStorageService } from "@/common/storages/authStorage.service";
export const sendRefreshToken = async () => {
  try {
    const response = (
      await axios.get(`${import.meta.env.VITE_API}/auth/refresh-token`, {
        headers: {
          Authorization: `Bearer ${AuthStorageService.getRefreshToken()}`,
        },
      })
    )?.data as IBodyResponse<ILoginResponse>;
    AuthStorageService.setLoginUser(response?.data?.user);
    AuthStorageService.setAccessToken(response?.data?.accessToken?.token);
    AuthStorageService.setAccessTokenExpiredAt(
      response?.data?.accessToken?.expiresIn
    );
    AuthStorageService.setRefreshToken(response?.data?.refreshToken?.token);
    AuthStorageService.setRefreshTokenExpiredAt(
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

//     const tokenExpiredAt = AuthStorageService.getAccessTokenExpiredAt();
//     console.log("tokenexpire", tokenExpiredAt);
//     if (
//       !tokenExpiredAt ||
//       (tokenExpiredAt && tokenExpiredAt <= new Date().getTime())
//     ) {
//       // token expired, check refresh token
//       const refreshToken = AuthStorageService.getRefreshToken();
//       const refreshTokenExpiredAt =
//         +AuthStorageService.getRefreshTokenExpiredAt();
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
//       Authorization: `Bearer ${AuthStorageService.getAccessToken()}`,
//     };
//     return config;
//   }
// }
