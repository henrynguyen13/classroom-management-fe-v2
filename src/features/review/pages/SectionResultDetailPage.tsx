import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { formatDate, isTeacher } from "@/common";
import {
  IQuestion,
  IResponseList,
  QuestionType,
  ResponseType,
  assignmentService,
} from "@/features";
import { CardQuestionResult, CustomButton } from "@/components";
import { sectionService } from "../services/section.service";

export const SectionResultDetailPage = () => {
  const { sectionId, responseId } = useParams();
  const [response, setResponse] = useState<IResponseList>();

  const getSectionResponseById = async () => {
    const response = await sectionService.getSectionResponseById(
      sectionId as string,
      responseId as string
    );

    if (response?.success) {
      console.log("---------", response);
      setResponse(response);
    }
  };
  useEffect(() => {
    getSectionResponseById();
  }, []);

  return (
    <>
      {response ? (
        <>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-11">
              <div>Chi tiết bài làm</div>
              <div>Học sinh: {response?.user[0].username}</div>
              <div>Email: {response?.user[0].email}</div>
              <div>Ngày nộp: {formatDate(response?.createdAt)} </div>
              <div>
                Điểm:
                {response?.mark}
              </div>
            </div>
          </div>
        </>
      ) : null}

      <>
        <div className="mt-5 mb-3 text-base font-medium">
          Câu hỏi ({response?.response.length})
        </div>

        {response?.response.map((res: any, index: any) => (
          <>
            <div key={index}>
              <CardQuestionResult
                id={res?.questionId}
                idx={index}
                text={res?.question?.text}
                type={res?.question?.type}
                answers={res?.question?.answers}
                answerTF={res?.question?.answerTF}
                answerShort={res?.question?.answerShort}
                userAnswer={res?.userAnswer}
                correctAnswer={res?.correctAnswer}
              />
            </div>
          </>
        ))}
      </>
    </>
  );
};
