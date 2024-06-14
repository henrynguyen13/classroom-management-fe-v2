import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useFunctionSection } from "../hook/section.hook";
import { Section_Type } from "../interface";
import dayjs from "dayjs";
import { CardQuestion, CustomButton, OutputTiptap } from "@/components";
import React, { useEffect, useState } from "react";
import { AuthStorageService, ROLES } from "@/common";
import { sectionService } from "../services/section.service";
import { IResponseList } from "@/features";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiLoginVariant } from "@mdi/js";
import { formatDate } from "@/common";
import { NoData } from "@/assets";

export const SectionDetailPage = () => {
  const { id, reviewId, sectionId } = useParams();

  const { section } = useFunctionSection({ sectionId });
  const navigate = useNavigate();
  const role = AuthStorageService.getLoginUser().role;
  const [list, setList] = useState<IResponseList[]>([]);

  const handleStartTest = () => {
    console.log("--------hi", section);
    if (section?.type === Section_Type.QUESTION) {
      const questions = JSON.parse(section.content);

      console.log("--------");
      navigate(
        `/classes/${id}/reviews/${reviewId}/sections/${sectionId}/test`,
        {
          state: { questions },
        }
      );
    }
  };

  const getMySectionResponses = async () => {
    const response = await sectionService.getMySectionResponses(section?._id!);
    if (response?.success) {
      setList(response?.data.items);
    }
  };

  useEffect(() => {
    if (section?.type === Section_Type.QUESTION) {
      getMySectionResponses();
    }
  }, [section?._id]);
  return (
    <div>
      <div className="font-medium text-2xl">
        Nội dung ôn tập: {section?.name}
      </div>
      <div className="my-3">
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
        role !== ROLES.STUDENT &&
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

      {section?.type === Section_Type.QUESTION &&
        role === ROLES.STUDENT &&
        section?.content &&
        JSON.parse(section.content).length > 0 && (
          <div className="mt-5">
            <CustomButton text="Bắt đầu làm bài" onClick={handleStartTest} />

            <>
              <div className="flex justify-between items-center mb-5">
                <Chip label="10 phản hồi gần nhất" />
              </div>
              <TableContainer
                sx={{
                  maxHeight: "70vh",
                  "&::-webkit-scrollbar": {
                    width: 8,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#E1E3E9",
                    borderRadius: 2,
                  },
                }}
                component={Paper}
              >
                <Table
                  sx={{
                    minWidth: 650,
                    border: "1px solid #ccc",
                  }}
                  aria-label="sticky table"
                  stickyHeader
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        color: "#1b1b33",
                      }}
                    >
                      <TableCell sx={{ backgroundColor: "#e3e1e1" }} width="5%">
                        STT
                      </TableCell>

                      <TableCell
                        sx={{ backgroundColor: "#e3e1e1" }}
                        width="15%"
                        align="center"
                      >
                        Tên học sinh
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#e3e1e1" }}
                        width="15%"
                        align="center"
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#e3e1e1" }}
                        width="25%"
                        align="center"
                      >
                        Thời gian nộp bài
                      </TableCell>

                      <TableCell
                        sx={{ backgroundColor: "#e3e1e1" }}
                        width="10%"
                        align="center"
                      >
                        Điểm
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#e3e1e1" }}
                        width="10%"
                        align="center"
                      >
                        Hành động
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list?.length > 0 ? (
                      list.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell width="5%">{index + 1}</TableCell>

                          <TableCell width="15%" align="center">
                            {row.user[0]?.username}
                          </TableCell>
                          <TableCell width="25%" align="center">
                            {row.user[0]?.email}
                          </TableCell>
                          <TableCell width="25%" align="center">
                            {formatDate(row.createdAt)}
                          </TableCell>

                          <TableCell width="25%" align="center">
                            {/* {row.type === ResponseType.TEST
                        ? (
                            (MAX_GRADE / row?.response?.length) *
                            row?.response?.filter((res: any) => res?.isCorrect)
                              .length
                          ).toFixed(2)
                        : null} */}
                            {row?.mark}
                          </TableCell>
                          <TableCell width="25%" align="center" padding="none">
                            <Tooltip title="Xem chi tiết">
                              <IconButton
                                sx={{ color: "#ED3A3A" }}
                                // onClick={() =>
                                //   navigate(
                                //     `/classes/${id}/assignment/${assignmentId}/response/${row._id}`
                                //   )
                                // }
                              >
                                <Icon path={mdiLoginVariant} size={1} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <img
                            src={NoData}
                            className="h-80 flex my-0 mx-auto"
                            alt="No-data"
                          />
                          <div className="mt-2 font-medium">
                            Chưa có bài làm nào.
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          </div>
        )}
    </div>
  );
};
