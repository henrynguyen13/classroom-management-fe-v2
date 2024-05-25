import { IBase, baseFields } from "@/common/interfaces";

export interface IQuestion extends IBase {
  _id: string;
  type: QuestionType;
  text: string;
  answers: IAnswer[];
  answerTF: string;
  answerShort: string;
  level: string;

  // classId?: string;
  // assignmentId?: string;
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
  SHORT_ANSWER = "SHORT_ANSWER",
}

export interface IQuestionProps {
  questionType?: QuestionType;
  questionLevel?: string;
  questionBankId?: string;
  questionId?: string;
  setSelectedLevelQuestion?: (e: any) => void;
  setSelectedTypeQuestion?: (e: any) => void;
  handleQuestionCreateSuccess?: (data: any) => void;
  handleQuestionUpdateSuccess?: (data: any) => void;
  handleClose?: () => void;
  handleTiptapQuestionChange?: (e: any) => void;
}
