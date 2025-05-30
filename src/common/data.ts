import { ForumState, QuestionType } from "@/features";
import { ASSIGNMENT, ROLES } from ".";
import { Section_Type } from "@/features/review/interface";

export const time = [
  { id: "6:45", label: "6:45" },
  { id: "7:00", label: "7:00" },
  { id: "7:15", label: "7:15" },
  { id: "7:30", label: "7:30" },
  { id: "7:45", label: "7:45" },
  { id: "8:00", label: "8:00" },
  { id: "8:15", label: "8:15" },
  { id: "8:30", label: "8:30" },
  { id: "8:45", label: "8:45" },
  { id: "9:00", label: "9:00" },
  { id: "9:15", label: "9:15" },
  { id: "9:30", label: "9:30" },
  { id: "9:45", label: "9:45" },
  { id: "10:00", label: "10:00" },
  { id: "10:15", label: "10:15" },
  { id: "10:30", label: "10:30" },
  { id: "10:45", label: "10:45" },
  { id: "11:00", label: "11:00" },
  { id: "11:15", label: "11:15" },
  { id: "11:30", label: "11:30" },
  { id: "11:45", label: "11:45" },
  { id: "12:00", label: "12:00" },
  { id: "12:15", label: "12:15" },
  { id: "12:30", label: "12:30" },
  { id: "12:45", label: "12:45" },
  { id: "13:00", label: "13:00" },
  { id: "13:15", label: "13:15" },
  { id: "13:30", label: "13:30" },
  { id: "13:45", label: "13:45" },
  { id: "14:00", label: "14:00" },
  { id: "14:15", label: "14:15" },
  { id: "14:30", label: "14:30" },
  { id: "14:45", label: "14:45" },
  { id: "15:00", label: "15:00" },
  { id: "15:15", label: "15:15" },
  { id: "15:30", label: "15:30" },
  { id: "15:45", label: "15:45" },
  { id: "16:00", label: "16:00" },
  { id: "16:15", label: "16:15" },
  { id: "16:30", label: "16:30" },
  { id: "16:45", label: "16:45" },
  { id: "17:00", label: "17:00" },
  { id: "17:15", label: "17:15" },
  { id: "17:30", label: "17:30" },
  { id: "17:45", label: "17:45" },
  { id: "18:00", label: "18:00" },
  { id: "18:15", label: "18:15" },
  { id: "18:30", label: "18:30" },
  { id: "18:45", label: "18:45" },
  { id: "19:00", label: "19:00" },
  { id: "19:15", label: "19:15" },
  { id: "19:30", label: "19:30" },
  { id: "19:45", label: "19:45" },
  { id: "20:00", label: "20:00" },
  { id: "20:15", label: "20:15" },
  { id: "20:30", label: "20:30" },
  { id: "20:45", label: "20:45" },
  { id: "21:00", label: "21:00" },
  { id: "21:15", label: "21:15" },
  { id: "21:30", label: "21:30" },
  { id: "21:45", label: "21:45" },
  { id: "22:00", label: "22:00" },
];

export const date = [
  { id: "Thứ 2", label: "Thứ 2" },
  { id: "Thứ 3", label: "Thứ 3" },
  { id: "Thứ 4", label: "Thứ 4" },
  { id: "Thứ 5", label: "Thứ 5" },
  { id: "Thứ 6", label: "Thứ 6" },
  { id: "Thứ 7", label: "Thứ 7" },
  { id: "Chủ nhật", label: "Chủ nhật" },
];

export const roles = [
  ROLES.ADMIN,
  ROLES.ACADEMIC_AFFAIR,
  ROLES.STUDENT,
  ROLES.TEACHER,
];

export const Roles = [
  { id: ROLES.ADMIN, label: "Quản trị viên" },
  { id: ROLES.ACADEMIC_AFFAIR, label: "Giáo vụ" },
  { id: ROLES.STUDENT, label: "Học sinh" },
  { id: ROLES.TEACHER, label: "Giáo viên" },
];

export const ASSIGNMENT_TYPE = [
  { id: ASSIGNMENT.TEST, label: "Trắc nghiệm" },
  { id: ASSIGNMENT.ESSAY, label: "Tự luận" },
];

export const LEVEL_QUESTION = [
  { id: "1", label: "Nhận biết" },
  { id: "2", label: "Thông hiểu" },
  { id: "3", label: "Vận dụng" },
  { id: "4", label: "Vận dụng cao" },
];

export const TYPE_QUESTION = [
  {
    id: QuestionType.MULTIPLE_CHOICE,
    label: "Trắc nghiệm",
  },
  { id: QuestionType.TRUE_FALSE, label: "Đúng/Sai" },
  { id: QuestionType.SHORT_ANSWER, label: "Điền vào chỗ trống" },
];

export const GroupStatus = [
  { id: ForumState.PUBLIC, label: "Công khai" },
  { id: ForumState.PRIVATE, label: "Riêng tư" },
];

export const SectionType = [
  { id: Section_Type.TEXT, label: "Văn bản" },
  { id: Section_Type.QUESTION, label: "Câu hỏi" },
  { id: Section_Type.PDF, label: "PDF" },
];
