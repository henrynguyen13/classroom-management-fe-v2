import { LEVEL_QUESTION, TYPE_QUESTION } from "@/common";
import { useState } from "react";

export const useFunctionQuestion = () => {
  const [selectedTypeQuestion, setSelectedTypeQuestion] = useState(
    TYPE_QUESTION?.[0]?.id
  );

  const [selectedLevelQuestion, setSelectedLevelQuestion] = useState(
    LEVEL_QUESTION?.[0]?.id
  );

  const handleChangeLevelQuestion = (_: any, value: any) => {
    setSelectedLevelQuestion(value?.id);
  };

  const handleChangeTypeQuestion = (_: any, value: any) => {
    setSelectedTypeQuestion(value?.id);
  };

  return {
    selectedTypeQuestion,
    selectedLevelQuestion,
    setSelectedLevelQuestion,
    setSelectedTypeQuestion,
    handleChangeLevelQuestion,
    handleChangeTypeQuestion,
  };
};
