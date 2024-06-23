import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthStorageService } from "@/common";
import { useFunctionDashboard } from "../hook/DashBoardHook";
import { VisitChart } from "..";
import { UserChart } from "..";
import { CustomButton } from "@/components";
export const DashBoard = () => {
  const navigate = useNavigate();

  const {
    teachers,
    students,
    affairs,
    totalClasses,
    percentage,
    chartData,
    totalGroups,
    handlePreviousWeek,
    handleNextWeek,
    currentWeek,
    userChartData,
  } = useFunctionDashboard();

  useEffect(() => {
    const isAuthenticated = AuthStorageService.checkAuthentication();
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="mb-5">
      <div className="flex justify-between">
        <div className="text-center text-white p-4  w-52 h-28  bg-[#5292e6] rounded-xl ">
          <div className="text-lg mb-4">Giáo viên</div>
          <div className="text-3xl">{teachers.length}</div>
        </div>
        <div className="text-center text-white p-4  w-52 h-28 bg-[#e69a52] rounded-xl ">
          <div className="text-lg mb-4">Học sinh</div>
          <div className="text-3xl">{students.length}</div>
        </div>
        <div className="text-center text-white p-4  w-52 h-28 bg-[#e64848] rounded-xl ">
          <div className="text-lg mb-4">Giáo vụ</div>
          <div className="text-3xl">{affairs.length}</div>
        </div>
        <div className="text-center text-white p-4  w-52 h-28 bg-[#2aa94c] rounded-xl ">
          <div className="text-lg mb-4">Lớp học</div>
          <div className="text-3xl">{totalClasses}</div>
        </div>
        <div className="text-center text-white p-4  w-52 h-28 bg-[#e64848] rounded-xl ">
          <div className="text-lg mb-4">Diễn đàn</div>
          <div className="text-3xl">{totalGroups}</div>
        </div>
      </div>

      <div className="w-full mt-10  grid grid-cols-12 gap-4 shadow-forumBox p-5 pb-16">
        <div className="col-span-6">
          <VisitChart
            chartData={chartData}
            handlePreviousWeek={handlePreviousWeek}
            handleNextWeek={handleNextWeek}
            currentWeek={currentWeek}
          />
        </div>
        <div className="col-span-6">
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
      </div>
    </div>
  );
};
