/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import * as Sentry from "@sentry/react";
import { firebaseApp } from "./firebase";
import { sendTokenAction } from "./axios";
import { history } from "../redux/configureStore";

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
            sendTokenAction(token);

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
            window.alert(
              "URL 옆 자물쇠 버튼을 눌러 알림 차단을 요청으로 바꾼 후 다시 시도해주세요.",
            );
            history.push("/my-profile");
            Sentry.captureException(error);
          });
      }
    }
  }
};
