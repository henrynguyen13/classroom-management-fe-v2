import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthStorageService,
  showSuccessAlert,
  showSuccessNotificationFunction,
} from "@/common";
import DashboardImage from "@/assets/images/dashboard.png";
// import { getFirebaseToken, onMessageListener } from "@/config";
export const DashBoard = () => {
  const navigate = useNavigate();

  // const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    const isAuthenticated = AuthStorageService.checkAuthentication();
    if (!isAuthenticated) {
      navigate("/login");
    }
    // getFirebaseToken();
    // const channel = new BroadcastChannel("notifications");
    // channel.addEventListener("message", (event) => {
    //   console.log("Receive background: ", event.data);
    // });
    // onMessageListener()
    //   .then((payload: any) => {
    //     setNotification({
    //       title: payload?.notification?.title,
    //       body: payload?.notification?.body,
    //     });
    //     showSuccessNotificationFunction(
    //       `${payload?.notification?.title}: ${payload?.notification?.body}`
    //     );
    //   })
    //   .catch((err: any) => console.log("failed: ", err));
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <div className="text-center text-white p-4  w-64 h-32  bg-[#5292e6] rounded-xl ">
          <div className="text-lg mb-5">Số lớp học tham gia</div>
          <div className="text-3xl">1</div>
        </div>
        <div className="text-center text-white p-4  w-64 h-32 bg-[#e69a52] rounded-xl ">
          <div className="text-lg mb-5">Số lần vắng mặt</div>
          <div className="text-3xl">0</div>
        </div>
        <div className="text-center text-white p-4  w-64 h-32 bg-[#e64848] rounded-xl ">
          <div className="text-lg mb-5">Điểm trung bình</div>
          <div className="text-3xl">7.07</div>
        </div>
        <div className="text-center text-white p-4  w-64 h-32 bg-[#2aa94c] rounded-xl ">
          <div className="text-lg mb-5">Số bài kiểm tra đã làm</div>
          <div className="text-3xl">13</div>
        </div>
      </div>

      <div className="w-full mt-5">
        <img className="w-[1200px]" src={DashboardImage} />
      </div>
    </>
  );
};
