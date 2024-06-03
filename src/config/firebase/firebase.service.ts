// import { signOut } from "firebase/auth";
// import { getToken } from "firebase/messaging";
// import { deleteToken } from "firebase/messaging";
// import { v4 as uuidv4 } from "uuid";

// import { auth, messaging } from "./firebase.config";

// export async function getFirebaseToken() {
//   try {
//     const permission = await Notification.requestPermission();
//     console.log("-permission", permission);
//     if (permission === "granted") {
//       try {
//         const token = await getToken(messaging, {
//           vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
//         });
//         console.log("checkToken", token);
//         return token;
//       } catch (err) {
//         console.error("err: ", err);
//       }
//     } else {
//       console.log("Unable to get permission to notify.");
//     }
//   } catch (error) {
//     return null;
//   }
// }

// export async function handleLogoutFirebase() {
//   await deleteToken(messaging);
//   return signOut(auth);
// }

// export function getDeviceId() {
//   let deviceId = localStorage.getItem("deviceId");
//   if (!deviceId) {
//     deviceId = uuidv4();
//     localStorage.setItem("deviceId", deviceId);
//   }
//   return deviceId;
// }
