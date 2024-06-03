// import { showSuccessNotificationFunction } from "@/common";
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3000"); // Adjust URL as necessary

// const NotificationHeader = () => {

//   useEffect(() => {
//     socket.on("notification", (notification) => {
//       setNotifications((prevNotifications) => [
//         notification,
//         ...prevNotifications,
//       ]);
//       showSuccessNotificationFunction(notification?.message)
//     });

//     return () => {
//       socket.off("notification");
//     };
//   }, []);

//   return (
//     <div>
//       <header>
//         <div className="notification-bell">
//           <i className="fa fa-bell"></i>
//           {notifications.length > 0 && (
//             <span className="badge">{notifications.length}</span>
//           )}
//         </div>
//       </header>
//       <div className="notification-list">
//         {notifications.map((notification, index) => (
//           <div key={index} className="notification-item">
//             {notification?.message}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notifications;
