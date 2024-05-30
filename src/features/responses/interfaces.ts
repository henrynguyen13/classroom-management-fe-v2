import { IBase, baseFields } from "@/common/interfaces";
import { IUser } from "../auth/interfaces";
import { IQuestion } from "../questions/interfaces";

export interface IResponseList extends IBase {
  _id: string;
  user: IUser[];
  assignmentId: string;
  classId: string;
  type: ResponseType;
  response: IResponse[] | any;
  mark: string;
  comment: string;
}

export enum ResponseType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  UPLOAD_FILE = "UPLOAD_FILE",
}

export interface IResponse extends IBase {
  seq: number;
  userAnswer: string[];
  questionId: string;
  correctAnswer?: string[];
  isCorrect?: boolean;
  questions?: IQuestion[];
  // correctAnswer: string[];
  // isCorrect: boolean;
}

export interface ICreateResponse extends Omit<IResponse, baseFields> {}

export interface IMarkResponse {
  mark: number;
  comment?: string;
}
