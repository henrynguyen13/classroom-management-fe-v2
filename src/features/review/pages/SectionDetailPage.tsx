import { useParams } from "react-router-dom";
import { useFunctionSection } from "../hook/section.hook";
import { ISectionProps, Section_Type } from "../interface";
import dayjs from "dayjs";
import { CardQuestion, OutputTiptap } from "@/components";
import { SectionType } from "@/common";
import React from "react";

export const SectionDetailPage = () => {
  const { sectionId } = useParams();

  const { section } = useFunctionSection({ sectionId });

  // console.log('--------', JSON.parse(section?.content))

  const content = section?.content;
  if (content) {
    console.log("--------", JSON.parse(content));
  }
  return (
    <div>
      <div className="font-medium text-2xl">
        Nội dung ôn tập: {section?.name}
      </div>
      <div className="mt-3">
        Ngày tạo: {dayjs(section?.createdAt).format("HH:mm DD/MM/YYYY")}
      </div>

      {section?.type === Section_Type.PDF && (
        <a
          className="text-primary-1 underline cursor-pointer"
          target="_blank"
          href={section?.content}
        >
          Xem toàn màn hình
        </a>
      )}

      {section?.type === Section_Type.PDF && (
        <div className="pdf-preview mt-5">
          <iframe
            src={section?.content}
            width="70%"
            height="800px"
            title={section?.name}
          ></iframe>
        </div>
      )}

      {section?.type === Section_Type.TEXT && (
        <OutputTiptap value={section?.content} />
      )}

      {section?.type === Section_Type.QUESTION &&
        section?.content &&
        JSON.parse(section.content).length > 0 && (
          <>
            <div className="mt-5 mb-3 text-base font-medium">
              Câu hỏi ({JSON.parse(section.content).length})
            </div>

            {JSON.parse(section.content).map((question: any, index: any) => (
              <React.Fragment key={index}>
                <div key={index}>
                  <CardQuestion
                    id={question._id}
                    index={index + 1}
                    text={question.text}
                    answers={question.answers}
                    answerTF={question?.answerTF}
                    answerShort={question?.answerShort}
                    type={question.type}
                    level={question.level}
                    typeButton="delete"
                    // handleDelete={() => handleDelete(question._id)}
                    // handleUpdate={() =>
                    //   setIsOpenUpdateQuestionForm({
                    //     id: question._id,
                    //     state: true,
                    //   })
                    // }
                  />
                </div>
              </React.Fragment>
            ))}
          </>
        )}
    </div>
  );
};
