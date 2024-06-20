export enum SupportLanguage {
  VI = "vi",
  EN = "en",
  JA = "ja",
}

export const DEFAULT_LANGUAGE = SupportLanguage.EN;

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export enum DATE_TIME_FORMAT {
  YYYY_MM_DD_HYPHEN = "YYYY-MM-DD",
  DD_MM_YYYY_DASH = "DD/MM/YYYY",
  hh_mm_L_COLON = "h:mm L",
  DD_MM_YY_DASH = "DD/MM/YYYY",
  hh_mm = "hh:mm",
  DD = "DD",
  DAY_NAME_MONTH_STRING = "dddd (DD-MM)",
  YYYY = "YYYY",
  YYYY_MM_HYPHEN = "YYYY-MM",
  YYYY_MM_SLASH = "YYYY/MM",
  HH_MM_SS_COLON = "HH:mm:ss",
  HH_MM_COLON = "HH:mm",
  YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON = "YYYY-MM-DD HH:mm:ss",
  YYYY_MM_DD_HYPHEN_HH_MM_COLON = "YYYY-MM-DD HH:mm",
  DD_MM_YYYY_SLASH = "DD/MM/YYYY",
  MM_DD_YYYY_SLASH_HH_MM_SS_COLON = "MM/DD/YYYY HH:mm:ss",
  MM_DD_YYYY_SLASH_HH_MM_COLON = "MM/DD/YYYY HH:mm",
  MM_DD_YYYY_SLASH = "MM/DD/YYYY",
  MMM_D_YYYY = "MMM D, YYYY",
  MM = "MM",
  YYYY_MM_DD_DOT = "YYYY.MM.DD",
  DD_MMMM_YYYY = "DD MMMM, YYYY",
}

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  ITEM_NOT_FOUND = 444,
  ITEM_ALREADY_EXIST = 445,
  ITEM_INVALID = 446,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  NETWORK_ERROR = 502,
}

export enum ButtonSize {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
}

export enum ButtonTheme {
  DANGER = "danger",
  FILL = "fill",
  OUTLINE = "outline",
  TEXT = "text",
}

export enum IconType {
  OUTLINE = "outline",
  FILL = "fill",
}

export const enum PAGES {
  HOME = "/",
  CLASS = "/classes",
  DASHBOARD = "/dashboard",
  LOGIN = "/login",
  REGISTER = "/register",
  MY_CLASS = "/my-classes",
  USERS = "/users",
  QUESTION = "/question-bank",
  TIME_TABLE = "/time-table",
  FORUM = "/forum",
}

export const DEFAULT_FIRST_PAGE = 1;

export enum FormType {
  VIRTUAL_TOUR = "VirtualTour",
  DOWNLOAD = "Download",
  CONTACT = "Contact",
}

export enum TEXT_SIZE {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
}

export enum MediaType {
  VIDEO = "video",
  IMAGE = "image",
}

export enum DateFormat {
  YYYY_MM_DD_SLASH = "YYYY/MM/DD",
}

export const DatePickerHeaderFormat = {
  [SupportLanguage.EN]: "MMMM YYYY",
  [SupportLanguage.JA]: "YYYY年　MM月",
};

export enum ScreenSizeWidth {
  WIDE = 2048,
  UWIDE = 3072,
  "3XL" = 1720,
  "2XL" = 1536,
  XL = 1280,
  LG = 1024,
  MD = 768,
  SM = 600,
}

export enum ScreenSize {
  DESKTOP = "desktop",
  MOBILE = "mobile",
}

export const BUFFER = "buffer";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TEXT = "text",
}

export enum FORM_VALIDATION {
  TEXT_MIN_LENGTH = 6,
  TEXT_MAX_LENGTH = 255,
  LONG_TEXT_MAX_LENGTH = 2000,
  MAX_INTEGER = 2147483647,
}

export const Regex = {
  PHONE_NUMBER_FORMAT: /^(\d{4})(\d{3})(\d{3})$/,
  EMAIL:
    /^(([a-zA-Z0-9]+)([.]{1})?)*[a-zA-Z0-9]@([a-zA-Z0-9]+[.])+[a-zA-Z0-9]+$/,
};

export enum NotificationType {
  SUCCESS = "success",
  ALERT = "alert",
}

export const MAX_GRADE = 10;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; //10MB

export enum ROLES {
  ADMIN = "admin",
  ACADEMIC_AFFAIR = "accademic_affair",
  TEACHER = "teacher",
  STUDENT = "student",
}

export const ONLY_STUDENT = [ROLES.STUDENT];
export const ONLY_TEACHER = [ROLES.TEACHER];
export const ONLY_ADMIN = [ROLES.ADMIN];
export const STUDENT_AND_TEACHER = [ROLES.STUDENT, ROLES.TEACHER];
export const ADMIN_AND_AFFAIR = [ROLES.ADMIN, ROLES.ACADEMIC_AFFAIR];
export const ADMIN_AND_AFFAIR_AND_TEACHER = [
  ROLES.ADMIN,
  ROLES.ACADEMIC_AFFAIR,
  ROLES.TEACHER,
];
export const ALL_MEMBERS = [
  ROLES.STUDENT,
  ROLES.TEACHER,
  ROLES.ACADEMIC_AFFAIR,
  ROLES.ADMIN,
];

export const ROWS_PER_PAGE = 10;

export enum ASSIGNMENT {
  TEST = "TEST",
  ESSAY = "ESSAY",
}

export enum QUESTION_LEVEL {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
}

export enum ScreenType {
  SM = "sm",
  MD = "md",
  LG = "lg",
}
