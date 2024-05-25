import * as yup from "yup";
export const questionSchema = yup.object({
  // level: yup.string().required("Đây là trường bắt buộc"),
  // text: yup.string().required("Đây là trường bắt buộc"),
  // answers: yup.array().of(
  //   yup.object({
  //     text: yup.string().required("Đây là trường bắt buộc"),
  //     isCorrect: yup.boolean(),
  //   })
  // ),
});
