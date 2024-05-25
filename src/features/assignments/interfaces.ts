import { IBase, baseFields } from "@/common/interfaces";
import { IQuestion } from "../questions/interfaces";
import { IClass } from "../classes/interfaces";

export interface IAssignment extends IBase {
  _id: string;
  name: string;
  description: string;
  type: string;
  expiredAt: Date;
  questions?: IQuestion[];
  class?: IClass;
}

export interface ICreateAssignment
  extends Omit<IAssignment, baseFields | "_id" | "class"> {}
export type IUpdateAssignment = Partial<ICreateAssignment>;

export enum AssignmentStatus {
  HAPPENNING = "Đang diễn ra",
  EXPIRED = "Đã hết hạn",
}
