// import React, { useState, useEffect } from "react";
// import { io, Socket } from "socket.io-client";
// import { Messages } from "@/components/base/Message";
// import { MessageForm } from "@/components/base/MessageForm";
// import {
//   ServerToClientEvents,
//   ClientToServerEvents,
//   Message,
//   User,
// } from "@/common/interfaces";
// import { useSelector } from "react-redux";
// import { RootState } from "@/plugins/redux-toolkit/store";
// import { IUser } from "@/features/auth/interfaces";
// import { userService } from "@/features/profile/services/profile.service";
// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
//   "http://localhost:8080"
// );
// export default function ChatPage() {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const user = useSelector((state: RootState) => state.auth.user);
//   useEffect(() => {
//     socket.on("connect", () => {
//       setIsConnected(true);
//     });

//     socket.on("disconnect", () => {
//       setIsConnected(false);
//     });

//     socket.on("chat", (e) => {
//       setMessages((messages) => [e, ...messages]);
//     });

//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("chat");
//     };
//   }, []);

//   //   const login = (e: React.FormEvent<HTMLFormElement>) => {
//   //     const formValue = e.target[0].value;
//   //     const newUser = {
//   //       userId: Date.now().toLocaleString().concat(formValue),
//   //       userName: formValue,
//   //     };
//   //     sessionStorage.setItem("user", JSON.stringify(newUser));
//   //     setUser(newUser);
//   //   };

//   const sendMessage = (e: any) => {
//     if (user) {
//       socket.emit("chat", {
//         user: {
//           userId: user?._id,
//           userName: user?.username,
//         },
//         timeSent: new Date(Date.now()).toLocaleString("en-US"),
//         message: e.target[0].value,
//       });
//     }
//   };
//   return (
//     <div>
//       <div className="flex h-1/6 items-center justify-between">
//         <h1 className="text-5xl font-black text-violet-500">Realtime Chat</h1>
//         <div className="flex h-8 items-center rounded-xl bg-slate-800 px-4">
//           <span className="mr-1 text-lg text-white">
//             {user?.username ?? ""}
//           </span>
//           <span className="ml-1">{isConnected ? "🟢" : "🔴"}</span>
//         </div>
//       </div>
//       <Messages user={user as IUser} messages={messages}></Messages>
//       <MessageForm sendMessage={sendMessage}></MessageForm>
//     </div>
//   );
// }
