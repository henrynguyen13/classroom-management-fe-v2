import { IBase, baseFields } from "@/common";

export interface ISection {
  _id: string;
  name: string;
  type: string;
  content: any;
  reviewId: string;
}

export interface IReview extends IBase {
  _id: string;
  name: string;
  section: ISection[];
  classId: string;
}
export interface ICreateReview
  extends Omit<IReview, baseFields | "_id" | "section"> {}

export type IUpdateReview = Partial<ICreateReview>;

export interface ICreateSection extends Omit<ISection, baseFields | "_id"> {}

export type IUpdateSection = Partial<ICreateSection>;
export interface IReviewProps {
  review?: IReview;
  section?: ISection;
  classId?: string;
  reviewId?: string;
}

export enum Section_Type {
  TEXT = "TEXT",
  QUESTION = "QUESTION",
  PDF = "PDF",
}
