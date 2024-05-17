// import yup from "@/plugins/yup";
import * as yup from "yup";
export const questionBankSchema = yup.object({
  name: yup.string().required("Tên ngân hàng câu hỏi là trường bắt buộc"),
  description: yup.string().optional(),
});
