import { IBase, baseFields } from "@/common";

export interface ISection extends IBase {
  _id: string;
  name: string;
  type: string;
  content: any;
  duration: string[];
  reviewId: string;
}

export interface IReview extends IBase {
  _id: string;
  name: string;
  sections: ISection[];
  classId: string;
}
export interface ICreateReview
  extends Omit<IReview, baseFields | "_id" | "sections"> {}

export type IUpdateReview = Partial<ICreateReview>;

export interface ICreateSection
  extends Omit<ISection, baseFields | "_id" | "reviewId" | "duration"> {}

export type IUpdateSection = Partial<ICreateSection>;
export interface IReviewProps {
  review?: IReview;
  section?: ISection;
  classId?: string;
  reviewId?: string;
}

export interface ISectionProps {
  type?: string;
  reviewId?: string;
  sectionId?: string;
  handleClose?: () => void;
  update?: () => void;
}

export enum Section_Type {
  TEXT = "TEXT",
  QUESTION = "QUESTION",
  PDF = "PDF",
}
