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
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiLoginVariant } from "@mdi/js";

import { formatDate } from "@/common";

import { sectionService } from "../services/section.service";
import { IResponseList } from "@/features/responses";

export const ListSectionResponsesPage = () => {
  const { sectionId, id, reviewId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<IResponseList[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const getListResponses = async () => {
      const response = await sectionService.getAllSectionResponses(sectionId!);
      if (response?.success) {
        setList(response?.data.items);
        setTotalItems(response?.data.totalItems);
      }
    };

    getListResponses();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div>Tổng số: {totalItems} học sinh</div>
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
            {list?.length > 0
              ? list.map((row, index) => (
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
                      {/* {row.type === ResponseType.TEST
                        ? (
                            (MAX_GRADE / row.response.length) *
                            row.response.filter((res: any) => res?.isCorrect)
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
                              `/classes/${id}/reviews/${reviewId}/sections/${sectionId}/response/${row?._id}`
                            )
                          }
                        >
                          <Icon path={mdiLoginVariant} size={1} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
