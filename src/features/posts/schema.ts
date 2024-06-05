// import yup from "@/plugins/yup";
import * as yup from "yup";
export const postSchema = yup.object({
  content: yup.string().required("Nội dung là trường bắt buộc"),
});
