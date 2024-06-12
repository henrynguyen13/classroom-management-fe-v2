import { useEffect, useState } from "react";
import { ISection, ISectionProps } from "../interface";
import { sectionService } from "../services/section.service";

export const useFunctionSection = (props: ISectionProps) => {
  const { sectionId } = props;

  console.log("----------", sectionId);
  const [section, setSection] = useState<ISection>();

  const findSectionById = async () => {
    const response = await sectionService.findSectionById(sectionId!);

    console.log("----resos", response);
    if (response?.success) {
      setSection(response?.data);
    }
  };

  if (sectionId) {
    useEffect(() => {
      findSectionById();
    }, [sectionId]);
  }

  return {
    section,
  };
};
