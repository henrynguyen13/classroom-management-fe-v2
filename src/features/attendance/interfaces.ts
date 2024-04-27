import { IBase, baseFields } from "@/common/interfaces";

export interface IAttendance extends IBase {
  _id: string;
  classId: string;
  name: string;
  students: IStudentAttendance[];
}

export interface IStudentAttendance {
  _id: string;
  username: string;
  code: string;
  attendance: boolean;
}

export interface ICreateAttendance
  extends Omit<IAttendance, baseFields | "_id" | "classId"> {}
