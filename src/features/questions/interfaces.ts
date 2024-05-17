import { IBase, baseFields } from "@/common/interfaces";

export interface IQuestion extends IBase {
  _id: string;
  type: QuestionType;
  text: string;
  answers: IAnswer[];
  level: string;
  classId?: string;
  assignmentId?: string;
  questionBankId?: string;
}

export interface ICreateQuestion
  extends Omit<IQuestion, baseFields | "_id" | "classId" | "assignmentId"> {}

export type IUpdateQuestion = Partial<ICreateQuestion>;
export interface IAnswer {
  _id?: string;
  text: string;
  isCorrect: boolean;
  idx: number;
}

export enum QuestionType {
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  MATCHING = "MATCHING",
  FILL_IN = "FILL_IN",
  ORDER = "ORDER",
}
