import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import dayjs from "dayjs";
import {
  ADMIN_AND_AFFAIR_AND_TEACHER,
  ALL_MEMBERS,
  ONLY_STUDENT,
  ICard,
  convertStatusClass,
  formatDate,
  isTeacher,
  AuthStorageService,
  IStudent,
  openLoading,
  closeLoading,
} from "@/common";
import { Clock, Teacher, Code, Calendar, Status, Logout } from "@/assets";
import { Collapse } from "@/components";
import {
  StudentList,
  AssignmentListPage,
  ListAttendance,
  attendanceService,
  ReviewPage,
} from "@/features";
import { classService, IDescriptionClass } from "../index";
import { useAppDispatch } from "@/plugins";

export const ClassDetailPage = () => {
  const { id } = useParams();
  const userCode = AuthStorageService.getLoginUser().code;
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState<IDescriptionClass[]>([]);
  const [createdAt, setCreatedAt] = useState("");
  const [_, setStatus] = useState("");
  const [teacher, setTeacher] = useState("");
  const [students, setStudents] = useState<IStudent[]>([]);
  const [allStudents, setAllStudents] = useState<IStudent[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [absences, setAbsences] = useState<string>("");

  const [duration, setDuration] = useState([]);

  const getAllStudentsWithoutSelected = async () => {
    const response = await classService.getClassDetailWithoutPagination(
      id as string
    );
    setAllStudents(response?.class?.users ?? []);
  };
  const getClassDetail = async () => {
    dispatch(openLoading());

    try {
      const response = await classService.getClassDetail(id as string, {});

      setName(response?.class?.name || "");
      setCode(response?.class?.code || "");
      setDescription(response?.class?.description || []);
      setCreatedAt(response?.class?.createdAt.toLocaleString() || "");
      setStatus(response?.class?.status || "");
      setDuration(response?.class?.duration || []);
      setTeacher(response?.class?.teacher.username || "");
      setStudents(response?.class?.users || []);
      setTotalStudents(response?.totalStudents || 0);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getClassDetail();
    getAllStudentsWithoutSelected();
  }, [id]);

  useEffect(() => {
    const getStudentAbsencesInClass = async () => {
      const response = await attendanceService.getStudentAbsencesInClass(
        id as string,
        userCode as string
      );
      setAbsences(response?.absences ?? "0");
    };
    getStudentAbsencesInClass();
  }, []);

  const listItems: ICard[] = [
    {
      title: "Mã lớp học",
      icon: Code,
      content: code,
      role: ALL_MEMBERS,
    },
    {
      title: "Lịch học",
      icon: Calendar,
      time: description,
      role: ALL_MEMBERS,
    },
    {
      title: "Ngày tạo",
      icon: Clock,
      content: formatDate(createdAt),
      role: ADMIN_AND_AFFAIR_AND_TEACHER,
    },
    {
      title: "Trạng thái",
      icon: Status,
      content: convertStatusClass(
        dayjs(duration[0]).toDate(),
        dayjs(duration[1]).toDate()
      ),
      role: ADMIN_AND_AFFAIR_AND_TEACHER,
    },
    {
      title: "Giáo viên",
      icon: Teacher,
      content: teacher,
      role: ALL_MEMBERS,
    },
    {
      title: "Số buổi vắng",
      icon: Logout,
      content: absences,
      role: ONLY_STUDENT,
    },
  ];

  const [value, setValue] = useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const updateStudentList = async () => {
    getClassDetail();
    getAllStudentsWithoutSelected();
  };

  const isTeacherRole = isTeacher();

  return (
    <>
      <Collapse title={`Thông tin lớp học: ${name}`} list={listItems} />
      {/* <CardDetail title="Thông tin lớp học" list={listItems} /> */}
      <Card className="mt-4 mb-10">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="Người dùng" value="1" />
                <Tab label="Bài tập" value="2" />
                <Tab label="Bài giảng" value="3" />
                {/* <Tab label="Bài kiểm tra" value="4" /> */}
                {isTeacherRole ? <Tab label="Điểm danh" value="5" /> : null}
              </TabList>
            </Box>
            <TabPanel value="1">
              <StudentList
                id={id as string}
                students={students}
                updateStudentList={updateStudentList}
                setStudents={setStudents}
                total={totalStudents}
                allStudents={allStudents}
              />
            </TabPanel>
            <TabPanel value="2">
              <AssignmentListPage />
            </TabPanel>
            <TabPanel value="3">
              <ReviewPage />
            </TabPanel>
            {/* <TabPanel value="4">Bài kiểm tra</TabPanel> */}
            <TabPanel value="5">
              <ListAttendance
                classId={id as string}
                students={students as []}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
};
