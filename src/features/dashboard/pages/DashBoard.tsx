import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Tooltip,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Chip,
} from "@mui/material";
import Icon from "@mdi/react";
import {
  AuthStorageService,
  ROLES,
  ScreenType,
  convertStatusClass,
  useBreakpoint,
} from "@/common";
import { useFunctionDashboard } from "../hook/DashBoardHook";
import { VisitChart } from "..";
import { UserChart } from "..";
import { AppStatus, CustomButton } from "@/components";
import dayjs from "dayjs";
import { AssignmentStatus } from "@/features";
import { NoData } from "@/assets";
import { mdiLoginVariant } from "@mdi/js";
export const DashBoard = () => {
  const navigate = useNavigate();
  const userRole = AuthStorageService.getLoginUser()?.role;

  const {
    teachers,
    students,
    affairs,
    totalClasses,
    percentage,
    chartData,
    totalGroups,
    handlePreviousWeek,
    studentsInTeacherClass,
    handleNextWeek,
    numberMyClasses,
    numberQuestionBanks,
    myClasses,
    currentWeek,
    userChartData,
    teacherResponses,
    myResponses,
  } = useFunctionDashboard();

  useEffect(() => {
    const isAuthenticated = AuthStorageService.checkAuthentication();
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const { isSm } = useBreakpoint(ScreenType.SM);

  return (
    <div className="mb-5">
      {(userRole === ROLES.ADMIN || userRole === ROLES.ACADEMIC_AFFAIR) && (
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center text-white p-4  h-28  bg-[#5292e6] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Giáo viên</div>
            <div className="text-3xl">{teachers.length}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#e69a52] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Học sinh</div>
            <div className="text-3xl">{students.length}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#e64848] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Giáo vụ</div>
            <div className="text-3xl">{affairs.length}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#2aa94c] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Lớp học</div>
            <div className="text-3xl">{totalClasses}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#e64848] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Diễn đàn</div>
            <div className="text-3xl">{totalGroups}</div>
          </div>
        </div>
      )}

      {userRole === ROLES.TEACHER && (
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center text-white p-4  h-28 bg-[#2aa94c] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Tổng số học sinh</div>
            <div className="text-3xl">{studentsInTeacherClass}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#e64848] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Số lớp học</div>
            <div className="text-3xl">{numberMyClasses}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#e69a52] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Ngân hàng câu hỏi</div>
            <div className="text-3xl">{numberQuestionBanks}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#5292e6] rounded-xl col-span-2 sm:col-span-1">
            <div className="text-lg mb-4">Diễn đàn</div>
            <div className="text-3xl">{totalGroups}</div>
          </div>
        </div>
      )}

      {userRole === ROLES.STUDENT && (
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center text-white p-4  h-28 bg-[#2aa94c] rounded-xl col-span-2 sm:col-span-1 ">
            <div className="text-lg mb-4">Số lớp học</div>
            <div className="text-3xl">{numberMyClasses}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#e64848] rounded-xl col-span-2 sm:col-span-1 ">
            <div className="text-lg mb-4">Số lượng bài tập</div>
            <div className="text-3xl">{numberMyClasses}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#e69a52] rounded-xl col-span-2 sm:col-span-1 ">
            <div className="text-lg mb-4">Số lần vắng mặt</div>
            <div className="text-3xl">{numberQuestionBanks}</div>
          </div>
          <div className="text-center text-white p-4  h-28 bg-[#5292e6] rounded-xl col-span-2 sm:col-span-1 ">
            <div className="text-lg mb-4">Diễn đàn</div>
            <div className="text-3xl">{totalGroups}</div>
          </div>
        </div>
      )}

      <div className="w-full mt-10  grid grid-cols-12 gap-4  p-5 pb-16">
        {(userRole === ROLES.ADMIN || userRole === ROLES.ACADEMIC_AFFAIR) && (
          <>
            <div className="col-span-12 sm:col-span-6">
              <VisitChart
                chartData={chartData}
                handlePreviousWeek={handlePreviousWeek}
                handleNextWeek={handleNextWeek}
                currentWeek={currentWeek}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <UserChart
                userChartData={userChartData}
                handlePreviousWeek={handlePreviousWeek}
                handleNextWeek={handleNextWeek}
                percentage={percentage}
              />
            </div>
            <div className="col-span-12">
              <div className="text-center italic">
                Tuần từ:{" "}
                <span className="font-bold">
                  {currentWeek?.start.format("DD-MM-YYYY")}{" "}
                </span>
                đến{" "}
                <span className="font-bold">
                  {currentWeek?.end.format("DD-MM-YYYY")}
                </span>
              </div>
              <div className="flex justify-between ">
                <CustomButton
                  width="120px"
                  text="Tuần trước"
                  onClick={handlePreviousWeek}
                />
                <CustomButton
                  width="120px"
                  text="Tuần tới"
                  onClick={handleNextWeek}
                />
              </div>
            </div>
          </>
        )}

        {(userRole === ROLES.TEACHER || userRole === ROLES.STUDENT) && (
          <div className="col-span-12">
            <div className="font-medium text-center mb-2 text-xl">
              {" "}
              Các lớp học gần đây
            </div>
            <Table
              sx={{
                minWidth: isSm ? 650 : "auto",
                border: "1px solid #ccc",
                borderRadius: 4,
                overflow: "hidden",
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
                    width="10%"
                    align="center"
                  >
                    Mã lớp học
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#e3e1e1" }}
                    width="15%"
                    align="center"
                  >
                    Tên lớp học
                  </TableCell>

                  <TableCell
                    sx={{ backgroundColor: "#e3e1e1" }}
                    width="10%"
                    align="left"
                  >
                    Trạng thái
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
                {myClasses && myClasses?.length > 0 ? (
                  myClasses.slice(0, 3).map((row: any, index: any) => (
                    <TableRow
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell width="5%">{index + 1}</TableCell>
                      <TableCell padding="none" width="10%" align="center">
                        {row.code ? (
                          <Chip
                            sx={{
                              backgroundColor: "#1D8FE4",
                              color: "#ffffff",
                            }}
                            label={row?.code}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell width="15%" align="center">
                        {row?.name}
                      </TableCell>

                      <TableCell>
                        <AppStatus
                          label={convertStatusClass(
                            dayjs(row.duration[0]).toDate(),
                            dayjs(row.duration[1]).toDate()
                          )}
                          backgroundColor={`${
                            convertStatusClass(
                              dayjs(row.duration[0]).toDate(),
                              dayjs(row.duration[1]).toDate()
                            ) === AssignmentStatus.HAPPENNING
                              ? "#EDFFDF"
                              : "#FBEAEA"
                          }`}
                          dotColor={`${
                            convertStatusClass(
                              dayjs(row.duration[0]).toDate(),
                              dayjs(row.duration[1]).toDate()
                            ) === AssignmentStatus.HAPPENNING
                              ? "#57AA16"
                              : "#D62828"
                          }`}
                        />
                      </TableCell>
                      <TableCell padding="none" width="10%" align="center">
                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            onClick={() => navigate(`/classes/${row?._id}`)}
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
                        Hiện chưa có lớp học nào.
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="float-right mt-2">
              <CustomButton text="Xem chi tiết" width="120px" />
            </div>
          </div>
        )}

        {userRole === ROLES.TEACHER && (
          <div className="col-span-12">
            <div className="font-medium text-center mb-2 text-xl">
              {" "}
              Các phản hồi gần đây
            </div>
            <Table
              sx={{
                minWidth: 650,
                border: "1px solid #ccc",
                borderRadius: 4,
                overflow: "hidden",
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
                    Học sinh
                  </TableCell>

                  <TableCell
                    sx={{ backgroundColor: "#e3e1e1" }}
                    width="10%"
                    align="center"
                  >
                    Mã học sinh
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
                {teacherResponses && teacherResponses?.length > 0 ? (
                  teacherResponses.slice(0, 3).map((row: any, index: any) => (
                    <TableRow
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell width="5%">{index + 1}</TableCell>
                      <TableCell width="15%" align="center">
                        {row?.user?.[0]?.username}
                      </TableCell>
                      <TableCell padding="none" width="10%" align="center">
                        {row?.user?.[0]?.code ? (
                          <Chip
                            sx={{
                              backgroundColor: "#1D8FE4",
                              color: "#ffffff",
                            }}
                            label={row?.user?.[0]?.code}
                          />
                        ) : null}
                      </TableCell>

                      <TableCell width="15%" align="center">
                        {row?.mark}
                      </TableCell>

                      <TableCell padding="none" width="10%" align="center">
                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            onClick={() =>
                              navigate(
                                `/classes/${row?.classId}/assignment/${row?.assignmentId}/response/${row?._id}`
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
                      <div className="mt-2 font-medium">
                        Hiện chưa có phản hồi nào.
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {userRole === ROLES.STUDENT && (
          <div className="col-span-12">
            <div className="font-medium text-center mb-2 text-xl">
              {" "}
              Các phản hồi gần đây
            </div>
            <Table
              sx={{
                minWidth: 650,
                border: "1px solid #ccc",
                borderRadius: 4,
                overflow: "hidden",
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
                    Học sinh
                  </TableCell>

                  <TableCell
                    sx={{ backgroundColor: "#e3e1e1" }}
                    width="10%"
                    align="center"
                  >
                    Mã học sinh
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
                {myResponses && myResponses?.length > 0 ? (
                  myResponses.slice(0, 3).map((row: any, index: any) => (
                    <TableRow
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell width="5%">{index + 1}</TableCell>
                      <TableCell width="15%" align="center">
                        {row?.user?.[0]?.username}
                      </TableCell>
                      <TableCell padding="none" width="10%" align="center">
                        {row?.user?.[0]?.code ? (
                          <Chip
                            sx={{
                              backgroundColor: "#1D8FE4",
                              color: "#ffffff",
                            }}
                            label={row?.user?.[0]?.code}
                          />
                        ) : null}
                      </TableCell>

                      <TableCell width="15%" align="center">
                        {row?.mark}
                      </TableCell>

                      <TableCell padding="none" width="10%" align="center">
                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            onClick={() =>
                              navigate(
                                `/classes/${row?.classId}/assignment/${row?.assignmentId}/response/${row?._id}`
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
                      <div className="mt-2 font-medium">
                        Hiện chưa có phản hồi nào.
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
