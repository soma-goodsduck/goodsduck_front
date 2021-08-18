/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
import axios from "axios";
import * as Sentry from "@sentry/react";
import { firebaseApp } from "./firebase";

export const notification = () => {
  const jwt = localStorage.getItem("jwt");
  const userAgent = window.navigator.userAgent;
  const isChrome = userAgent.indexOf("Chrome");
  const isChromeMobile = userAgent.indexOf("CriOS");
  const isKakaoTalk = userAgent.indexOf("KAKAOTALK");
  const isIphone = userAgent.indexOf("iPhone");

  if (isIphone === -1 || isKakaoTalk === -1) {
    if (isChrome !== -1 || isChromeMobile !== -1) {
      const firebaseMessaging = firebaseApp.messaging();

      firebaseMessaging
        .requestPermission()
        .then(() => {
          return firebaseMessaging.getToken();
        })
        .then(async (token) => {
          const json = {
            body: token,
          };
          axios.post(
            `${process.env.REACT_APP_BACK_URL}/api/v1/users/device`,
            JSON.stringify(json),
            {
              headers: {
                jwt: `${jwt}`,
                registrationToken: `${token}`,
                "Content-Type": "application/json",
              },
            },
          );

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
};
