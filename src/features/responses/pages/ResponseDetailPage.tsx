import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { formatDate, isTeacher } from "@/common";
import { IQuestion, QuestionType, assignmentService } from "@/features";
import { CardQuestionResult, CustomButton } from "@/components";
import { MarkForm, IResponseList, ResponseType } from "../index";

export const ResponseDetailPage = () => {
  const { id, assignmentId, responseId } = useParams();
  const [response, setResponse] = useState<IResponseList>();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [isOpenMarkForm, setIsOpenMarkForm] = useState<boolean>(false);
  const getAResponseById = async () => {
    const response = await assignmentService.getAResponseById(
      id as string,
      assignmentId as string,
      responseId as string
    );

    if (response?.success) {
      setResponse(response);
    }
  };
  useEffect(() => {
    // const getAllAQuestions = async () => {
    //   const response = await assignmentService.getAllAQuestions(
    //     id as string,
    //     assignmentId as string
    //   );

    //   setQuestions(response.data?.items || []);
    //   setTotalQuestions(response.data?.totalItems || 0);
    // };

    getAResponseById();
  }, []);

  const isTeacherRole = isTeacher();

  const updateResponse = async () => {
    const response = await assignmentService.getAResponseById(
      id as string,
      assignmentId as string,
      responseId as string
    );

    if (response?.success) {
      setResponse(response);
    }
  };
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
                {/* {response?.type === ResponseType.TEST
                  ? (
                      (MAX_GRADE / response?.response.length) *
                      response.response.filter((res: any) => res?.isCorrect)
                        .length
                    ).toFixed(2)
                  : null} */}
                {response?.mark}
              </div>
              {response?.type === ResponseType.UPLOAD_FILE ? (
                <div>Nhận xét: {response?.comment}</div>
              ) : null}
            </div>
            <div className="col-span-1">
              {isTeacherRole ? (
                <CustomButton
                  onClick={() => setIsOpenMarkForm(true)}
                  text="Chấm điểm"
                  width="120"
                />
              ) : null}
            </div>
          </div>
        </>
      ) : null}

      {response?.type === ResponseType.MULTIPLE_CHOICE ? (
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
      ) : (
        <>
          {response?.response?.format === "jpg" ? (
            <img className="mt-5 max-h-[32rem]" src={response?.response?.url} />
          ) : (
            <div className="mt-5">
              <a
                href={response?.response?.url}
                target="blank"
                className=" underline text-primary-1 hover:opacity-80"
              >
                {response?.response?.url}
              </a>
            </div>
          )}
        </>
      )}

      <MarkForm
        classId={id as string}
        assignmentId={assignmentId as string}
        responseId={responseId as string}
        isOpenForm={isOpenMarkForm}
        handleClose={() => setIsOpenMarkForm(false)}
        updateResponse={updateResponse}
      />
    </>
  );
};
