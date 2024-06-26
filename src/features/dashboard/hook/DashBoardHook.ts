import { useEffect, useState } from "react";
import {
  AuthStorageService,
  ICommonListQuery,
  ROLES,
  openLoading,
  closeLoading,
} from "@/common";
import {
  IUser,
  IClass,
  classService,
  userService,
  groupService,
  IGroup,
  questionBankService,
} from "@/features";
import { useAppDispatch } from "@/plugins";
import { dashboardService } from "../service/dashboard.service";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
export const useFunctionDashboard = () => {
  const dispatch = useAppDispatch();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("isoWeek")
  );

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "",
        backgroundColor: "",
      },
    ],
  });
  const [userChartData, setUserChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Giáo viên",
        data: [],
        borderColor: "#1D8FE4",
        backgroundColor: "#1D8FE4",
      },
      {
        label: "Học sinh",
        data: [],
        borderColor: "#E41D1D",
        backgroundColor: "#E41D1D",
      },
      {
        label: "Phòng đào tạo",
        data: [],
        borderColor: "#1DE46B",
        backgroundColor: "#1DE46B",
      },
    ],
    currentWeek: {
      teachers: 0,
      students: 0,
      affairs: 0,
    },
    // previousWeek: {
    //   teachers: 0,
    //   students: 0,
    //   affairs: 0,
    // },
    total: {
      teachers: 0,
      students: 0,
      affairs: 0,
    },
  });
  const user = AuthStorageService.getLoginUser();

  //admin
  const [teachers, setTeachers] = useState<IUser[]>([]);
  const [students, setStudents] = useState<IUser[]>([]);
  const [affairs, setAffairs] = useState<IUser[]>([]);
  const [classList, setClassList] = useState<IClass[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalGroups, setTotalGroups] = useState(0);

  //teacher
  const [studentsInTeacherClass, setStudentsInTeacherClass] = useState(0);
  const [myClasses, setMyClasses] = useState<IClass[]>();
  const [numberMyClasses, setNumberMyClasses] = useState(0);
  const [numberQuestionBanks, setNumberQuestionBanks] = useState(0);

  const [visits, setVisits] = useState([]);
  const [currentWeek, setCurrentWeek] = useState<any>();
  const [percentage, setPercentage] = useState<any>();

  const getAllUsers = async () => {
    dispatch(openLoading());
    try {
      const response = await userService.getAllUserWithoutPagination({});
      if (response?.success) {
        setTeachers(
          response.users.filter((user: IUser) => user.role === ROLES.TEACHER)
        );
        setStudents(
          response.users.filter((user: IUser) => user.role === ROLES.STUDENT)
        );
        setAffairs(
          response.users.filter(
            (user: IUser) => user.role === ROLES.ACADEMIC_AFFAIR
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(closeLoading());
    }
  };

  const getAllClasses = async (query: ICommonListQuery) => {
    try {
      const response = await classService.getAllClasses(query);
      if (response?.success) {
        setClassList(response.data?.items);
        setTotalClasses(response.data?.totalItems);
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  async function getAllGroups(query: ICommonListQuery) {
    const response = await groupService.getAllGroups(query);
    setGroups(response.data?.items);
    setTotalGroups(response.data?.totalItems);
  }

  async function getVisits(start: any, end: any) {
    const response = await dashboardService.getVisits(start, end);
    if (response?.success) {
      setVisits(response?.items);
      const visitsData = response?.items;
      const visitsCountByDate = {} as any;

      visitsData.forEach((visit: any) => {
        const date = visit.date;
        if (!visitsCountByDate[date]) {
          visitsCountByDate[date] = 0;
        }
        visitsCountByDate[date] += 1;
      });

      const labels = [];
      const data = [];
      for (let i = 0; i < 7; i++) {
        const date = dayjs(start).add(i, "day");
        const dateString = date.format("YYYY-MM-DD");
        labels.push(date.format("ddd"));
        data.push(visitsCountByDate[dateString] || 0);
      }

      setChartData({
        labels,
        datasets: [
          {
            label: "Thống kê số lượng người truy cập",
            data,
            borderColor: "#1D8FE4",
            backgroundColor: "#1D8FE4",
          },
        ],
      });
    }
  }
  const getUserStats = async (weekStart: any, weekEnd: any) => {
    const currentWeekResponse = await dashboardService.getUsersStats(
      weekStart.format("YYYY-MM-DD"),
      weekEnd.format("YYYY-MM-DD")
    );
    const previousWeekResponse = await dashboardService.getUsersStats(
      weekStart?.subtract(1, "week").format("YYYY-MM-DD"),
      weekEnd?.subtract(1, "week").format("YYYY-MM-DD")
    );

    if (currentWeekResponse?.success && previousWeekResponse?.success) {
      const currentWeekData = currentWeekResponse.data;
      const previousWeekData = previousWeekResponse.data;

      // Calculate total counts for the current week
      const currentWeekTeachers = currentWeekData.teachers;
      const currentWeekStudents = currentWeekData.students;
      const currentWeekAffairs = currentWeekData.affairs;

      // Calculate total counts for the previous week
      const previousWeekTeachers = previousWeekData.teachers;
      const previousWeekStudents = previousWeekData.students;
      const previousWeekAffairs = previousWeekData.affairs;

      // Update labels and datasets
      const labels = ["Giáo viên", "Học sinh", "Giáo vụ"];
      const datasets = [
        {
          label: "Tuần này",
          data: [currentWeekTeachers, currentWeekStudents, currentWeekAffairs],
          borderColor: "#1D8FE4",
          backgroundColor: "#1D8FE4",
        },
        {
          label: "Tổng số",
          data: [teachers.length, students.length, affairs.length],
          borderColor: "#E41D1D",
          backgroundColor: "#E41D1D",
        },
      ];

      // Set state for userChartData
      setUserChartData({
        labels,
        datasets,
        currentWeek: {
          teachers: currentWeekTeachers,
          students: currentWeekStudents,
          affairs: currentWeekAffairs,
        },
        total: {
          teachers: teachers.length,
          students: students.length,
          affairs: affairs.length,
        },
        // previousWeek: {
        //   teachers: previousWeekTeachers,
        //   students: previousWeekStudents,
        //   affairs: previousWeekAffairs,
        // },
      });

      setPercentage({
        teachers: calculatePercentChange(
          previousWeekTeachers,
          currentWeekTeachers
        ),
        students: calculatePercentChange(
          previousWeekStudents,
          currentWeekStudents
        ),
        affairs: calculatePercentChange(
          previousWeekAffairs,
          currentWeekAffairs
        ),
      });
    }
  };

  const calculatePercentChange = (
    previousValue: number,
    currentValue: number
  ) => {
    return previousValue > 0
      ? ((currentValue - previousValue) / previousValue) * 100
      : 100;
  };

  //role: teacher
  const getTotalStudents = async () => {
    try {
      const response = await classService.getAllMyClasses(user?._id ?? "", {});
      if (response?.success) {
        const total = response?.data.items
          .map((item) => item.users)
          .reduce((total, current) => total + current.length - 1, 0);
        setStudentsInTeacherClass(total);
        setMyClasses(response?.data?.items);
        setNumberMyClasses(response?.data?.totalItems);
      }
    } catch (e) {
      console.error(e);
    } finally {
      //
    }
  };

  const getQuestionBank = async () => {
    try {
      const response = await questionBankService.getAllQuestionBanks({});
      if (response?.success) {
        setNumberQuestionBanks(response.data?.totalItems);
      }
    } catch (e) {
      console.error(e);
    } finally {
      //
    }
  };

  useEffect(() => {
    const weekStart = currentWeekStart;
    const weekEnd = weekStart.endOf("isoWeek");
    setCurrentWeek({
      start: weekStart,
      end: weekEnd,
    });

    getVisits(weekStart.format("YYYY-MM-DD"), weekEnd.format("YYYY-MM-DD"));
    getUserStats(weekStart, weekEnd);
  }, [currentWeekStart]);

  useEffect(() => {
    getAllUsers();
    getAllClasses({});
    getAllGroups({});
    getTotalStudents();
    getQuestionBank();
  }, []);

  const handlePreviousWeek = () => {
    setCurrentWeekStart(currentWeekStart.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(currentWeekStart.add(1, "week"));
  };

  return {
    teachers,
    students,
    affairs,
    totalClasses,
    classList,
    groups,
    totalGroups,
    visits,
    handlePreviousWeek,
    handleNextWeek,
    chartData,
    currentWeek,
    userChartData,
    percentage,
    studentsInTeacherClass,
    numberMyClasses,
    myClasses,
    numberQuestionBanks,
  };
};
