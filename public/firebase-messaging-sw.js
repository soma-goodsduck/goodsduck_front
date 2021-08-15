/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAtd44sxSNaCXW6slx20XE8aTVGm2eTrq0",
  authDomain: "goodsduck-chat-5659e.firebaseapp.com",
  databaseURL: "https://goodsduck-chat-5659e-default-rtdb.firebaseio.com",
  projectId: "goodsduck-chat-5659e",
  storageBucket: "goodsduck-chat-5659e.appspot.com",
  messagingSenderId: "303740582336",
  appId: "1:303740582336:web:3ade0100cf6b2d967f7025",
  measurementId: "G-RHC49133GP",
});

const messaging = firebase.messaging();
