import * as yup from "yup";
export const reviewSchema = yup.object({
  name: yup.string().required("Đây là trường bắt buộc"),
});
