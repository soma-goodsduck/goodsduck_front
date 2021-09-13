import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/haeder/header";
import ItemList from "../../components/itemList/itemList";
import { Grid, Notification } from "../../elements";
import Nav from "../../components/nav/nav";

import { actionCreators as userActions } from "../../redux/modules/user";
import { requestPublicData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const Home = (props) => {
  const dispatch = useDispatch();

  // alert
  const [showNotiPopup, setShowNotiPopup] = useState(false);
  const { showNotification, notificationBody } = useSelector((state) => ({
    showNotification: state.user.showNotification,
    notificationBody: state.user.notificationBody,
  }));

  useEffect(() => {
    if (showNotification) {
      setShowNotiPopup(true);
      setTimeout(() => {
        setShowNotiPopup(false);
        dispatch(userActions.setShowNotification(false));
        dispatch(userActions.setNotificationBody(""));
      }, 2000);
    }
  }, [showNotification]);

  const isApp = localStorage.getItem("isApp");
  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");

  const reqUserData = async () => {
    const result = await requestPublicData("v1/users/look-up");
    return result;
  };
  const fnEffect = async () => {
    if (!likeIdolGroupsLS) {
      const userData = await reqUserData();

      if (userData < 0) {
        if (userData === -201) {
          return;
        }

        history.push("/error");
        return;
      }

      if (userData) {
        const likeIdolGroups = [];
        userData.likeIdolGroups.forEach((idolGroup) => {
          likeIdolGroups.push(idolGroup.idolGroupId);
        });
        localStorage.setItem("likeIdolGroups", likeIdolGroups);
      }
    }
  };
  useEffect(fnEffect, []);

  return (
    <>
      {showNotiPopup && <Notification data={notificationBody} />}
      <Grid>
        <Header />
        <ItemList />
        {!isApp && <Nav />}
      </Grid>
    </>
  );
};

export default Home;
