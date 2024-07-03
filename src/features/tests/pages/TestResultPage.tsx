import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@mui/material";

import { CustomButton } from "@/components";
import { assignmentService, IResponseList } from "@/features";
import { ScreenType, useBreakpoint } from "@/common";

export const TestResultPage = () => {
  const { id, assignmentId, resultId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState<IResponseList>();

  useEffect(() => {
    const getAResponseById = async () => {
      const response = await assignmentService.getAResponseById(
        id as string,
        assignmentId as string,
        resultId as string
      );

      if (response?.success) {
        setResponse(response);
      }
    };

    getAResponseById();
  }, []);
  const { isSm } = useBreakpoint(ScreenType.SM);
  return (
    <Card
      variant="outlined"
      sx={{ width: isSm ? 600 : "90vw", margin: "0 auto", textAlign: "center" }}
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
