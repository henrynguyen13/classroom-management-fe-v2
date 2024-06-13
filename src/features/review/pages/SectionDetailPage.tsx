import { useParams } from "react-router-dom";
import { useFunctionSection } from "../hook/section.hook";
import { ISectionProps, Section_Type } from "../interface";
import dayjs from "dayjs";
import { SectionType } from "@/common";
import { OutputTiptap } from "@/components";

export const SectionDetailPage = () => {
  const { sectionId } = useParams();

  const { section } = useFunctionSection({ sectionId });
  return (
    <div>
      <div>Nội dung ôn tập: {section?.name}</div>
      <div>
        Ngày tạo: {dayjs(section?.createdAt).format("HH:mm DD/MM/YYYY")}
      </div>

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
    </div>
  );
};
