// import yup from "@/plugins/yup";
import * as yup from "yup";
import { FORM_VALIDATION } from "@/common";

export const registerSchema = yup.object({
  username: yup.string().required("Tên là trường bắt buộc"),
  email: yup
    .string()
    .email("Định dạng email không đúng")
    .required("Email là trường bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là trường bắt buộc")
    .min(FORM_VALIDATION.TEXT_MIN_LENGTH, "Mật khẩu phải có ít nhất 6 ký tự"),
  role: yup.string().required("Vai trò người dùng là trường bắt buộc"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Định dạng email không đúng")
    .required("Email là trường bắt buộc"),
  password: yup
    .string()
    .required("Mật khẩu là trường bắt buộc")
    .min(FORM_VALIDATION.TEXT_MIN_LENGTH, ""),
});
