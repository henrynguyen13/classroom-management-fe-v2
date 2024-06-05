// import yup from "@/plugins/yup";
import * as yup from "yup";
export const groupSchema = yup.object({
  name: yup.string().required("Tên nhóm là trường bắt buộc"),
  status: yup.string().required("Trạng thái là trường bắt buộc"),
});
