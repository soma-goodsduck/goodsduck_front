/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import * as Sentry from "@sentry/react";
import { firebaseApp } from "./firebase";
import { sendToken } from "./axios";

export const notification = () => {
  const userAgent = window.navigator.userAgent;
  const isChrome = userAgent.indexOf("Chrome");
  const isChromeMobile = userAgent.indexOf("CriOS");
  const isKakaoTalk = userAgent.indexOf("KAKAOTALK");
  const isApp = userAgent.indexOf("APP");
  const isIphone = userAgent.indexOf("iPhone");

  if (isApp === -1) {
    if (isIphone === -1 || isKakaoTalk === -1) {
      if (isChrome !== -1 || isChromeMobile !== -1) {
        const firebaseMessaging = firebaseApp.messaging();

        firebaseMessaging
          .requestPermission()
          .then(() => {
            return firebaseMessaging.getToken();
          })
          .then(async (token) => {
            sendToken(token);

            firebaseMessaging.onMessage((payload) => {
              const title = payload.notification.title;
              const options = {
                body: payload.notification.body,
              };

              navigator.serviceWorker.ready.then((reg) => {
                reg.showNotification(title, options);
              });
            });
          })
          .catch((error) => {
            console.log("error", error);
            Sentry.captureException(error);
          });
      }
    }
  }
};
