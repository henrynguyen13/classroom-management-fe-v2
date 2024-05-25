import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { showAlert } from "@/common";
import { CardQuestionTest, CustomButton } from "@/components";
import { ICreateResponse, IQuestion, assignmentService } from "@/features";
import { RootState } from "@/plugins";
import { testSlice } from "@/features/tests/reducers/test.reducer";

export const TestPage = () => {
  const dispatch = useDispatch();
  const currentIndex = useSelector(
    (state: RootState) => state.test?.selectedQuestion
  );

  const { id, assignmentId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<ICreateResponse[]>([]);
  const letters = ["A", "B", "C", "D"];

  const getAllAQuestions = async () => {
    const response = await assignmentService.getAssignmentById(
      id as string,
      assignmentId as string
    );

    if (response?.success) {
      setQuestions(response.questions || []);
      setTotalQuestions(response.questions.length || 0);
    }
  };
  useEffect(() => {
    getAllAQuestions();
  }, [assignmentId]);

  const handleAnswerSelected = (index: number, selectedAnswer: string) => {
    if (questions.length > 0) {
      const updatedResponses = [...responses];
      if (!updatedResponses[index]) {
        updatedResponses[index] = {
          userAnswer: "",
          correctAnswer: "",
          seq: index + 1,
          isCorrect: false,
        };
      }
      const correctAns =
        questions[index].answers.find((answer) => answer.isCorrect)?.idx ?? 0;
      updatedResponses[index].userAnswer = selectedAnswer || "";
      updatedResponses[index].correctAnswer = letters[correctAns] || "";
      updatedResponses[index].seq = index + 1;
      updatedResponses[index].isCorrect =
        letters[correctAns] === selectedAnswer ? true : false;
      setResponses(updatedResponses);
    }
  };

  const handleSubmit = () => {
    // setCurrentIndex((currentIndex) => currentIndex + 1);
    dispatch(testSlice.actions.answeredQuestion(currentIndex));
    dispatch(testSlice.actions.selectQuestion(currentIndex + 1));
  };

  const handleFinalSubmit = async () => {
    showAlert({
      title: "Bạn có chắc muốn nộp bài?",
      text: "Bạn sẽ không thể tiếp tục làm bài",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await assignmentService.createATestResponse(
          id as string,
          assignmentId as string,
          responses
        );

        navigate(
          `/classes/${id}/assignment/${assignmentId}/result/${response._id}`
        );
        setTimeout(() => {
          // dispatch(testSlice.actions.resetAnsweredQuestion());
          dispatch(testSlice.actions.answeredQuestion("RESET"));

          dispatch(testSlice.actions.selectQuestion(1));
        }, 1000);
      }
    });
  };
  return (
    <div>
      <CardQuestionTest
        question={questions?.[currentIndex - 1]}
        currentIndex={currentIndex - 1}
        onAnswerSelected={handleAnswerSelected}
      />

      {currentIndex < totalQuestions ? (
        <CustomButton text="Gửi" onClick={() => handleSubmit()} />
      ) : (
        <CustomButton text="Nộp bài" onClick={() => handleFinalSubmit()} />
      )}
    </div>
  );
};
