import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { mdiLoginVariant, mdiCircleSmall } from "@mdi/js";

import { convertStatusSubmit, formatDate } from "@/common";
import { NoData } from "@/assets";
import { assignmentService, IResponseList } from "@/features";

interface Props {
  expiredAt: Date;
}
export const MyListResponsesPage = ({ expiredAt }: Props) => {
  const navigate = useNavigate();
  const { id, assignmentId } = useParams();

  const [list, setList] = useState<IResponseList[]>([]);

  useEffect(() => {
    const getMyListResponses = async () => {
      const response = await assignmentService.getMyAResponses(
        id as string,
        assignmentId as string
      );
      console.log("---ré---", response);
      if (response?.success) {
        setList(response?.data.items);
      }
    };

    getMyListResponses();
  }, []);

  const convertStatusColor = (status: string) => {
    return status === "Đã nộp" ? "#008000" : "#ed3a3a";
  };
  return (
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
                width="20%"
                align="center"
              >
                Trạng thái
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    <div className="flex items-center justify-center">
                      <Icon
                        color={convertStatusColor(
                          convertStatusSubmit(row.createdAt, expiredAt)
                        )}
                        path={mdiCircleSmall}
                        size={1.2}
                      />
                      <div className="text-sm mr-2">
                        {convertStatusSubmit(row.createdAt, expiredAt)}
                      </div>
                    </div>
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
                        onClick={() =>
                          navigate(
                            `/classes/${id}/assignment/${assignmentId}/response/${row._id}`
                          )
                        }
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
                  <div className="mt-2 font-medium">Chưa có bài làm nào.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
