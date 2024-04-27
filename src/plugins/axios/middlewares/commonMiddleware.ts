// import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import dayjs from "../../dayjs";
// import { HttpMiddleware } from "./httpMiddleware";
// import { HttpStatus } from "../../../common/constants";
// import type { IBodyResponse } from "../../../common/interfaces";
// import { isValidJSON } from "../../../common/helpers";
// import authStorageService from "@/common/storages/authStorage.service";

// export default class CommonMiddleware extends HttpMiddleware {
//   async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
//     Object.assign(config, {
//       headers: {
//         ...config.headers,
//         "X-Timezone": dayjs().format("Z"),
//         "X-Timezone-Name": dayjs.tz.guess(),
//         "accept-language": authStorageService.getLanguage(),
//         "Content-Type": "application/json",
//       },
//     });
//     return config;
//   }

//   onResponse(response: AxiosResponse): AxiosResponse {
//     if (typeof response?.data === "string" && isValidJSON(response?.data))
//       response.data = JSON.parse(response.data);
//     response.data = {
//       ...response?.data,
//       success: true,
//     };
//     return response.data;
//   }

//   onResponseError(error: AxiosError): IBodyResponse<unknown> {
//     if (error.code === "ERR_NETWORK") {
//       error.request.data = {
//         ...(error?.request?.data || {}),
//         success: false,
//         isRequestError: true,
//         message: error.message,
//         code: HttpStatus.NETWORK_ERROR,
//       };
//       return error.request.data;
//     } else if (error.response) {
//       if (typeof error?.response?.data === "string") {
//         error.response.data = JSON.parse(error.response.data);
//       }
//       if (error?.response?.data) {
//         error.response.data = {
//           ...((error?.response?.data as object) || {}),
//           success: false,
//         };
//       }

//       return error.response.data as IBodyResponse<unknown>;
//     } else if (error.request) {
//       error.request.data = {
//         ...(error?.request?.data || {}),
//         success: false,
//         isRequestError: true,
//         message: error.message,
//       };
//       return error.request?.data;
//     }
//     return {
//       ...error,
//       config: error?.config as AxiosRequestConfig,
//       status: HttpStatus.INTERNAL_SERVER_ERROR,
//       statusText: "System error, please try again later",
//       headers: {},
//       success: false,
//       message: "System error, please try again later",
//       data: null,
//       code: HttpStatus.INTERNAL_SERVER_ERROR,
//     } as IBodyResponse<unknown>;
//   }
// }
