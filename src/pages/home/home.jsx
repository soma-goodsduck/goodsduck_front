import React, { useEffect } from "react";

import Header from "../../components/haeder/header";
import ItemList from "../../components/itemList/itemList";
import { Grid } from "../../elements";
import Nav from "../../components/nav/nav";

import { requestPublicData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const Home = (props) => {
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
      <Grid>
        <Header />
        <ItemList />
        <Nav />
      </Grid>
    </>
  );
};

export default Home;
