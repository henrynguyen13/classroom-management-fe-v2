import { assignmentService } from "@/features/assignments/services/assignment.service";
import { useEffect, useState } from "react";
import { IResponseList, ResponseType } from "../interfaces";
import { formatDate, isTeacher } from "@/common/helpers";
import { IQuestion } from "@/features/questions/interfaces";
import CardQuestionResult from "@/components/base/CardQuestionResult";
import CustomButton from "@/components/base/Button";
import MarkForm from "./MarkForm";
import { useParams } from "react-router-dom";

export default function ResponseDetailPage() {
  const { id, assignmentId, responseId } = useParams();
  const [response, setResponse] = useState<IResponseList>();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [isOpenMarkForm, setIsOpenMarkForm] = useState<boolean>(false);
  useEffect(() => {
    const getAResponseById = async () => {
      const response = await assignmentService.getAResponseById(
        id as string,
        assignmentId as string,
        responseId as string
      );

      console.log("RESPONSE", response);

      if (response?.success) {
        setResponse(response);
      }
    };

    const getAllAQuestions = async () => {
      const response = await assignmentService.getAllAQuestions(
        id as string,
        assignmentId as string
      );

      setQuestions(response.data?.items || []);
      setTotalQuestions(response.data?.totalItems || 0);
    };

    getAResponseById();
    getAllAQuestions();
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

      {questions.length > 0 ? (
        <>
          <div className="mt-5 mb-3 text-base font-medium">
            Câu hỏi ({totalQuestions})
          </div>

          {questions.map((question, index) => (
            <>
              <div key={index}>
                <CardQuestionResult
                  id={question._id}
                  idx={index}
                  text={question.text}
                  type={question.type}
                  answers={question.answers}
                  studentAnswer={response?.response ?? []}
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
}
