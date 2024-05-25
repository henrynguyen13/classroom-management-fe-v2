import { IBase, baseFields } from "@/common";
import { IQuestion } from "../questions";
import { IUser } from "../auth";

export interface IQuestionBank extends IBase {
  _id: string;
  name: string;
  description: string;
  questions: IQuestion[];
  user: IUser;
}

export interface ICreateQuestionBank
  extends Omit<IQuestionBank, baseFields | "_id" | "questions" | "user"> {}

export type IUpdateQuestionBank = Partial<ICreateQuestionBank>;
