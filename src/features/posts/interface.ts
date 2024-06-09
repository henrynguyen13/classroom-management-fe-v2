import { IBase, baseFields } from "@/common";
import { IUser } from "../auth";

export enum ReactType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
  SUPPORT = "SUPPORT",
}

export interface IReaction extends IBase {
  _id: string;
  author: IUser;
  reactionType: ReactType;
}

export interface IComment extends IBase {
  _id: string;
  author: IUser;
  post: IPost;
  content: string;
  reactions: IReaction[];
}

export interface IPost extends IBase {
  _id: string;
  author: IUser;
  content: string;
  images?: string[];
  reactions: IReaction[];
  comments: IComment[];
}
export interface ICreatePost
  extends Omit<
    IPost,
    baseFields | "_id" | "author" | "reactions" | "comments"
  > {}

export type IUpdateGroup = Partial<ICreatePost>;
