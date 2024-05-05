import { AxiosResponse } from "axios";
import { HttpStatus, OrderDirection, ROLES } from "./constants";
import { IUser } from "@/features/auth/interfaces";
import { IDescriptionClass } from "@/features/classes/interfaces";

export interface ICommonListQuery {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: OrderDirection;
  keyword?: string;
  textFilter?: string;
}

export interface IGetListResponse<T> {
  items: T[];
  totalItems: number;
}

export interface IErrorItem {
  key: string;
  message: string;
  errorCode: HttpStatus;
  order?: number;
}

export interface IBodyResponse<T> extends AxiosResponse {
  success: boolean;
  code: HttpStatus;
  isRequestError?: boolean;
  message: string;
  data: T;
  errors?: IErrorItem[];
}

export interface IBase {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  success: boolean;
}

export type baseFields =
  | "createdAt"
  | "createdBy"
  | "updatedAt"
  | "updatedBy"
  | "success";

export interface ISideBar {
  text: string;
  icon: any;
  redirect: string;
  role: ROLES[];
}

export interface ICard {
  title: string;
  icon: any;
  content?: string;
  time?: IDescriptionClass[];
  role: ROLES[];
}

export interface IStudent extends IBase {
  _id: string;
  email: string;
  username: string;
  code: string;
  avatar?: string;
}

export interface IAddStudent
  extends Omit<IStudent, baseFields | "username" | "_id" | "code"> {}

export interface IItem {
  title: any;
  value: any;
}

export interface User {
  userId: string;
  userName: string;
}

export interface Message {
  user: User;
  timeSent: string;
  message: string;
}

export interface ServerToClientEvents {
  chat: (e: Message) => void;
}

export interface ClientToServerEvents {
  chat: (e: Message) => void;
}

export interface ILoginResponse {
  accessToken: {
    token: string;
    expiresIn: number;
  };
  refreshToken: {
    token: string;
    expiresIn: number;
  };
  user: IUser;
}

export interface IOption {
  id: string;
  label: string;
  [key: string]: string;
}
