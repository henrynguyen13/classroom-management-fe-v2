import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

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
} from "@/common";
import { Clock, Teacher, Code, Calendar, Status, Logout } from "@/assets";
import { Collapse } from "@/components";
import {
  StudentList,
  AssignmentListPage,
  ListAttendance,
  attendanceService,
} from "@/features";
import { classService, IDescriptionClass } from "../index";

export const ClassDetailPage = () => {
  const { id } = useParams();
  const userCode = AuthStorageService.getLoginUser().code;

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState<IDescriptionClass[]>([]);
  const [createdAt, setCreatedAt] = useState("");
  const [status, setStatus] = useState("");
  const [teacher, setTeacher] = useState("");
  const [students, setStudents] = useState<IStudent[]>([]);
  const [allStudents, setAllStudents] = useState<IStudent[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [absences, setAbsences] = useState<string>("");

  const getAllStudentsWithoutSelected = async () => {
    const response = await classService.getClassDetailWithoutPagination(
      id as string
    );
    setAllStudents(response?.class?.users ?? []);
  };
  const getClassDetail = async () => {
    const response = await classService.getClassDetail(id as string, {});
    setName(response?.class?.name || "");
    setCode(response?.class?.code || "");
    setDescription(response?.class?.description || []);
    setCreatedAt(response?.class?.createdAt.toLocaleString() || "");
    setStatus(response?.class?.status || "");
    setTeacher(response?.class?.teacher.username || "");
    setStudents(response?.class?.users || []);
    setTotalStudents(response?.totalStudents || 0);
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
      content: convertStatusClass(status),
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
                <Tab label="Bài kiểm tra" value="3" />
                {isTeacherRole ? <Tab label="Điểm danh" value="4" /> : null}
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
            <TabPanel value="3">Item Three</TabPanel>

            <TabPanel value="4">
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
