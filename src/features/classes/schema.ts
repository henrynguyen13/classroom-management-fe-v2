// import yup from "@/plugins/yup";
import * as yup from "yup";
export const classSchema = yup.object({
  code: yup.string().required("Mã lớp học là trường bắt buộc"),
  name: yup.string().required("Tên lớp học là trường bắt buộc"),
  description: yup.array().of(
    yup.object().shape({
      from: yup.string().required("Trường bắt buộc"),
      to: yup.string().required("Trường bắt buộc"),
      date: yup.string().required("Trường bắt buộc"),
    })
  ),
  teacher: yup.string().required("Giáo viên là trường bắt buộc"),
  duration: yup.array().required("Giáo viên là trường bắt buộc"),
});
