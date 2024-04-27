import { useEffect, useState } from "react";
import { assignmentService } from "@/features/assignments/services/assignment.service";
import { IQuestion } from "@/features/questions/interfaces";
import CardQuestionTest from "@/components/base/CardQuestionTest";
import CustomButton from "@/components/base/Button";
import { ICreateResponse } from "@/features/responses/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/plugins/redux-toolkit/store";
import { testSlice } from "@/features/tests/reducers/test.reducer";
import { showAlert } from "@/common/helpers";
import { useNavigate, useParams } from "react-router-dom";

export default function TestPage() {
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

  useEffect(() => {
    const getAllAQuestions = async () => {
      const response = await assignmentService.getAllAQuestions(
        id as string,
        assignmentId as string
      );

      if (response?.success) {
        console.log("----", response);

        setQuestions(response.data?.items || []);
        setTotalQuestions(response.data?.totalItems || 0);
      }
    };
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
    console.log("response", responses);
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
        console.log("--------", response);
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
}
