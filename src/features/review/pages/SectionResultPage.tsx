import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@mui/material";

import { CustomButton } from "@/components";
import { IResponseList } from "@/features";
import { sectionService } from "../services/section.service";

export const SectionResultPage = () => {
  const { sectionId, resultId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState<IResponseList>();

  useEffect(() => {
    const getSectionResponseById = async () => {
      const response = await sectionService.getSectionResponseById(
        sectionId as string,
        resultId as string
      );

      if (response?.success) {
        setResponse(response);
      }
    };

    getSectionResponseById();
  }, []);
  return (
    <Card
      variant="outlined"
      sx={{ width: 600, margin: "0 auto", textAlign: "center" }}
    >
      {response && response?.response.length > 0 ? (
        <>
          <div className="mt-5">Chúc mừng bạn đã hoàn thành bài làm</div>
          <div>
            Số câu đạt được:{" "}
            <span className="font-bold">
              {response?.response?.filter((res: any) => res?.isCorrect).length}/
              {response?.response.length}
            </span>
          </div>
          <div className="mb-5">
            Điểm số của bạn là:{" "}
            <span className="font-bold">{response?.mark}</span>
          </div>
        </>
      ) : null}
      <CustomButton
        onClick={() => navigate(`/dashboard`)}
        text="Quay lại trang chủ"
      />
      <div className="mb-5"></div>
    </Card>
  );
};
