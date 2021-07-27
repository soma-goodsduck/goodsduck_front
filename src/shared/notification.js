/* eslint-disable consistent-return */
import axios from "axios";
import firebaseApp from "./firebase";

export const notification = () => {
  const jwt = localStorage.getItem("jwt");
  const messaging = firebaseApp.messaging();
  messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .then(async (token) => {
      const json = {
        body: token,
      };
      axios.post(
        `${process.env.REACT_APP_BACK_URL}/api/v1/notification/token`,
        JSON.stringify(json),
        {
          headers: {
            jwt: `${jwt}`,
          },
        },
      );
      messaging.onMessage((payload) => {
        const title = payload.notification.title;
        const options = {
          body: payload.notification.body,
        };
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(title, options);
        });
      });
      console.log(token);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error Occured");
    });
};
