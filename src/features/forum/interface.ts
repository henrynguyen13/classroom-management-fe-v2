import { IBase, baseFields } from "@/common";
import { IUser } from "../auth";

export enum ForumState {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface IGroup extends IBase {
  _id: string;
  name: string;
  avatar: string;
  status: ForumState;
  manager: IUser;
  users: IUser[];
}
export interface ICreateGroup
  extends Omit<IGroup, baseFields | "_id" | "manager" | "avatar" | "users"> {}

export type IUpdateGroup = Partial<ICreateGroup>;
