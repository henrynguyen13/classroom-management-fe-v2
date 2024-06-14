import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
import { TestSectionSidebar } from "@/components/layout/components/sidebar/TestSectionSidebar";
import { sectionService } from "../services/section.service";

export const SectionTestPage = () => {
  const dispatch = useDispatch();
  const currentIndex = useSelector(
    (state: RootState) => state.test?.selectedQuestion
  );

  const { id, sectionId, reviewId } = useParams();
  const navigate = useNavigate();

  const responses = useAppSelector(selectResponses) ?? [];
  const { state } = useLocation(); // useLocation to access the state
  const questions = state?.questions || []; // Access questions from the state

  const handleAnswerSelected = (index: number, selectedAnswer: string[]) => {
    const updatedResponses = [...responses];
    const question = questions[index];

    if (!question || selectedAnswer.length === 0) return;

    const responseIndex = updatedResponses.findIndex(
      (response) => response.seq === index + 1
    );

    const newResponse = {
      userAnswer: selectedAnswer,
      questionId: question?._id,
      seq: index + 1,
    };

    if (responseIndex > -1) {
      updatedResponses[responseIndex] = newResponse;
    } else {
      updatedResponses.push(newResponse);
    }

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
        const response = await sectionService.createResponse(
          sectionId!,
          responses
        );

        if (response?.success) {
          navigate(
            `/classes/${id}/reviews/${reviewId}/sections/${sectionId}/result/${response?._id}`
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
    <div className="mx-[50px] mt-[-100px] grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <TestSectionSidebar totalQuestions={questions?.length} />
      </div>
      <div className="col-span-9">
        <CardQuestionTest
          question={questions?.[currentIndex - 1]}
          currentIndex={currentIndex - 1}
          type={questions?.[currentIndex - 1]?.type}
          onAnswerSelected={handleAnswerSelected}
        />

        {currentIndex < questions.length ? (
          <CustomButton text="Gửi" onClick={() => handleSubmit()} />
        ) : (
          <CustomButton text="Nộp bài" onClick={() => handleFinalSubmit()} />
        )}
      </div>
    </div>
  );
};
