import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { showAlert } from "@/common";
import { CardQuestionTest, CustomButton } from "@/components";
import {
  ICreateResponse,
  IQuestion,
  QuestionType,
  assignmentService,
  selectAnswered,
  selectResponses,
  selectSelectedAnswer,
  selectSelectedQuestion,
  setResponses,
} from "@/features";
import { RootState, useAppSelector } from "@/plugins";
import {
  selectQuestion,
  answeredQuestion,
  resetAnsweredQuestion,
  setSelectAnswer,
} from "@/features/tests/reducers/test.reducer";

export const TestPage = () => {
  const dispatch = useDispatch();
  const currentIndex = useSelector(
    (state: RootState) => state.test?.selectedQuestion
  );

  const { id, assignmentId } = useParams();
  const navigate = useNavigate();

  const responses = useAppSelector(selectResponses) ?? [];

  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  // const [responses, setResponses] = useState<ICreateResponse[]>([]);

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

  const handleAnswerSelected = (index: number, selectedAnswer: string[]) => {
    // Sao chép mảng responses
    const updatedResponses = [...responses];
    const question = questions[index];

    // Nếu không có câu hỏi hoặc không có đáp án được chọn, không thực hiện gì cả
    if (!question || selectedAnswer.length === 0) return;

    // // Khởi tạo biến correctAns
    // let correctAns: string[] | undefined;

    // // Kiểm tra loại câu hỏi và thiết lập correctAns tương ứng
    // switch (question.type) {
    //   case QuestionType.SINGLE_CHOICE:
    //   case QuestionType.MULTIPLE_CHOICE:
    //     correctAns = question.answers
    //       .filter((answer) => answer?.isCorrect)
    //       .map((answer) => answer?._id)
    //       .filter((id): id is string => !!id);
    //     break;
    //   case QuestionType.SHORT_ANSWER:
    //     correctAns = question.answerShort ? [question.answerShort] : undefined;
    //     break;
    //   case QuestionType.TRUE_FALSE:
    //     correctAns = question.answerTF ? [question.answerTF] : undefined;
    //     break;
    //   default:
    //     correctAns = undefined;
    // }

    // // Nếu không có đáp án đúng hoặc đáp án người dùng không khớp, isCorrect sẽ là false
    // const isCorrect =
    //   correctAns &&
    //   correctAns.length === selectedAnswer.length &&
    //   correctAns.every((id) => selectedAnswer.includes(id));

    // Tìm index của response tương ứng với câu hỏi
    const responseIndex = updatedResponses.findIndex(
      (response) => response.seq === index + 1
    );

    const newResponse = {
      userAnswer: selectedAnswer,
      questionId: question?._id,
      seq: index + 1,
    };

    // Nếu response đã tồn tại, cập nhật nó; ngược lại, thêm mới
    if (responseIndex > -1) {
      updatedResponses[responseIndex] = newResponse;
    } else {
      updatedResponses.push(newResponse);
    }

    // Cập nhật state responses
    dispatch(setResponses(updatedResponses));
  };

  const handleSubmit = () => {
    dispatch(answeredQuestion(currentIndex));
    dispatch(selectQuestion(currentIndex + 1));
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

        if (response?.success) {
          navigate(
            `/classes/${id}/assignment/${assignmentId}/result/${response._id}`
          );
          setTimeout(() => {
            dispatch(answeredQuestion("RESET"));
            dispatch(selectQuestion(1));
            dispatch(setSelectAnswer([]));
            dispatch(setResponses([]));
          }, 1000);
        }
      }
    });
  };

  return (
    <div>
      <CardQuestionTest
        question={questions?.[currentIndex - 1]}
        currentIndex={currentIndex - 1}
        type={questions?.[currentIndex - 1]?.type}
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
