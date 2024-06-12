// import { useEffect, useState } from "react";
// import { IReview } from "../interface";

// export const useFunctionReview = () => {
//   const [reviews, setReviews] = useState<any[]>([]);

//   const data = [
//     {
//       _id: "1",
//       name: "Tuần 1",
//       section: [
//         {
//           name: "Chương 1: Giới thiệu về trí tuệ nhân tạo",
//           type: "text",
//           content: ".........",
//         },
//         {
//           name: "Giới thiệu về trí tuệ nhân tạo (PDF)",
//           type: "pdf",
//           content: "........",
//         },

//         {
//           name: "Câu hỏi trắc nghiệm chương 1",
//           type: "question",
//           content: ".......",
//         },
//       ],
//       classId: "6659904ea801fef76f6ddf64",
//     },

//     {
//       _id: "2",
//       name: "Tuần 2",
//       section: [
//         {
//           name: "Chương 1: Giới thiệu về trí tuệ nhân tạo",
//           type: "text",
//           content: "anccc",
//         },
//         {
//           name: "Giới thiệu về trí tuệ nhân tạo (PDF)",
//           type: "pdf",
//           content: "anccc",
//         },

//         {
//           name: "Câu hỏi trắc nghiệm chương 1",
//           type: "question",
//           content: "anccc",
//         },
//       ],
//       classId: "6659904ea801fef76f6ddf64",
//     },
//   ];

//   useEffect(() => {
//     setReviews(data);
//   }, []);
//   return {
//     reviews,
//     setReviews,
//   };
// };
import { useEffect, useState } from "react";
import { IReview, IReviewProps } from "../interface";
import { reviewService } from "../services/review.service";
import { SectionType } from "@/common";

export const useFunctionReview = (props?: IReviewProps) => {
  const { classId } = props || {};
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);

  const [selectedType, setSelectedType] = useState(SectionType?.[0]?.id);
  const fetchReviews = async () => {
    try {
      const response = await reviewService.findAllByClassId(classId!);

      if (response?.success) {
        setReviews(response?.data?.items);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeType = (_: any, value: any) => {
    setSelectedType(value?.id);
  };

  useEffect(() => {
    fetchReviews();
  }, [classId]);

  const update = () => {
    fetchReviews();
  };

  return {
    reviews,
    setReviews,
    loading,
    error,
    isOpenCreateForm,
    isOpenUpdateForm,
    setIsOpenCreateForm,
    setIsOpenUpdateForm,
    update,
    setSelectedType,
    selectedType,
    handleChangeType,
  };
};
