import * as yup from "yup";
export const studentSchema = yup.object({
  email: yup
    .string()
    .email("Email chưa đúng định dạng")
    .required("Email là trường bắt buộc"),
});
