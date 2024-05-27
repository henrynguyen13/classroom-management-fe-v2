import { IBase, baseFields } from "@/common";

export interface ITeacher {
  _id: string;
  username: string;
  email: string;
}

export interface IDescriptionClass {
  from: string;
  to: string;
  date: string;
}
export interface IClass extends IBase {
  _id: string;
  code: string;
  name: string;
  teacher: ITeacher;
  description: IDescriptionClass[];
  duration: string[];
  status: string;
  users: any;
}

export interface ICreateClass
  extends Omit<IClass, baseFields | "_id" | "status" | "users"> {}

export type IUpdateClass = Partial<ICreateClass>;
export interface IClassDetail {
  class: IClass;
  totalStudents: number;
}
