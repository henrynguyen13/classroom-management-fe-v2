// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
// );

// self.addEventListener("fetch", () => {
//   const urlParams = new URLSearchParams(location.search);
//   self.firebaseConfig = Object.fromEntries(urlParams);
// });

// const defaultConfig = {
//   apiKey: true,
//   projectId: true,
//   messagingSenderId: true,
//   appId: true,
// };

// // const firebaseConfig = {
// //   apiKey: '',
// //   authDomain: '',
// //   projectId: '',
// //   storageBucket: '',
// //   messagingSenderId: '',
// //   appId: '',
// //   measurementId: '',
// // };

// // if (!firebase.apps.length) {
// //   try {
// //     firebase.initializeApp(self.firebaseConfig || defaultConfig);
// //   } catch (e) {
// //     console.log("sw error", e);
// //   }
// // }

// // const messaging = firebase.messaging();

// // const isSupported = firebase.messaging.isSupported();
// // if (isSupported) {
// //   const messaging = firebase.messaging();
// //   messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
// //     self.registration.showNotification(title, {
// //       body,
// //       icon: image || "/assets/icons/icon.png",
// //     });
// //     self.clients.matchAll({ type: "window" }).then((clients) => {
// //       clients.forEach((client) =>
// //         client.postMessage({
// //           msg: "Background notification received.",
// //         })
// //       );
// //     });
// //   });
// // }

// firebase.initializeApp(self.firebaseConfig || defaultConfig);
// if (firebase.messaging.isSupported()) {
//   const messaging = firebase.messaging();
//   const channel = new BroadcastChannel("notifications");
//   messaging.onBackgroundMessage(function (payload) {
//     //can not console.log here
//     channel.postMessage(payload);
//   });
// }
