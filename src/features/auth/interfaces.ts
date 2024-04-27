import { IBase, baseFields } from "@/common/interfaces";

export interface IUser extends IBase {
  _id: string;
  username: string;
  email: string;
  code: string;
  role: string;
  avatar?: string;
  token?: string;
  tokenExpiredAt?: number;
  refreshToken?: string;
  refreshTokenExpiredAt?: number;
}

// export interface ICreateUser {
//   username: string;
//   email: string;
//   password: string;
//   // confirmPassword: string;
//   role: string;
// }

export interface ICreateUser
  extends Omit<IUser, baseFields | "id" | "avatar" | "code"> {}
export type ILogin = Partial<IUser>;
export type IUpdateUser = Partial<IUser>;
