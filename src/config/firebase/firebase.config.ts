// import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getMessaging, onMessage } from "firebase/messaging";

// import type { Auth } from "firebase/auth";
// import type { Messaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// function initFirebase() {
//   try {
//     // Initialize Firebase

//     console.log("firebaseConfig", firebaseConfig);
//     const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
//     const auth = getAuth(app);
//     const messaging = getMessaging(app);
//     return {
//       auth,
//       messaging,
//     };
//   } catch (error) {
//     return {};
//   }
// }

// const data = initFirebase();

// export const onMessageListener = () =>
//   new Promise((resolve, reject) => {
//     if (!messaging) {
//       reject(new Error("No message received"));

//       return;
//     }

//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });

// const auth = data.auth as Auth;
// const messaging = data.messaging as Messaging;

// export { auth, messaging };
