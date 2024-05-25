import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/plugins";
import { testSlice } from "@/features/tests/reducers/test.reducer";
import { assignmentService } from "@/features";

export const TestSideBar = () => {
  const { id, assignmentId } = useParams();
  const dispatch = useDispatch();
  const handleQuestionSelect = (index: number) => {
    dispatch(testSlice.actions.selectQuestion(index));
  };
  const isActiveQuestion = useSelector(
    (state: RootState) => state.test?.selectedQuestion ?? 1
  );
  const answeredQuestion = useSelector(
    (state: RootState) => state.test.answered
  );
  const [totalQuestions, setTotalQuestions] = useState(0);

  const getAllAQuestions = async () => {
    const response = await assignmentService.getAssignmentById(
      id as string,
      assignmentId as string
    );

    if (response?.success) {
      setTotalQuestions(response.questions?.length || 0);
    }
  };
  useEffect(() => {
    getAllAQuestions();
  }, [assignmentId]);

  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);
  return (
    <div className="border-2 border-gray-400 rounded p-5 mt-2">
      <div className="mb-4">Câu hỏi</div>

      <div className="grid grid-cols-5  gap-4">
        {questions.map((index) => (
          <div
            className={`border-2 h-8 col-span-1 flex items-center justify-center rounded  cursor-pointer hover:bg-[#1D8FE4] hover:border-none hover:text-[#ffffff] ${
              isActiveQuestion === index || answeredQuestion[index - 1] === true
                ? "border-none bg-[#1D8FE4] text-white"
                : "border-gray-400"
            } `}
            onClick={() => handleQuestionSelect(index)}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};
