
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyARncQd_m59fJz6UbBgPm-MOlB6nzjMmYA",
  authDomain: "najackdo-8e4d1.firebaseapp.com",
  projectId: "najackdo-8e4d1",
  storageBucket: "najackdo-8e4d1.appspot.com",
  messagingSenderId: "528884005948",
  appId: "1:528884005948:web:e0a4b138395c6612369739",
  measurementId: "G-JNSBJQ18Y8"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: 'http://localhost:3000/images/icons/favicon-128.png',
    tag: resultData.tag,
    ...resultData,
  };
  console.log(resultData);
  self.registration.showNotification(notificationTitle, notificationOptions);
  
});

self.addEventListener("notificationclick", function (event) {
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
